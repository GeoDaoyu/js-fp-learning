// ==========================================
// Week 06 · Day 5: Maybe 综合练习 + 周复盘
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
}

class Nothing extends Maybe {
  map(_) { return this; }
  chain(_) { return this; }
  getOrElse(defaultVal) { return defaultVal; }
}

// 练习1: 综合 — 用 Maybe 处理订单计算
// 需求: 计算订单的折扣后总价
// 步骤: 取 order.discount.rate (可能为 null) → 如果 > 0.5 视为无效 → Nothing
//   → 应用折扣 → 计算 total = quantity * price * (1 - rate)

// 1a: safeDiscount(order) — 安全获取有效折扣率
// 如果 rate 不存在或 > 0.5，返回 Nothing
function safeDiscount(order) {
  // TODO: 安全获取有效折扣率 — rate 不存在或 > 0.5 时返回 Nothing
}

// 1b: calcTotal(order) — 计算折扣后总价
// 拿到有效折扣率后计算 total
function calcTotal(order) {
  // TODO: 计算折扣后总价 — 用 safeDiscount 获取折扣率，计算 quantity * price * (1 - rate)
}

// 练习2: 用 Maybe 替代多层 if 判空
// 重写以下传统判空逻辑:

// 传统写法:
// function getUserLevel(user) {
//   if (user && user.profile && user.profile.settings) {
//     return user.profile.settings.level;
//   }
//   return 'basic';
// }

// 2a: getUserLevel(user) — FP 版本，用 Maybe
function getUserLevel(user) {
  // TODO: 用 Maybe 替代多层 if 判空 — 安全获取 user.profile.settings.level，默认 "basic"
}

// 练习3: 梳理函子/Maybe 解决的问题（写在注释里）
//
// 3a. 函子（Functor）模式的核心价值是什么？
//
// TODO: 思考并写下你的理解

// 3b. Maybe 函子的局限是什么？什么场景下 Maybe 不够用？
//
// TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 订单计算", () => {
  it("有效折扣应正确计算", () => {
    const order = { quantity: 2, price: 100, discount: { rate: 0.2 } };
    const result = calcTotal(order);
    expect(result.getOrElse(0)).toBe(160); // 2 * 100 * 0.8
  });

  it("无折扣应等同 0 折扣", () => {
    const order = { quantity: 1, price: 50 };
    const result = calcTotal(order);
    expect(result.getOrElse(0)).toBe(50);
  });

  it("折扣率超过 0.5 应视为无效", () => {
    const order = { quantity: 1, price: 100, discount: { rate: 0.8 } };
    expect(calcTotal(order).getOrElse(0)).toBe(100); // 无效折扣，等同无折扣
  });
});

describe("练习2: 替代判空", () => {
  it("完整数据应正确获取 level", () => {
    const user = { profile: { settings: { level: "premium" } } };
    expect(getUserLevel(user)).toBe("premium");
  });

  it("缺失数据应返回默认值", () => {
    expect(getUserLevel({})).toBe("basic");
    expect(getUserLevel({ profile: {} })).toBe("basic");
  });
});
