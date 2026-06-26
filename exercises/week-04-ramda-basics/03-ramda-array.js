// ==========================================
// Week 04 · Day 3: Ramda 数组分组、排序、聚合
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it, expect } from "vitest";


const orders = [
  { id: 1, category: "electronics", amount: 300 },
  { id: 2, category: "books", amount: 50 },
  { id: 3, category: "electronics", amount: 150 },
  { id: 4, category: "clothing", amount: 80 },
  { id: 5, category: "books", amount: 30 },
  { id: 6, category: "clothing", amount: 120 },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: R.groupBy — 按 category 分组
function groupByCat(orderList) {
  // TODO: 用 R.groupBy 按 category 分组
}

// 练习2: R.sort / R.sortBy — 排序

// 2a: sortByAmount — 按 amount 升序排列
function sortByAmount(orderList) {
  // TODO: 用 R.sortBy 按 amount 升序排列
}

// 2b: sortByAmountDesc — 按 amount 降序排列
function sortByAmountDesc(orderList) {
  // TODO: 用 R.sort 和 R.descend 按 amount 降序排列
}

// 练习3: R.uniq / R.uniqBy — 去重

// 3a: uniqueCategories — 返回所有不重复的 category
function uniqueCategories(orderList) {
  // TODO: 用 R.uniq 和 R.map 返回不重复的 category
}

// 练习4: R.partition — 根据谓词一分为二
// 返回 [满足条件的, 不满足条件的]

// 4a: splitHighValue — 将 >= 100 的订单和 < 100 的订单分开
function splitHighValue(orderList) {
  // TODO: 用 R.partition 将订单按 amount >= 100 分开
}

// 练习5: R.zip / R.zipObj — 合并数组
// 5a: makeDict — keys 和 values 两个数组合并为对象
function makeDict(keys, values) {
  // TODO: 用 R.zipObj 将 keys 和 values 合并为对象
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: groupBy", () => {
  it("应按 category 正确分组", () => {
    const grouped = groupByCat(orders);
    expect(grouped.electronics.length).toBe(2);
    expect(grouped.books.length).toBe(2);
    expect(grouped.clothing.length).toBe(2);
  });
});

describe("练习2: sort / sortBy", () => {
  it("sortByAmount 应按 amount 升序", () => {
    const result = sortByAmount(orders);
    expect(result.map((o) => o.amount)).toEqual([30, 50, 80, 120, 150, 300],);
  });

  it("sortByAmountDesc 应按 amount 降序", () => {
    const result = sortByAmountDesc(orders);
    expect(result.map((o) => o.amount)).toEqual([300, 150, 120, 80, 50, 30],);
  });
});

describe("练习3: uniq", () => {
  it("uniqueCategories 应返回不重复分类", () => {
    const result = uniqueCategories(orders);
    expect(result.sort()).toEqual(["books", "clothing", "electronics"]);
  });
});

describe("练习4: partition", () => {
  it("splitHighValue 应分开高低金额订单", () => {
    const [high, low] = splitHighValue(orders);
    expect(high.length).toBe(3);
    expect(low.length).toBe(3);
    high.forEach((o) => expect(o.amount >= 100).toBe(true));
    low.forEach((o) => expect(o.amount < 100).toBe(true));
  });
});

describe("练习5: zipObj", () => {
  it("makeDict 应创建对象", () => {
    expect(makeDict(["a", "b", "c"], [1, 2, 3])).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });
});
