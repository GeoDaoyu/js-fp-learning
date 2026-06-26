// ==========================================
// Week 08 · Day 5: Maybe+Either+Monad 全链路 + 周复盘
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

class Maybe {
  static of(value) { return value == null ? new Nothing() : new Just(value); }
}

class Just extends Maybe {
  constructor(value) { super(); this._value = value; }
  map(fn) { return Maybe.of(fn(this._value)); }
  chain(fn) { return fn(this._value); }
  getOrElse(_) { return this._value; }
  toEither(leftVal) { return Either.right(this._value); }
}

class Nothing extends Maybe {
  map(_) { return this; }
  chain(_) { return this; }
  getOrElse(defaultVal) { return defaultVal; }
  toEither(leftVal) { return Either.left(leftVal); }
}

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

// 练习1: 全链路 — 取值 → 判空 → 异常捕获
// 场景: 电商下单完整流程
//  1. 检查用户是否存在 (Maybe)
//  2. 检查用户是否被拉黑 (Either)
//  3. 检查商品是否存在 (Maybe)
//  4. 检查库存 (Either)
//  5. 计算总价
//  6. 应用会员折扣（如果有的话）(Maybe)
//  7. 返回最终订单信息

const userDb = {
  "u1": { id: "u1", name: "Alice", blacklisted: false, membership: "gold" },
  "u2": { id: "u2", name: "Bob", blacklisted: true, membership: null },
};

const productDb = {
  "p1": { id: "p1", name: "Laptop", price: 8000, stock: 10 },
  "p2": { id: "p2", name: "Mouse", price: 150, stock: 0 },
};

const memberDiscounts = {
  "gold": 0.1,
  "silver": 0.05,
};

function findUser(id) {
  return Maybe.of(userDb[id]);
}

function checkNotBlacklisted(user) {
  return user.blacklisted ? Either.left("User is blacklisted") : Either.right(user);
}

function findProduct(id) {
  return Maybe.of(productDb[id]);
}

function checkStock(product, qty) {
  return product.stock >= qty
    ? Either.right(product)
    : Either.left("Insufficient stock");
}

function getDiscount(user) {
  return Maybe.of(memberDiscounts[user.membership]);
}

// 1: placeOrder(userId, productId, quantity)
// 串联上述所有步骤
function placeOrder(userId, productId, quantity) {
  return findUser(userId)
    .toEither("User not found")
    .chain((user) =>
      checkNotBlacklisted(user).chain((user) =>
        findProduct(productId)
          .toEither("Product not found")
          .chain((product) =>
            checkStock(product, quantity).map((product) => {
              const discountRate = getDiscount(user).getOrElse(0);
              const total = product.price * quantity * (1 - discountRate);
              return {
                user: user.name,
                product: product.name,
                quantity,
                unitPrice: product.price,
                discountRate,
                total,
              };
            })
          )
      )
    );
}

// 练习2: Monad 学习反思（写在注释里）
//
// 2a. Monad 的 chain 解决了什么核心问题？（一句话）
//
// chain 解决了嵌套上下文的问题：当函数本身返回 Monad 时，chain 自动展平，
// 避免出现 M<M<a>> 的嵌套，让链式调用保持扁平可组合。

// 2b. Maybe、Either、Monad 这三者的关系是什么？
//
// Monad 是模式接口（定义了 chain + of），Maybe 和 Either 都是 Monad 的具体实现。
// Maybe 处理"值可能为空"的场景，Either 处理"操作可能失败并携带错误信息"的场景。
// 两者都遵循相同的 chain 语义：短路 + 展平。

// 2c. 经过三周学习（Functor → Maybe → Either → Monad），
//     你觉得 FP 容器模式在实际项目中最大的价值是什么？
//
// 把错误处理和空值检查从隐式的、分散的 if/else 和 try/catch，
// 变成显式的、可组合的类型。每一步的失败路径自动短路，
// 不需要手动写"if fail return"。业务逻辑变成一条直线，
// 边缘情况由容器自己处理，代码更易读也更难出错。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 全链路下单", () => {
  it("正常下单应成功并包含折扣", () => {
    // u1(not blacklisted, gold 10%) + p1(price 8000, stock 10) + qty 2
    // total: 8000 * 2 * 0.9 = 14400
    const result = placeOrder("u1", "p1", 2);
    expect(result instanceof Right).toBe(true);
    const order = result.getOrElse({});
    expect(order.total).toBe(14400);
    expect(order.discountRate).toBe(0.1);
  });

  it("用户不存在应失败", () => {
    const result = placeOrder("u999", "p1", 1);
    expect(result instanceof Left).toBe(true);
  });

  it("用户被拉黑应失败", () => {
    const result = placeOrder("u2", "p1", 1);
    expect(result instanceof Left).toBe(true);
  });

  it("库存不足应失败", () => {
    const result = placeOrder("u1", "p2", 1);
    expect(result instanceof Left).toBe(true);
  });

  it("无会员折扣应不影响下单", () => {
    // u1 有 gold 会员，这里测试即使有会员也能正常计算
    const result = placeOrder("u1", "p1", 1);
    expect(result.getOrElse({}).total).toBe(7200); // 8000 * 0.9
  });
});
