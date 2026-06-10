// ==========================================
// Week 01 · Day 5: reduce 进阶 + 本周综合复盘
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const orders = [
  { category: "electronics", amount: 300 },
  { category: "books", amount: 50 },
  { category: "electronics", amount: 150 },
  { category: "clothing", amount: 80 },
  { category: "books", amount: 30 },
  { category: "clothing", amount: 120 },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: reduce 实现数组分组 — 按 category 分组
// 期望: { electronics: [{...}, {...}], books: [{...}, {...}], clothing: [{...}, {...}] }
function groupByCategory(orderList) {
  const categories = orderList.map((order) => order.category);
  const uniqueCategories = Array.from(new Set(categories));
  const initial = Object.fromEntries(uniqueCategories.map((v) => [v, []]));
  return orderList.reduce((grouped, order) => {
    return {
      ...grouped,
      [order.category]: [...grouped[order.category], order],
    };
  }, initial);
}

// 练习2: reduce 实现分类汇总 — 统计每个 category 的总金额
// 期望: { electronics: 450, books: 80, clothing: 200 }
function totalByCategory(orderList) {
  const categories = orderList.map((order) => order.category);
  const uniqueCategories = Array.from(new Set(categories));
  const initial = Object.fromEntries(uniqueCategories.map((v) => [v, []]));
  return orderList.reduce((grouped, order) => {
    return {
      ...grouped,
      [order.category]: +grouped[order.category] + order.amount,
    };
  }, initial);
}

// 练习3: 综合题 — 筛选→转换→聚合 全链路 FP 写法
// 需求: 统计所有电子产品（electronics）的总金额
// 要求: 用 filter + map + reduce 链式处理
function totalElectronics(orderList) {
  return orderList
    .filter((order) => order.category === "electronics")
    .map((order) => order.amount)
    .reduce((total, amount) => total + amount, 0);
}

// 练习4: 用 reduce 实现 map
function myMap(arr, fn) {
  return arr.reduce((acc, v) => [...acc, fn(v)], []);
}

// 练习5: 用 reduce 实现 filter
function myFilter(arr, predicate) {
  return arr.reduce((acc, v) => (predicate(v) ? [...acc, v] : [...acc]), []);
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: reduce 数组分组", () => {
  it("应按 category 正确分组", () => {
    const grouped = groupByCategory(orders);
    assert.equal(grouped.electronics.length, 2);
    assert.equal(grouped.books.length, 2);
    assert.equal(grouped.clothing.length, 2);
    assert.equal(grouped.electronics[0].amount, 300);
  });
});

describe("练习2: reduce 分类汇总", () => {
  it("应正确统计每个分类的总金额", () => {
    const totals = totalByCategory(orders);
    assert.deepEqual(totals, { electronics: 450, books: 80, clothing: 200 });
  });
});

describe("练习3: 综合 filter + map + reduce", () => {
  it("应统计电子产品的总金额为 450", () => {
    assert.equal(totalElectronics(orders), 450);
  });
});

describe("练习4: 用 reduce 实现 map", () => {
  it("功能应与 Array.map 一致", () => {
    assert.deepEqual(
      myMap([1, 2, 3], (x) => x * 2),
      [2, 4, 6],
    );
    assert.deepEqual(
      myMap(["a", "b"], (x) => x.toUpperCase()),
      ["A", "B"],
    );
  });
});

describe("练习5: 用 reduce 实现 filter", () => {
  it("功能应与 Array.filter 一致", () => {
    assert.deepEqual(
      myFilter([1, 2, 3, 4], (x) => x % 2 === 0),
      [2, 4],
    );
    assert.deepEqual(
      myFilter(["a", "bb", "ccc"], (x) => x.length > 1),
      ["bb", "ccc"],
    );
  });
});
