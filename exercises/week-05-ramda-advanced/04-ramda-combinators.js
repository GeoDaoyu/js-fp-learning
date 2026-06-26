// ==========================================
// Week 05 · Day 4: Ramda 函数式工具合集
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it, expect } from "vitest";


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
  // TODO: 使用 R.converge 计算每个订单的总价值 total = price * quantity
}

// 1b: allTotals — 给所有订单添加 total 字段
function allTotals(orderList) {
  // TODO: 使用 R.map 给所有订单添加 total 字段
}

// 练习2: R.useWith — 参数预处理
// useWith(fn, [transformer1, transformer2])(a, b) → fn(transformer1(a), transformer2(b))

// 2a: compareByTotal — 比较两个订单的总价值
// compareByTotal(orderA, orderB) → orderA.price * orderA.quantity > orderB.price * orderB.quantity
function compareByTotal(orderA, orderB) {
  // TODO: 使用 R.useWith 比较两个订单的总价值
}

// 练习3: R.applySpec — 批量从同一数据派生多个值

// 3a: orderSummary — 从单个订单生成摘要对象
// { productName: product, unitPrice: price, quantity, lineTotal: price * quantity }
function orderSummary(order) {
  // TODO: 使用 R.applySpec 从单个订单生成摘要对象
}

// 3b: summarizeAll — 给所有订单生成摘要
function summarizeAll(orderList) {
  // TODO: 使用 R.map 给所有订单生成摘要
}

// 练习4: R.evolve — 深度转换对象
// 对orders做统计: 总订单数, 总商品数(quantity加总), 总收入

// 4a: salesReport(orderList) — 生成销售报告
// { orderCount, totalItems, totalRevenue }
function salesReport(orderList) {
  // TODO: 使用 R.applySpec / R.pipe 生成销售报告 { orderCount, totalItems, totalRevenue }
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: converge", () => {
  it("addTotalValue 应计算 total", () => {
    const result = addTotalValue(orders[0]);
    expect(result.total).toBe(8000);
    expect(result.product).toBe("Laptop");
  });

  it("allTotals 应给所有订单添加 total", () => {
    const result = allTotals(orders);
    expect(result[1].total).toBe(450);
    expect(result[2].total).toBe(300);
  });
});

describe("练习2: useWith", () => {
  it("compareByTotal 应正确比较", () => {
    expect(compareByTotal(orders[0], orders[1])).toBe(true); // 8000 > 450
    expect(compareByTotal(orders[2], orders[3])).toBe(false); // 300 < 800
  });
});

describe("练习3: applySpec", () => {
  it("orderSummary 应生成摘要", () => {
    const result = orderSummary(orders[0]);
    expect(result).toEqual({
      productName: "Laptop",
      unitPrice: 8000,
      quantity: 1,
      lineTotal: 8000,
    });
  });

  it("summarizeAll 应生成所有摘要", () => {
    const result = summarizeAll(orders);
    expect(result.length).toBe(4);
    expect(result[0].lineTotal).toBe(8000);
  });
});

describe("练习4: evolve 综合", () => {
  it("salesReport 应生成报告", () => {
    const report = salesReport(orders);
    expect(report).toEqual({
      orderCount: 4,
      totalItems: 11, // 1+3+5+2
      totalRevenue: 9550, // 8000*1+150*3+60*5+400*2
    });
  });
});
