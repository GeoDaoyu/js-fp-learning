// ==========================================
// Week 09 · Day 5: fp-ts 综合案例重构 + 周复盘
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 用 fp-ts 重写之前的 Maybe + Either 案例
// 场景: 用户查询 → 校验活跃 → 获取邮箱 → 格式化
// 全链路用 Option 和 Either 串联

const users = {
  "u1": { id: "u1", name: "Alice", active: true, email: "alice@example.com" },
  "u2": { id: "u2", name: "Bob", active: false, email: "bob@example.com" },
};

// 1a: findUser(id) → Option<User>
function findUser(id) {
  // TODO: 用 O.fromNullable
}

// 1b: ensureActive(user) → Either<error, user>
function ensureActive(user) {
  // TODO: user.active ? E.right(user) : E.left('User inactive')
}

// 1c: getEmail(user) → Option<string>
function getEmail(user) {
  // TODO: O.fromNullable(user.email)
}

// 1d: getUserEmail(userId) — 全链路
// findUser → toEither → ensureActive → getUserEmail
// Option → Either 用 O.toEither(() => 'User not found')
function getUserEmail(userId) {
  // TODO
}

// 练习2: 用 fp-ts 做数据处理管道
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
  // TODO: 用 pipe + A.filter + A.map + A.reduce
}

// 练习3: fp-ts 学习反思（写在注释里）
//
// 3a. fp-ts 与我们手写的 Maybe/Either 相比，最大的优势是什么？
//
// TODO: 回答

// 3b. fp-ts 的学习曲线如何？哪些概念需要额外时间来消化？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 用户查询全链路", () => {
  it("存在的活跃用户应返回邮箱", () => {
    const result = getUserEmail("u1");
    assert.ok(E.isRight(result));
    assert.equal(
      pipe(result, E.getOrElse(() => "")),
      "alice@example.com",
    );
  });

  it("不存在的用户应返回 Left", () => {
    const result = getUserEmail("u999");
    assert.ok(E.isLeft(result));
  });

  it("非活跃用户应返回 Left", () => {
    const result = getUserEmail("u2");
    assert.ok(E.isLeft(result));
  });
});

describe("练习2: 数据处理管道", () => {
  it("totalDeliveredRevenue 应计算已交付总收入", () => {
    // id1: 2*100=200, id3: 3*50=150 → 350
    assert.equal(totalDeliveredRevenue(orders), 350);
  });
});
