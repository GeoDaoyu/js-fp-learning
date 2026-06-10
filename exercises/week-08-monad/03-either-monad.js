// ==========================================
// Week 08 · Day 3: Either 改造为 Monad
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

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
    // TODO: fn 返回 Either，直接返回那个 Either
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
  // TODO
}

// 2b: validateAge(age) → age >= 18 ? Right(age) : Left('underage')
function validateAge(age) {
  // TODO
}

// 2c: createUser(data) → 先校验 name，再校验 age，全部通过返回 Right(user对象)
// 要求: 用 chain 串联，任一失败返回 Left
function createUser(data) {
  // TODO: 用 validateName(data.name).chain(...) 串联
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

// TODO: 解释为什么 chain 能解决这个问题

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Either chain", () => {
  it("Right.chain 应正确串联", () => {
    const result = Either.of(5)
      .chain((x) => Either.right(x * 2))
      .chain((x) => Either.right(x + 1));
    assert.equal(result.getOrElse(0), 11);
  });

  it("Left.chain 应短路", () => {
    const result = Either.left("error")
      .chain((x) => Either.right(x * 2));
    assert.ok(result instanceof Left);
  });

  it("chain 中途失败应短路", () => {
    const result = Either.of(5)
      .chain((x) => Either.left("fail"))
      .chain((x) => Either.right(x * 2));
    assert.ok(result instanceof Left);
    assert.equal(result.fold((e) => e, () => ""), "fail");
  });
});

describe("练习2: 链式错误处理", () => {
  it("全部校验通过应返回 Right", () => {
    const result = createUser({ name: "Alice", age: 25 });
    assert.ok(result instanceof Right);
    assert.deepEqual(result.getOrElse({}), { name: "Alice", age: 25 });
  });

  it("name 校验失败应返回 Left", () => {
    const result = createUser({ name: "", age: 25 });
    assert.ok(result instanceof Left);
  });

  it("age 校验失败应返回 Left", () => {
    const result = createUser({ name: "Bob", age: 15 });
    assert.ok(result instanceof Left);
  });
});
