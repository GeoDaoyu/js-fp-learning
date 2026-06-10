// ==========================================
// Week 04 · Day 3: Ramda 数组分组、排序、聚合
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

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
  // TODO: 用 R.groupBy
}

// 练习2: R.sort / R.sortBy — 排序

// 2a: sortByAmount — 按 amount 升序排列
function sortByAmount(orderList) {
  // TODO: 用 R.sortBy
}

// 2b: sortByAmountDesc — 按 amount 降序排列
function sortByAmountDesc(orderList) {
  // TODO: 用 R.sort 或 R.sortBy + R.descend
}

// 练习3: R.uniq / R.uniqBy — 去重

// 3a: uniqueCategories — 返回所有不重复的 category
function uniqueCategories(orderList) {
  // TODO: 用 R.uniq + map 或 R.uniqBy
}

// 练习4: R.partition — 根据谓词一分为二
// 返回 [满足条件的, 不满足条件的]

// 4a: splitHighValue — 将 >= 100 的订单和 < 100 的订单分开
function splitHighValue(orderList) {
  // TODO: 用 R.partition
}

// 练习5: R.zip / R.zipObj — 合并数组
// 5a: makeDict — keys 和 values 两个数组合并为对象
function makeDict(keys, values) {
  // TODO: 用 R.zipObj
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: groupBy", () => {
  it("应按 category 正确分组", () => {
    const grouped = groupByCat(orders);
    assert.equal(grouped.electronics.length, 2);
    assert.equal(grouped.books.length, 2);
    assert.equal(grouped.clothing.length, 2);
  });
});

describe("练习2: sort / sortBy", () => {
  it("sortByAmount 应按 amount 升序", () => {
    const result = sortByAmount(orders);
    assert.deepEqual(
      result.map((o) => o.amount),
      [30, 50, 80, 120, 150, 300],
    );
  });

  it("sortByAmountDesc 应按 amount 降序", () => {
    const result = sortByAmountDesc(orders);
    assert.deepEqual(
      result.map((o) => o.amount),
      [300, 150, 120, 80, 50, 30],
    );
  });
});

describe("练习3: uniq", () => {
  it("uniqueCategories 应返回不重复分类", () => {
    const result = uniqueCategories(orders);
    assert.deepEqual(result.sort(), ["books", "clothing", "electronics"]);
  });
});

describe("练习4: partition", () => {
  it("splitHighValue 应分开高低金额订单", () => {
    const [high, low] = splitHighValue(orders);
    assert.equal(high.length, 3);
    assert.equal(low.length, 3);
    high.forEach((o) => assert.ok(o.amount >= 100));
    low.forEach((o) => assert.ok(o.amount < 100));
  });
});

describe("练习5: zipObj", () => {
  it("makeDict 应创建对象", () => {
    assert.deepEqual(makeDict(["a", "b", "c"], [1, 2, 3]), {
      a: 1,
      b: 2,
      c: 3,
    });
  });
});
