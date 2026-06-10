// ==========================================
// Week 05 · Day 1: Ramda compose / pipe 进阶
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const products = [
  { name: "Laptop", price: 8000, category: "electronics", rating: 4.5 },
  { name: "Mouse", price: 150, category: "electronics", rating: 4.0 },
  { name: "Book A", price: 60, category: "books", rating: 4.8 },
  { name: "T-shirt", price: 120, category: "clothing", rating: 3.5 },
  { name: "Book B", price: 45, category: "books", rating: 4.2 },
  { name: "Keyboard", price: 400, category: "electronics", rating: 4.7 },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 用 R.pipe 串联数据管道

// 1a: highRatedElectronics — 筛选评分 >= 4.5 的电子产品，返回名字大写
// 步骤: filter(category === 'electronics') → filter(rating >= 4.5) → map name → toUpperCase
function highRatedElectronics(productList) {
  // TODO: 用 R.pipe 实现
}

// 1b: categoryStats — 统计每个分类的商品数量
// 期望: { electronics: 3, books: 2, clothing: 1 }
function categoryStats(productList) {
  // TODO: 用 R.pipe + R.countBy 实现
}

// 练习2: R.converge — 分叉函数
// converge(convergingFn, [branch1, branch2, ...])(data)
// 先对各分支分别处理 data，再将结果合并

// 2a: priceRange — 返回最高价格与最低价格的差值
// 提示: R.converge(R.subtract, [maxFn, minFn])
function priceRange(productList) {
  // TODO
}

// 2b: avgRating — 计算平均评分
// 提示: R.converge(R.divide, [R.sum, R.length])
const avgRating = null; // TODO

// 练习3: 对比 Ramda pipe 与手写 pipe（写在注释里）
//
// 3a. R.pipe 与我们在 Week 03 手写的 pipe 有什么关键区别？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: R.pipe 管道", () => {
  it("highRatedElectronics 应筛选高分电子产品", () => {
    const result = highRatedElectronics(products);
    assert.deepEqual(result, ["LAPTOP", "KEYBOARD"]);
  });

  it("categoryStats 应正确统计", () => {
    assert.deepEqual(categoryStats(products), {
      electronics: 3,
      books: 2,
      clothing: 1,
    });
  });
});

describe("练习2: converge", () => {
  it("priceRange 应返回价差", () => {
    assert.equal(priceRange(products), 7955); // 8000 - 45
  });

  it("avgRating 应计算平均评分", () => {
    const ratings = [4, 5, 3, 4];
    assert.equal(avgRating(ratings), 4);
  });
});
