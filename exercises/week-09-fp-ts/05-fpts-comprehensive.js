// ==========================================
// Week 09 · Day 5: fp-ts 综合案例重构 + 周复盘
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import * as E from "fp-ts/Either";
import * as A from "fp-ts/Array";
import { describe, it, expect } from "vitest";

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
  return O.fromNullable(users[id]);
}

// 1b: ensureActive(user) → Either<error, user>
function ensureActive(user) {
  return user.active ? E.right(user) : E.left("User inactive");
}

// 1c: getEmail(user) → Option<string>
function getEmail(user) {
  return O.fromNullable(user.email);
}

// 1d: getUserEmail(userId) — 全链路
// findUser → E.fromOption → ensureActive → getEmail → E.fromOption
// Option → Either 用 E.fromOption(() => 'User not found')
function getUserEmail(userId) {
  return pipe(
    findUser(userId),
    E.fromOption(() => "User not found"),
    E.chain(ensureActive),
    E.chain((user) =>
      pipe(
        getEmail(user),
        E.fromOption(() => "No email"),
      ),
    ),
  );
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
  return pipe(
    orderList,
    A.filter((o) => o.status === "delivered"),
    A.map((o) => o.qty * o.price),
    A.reduce(0, (acc, x) => acc + x),
  );
}

// 练习3: fp-ts 学习反思（写在注释里）
//
// 3a. fp-ts 与我们手写的 Maybe/Either 相比，最大的优势是什么？
//
// 最大的优势是类型安全和生态完整性：
// 1. TypeScript 类型推断：每一步 pipe 操作的类型都被精准追踪，
//    比如 E.chain(ensureActive) 编译器知道输入是 User、输出是 Either<string, User>，
//    类型不匹配在编译期就能发现，而不是运行时爆 undefined
// 2. 模块互操作：O.toEither、E.fromOption 等转换函数都是现成的，
//    手写版本需要自己实现 Option ↔ Either 的桥接
// 3. 工具函数丰富：E.tryCatch、A.lookup、O.fromNullable 等
//    覆盖了大量常见场景，不需要重复造轮子
// 4. 生产级质量：经过大量项目验证，边界情况处理完善
//
// 3b. fp-ts 的学习曲线如何？哪些概念需要额外时间来消化？
//
// 学习曲线较陡，但手写了 Maybe/Either/Monad 之后会好很多：
// 1. pipe 式调用需要适应：从 value.map(fn) 到 pipe(value, O.map(fn))
//    思维转换需要时间，但本质上就是"数据流过一串函数"
// 2. 类型签名阅读：fp-ts 的函数签名用 Hindley-Milner 风格，
//    比如 A.reduce: (b, f) => (as) => B，需要习惯这种写法
// 3. 泛型错误信息：类型不匹配时 TypeScript 的错误可能很长很绕，
//    需要学会从错误中定位真正的类型问题
// 4. 进阶概念：Functor/Applicative/Monad 等 type class 的层次关系，
//    不过这些在第 6-8 周已经建立了基础，只需要对接到 fp-ts 的具体 API

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
