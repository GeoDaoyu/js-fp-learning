// ==========================================
// Week 07 · Day 3: Either 实战 — 业务异常处理
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

class Either {
  static of(value) { return new Right(value); }
  static left(value) { return new Left(value); }
  static right(value) { return new Right(value); }
}

class Right extends Either {
  constructor(value) { super(); this._value = value; }
  map(fn) { return Either.of(fn(this._value)); }
  chain(fn) { return fn(this._value); }
  fold(_, rightFn) { return rightFn(this._value); }
  getOrElse(_) { return this._value; }
}

class Left extends Either {
  constructor(value) { super(); this._value = value; }
  map(_) { return this; }
  chain(_) { return this; }
  fold(leftFn, _) { return leftFn(this._value); }
  getOrElse(defaultVal) { return defaultVal; }
}

// 练习1: 用 Either 处理业务规则

const inventory = {
  "SKU001": { name: "Laptop", stock: 5, price: 8000 },
  "SKU002": { name: "Mouse", stock: 0, price: 150 },
  "SKU003": { name: "Keyboard", stock: 10, price: 400 },
};

// 1a: checkStock(sku, quantity) — 检查库存
// sku 不存在 → Left('Product not found')
// 库存不足 → Left('Insufficient stock')
// 足够 → Right({ sku, quantity, available: stock })
function checkStock(sku, quantity) {
  const product = inventory[sku];
  if (!product) return Either.left('Product not found');
  if (product.stock < quantity) return Either.left('Insufficient stock');
  return Either.right({ sku, quantity, available: product.stock });
}

// 1b: applyDiscount(orderInfo, discountRate) — 应用折扣
// discountRate > 0.8 → Left('Discount too high')
// discountRate < 0 → Left('Invalid discount')
// 否则 → Right({ ...orderInfo, discountRate, total: price * quantity * (1 - discountRate) })
// 需要把 price 也带上，所以这里用扩展的 orderInfo: { sku, quantity, price }
function applyDiscount(orderInfo, discountRate) {
  if (discountRate > 0.8) return Either.left('Discount too high');
  if (discountRate < 0) return Either.left('Invalid discount');
  return Either.right({
    ...orderInfo,
    discountRate,
    total: orderInfo.price * orderInfo.quantity * (1 - discountRate),
  });
}

// 练习2: 用 chain 串联业务流程
// processOrder(sku, quantity, discountRate)
//   1. checkStock
//   2. applyDiscount (传入 discountRate)
function processOrder(sku, quantity, discountRate) {
  return checkStock(sku, quantity)
    .map(orderInfo => ({
      ...orderInfo,
      price: inventory[sku].price,
    }))
    .chain(orderInfo => applyDiscount(orderInfo, discountRate));
}

// 练习3: Either + 业务 vs try/catch（写在注释里）
//
// 3a. Either 处理业务异常相比 try/catch 有什么优势？
//
// 1. 类型安全：Either 将错误作为值返回，类型签名明确表达了"可能失败"的语义，
//    而 try/catch 的错误是不可见的，调用者无法从类型上知道函数是否会抛出异常。
// 2. 可组合：Either 支持 map/chain 串联，错误会自动短路传递，无需每步都写
//    try/catch 包裹；try/catch 的嵌套会让业务流程变得难以阅读。
// 3. 强制处理：fold/getOrElse 要求调用者显式处理错误分支，try/catch 可以
//    被遗漏（unhandled rejection）。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 业务规则", () => {
  it("checkStock 库存充足应返回 Right", () => {
    const result = checkStock("SKU001", 3);
    assert.ok(result instanceof Right);
    assert.equal(result.map((o) => o.available).getOrElse(0), 5);
  });

  it("checkStock 库存不足应返回 Left", () => {
    const result = checkStock("SKU002", 1);
    assert.ok(result instanceof Left);
  });

  it("checkStock 不存在的 sku 应返回 Left", () => {
    const result = checkStock("SKU999", 1);
    assert.ok(result instanceof Left);
  });

  it("applyDiscount 正常折扣", () => {
    const order = { sku: "SKU001", quantity: 2, price: 8000 };
    const result = applyDiscount(order, 0.2);
    assert.equal(result.getOrElse({}).total, 12800);
  });

  it("applyDiscount 过高折扣", () => {
    const result = applyDiscount({}, 0.9);
    assert.ok(result instanceof Left);
  });
});

describe("练习2: 业务流程串联", () => {
  it("全流程通过", () => {
    // SKU001: price 8000, quantity 2, discount 0.2 → total = 8000*2*0.8 = 12800
    const result = processOrder("SKU001", 2, 0.2);
    assert.equal(result.fold(() => 0, (o) => o.total), 12800);
  });

  it("库存不足", () => {
    const result = processOrder("SKU002", 1, 0.1);
    assert.ok(result instanceof Left);
  });

  it("折扣异常", () => {
    const result = processOrder("SKU001", 2, 0.9);
    assert.ok(result instanceof Left);
  });
});
