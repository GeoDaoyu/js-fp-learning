// ==========================================
// Week 08 · Day 1: Monad 概念 & 基础实现
// ==========================================
import { describe, it, expect } from "vitest";


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
    return new Identity(fn(this._value));
  }

  chain(fn) {
    return fn(this._value);
  }

  getValue() {
    return this._value;
  }
}

// 练习2: map vs chain 的区别
// 用具体例子来对比两者行为

// 2a: 分别用 map 和 chain 处理同一个函数，观察结果差异
function demonstrateMapVsChain() {
  // TODO: 分别用 map 和 chain 处理同一个函数 (x) => Identity.of(x * 2)，观察结果差异
}

// 练习3: Monad 三定律（写在注释里）
//
// 3a. 左单位律: of(a).chain(f) === f(a)
//     TODO: 思考并写下你的理解
//
// 3b. 右单位律: m.chain(of) === m
//     TODO: 思考并写下你的理解
//
// 3c. 结合律: m.chain(f).chain(g) === m.chain(x => f(x).chain(g))
//     TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Identity Monad", () => {
  it("of 应创建 Identity 实例", () => {
    expect(Identity.of(5) instanceof Identity).toBe(true);
  });

  it("map 应变换值", () => {
    const result = Identity.of(5)
      .map((x) => x + 1)
      .map((x) => x * 2);
    expect(result.getValue()).toBe(12);
  });

  it("chain 应变换并展平", () => {
    const result = Identity.of(5)
      .chain((x) => Identity.of(x * 2))
      .chain((x) => Identity.of(x + 1));
    expect(result.getValue()).toBe(11);
  });

  it("map 产生嵌套，chain 展平", () => {
    const mapped = Identity.of(5).map((x) => Identity.of(x * 2));
    // map 不会展平: Identity(Identity(10))
    expect(mapped.getValue() instanceof Identity).toBe(true);

    const chained = Identity.of(5).chain((x) => Identity.of(x * 2));
    // chain 展平: Identity(10)
    expect(chained.getValue()).toBe(10);
  });
});

describe("练习2: map vs chain", () => {
  it("应正确展示差异", () => {
    const { mapResult, chainResult } = demonstrateMapVsChain();
    expect(mapResult instanceof Identity).toBe(true);
    expect(chainResult instanceof Identity).toBe(true);
    // map 结果嵌套了一层
    expect(mapResult.getValue() instanceof Identity).toBe(true);
    // chain 结果已展平
    expect(typeof chainResult.getValue()).toBe("number");
  });
});
