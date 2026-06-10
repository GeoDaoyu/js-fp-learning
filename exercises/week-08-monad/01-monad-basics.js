// ==========================================
// Week 08 · Day 1: Monad 概念 & 基础实现
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 实现 Identity Monad
// Monad = Functor + chain (flatMap) + of
// Identity 是最简单的 Monad：就是一个带 map 和 chain 的容器
//
// 接口:
//   Identity.of(value)  — 创建 Monad
//   map(fn)             — 变换值（同 Functor）
//   chain(fn)           — 变换值并"展平"（fn 返回 Identity）
//   getValue()          — 取值

class Identity {
  constructor(value) {
    this._value = value;
  }

  static of(value) {
    return new Identity(value);
  }

  map(fn) {
    // TODO: 返回新的 Identity(fn(this._value))
  }

  chain(fn) {
    // TODO: fn 返回 Identity，直接返回那个 Identity（展平）
    // 对比: map 会再包一层 Identity，chain 不包
  }

  getValue() {
    return this._value;
  }
}

// 练习2: map vs chain 的区别
// 用具体例子来对比两者行为

// 2a: 分别用 map 和 chain 处理同一个函数，观察结果差异
function demonstrateMapVsChain() {
  // TODO:
  // 定义 fn = x => Identity.of(x * 2)
  // 比较 Identity.of(5).map(fn) 和 Identity.of(5).chain(fn)
  // 返回 { mapResult: ..., chainResult: ... }
  // 提示: map 得到 Identity(Identity(10))；chain 得到 Identity(10)
}

// 练习3: Monad 三定律（写在注释里）
//
// 3a. 左单位律: of(a).chain(f) === f(a)
//
// 3b. 右单位律: m.chain(of) === m
//
// 3c. 结合律: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))
//
// TODO: 用自然语言解释每个定律的含义

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Identity Monad", () => {
  it("of 应创建 Identity 实例", () => {
    assert.ok(Identity.of(5) instanceof Identity);
  });

  it("map 应变换值", () => {
    const result = Identity.of(5)
      .map((x) => x + 1)
      .map((x) => x * 2);
    assert.equal(result.getValue(), 12);
  });

  it("chain 应变换并展平", () => {
    const result = Identity.of(5)
      .chain((x) => Identity.of(x * 2))
      .chain((x) => Identity.of(x + 1));
    assert.equal(result.getValue(), 11);
  });

  it("map 产生嵌套，chain 展平", () => {
    const mapped = Identity.of(5).map((x) => Identity.of(x * 2));
    // map 不会展平: Identity(Identity(10))
    assert.ok(mapped.getValue() instanceof Identity);

    const chained = Identity.of(5).chain((x) => Identity.of(x * 2));
    // chain 展平: Identity(10)
    assert.equal(chained.getValue(), 10);
  });
});

describe("练习2: map vs chain", () => {
  it("应正确展示差异", () => {
    const { mapResult, chainResult } = demonstrateMapVsChain();
    assert.ok(mapResult instanceof Identity);
    assert.ok(chainResult instanceof Identity);
    // map 结果嵌套了一层
    assert.ok(mapResult.getValue() instanceof Identity);
    // chain 结果已展平
    assert.equal(typeof chainResult.getValue(), "number");
  });
});
