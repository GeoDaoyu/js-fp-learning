// ==========================================
// Week 07 · Day 4: Maybe + Either 混合使用
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

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
  toEither(leftValue) { return Either.right(this._value); }
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
  toMaybe() { return Nothing; }
}

// 练习1: Maybe → Either 转换
// 场景: 先判空（Maybe），再校验（Either）

// 1a: validateUser(user) — 校验用户对象
// user 为 null/undefined → Left('User not found')
// user.name 为空 → Left('Name required')
// user.age < 18 → Left('Underage')
// 一切 OK → Right(user)
function validateUser(user) {
  // TODO: 先用 Maybe 判空，再转 Either 做校验
}

// 练习2: Either → Maybe 转换
// 场景: 处理完异常后，可能还要做空值安全操作

// 2a: safeGetUserCity(userId, userDb)
// 1. 从 userDb 中查找 user（不存在 → Left）
// 2. 获取 user.address.city（可能为 null → Nothing）
// 3. 返回最终结果
function safeGetUserCity(userId, userDb) {
  // TODO
}

// 练习3: 两种容器协作模式总结（写在注释里）
//
// 3a. 什么场景下用 Maybe，什么场景下用 Either？何时需要两者配合？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Maybe → Either", () => {
  it("有效用户应返回 Right", () => {
    const result = validateUser({ name: "Alice", age: 25 });
    assert.ok(result instanceof Right);
  });

  it("null 用户应返回 Left", () => {
    const result = validateUser(null);
    assert.ok(result instanceof Left);
    assert.equal(result.fold((e) => e, () => ""), "User not found");
  });

  it("名字为空应返回 Left", () => {
    const result = validateUser({ name: "", age: 25 });
    assert.ok(result instanceof Left);
  });

  it("未成年应返回 Left", () => {
    const result = validateUser({ name: "Bob", age: 15 });
    assert.ok(result instanceof Left);
  });
});

describe("练习2: Either → Maybe", () => {
  const db = {
    "1": { name: "Alice", address: { city: "Beijing" } },
    "2": { name: "Bob" },
  };

  it("完整数据应获取 city", () => {
    const result = safeGetUserCity("1", db);
    assert.equal(result.getOrElse("Unknown"), "Beijing");
  });

  it("缺少 address 应返回 Nothing 或默认值", () => {
    const result = safeGetUserCity("2", db);
    assert.equal(result.getOrElse("Unknown"), "Unknown");
  });

  it("用户不存在应返回 Left 或默认值", () => {
    const result = safeGetUserCity("999", db);
    assert.equal(result.getOrElse("Unknown"), "Unknown");
  });
});
