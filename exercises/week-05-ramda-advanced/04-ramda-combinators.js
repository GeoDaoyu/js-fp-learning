// ==========================================
// Week 05 · Day 4: Ramda 函数式工具合集
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const orders = [
  { id: 1, product: "Laptop", price: 8000, quantity: 1 },
  { id: 2, product: "Mouse", price: 150, quantity: 3 },
  { id: 3, product: "Book", price: 60, quantity: 5 },
  { id: 4, product: "Keyboard", price: 400, quantity: 2 },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: R.converge — 分叉再合流

// 1a: totalValue — 计算每个订单的总价值 { id, product, total: price * quantity }
// 要求: 用 R.converge 组合 price 和 quantity
function addTotalValue(order) {
  // TODO: 返回 { ...order, total: price * quantity }
  // 提示: R.converge(R.assoc('total'), [R.prop('price'), R.prop('quantity')])
}

// 1b: allTotals — 给所有订单添加 total 字段
function allTotals(orderList) {
  // TODO: 用 R.map(addTotalValue)
}

// 练习2: R.useWith — 参数预处理
// useWith(fn, [transformer1, transformer2])(a, b) → fn(transformer1(a), transformer2(b))

// 2a: compareByTotal — 比较两个订单的总价值
// compareByTotal(orderA, orderB) → orderA.price * orderA.quantity > orderB.price * orderB.quantity
function compareByTotal(orderA, orderB) {
  // TODO: 用 R.useWith
}

// 练习3: R.applySpec — 批量从同一数据派生多个值

// 3a: orderSummary — 从单个订单生成摘要对象
// { productName: product, unitPrice: price, quantity, lineTotal: price * quantity }
function orderSummary(order) {
  // TODO: 用 R.applySpec
}

// 3b: summarizeAll — 给所有订单生成摘要
function summarizeAll(orderList) {
  // TODO: 用 R.map(orderSummary)
}

// 练习4: R.evolve — 深度转换对象
// 对orders做统计: 总订单数, 总商品数(quantity加总), 总收入

// 4a: salesReport(orderList) — 生成销售报告
// { orderCount, totalItems, totalRevenue }
function salesReport(orderList) {
  // TODO
  // 提示: 可结合 R.applySpec 和 R.pipe
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: converge", () => {
  it("addTotalValue 应计算 total", () => {
    const result = addTotalValue(orders[0]);
    assert.equal(result.total, 8000);
    assert.equal(result.product, "Laptop");
  });

  it("allTotals 应给所有订单添加 total", () => {
    const result = allTotals(orders);
    assert.equal(result[1].total, 450);
    assert.equal(result[2].total, 300);
  });
});

describe("练习2: useWith", () => {
  it("compareByTotal 应正确比较", () => {
    assert.equal(compareByTotal(orders[0], orders[1]), true); // 8000 > 450
    assert.equal(compareByTotal(orders[2], orders[3]), false); // 300 < 800
  });
});

describe("练习3: applySpec", () => {
  it("orderSummary 应生成摘要", () => {
    const result = orderSummary(orders[0]);
    assert.deepEqual(result, {
      productName: "Laptop",
      unitPrice: 8000,
      quantity: 1,
      lineTotal: 8000,
    });
  });

  it("summarizeAll 应生成所有摘要", () => {
    const result = summarizeAll(orders);
    assert.equal(result.length, 4);
    assert.equal(result[0].lineTotal, 8000);
  });
});

describe("练习4: evolve 综合", () => {
  it("salesReport 应生成报告", () => {
    const report = salesReport(orders);
    assert.deepEqual(report, {
      orderCount: 4,
      totalItems: 11, // 1+3+5+2
      totalRevenue: 9250, // 8000+450+300+800
    });
  });
});
