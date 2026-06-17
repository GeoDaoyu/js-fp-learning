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
    return value == null ? new Nothing() : new Just(value);
  }
}

class Just extends Maybe {
  constructor(value) {
    super();
    this._value = value;
  }

  map(fn) {
    return new Just(fn(this._value));
  }

  getOrElse(_default) {
    return this._value;
  }
}

class Nothing extends Maybe {
  map(_fn) {
    return this;
  }

  getOrElse(defaultVal) {
    return defaultVal;
  }
}

// 练习2: Maybe 基本使用

// 2a: safeDivide(a, b) — 安全除法，b 为 0 时返回 Nothing
function safeDivide(a, b) {
  return b === 0 ? Maybe.of(null) : Maybe.of(a / b);
}

// 2b: safeGet(obj, key) — 安全取值，属性不存在时返回 Nothing
function safeGet(obj, key) {
  return Maybe.of(obj[key]);
}

// 练习3: Maybe 解决什么问题？（写在注释里）
//
// 3a. Maybe 如何帮助我们消除 null/undefined 检查？
//
// Maybe 把 null/undefined 的判断逻辑内化到了 map 方法中：
//   - Just.map(fn)  → 执行 fn 并返回新的 Just（正常路径）
//   - Nothing.map(fn) → 直接返回 Nothing，跳过 fn（短路路径）
//
// 这样一来，调用方不需要在每个步骤写 `if (x != null)`，只要正常链式 .map() 即可。
// 空值会沿着链自动短路，最终通过 getOrElse(defaultVal) 统一兜底。
// 本质上是把散布在业务逻辑中的空值判断集中到了一个类型里。

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
      .map((x) => String(x));
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
