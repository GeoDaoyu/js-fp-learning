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
  // TODO: name 非空返回 Right(name)，否则 Left('name empty')
}

function validateAge(age) {
  // TODO: age >= 18 返回 Right(age)，否则 Left('underage')
}

function createUser(data) {
  // TODO: 用 chain 串联 validateName 和 validateAge，返回 Either<error, {name, age}>
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

// TODO: 思考并写下你的理解 — 外层为什么用 chain 内层为什么用 map？
// 关键：chain 接的是"返回 Either 的函数"，map 接的是"返回普通值的函数"。

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
