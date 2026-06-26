// ==========================================
// Week 07 · Day 5: Either 综合练习 + 周复盘
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
  toEither(_) { return Either.right(this._value); }
}

class Nothing extends Maybe {
  map(_) { return this; }
  chain(_) { return this; }
  getOrElse(defaultVal) { return defaultVal; }
  toEither(leftValue) { return Either.left(leftValue); }
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

// 练习1: 完整的空值 + 异常处理链路
// 场景: 用户下单
//   1. 检查用户是否存在 (Maybe)
//   2. 校验用户状态是否正常 (Either)
//   3. 检查商品库存 (Either)
//   4. 计算订单总额
//   5. 整条链路：一处失败 = 全链路失败

const usersDb = {
  "u1": { id: "u1", name: "Alice", active: true },
  "u2": { id: "u2", name: "Bob", active: false },
};

const productsDb = {
  "p1": { id: "p1", name: "Laptop", price: 8000, stock: 5 },
  "p2": { id: "p2", name: "Mouse", price: 150, stock: 0 },
};

// 1a: findUser(userId) — 查找用户
function findUser(userId) {
  return Maybe.of(usersDb[userId]);
}

// 1b: verifyActive(user) — 校验用户是否激活
function verifyActive(user) {
  return user.active ? Either.right(user) : Either.left('User not active');
}

// 1c: verifyStock(productId, quantity) — 校验库存
function verifyStock(productId, quantity) {
  const product = productsDb[productId];
  if (!product) return Either.left('Product not found');
  if (product.stock < quantity) return Either.left('Insufficient stock');
  return Either.right(product);
}

// 1d: calculateTotal(product, quantity) — 计算总额
function calculateTotal(product, quantity) {
  return Either.right(product.price * quantity);
}

// 练习2: 全链路串联 — placeOrder(userId, productId, quantity)
// findUser → verifyActive → verifyStock → calculateTotal
// 要求: 正确串联 Maybe 和 Either
function placeOrder(userId, productId, quantity) {
  return findUser(userId)
    .toEither('User not found')
    .chain(user => verifyActive(user))
    .chain(() => verifyStock(productId, quantity))
    .chain(product => calculateTotal(product, quantity));
}

// 练习3: 对比传统写法（写在注释里）
//
// 3a. 用 Maybe + Either 串联 vs 传统的 if/else + try/catch
//    在代码可读性和可维护性上分别有哪些优劣？
//
// Maybe + Either 的优势：
// - 可读性：链式调用是线性叙事，从左到右顺序清晰；传统写法的 if/else
//   嵌套会形成"箭头型"代码，错误处理和业务逻辑混在一起。
// - 可维护性：新增校验步骤只需在链上加一个 .chain()，不影响已有逻辑；
//   传统写法需要在嵌套中插入新的 if/else，容易改出 bug。
// - 类型即文档：Maybe 表示"可能为空"，Either 表示"可能失败"，
//   签名就说明了行为，不需要读实现。
//
// 传统写法的优势：
// - 入门成本低，不需要理解容器概念。
// - 小规模场景（1-2 个校验）时 Maybe/Either 反而显得过度抽象。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 业务函数", () => {
  it("findUser 存在的用户", () => {
    expect(findUser("u1").getOrElse(null).name).toBe("Alice");
  });

  it("findUser 不存在的用户", () => {
    expect(findUser("u999").getOrElse(null)).toBe(null);
  });

  it("verifyActive 活跃用户", () => {
    const result = verifyActive(usersDb["u1"]);
    expect(result instanceof Right).toBe(true);
  });

  it("verifyActive 非活跃用户", () => {
    const result = verifyActive(usersDb["u2"]);
    expect(result instanceof Left).toBe(true);
  });

  it("verifyStock 库存充足", () => {
    const result = verifyStock("p1", 3);
    expect(result instanceof Right).toBe(true);
  });

  it("verifyStock 库存不足", () => {
    const result = verifyStock("p2", 1);
    expect(result instanceof Left).toBe(true);
  });
});

describe("练习2: 全链路下单", () => {
  it("正常下单应成功", () => {
    const result = placeOrder("u1", "p1", 2);
    // 8000 * 2 = 16000
    expect(result.fold(() => 0, (total) => total)).toBe(16000);
  });

  it("不存在的用户应失败", () => {
    const result = placeOrder("u999", "p1", 1);
    expect(result instanceof Left).toBe(true);
  });

  it("非活跃用户应失败", () => {
    const result = placeOrder("u2", "p1", 1);
    expect(result instanceof Left).toBe(true);
  });

  it("库存不足应失败", () => {
    const result = placeOrder("u1", "p2", 1);
    expect(result instanceof Left).toBe(true);
  });
});
