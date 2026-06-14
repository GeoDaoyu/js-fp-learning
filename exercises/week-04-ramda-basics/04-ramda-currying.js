// ==========================================
// Week 04 · Day 4: Ramda 自动柯里化实战
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const products = [
  { name: "Laptop", price: 8000, category: "electronics", inStock: true },
  { name: "Mouse", price: 150, category: "electronics", inStock: false },
  { name: "Book", price: 60, category: "books", inStock: true },
  { name: "T-shirt", price: 120, category: "clothing", inStock: true },
  { name: "Keyboard", price: 400, category: "electronics", inStock: true },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 利用 Ramda 自动柯里化创建专用过滤器

// 1a: inStockOnly — 筛选 inStock 为 true 的商品
const inStockOnly = R.filter(R.prop("inStock"));

// 1b: inCategory(category) — 筛选指定分类的商品
function inCategory(category) {
  return R.filter(R.propEq(category, "category"));
}

// 1c: priceAbove(min) — 筛选价格 >= min 的商品
function priceAbove(min) {
  return R.filter(R.propSatisfies(R.gte(R.__, min), "price"));
}

// 练习2: 利用 Ramda 自动柯里化创建数据提取器

// 2a: getProductNames — 提取所有商品的 name 列表
const getProductNames = R.map(R.prop("name"));

// 2b: totalPrice — 计算所有商品总价（用 R.reduce + R.prop）
const totalPrice = R.compose(R.reduce(R.add, 0), R.map(R.prop("price")));

// 练习3: R.flip — 翻转参数顺序
// 将二参数函数的参数顺序翻转

// 3a: createDivider — 使用 R.flip 创建除法函数
// divideBy(2)(10) → 5（即 10 / 2）
const divideBy = R.flip(R.divide); // TODO: 用 R.flip + R.divide

// 练习4: 综合 — 用 Ramda 串联过滤 + 映射 + 统计
// 统计所有在售且价格 >= 100 的商品总价
function totalInStockAbove(minPrice, productList) {
  return R.pipe(
    R.filter(R.prop("inStock")),
    R.filter(R.propSatisfies(R.gt(R.__, minPrice), "price")),
    R.pluck("price"),
    R.sum,
  )(productList);
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 柯里化过滤器", () => {
  it("inStockOnly 应筛选在售商品", () => {
    const result = inStockOnly(products);
    assert.equal(result.length, 4);
    result.forEach((p) => assert.equal(p.inStock, true));
  });

  it("inCategory 应筛选指定分类", () => {
    const electronics = inCategory("electronics")(products);
    assert.equal(electronics.length, 3);
  });

  it("priceAbove 应筛选价格 >= min", () => {
    const result = priceAbove(150)(products);
    assert.equal(result.length, 3);
    result.forEach((p) => assert.ok(p.price >= 150));
  });
});

describe("练习2: 柯里化提取器", () => {
  it("getProductNames 应提取所有名字", () => {
    assert.deepEqual(getProductNames(products), [
      "Laptop",
      "Mouse",
      "Book",
      "T-shirt",
      "Keyboard",
    ]);
  });

  it("totalPrice 应计算总价", () => {
    assert.equal(totalPrice(products), 8730);
  });
});

describe("练习3: flip", () => {
  it("divideBy 应翻转除法参数", () => {
    assert.equal(divideBy(2)(10), 5); // 10 / 2
    assert.equal(divideBy(3)(12), 4); // 12 / 3
  });
});

describe("练习4: 综合", () => {
  it("totalInStockAbove(100) 应正确统计", () => {
    // Laptop(8000) + T-shirt(120) + Keyboard(400) = 8520
    assert.equal(totalInStockAbove(100, products), 8520);
  });

  it("totalInStockAbove(5000) 应正确统计", () => {
    assert.equal(totalInStockAbove(5000, products), 8000);
  });
});
