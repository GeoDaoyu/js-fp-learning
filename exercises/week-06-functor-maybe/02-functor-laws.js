// ==========================================
// Week 06 · Day 2: 函子两大定律 + 代码验证
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 在这里定义你的 Container / Functor（如果你 Day 1 的 Container 需要复用的话）
// 要求 Container 有 of() 静态方法和 map() 方法

class Container {
  constructor(value) {
    this._value = value;
  }

  static of(value) {
    return new Container(value);
  }

  map(fn) {
    return new Container(fn(this._value));
  }

  getValue() {
    return this._value;
  }
}

// 练习1: 验证恒等律 (Identity Law)
// 定律: functor.map(x => x) === functor
// 即: 对 Functor 应用恒等函数，应返回等价的 Functor（不是同一个引用，而是值相等）

function verifyIdentityLaw(functor) {
  // TODO: 验证恒等律 — functor.map(x => x) 应与原 functor 等价（值相等）
}

// 练习2: 验证组合律 (Composition Law)
// 定律: functor.map(x => f(g(x))) === functor.map(g).map(f)
// 即: 复合函数 map 等价于两次 map

function verifyCompositionLaw(functor, f, g) {
  // TODO: 验证复合律 — functor.map(x => f(g(x))) 应等于 functor.map(g).map(f)
}

// 练习3: 为您的 Container 验证两个定律
// 在下面用具体的 Container 实例和函数验证

function runLawTests() {
  // TODO: 用 Container.of(5) 实例验证两个定律，返回 { identity: boolean, composition: boolean }
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 恒等律验证", () => {
  it("Container.of(5) 应满足恒等律", () => {
    expect(verifyIdentityLaw(Container.of(5))).toBe(true);
  });

  it("Container.of('hello') 应满足恒等律", () => {
    expect(verifyIdentityLaw(Container.of("hello"))).toBe(true);
  });
});

describe("练习2: 组合律验证", () => {
  it("应满足组合律", () => {
    const f = (x) => x * 2;
    const g = (x) => x + 1;
    expect(verifyCompositionLaw(Container.of(3), f, g)).toBe(true);
  });

  it("另一组函数也应满足", () => {
    const f = (x) => x.toUpperCase();
    const g = (x) => x + "!";
    expect(verifyCompositionLaw(Container.of("hi"), f, g)).toBe(true);
  });
});

describe("练习3: 综合验证", () => {
  it("runLawTests 应返回两个 true", () => {
    const result = runLawTests();
    expect(result).toEqual({ identity: true, composition: true });
  });
});
