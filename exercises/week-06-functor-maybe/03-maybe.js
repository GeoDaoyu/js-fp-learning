// ==========================================
// Week 06 · Day 3: Maybe 函子 — Just / Nothing
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 实现 Maybe 函子
// Maybe 有两个子类型: Just (有值) 和 Nothing (空值)
// - Maybe.of(value) → value 为 null/undefined 时返回 Nothing()，否则返回 Just(value)
// - Just(value).map(fn) → Just(fn(value))
// - Nothing().map(fn) → Nothing()
// - 需要实现 getOrElse(defaultVal) 来取值（Just 返回值，Nothing 返回 defaultVal）

class Maybe {
  static of(value) {
    // TODO: null/undefined → Nothing, 否则 → Just
  }

  // 子类自己实现 map 和 getOrElse
}

class Just extends Maybe {
  // TODO: constructor, map, getOrElse
}

class Nothing extends Maybe {
  // TODO: constructor, map, getOrElse
}

// 练习2: Maybe 基本使用

// 2a: safeDivide(a, b) — 安全除法，b 为 0 时返回 Nothing
function safeDivide(a, b) {
  // TODO: 返回 Maybe
}

// 2b: safeGet(obj, key) — 安全取值，属性不存在时返回 Nothing
function safeGet(obj, key) {
  // TODO: 返回 Maybe
}

// 练习3: Maybe 解决什么问题？（写在注释里）
//
// 3a. Maybe 如何帮助我们消除 null/undefined 检查？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Maybe 函子", () => {
  it("Maybe.of(非空值) 应返回 Just", () => {
    const result = Maybe.of(42);
    assert.ok(result instanceof Just);
    assert.equal(result.getOrElse(0), 42);
  });

  it("Maybe.of(null) 应返回 Nothing", () => {
    assert.ok(Maybe.of(null) instanceof Nothing);
  });

  it("Maybe.of(undefined) 应返回 Nothing", () => {
    assert.ok(Maybe.of(undefined) instanceof Nothing);
  });

  it("Just.map 应正常转换", () => {
    const result = Maybe.of(5)
      .map((x) => x * 2)
      .map((x) => x + 1);
    assert.equal(result.getOrElse(0), 11);
  });

  it("Nothing.map 应安全跳过", () => {
    const result = Maybe.of(null)
      .map((x) => x * 2)
      .map((x) => x + 1);
    assert.equal(result.getOrElse(99), 99);
  });

  it("链式调用中 Nothing 不抛错", () => {
    const result = Maybe.of(10)
      .map((x) => null) // 返回 null，但 map 不会把它变成 Nothing
      .map((x) => x.toString());
    // map 只是应用函数，不会检查返回值是否为 null
    // 这个测试验证 map 的基本行为
    assert.equal(result.getOrElse("fallback"), "null");
  });
});

describe("练习2: Maybe 基本使用", () => {
  it("safeDivide 正常除法", () => {
    assert.equal(safeDivide(10, 2).getOrElse(0), 5);
  });

  it("safeDivide 除零应返回 Nothing", () => {
    assert.ok(safeDivide(10, 0) instanceof Nothing);
  });

  it("safeGet 存在属性", () => {
    assert.equal(safeGet({ name: "Alice" }, "name").getOrElse("unknown"), "Alice");
  });

  it("safeGet 不存在属性", () => {
    assert.ok(safeGet({ name: "Alice" }, "age") instanceof Nothing);
    assert.equal(safeGet({ name: "Alice" }, "age").getOrElse(0), 0);
  });
});
