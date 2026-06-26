// ==========================================
// Week 02 · Day 2: 闭包实战 — 记忆函数（Memoization）
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: memoize — 缓存计算结果
// 接收一个单参数函数 fn，返回具有相同功能的函数
// 当同一个参数再次传入时，直接返回缓存结果，不重新调用 fn
function memoize(fn) {
  // TODO: 使用 Map 缓存单参数函数 fn 的计算结果，同一参数再次调用时直接返回缓存值
}

// 练习2: memoizeWith — 自定义缓存 key
// 接收一个 resolver（key 生成器）和一个函数 fn
// 用 resolver(...args) 生成缓存 key，其余逻辑同 memoize
// 支持多参数函数
function memoizeWith(resolver, fn) {
  // TODO: 使用 resolver 生成缓存 key，用 Map 缓存支持多参数函数 fn 的计算结果
}

// 练习3: 闭包的优缺点（写在注释里）
//
// 3a. 闭包实现记忆化（memoization）用到了闭包的什么特性？
//
// TODO: 思考并写下你的理解

// 3b. 使用闭包可能带来什么问题？（至少写两点）
//
// TODO: 思考并写下你的理解（至少写两点）

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: memoize", () => {
  it("应缓存单参数函数的结果", () => {
    let callCount = 0;
    const double = memoize((n) => {
      callCount++;
      return n * 2;
    });

    expect(double(3)).toBe(6);
    expect(callCount).toBe(1);
    expect(double(3)).toBe(6);
    expect(callCount).toBe(1); // 缓存命中，不增加调用次数
    expect(double(4)).toBe(8);
    expect(callCount).toBe(2); // 新参数，调用一次
    expect(double(3)).toBe(6);
    expect(callCount).toBe(2); // 旧参数，缓存命中
  });

  it("缓存应私有，外部无法访问", () => {
    const fn = memoize((x) => x);
    expect(typeof fn.cache).toBe("undefined");
  });
});

describe("练习2: memoizeWith", () => {
  it("应支持自定义 key 的多参数函数", () => {
    let callCount = 0;
    const add = memoizeWith(
      (a, b) => `${a},${b}`,
      (a, b) => {
        callCount++;
        return a + b;
      },
    );

    expect(add(1, 2)).toBe(3);
    expect(callCount).toBe(1);
    expect(add(1, 2)).toBe(3);
    expect(callCount).toBe(1); // 缓存命中
    expect(add(2, 3)).toBe(5);
    expect(callCount).toBe(2); // 新参数
  });

  it("resolver 应决定缓存粒度", () => {
    let callCount = 0;
    const fn = memoizeWith(
      (a, b) => "same-key", // 总是返回相同 key
      (a, b) => {
        callCount++;
        return a + b;
      },
    );

    expect(fn(1, 2)).toBe(3);
    expect(callCount).toBe(1);
    expect(fn(5, 6)).toBe(3); // 缓存命中（key 相同），返回错误的缓存值
    expect(callCount).toBe(1);
  });
});
