// ==========================================
// Week 07 · Day 4: Maybe + Either 混合使用
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

class Maybe {
  static of(value) { return value == null ? new Nothing() : new Just(value); }
}

class Just extends Maybe {
  constructor(value) { super(); this._value = value; }
  map(fn) { return Maybe.of(fn(this._value)); }
  chain(fn) { return fn(this._value); }
  getOrElse(_) { return this._value; }
  toEither(_) { return Either.right(this._value); }
}

class Nothing extends Maybe {
  map(_) { return this; }
  chain(_) { return this; }
  getOrElse(defaultVal) { return defaultVal; }
  toEither(leftValue) { return Either.left(leftValue); }
}

class Either {
  static of(value) { return new Right(value); }
  static left(value) { return new Left(value); }
  static right(value) { return new Right(value); }
}

class Right extends Either {
  constructor(value) { super(); this._value = value; }
  map(fn) { return Either.of(fn(this._value)); }
  chain(fn) { return fn(this._value); }
  fold(_, rightFn) { return rightFn(this._value); }
  getOrElse(_) { return this._value; }
  toMaybe() { return Maybe.of(this._value); }
}

class Left extends Either {
  constructor(value) { super(); this._value = value; }
  map(_) { return this; }
  chain(_) { return this; }
  fold(leftFn, _) { return leftFn(this._value); }
  getOrElse(defaultVal) { return defaultVal; }
  toMaybe() { return new Nothing(); }
}

// 练习1: Maybe → Either 转换
// 场景: 先判空（Maybe），再校验（Either）

// 1a: validateUser(user) — 校验用户对象
// user 为 null/undefined → Left('User not found')
// user.name 为空 → Left('Name required')
// user.age < 18 → Left('Underage')
// 一切 OK → Right(user)
function validateUser(user) {
  return Maybe.of(user)
    .toEither('User not found')
    .chain(u => u.name ? Either.right(u) : Either.left('Name required'))
    .chain(u => u.age >= 18 ? Either.right(u) : Either.left('Underage'));
}

// 练习2: Either → Maybe 转换
// 场景: 处理完异常后，可能还要做空值安全操作

// 2a: safeGetUserCity(userId, userDb)
// 1. 从 userDb 中查找 user（不存在 → Left）
// 2. 获取 user.address.city（可能为 null → Nothing）
// 3. 返回最终结果
function safeGetUserCity(userId, userDb) {
  const user = userDb[userId];
  return (user ? Either.right(user) : Either.left('User not found'))
    .toMaybe()
    .chain(u => Maybe.of(u.address))
    .map(addr => addr.city);
}

// 练习3: 两种容器协作模式总结（写在注释里）
//
// 3a. 什么场景下用 Maybe，什么场景下用 Either？何时需要两者配合？
//
// Maybe：用于处理"值可能不存在"的场景（null/undefined），不携带错误信息，
// 只区分"有值"和"无值"。适合做空值安全的链式访问，如 user.address.city。
//
// Either：用于处理"可能失败"的场景，Left 携带错误信息，适合业务校验、
// 错误需要区分类型的场景，如"用户不存在"vs"库存不足"。
//
// 两者配合的典型模式：
// - Maybe → Either（toEither）：先判空再校验。Maybe 处理 null，
//   转成 Either 后引入带错误信息的业务规则校验。
// - Either → Maybe（toMaybe）：先处理异常再安全访问。Either 处理
//   业务错误后，转 Maybe 做后续的空值安全操作，此时错误原因已不重要。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Maybe → Either", () => {
  it("有效用户应返回 Right", () => {
    const result = validateUser({ name: "Alice", age: 25 });
    expect(result instanceof Right).toBe(true);
  });

  it("null 用户应返回 Left", () => {
    const result = validateUser(null);
    expect(result instanceof Left).toBe(true);
    expect(result.fold((e) => e, () => "")).toBe("User not found");
  });

  it("名字为空应返回 Left", () => {
    const result = validateUser({ name: "", age: 25 });
    expect(result instanceof Left).toBe(true);
  });

  it("未成年应返回 Left", () => {
    const result = validateUser({ name: "Bob", age: 15 });
    expect(result instanceof Left).toBe(true);
  });
});

describe("练习2: Either → Maybe", () => {
  const db = {
    "1": { name: "Alice", address: { city: "Beijing" } },
    "2": { name: "Bob" },
  };

  it("完整数据应获取 city", () => {
    const result = safeGetUserCity("1", db);
    expect(result.getOrElse("Unknown")).toBe("Beijing");
  });

  it("缺少 address 应返回 Nothing 或默认值", () => {
    const result = safeGetUserCity("2", db);
    expect(result.getOrElse("Unknown")).toBe("Unknown");
  });

  it("用户不存在应返回 Left 或默认值", () => {
    const result = safeGetUserCity("999", db);
    expect(result.getOrElse("Unknown")).toBe("Unknown");
  });
});
