// ==========================================
// Week 02 · Day 2: 闭包实战 — 记忆函数（Memoization）
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: memoize — 缓存计算结果
// 接收一个单参数函数 fn，返回具有相同功能的函数
// 当同一个参数再次传入时，直接返回缓存结果，不重新调用 fn
function memoize(fn) {
  const map = new Map();
  return (key) => {
    if (!map.has(key)) map.set(key, fn(key));
    return map.get(key);
  };
}

// 练习2: memoizeWith — 自定义缓存 key
// 接收一个 resolver（key 生成器）和一个函数 fn
// 用 resolver(...args) 生成缓存 key，其余逻辑同 memoize
// 支持多参数函数
function memoizeWith(resolver, fn) {
  const map = new Map();
  return (...args) => {
    const key = resolver(...args);
    if (!map.has(key)) map.set(key, fn(...args));
    return map.get(key);
  };
}

// 练习3: 闭包的优缺点（写在注释里）
//
// 3a. 闭包实现记忆化（memoization）用到了闭包的什么特性？
//
// 闭包能使内部函数持久持有外层作用域的变量（缓存 Map），
// 在多次调用之间保持状态不丢失，这是实现记忆化的基础。

// 3b. 使用闭包可能带来什么问题？（至少写两点）
//
// ① 内存开销：闭包持有的缓存随调用次数增长，若无限缓存可能占用大量内存
// ② 难以测试：闭包内的私有状态外部无法直接访问或重置，单元测试不便
// ③ 意外共享：若闭包被多处引用，可能导致意外的状态共享

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

    assert.equal(double(3), 6);
    assert.equal(callCount, 1);
    assert.equal(double(3), 6);
    assert.equal(callCount, 1); // 缓存命中，不增加调用次数
    assert.equal(double(4), 8);
    assert.equal(callCount, 2); // 新参数，调用一次
    assert.equal(double(3), 6);
    assert.equal(callCount, 2); // 旧参数，缓存命中
  });

  it("缓存应私有，外部无法访问", () => {
    const fn = memoize((x) => x);
    assert.equal(typeof fn.cache, "undefined");
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

    assert.equal(add(1, 2), 3);
    assert.equal(callCount, 1);
    assert.equal(add(1, 2), 3);
    assert.equal(callCount, 1); // 缓存命中
    assert.equal(add(2, 3), 5);
    assert.equal(callCount, 2); // 新参数
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

    assert.equal(fn(1, 2), 3);
    assert.equal(callCount, 1);
    assert.equal(fn(5, 6), 3); // 缓存命中（key 相同），返回错误的缓存值
    assert.equal(callCount, 1);
  });
});
