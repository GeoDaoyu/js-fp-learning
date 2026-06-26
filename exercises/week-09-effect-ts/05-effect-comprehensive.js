// ==========================================
// Week 09 · Day 5: Effect-TS 综合案例重构 + 周复盘
// ==========================================
// 需要先安装 effect: npm install effect
import { pipe } from "effect";
import { Option as O } from "effect";
import { Either as E } from "effect";
import { Array as A } from "effect";
import { describe, it, expect } from "vitest";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 用 Effect-TS 重写之前的 Maybe + Either 案例
// 场景: 用户查询 → 校验活跃 → 获取邮箱 → 格式化
// 全链路用 Option 和 Either 串联

const users = {
  "u1": { id: "u1", name: "Alice", active: true, email: "alice@example.com" },
  "u2": { id: "u2", name: "Bob", active: false, email: "bob@example.com" },
};

// 1a: findUser(id) → Option<User>
function findUser(id) {
  // TODO: 用 O.fromNullable 从 users 查找用户，返回 Option
}

// 1b: ensureActive(user) → Either<error, user>
function ensureActive(user) {
  // TODO: user.active 为 true 返回 E.right，否则 E.left('User inactive')
}

// 1c: getEmail(user) → Option<string>
function getEmail(user) {
  // TODO: 用 O.fromNullable 安全获取 user.email
}

// 1d: getUserEmail(userId) — 全链路
// findUser → E.fromOption → ensureActive → getEmail → E.fromOption
// Option → Either 用 E.fromOption(() => 'User not found')
function getUserEmail(userId) {
  // TODO: 全链路串联 findUser → ensureActive → getEmail
  // Option 用 E.fromOption 转为 Either
}

// 练习2: 用 Effect-TS 做数据处理管道
// 需求: 处理订单列表
//   1. filter 已交付(status === 'delivered')
//   2. map 添加 total = qty * price
//   3. reduce 计算总收入

const orders = [
  { id: 1, product: "A", qty: 2, price: 100, status: "delivered" },
  { id: 2, product: "B", qty: 1, price: 200, status: "pending" },
  { id: 3, product: "C", qty: 3, price: 50, status: "delivered" },
];

function totalDeliveredRevenue(orderList) {
  // TODO: 用 pipe 串联 A.filter → A.map → A.reduce 计算已交付订单总收入
}

// 练习3: Effect-TS 学习反思（写在注释里）
//
// 3a. Effect-TS 与我们手写的 Maybe/Either 相比，最大的优势是什么？
//     TODO: 思考并写下你的理解
//
// 3b. Effect-TS 的学习曲线如何？哪些概念需要额外时间来消化？
//     TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 用户查询全链路", () => {
  it("存在的活跃用户应返回邮箱", () => {
    const result = getUserEmail("u1");
    expect(E.isRight(result)).toBe(true);
    expect(pipe(result, E.getOrElse(() => ""))).toBe("alice@example.com");
  });

  it("不存在的用户应返回 Left", () => {
    const result = getUserEmail("u999");
    expect(E.isLeft(result)).toBe(true);
  });

  it("非活跃用户应返回 Left", () => {
    const result = getUserEmail("u2");
    expect(E.isLeft(result)).toBe(true);
  });
});

describe("练习2: 数据处理管道", () => {
  it("totalDeliveredRevenue 应计算已交付总收入", () => {
    // id1: 2*100=200, id3: 3*50=150 → 350
    expect(totalDeliveredRevenue(orders)).toBe(350);
  });
});
