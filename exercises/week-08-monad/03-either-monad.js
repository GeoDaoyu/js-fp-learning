// ==========================================
// Week 08 · Day 3: Either 改造为 Monad
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 为 Either 添加 chain 方法

class Either {
  static of(value) { return new Right(value); }
  static left(value) { return new Left(value); }
  static right(value) { return new Right(value); }
}

class Right extends Either {
  constructor(value) { super(); this._value = value; }
  map(fn) { return Either.of(fn(this._value)); }
  chain(fn) {
    return fn(this._value);
  }
  fold(_, rightFn) { return rightFn(this._value); }
  getOrElse(_) { return this._value; }
}

class Left extends Either {
  constructor(value) { super(); this._value = value; }
  map(_) { return this; }
  chain(_) { return this; }
  fold(leftFn, _) { return leftFn(this._value); }
  getOrElse(defaultVal) { return defaultVal; }
}

// 练习2: chain 实现链式错误处理
// 场景: 一系列可能失败的操作，任一失败则整体失败

// 2a: validateName(name) → name非空 ? Right(name) : Left('name empty')
function validateName(name) {
  return name && name.trim() !== "" ? Either.right(name) : Either.left("name empty");
}

function validateAge(age) {
  return age >= 18 ? Either.right(age) : Either.left("underage");
}

function createUser(data) {
  return validateName(data.name).chain((name) =>
    validateAge(data.age).map((age) => ({ name, age }))
  );
}

// 练习3: 对比 — 有 chain 和没 chain 的区别
// 看下面的代码：

// 没有 chain（只用 map）：
// validateName(name).map(name =>
//   validateAge(age).map(age =>
//     ({ name, age })))
// 结果: Right(Right({...})) — 嵌套了

// 有 chain：
// validateName(name).chain(name =>
//   validateAge(age).map(age =>
//     ({ name, age })))
// 结果: Right({...}) — 展平了

// 解释：
// 外层用 chain 替代 map，因为 validateName 返回的是 Either（可能 Left 也可能 Right），
// chain 会把结果展平而不是再包一层。内层的 validateAge 返回的是 Either，
// 但 validateAge 后面紧跟的 .map(age => ({ name, age })) 中，map 的回调返回的是
// 普通对象（不是 Either），所以这里用 map 就够了。
// 关键：chain 接的是"返回 Either 的函数"，map 接的是"返回普通值的函数"。
// 如果外层也用 map，结果就是 Right(Right({...})) 嵌套；用 chain 就展平成 Right({...})。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Either chain", () => {
  it("Right.chain 应正确串联", () => {
    const result = Either.of(5)
      .chain((x) => Either.right(x * 2))
      .chain((x) => Either.right(x + 1));
    expect(result.getOrElse(0)).toBe(11);
  });

  it("Left.chain 应短路", () => {
    const result = Either.left("error")
      .chain((x) => Either.right(x * 2));
    expect(result instanceof Left).toBe(true);
  });

  it("chain 中途失败应短路", () => {
    const result = Either.of(5)
      .chain((x) => Either.left("fail"))
      .chain((x) => Either.right(x * 2));
    expect(result instanceof Left).toBe(true);
    expect(result.fold((e) => e, () => "")).toBe("fail");
  });
});

describe("练习2: 链式错误处理", () => {
  it("全部校验通过应返回 Right", () => {
    const result = createUser({ name: "Alice", age: 25 });
    expect(result instanceof Right).toBe(true);
    expect(result.getOrElse({})).toEqual({ name: "Alice", age: 25 });
  });

  it("name 校验失败应返回 Left", () => {
    const result = createUser({ name: "", age: 25 });
    expect(result instanceof Left).toBe(true);
  });

  it("age 校验失败应返回 Left", () => {
    const result = createUser({ name: "Bob", age: 15 });
    expect(result instanceof Left).toBe(true);
  });
});
