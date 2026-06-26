// ==========================================
// Week 04 · Day 4: Ramda 自动柯里化实战
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it, expect } from "vitest";


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
const inStockOnly = (products) => {
  // TODO: 用 R.filter 和 R.prop 筛选在售商品
};

// 1b: inCategory(category) — 筛选指定分类的商品
function inCategory(category) {
  // TODO: 用 R.filter 和 R.propEq 筛选指定分类
}

// 1c: priceAbove(min) — 筛选价格 >= min 的商品
function priceAbove(min) {
  // TODO: 用 R.filter 和 R.propSatisfies 筛选价格 >= min 的商品
}

// 练习2: 利用 Ramda 自动柯里化创建数据提取器

// 2a: getProductNames — 提取所有商品的 name 列表
const getProductNames = (products) => {
  // TODO: 用 R.map 和 R.prop 提取所有商品名字
};

// 2b: totalPrice — 计算所有商品总价（用 R.reduce + R.prop）
const totalPrice = (products) => {
  // TODO: 用 R.compose 计算所有商品总价
};

// 练习3: R.flip — 翻转参数顺序
// 将二参数函数的参数顺序翻转

// 3a: createDivider — 使用 R.flip 创建除法函数
// divideBy(2)(10) → 5（即 10 / 2）
const divideBy = (divisor) => (dividend) => {
  // TODO: 用 R.flip + R.divide 实现除法，使 divideBy(2)(10) 返回 5
};

// 练习4: 综合 — 用 Ramda 串联过滤 + 映射 + 统计
// 统计所有在售且价格 >= 100 的商品总价
function totalInStockAbove(minPrice, productList) {
  // TODO: 用 R.pipe 串联过滤、映射、统计在售且价格 >= minPrice 的商品总价
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 柯里化过滤器", () => {
  it("inStockOnly 应筛选在售商品", () => {
    const result = inStockOnly(products);
    expect(result.length).toBe(4);
    result.forEach((p) => expect(p.inStock).toBe(true));
  });

  it("inCategory 应筛选指定分类", () => {
    const electronics = inCategory("electronics")(products);
    expect(electronics.length).toBe(3);
  });

  it("priceAbove 应筛选价格 >= min", () => {
    const result = priceAbove(150)(products);
    expect(result.length).toBe(3);
    result.forEach((p) => expect(p.price >= 150).toBe(true));
  });
});

describe("练习2: 柯里化提取器", () => {
  it("getProductNames 应提取所有名字", () => {
    expect(getProductNames(products)).toEqual([
      "Laptop",
      "Mouse",
      "Book",
      "T-shirt",
      "Keyboard",
    ]);
  });

  it("totalPrice 应计算总价", () => {
    expect(totalPrice(products)).toBe(8730);
  });
});

describe("练习3: flip", () => {
  it("divideBy 应翻转除法参数", () => {
    expect(divideBy(2)(10)).toBe(5); // 10 / 2
    expect(divideBy(3)(12)).toBe(4); // 12 / 3
  });
});

describe("练习4: 综合", () => {
  it("totalInStockAbove(100) 应正确统计", () => {
    // Laptop(8000) + T-shirt(120) + Keyboard(400) = 8520
    expect(totalInStockAbove(100, products)).toBe(8520);
  });

  it("totalInStockAbove(5000) 应正确统计", () => {
    expect(totalInStockAbove(5000, products)).toBe(8000);
  });
});
