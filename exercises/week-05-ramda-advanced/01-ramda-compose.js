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
  return R.pipe(
    R.filter(R.propEq("electronics", "category")),
    R.filter(R.propSatisfies(R.gte(R.__, 4.5), "rating")),
    R.map(R.prop("name")),
    R.map(R.toUpper),
  )(productList);
}

// 1b: categoryStats — 统计每个分类的商品数量
// 期望: { electronics: 3, books: 2, clothing: 1 }
function categoryStats(productList) {
  return R.countBy(R.prop("category"), productList);
}

// 练习2: R.converge — 分叉函数
// converge(convergingFn, [branch1, branch2, ...])(data)
// 先对各分支分别处理 data，再将结果合并

// 2a: priceRange — 返回最高价格与最低价格的差值
// 提示: R.converge(R.subtract, [maxFn, minFn])
function priceRange(productList) {
  return R.pipe(
    R.map(R.prop("price")),
    R.converge(R.subtract, [
      R.reduce(R.max, -Infinity),
      R.reduce(R.min, Infinity),
    ]),
  )(productList);
}

// 2b: avgRating — 计算平均评分
// 提示: R.converge(R.divide, [R.sum, R.length])
const avgRating = R.converge(R.divide, [R.sum, R.length]);

// 练习3: 对比 Ramda pipe 与手写 pipe（写在注释里）
//
// 3a. R.pipe 与我们在 Week 03 手写的 pipe 有什么关键区别？
//
// R.pipe 内置柯里化：每一步的函数如果部分应用参数后返回函数，pipe 会自动
// 等待完整数据传入才真正执行。所以可以写 R.map(R.prop("price")) 这种"预填
// 逻辑、延迟数据"的风格，数据作为最后一个参数在调用 pipe 时一次注入。
//
// 手写 pipe 不具备这个能力，每一步必须接收上一步的完整结果，无法自动处理
// 部分应用。要写同样的逻辑只能靠匿名函数包装：arr => arr.map(x => x.price)。

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
