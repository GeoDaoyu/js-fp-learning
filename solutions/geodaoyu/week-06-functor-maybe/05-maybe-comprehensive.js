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
  return Maybe.of(order)
    .map((o) => o.discount)
    .map((d) => d.rate)
    .chain((rate) => (rate > 0.5 ? Maybe.of(null) : Maybe.of(rate)));
}

// 1b: calcTotal(order) — 计算折扣后总价
// 拿到有效折扣率后计算 total
function calcTotal(order) {
  const rate = safeDiscount(order).getOrElse(0);
  return Maybe.of(order.quantity * order.price * (1 - rate));
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
  return Maybe.of(user)
    .map((u) => u.profile)
    .map((p) => p.settings)
    .map((s) => s.level)
    .getOrElse("basic");
}

// 练习3: 梳理函子/Maybe 解决的问题（写在注释里）
//
// 3a. 函子（Functor）模式的核心价值是什么？
//
// 函子的核心价值是"在容器内做变换"——你不需要把值取出来，操作完再放回去。
// 它把"如何取出值 → 对值做变换 → 如何放回容器"这套流程抽象成了统一的 map 方法。
// 具体来说：
// ① 解耦了变换逻辑和容器上下文——调用方只关心 fn 怎么写，不关心容器内部机制
// ② 链式串联——Container(5).map(add1).map(double).map(toString) 读起来像管道
// ③ 不同类型的容器（Array、Maybe、Either）共享相同的 map 接口，切换容器类型无需改链式代码

// 3b. Maybe 函子的局限是什么？什么场景下 Maybe 不够用？
//
// 局限：
// ① 只区分"有值/无值"两种情况，无法携带错误信息——如果 rate > 0.5 被拒绝，
//    Nothing 说不出原因，调用方只知道"没有"，不知道"为什么没有"
// ② 无法区分多种空值原因——order.discount 不存在 vs rate 超过 0.5 都是 Nothing，
//    无法做差异化处理
// ③ getOrElse 只能给一个默认值，无法根据错误类型走不同分支
//
// 不够用的场景：
// ① 需要知道失败原因的——比如表单校验，Nothing 无法告知是哪个字段校验失败
// ② 需要分叉处理的——比如 rate > 0.5 走审批流，rate 缺失走无折扣，两者处理不同
// ③ 多个 Maybe 组合——两个 Maybe 都是 Nothing 时，不知道哪个出了问题
//
// → 这些场景需要 Either（Left/Right），Right 走成功路径，Left 携带错误信息

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
