// ==========================================
// Week 01 · Day 5: reduce 进阶 + 本周综合复盘
// ==========================================
import { describe, it, expect } from "vitest";


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
  return orderList.reduce((grouped, order) => {
    return {
      ...grouped,
      [order.category]: [...(grouped[order.category] || []), order],
    };
  }, {});
}

// 练习2: reduce 实现分类汇总 — 统计每个 category 的总金额
// 期望: { electronics: 450, books: 80, clothing: 200 }
function totalByCategory(orderList) {
  return orderList.reduce((grouped, order) => {
    return {
      ...grouped,
      [order.category]: (grouped[order.category] || 0) + order.amount,
    };
  }, {});
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
    expect(grouped.electronics.length).toBe(2);
    expect(grouped.books.length).toBe(2);
    expect(grouped.clothing.length).toBe(2);
    expect(grouped.electronics[0].amount).toBe(300);
  });
});

describe("练习2: reduce 分类汇总", () => {
  it("应正确统计每个分类的总金额", () => {
    const totals = totalByCategory(orders);
    expect(totals).toEqual({ electronics: 450, books: 80, clothing: 200 });
  });
});

describe("练习3: 综合 filter + map + reduce", () => {
  it("应统计电子产品的总金额为 450", () => {
    expect(totalElectronics(orders)).toBe(450);
  });
});

describe("练习4: 用 reduce 实现 map", () => {
  it("功能应与 Array.map 一致", () => {
    expect(myMap([1, 2, 3], (x) => x * 2)).toEqual([2, 4, 6],);
    expect(myMap(["a", "b"], (x) => x.toUpperCase())).toEqual(["A", "B"],);
  });
});

describe("练习5: 用 reduce 实现 filter", () => {
  it("功能应与 Array.filter 一致", () => {
    expect(myFilter([1, 2, 3, 4], (x) => x % 2 === 0)).toEqual([2, 4],);
    expect(myFilter(["a", "bb", "ccc"], (x) => x.length > 1)).toEqual(["bb", "ccc"],);
  });
});
