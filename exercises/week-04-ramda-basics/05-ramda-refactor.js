// ==========================================
// Week 04 · Day 5: Ramda 重构旧代码 + 周复盘
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 用 Ramda 重构 reduce 实现 map 和 filter
// 之前我们手写了 myMap / myFilter，现在用 Ramda 的 reduce 重写

// 1a: myMapR(arr, fn) — 用 R.reduce 实现 map
function myMapR(arr, fn) {
  // TODO
}

// 1b: myFilterR(arr, predicate) — 用 R.reduce 实现 filter
function myFilterR(arr, predicate) {
  // TODO
}

// 练习2: 用 Ramda pipe 重构数据处理管道
// 以前我们写 arr.filter(...).map(...).reduce(...)
// 现在用 R.pipe 实现等价逻辑

const orders = [
  { category: "electronics", amount: 300 },
  { category: "books", amount: 50 },
  { category: "electronics", amount: 150 },
  { category: "clothing", amount: 80 },
  { category: "books", amount: 30 },
  { category: "clothing", amount: 120 },
];

// 2: electronicsRevenue — 统计电子产品的总收入
// 要求: 用 R.pipe 串联，不用链式方法
function electronicsRevenue(orderList) {
  // TODO: 用 R.pipe
}

// 练习3: 用 Ramda 重构闭包记忆化
// 用 Ramda 的工具（R.has, R.identity 等）简化之前的 memoize

function memoizeR(fn) {
  // TODO: 用闭包 + 对象作为缓存
}

// 练习4: Ramda 使用习惯总结（写在注释里）
//
// 4a. 经过本周练习，Ramda 相比原生 JS 在哪些场景优势最明显？
//
// TODO: 回答

// 4b. Ramda 有哪些你觉得不直观或需要适应的地方？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 重构 map / filter", () => {
  it("myMapR 应等价于 Array.map", () => {
    assert.deepEqual(myMapR([1, 2, 3], R.multiply(2)), [2, 4, 6]);
  });

  it("myFilterR 应等价于 Array.filter", () => {
    assert.deepEqual(myFilterR([1, 2, 3, 4], (x) => x % 2 === 0), [2, 4]);
  });
});

describe("练习2: 重构管道", () => {
  it("electronicsRevenue 应统计电子产品总收入", () => {
    assert.equal(electronicsRevenue(orders), 450);
  });
});

describe("练习3: 重构 memoize", () => {
  it("应缓存计算结果", () => {
    let calls = 0;
    const fn = memoizeR((x) => {
      calls++;
      return x * 2;
    });
    assert.equal(fn(5), 10);
    assert.equal(calls, 1);
    assert.equal(fn(5), 10);
    assert.equal(calls, 1); // 缓存命中
  });
});
