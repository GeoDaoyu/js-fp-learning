// ==========================================
// Week 08 · Day 2: Maybe 改造为 Monad
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 为 Maybe 添加 chain 方法
// chain 行为和 map 类似，但 fn 返回 Maybe 时不会嵌套

class Maybe {
  static of(value) { return value == null ? new Nothing() : new Just(value); }
}

class Just extends Maybe {
  constructor(value) { super(); this._value = value; }
  map(fn) { return Maybe.of(fn(this._value)); }
  chain(fn) {
    // TODO: fn 返回 Maybe，直接返回那个 Maybe
  }
  getOrElse(_) { return this._value; }
}

class Nothing extends Maybe {
  map(_) { return this; }
  chain(_) { return this; }
  getOrElse(defaultVal) { return defaultVal; }
}

// 练习2: chain 解决嵌套 Maybe 问题
// 场景: 从数据库中逐层查找数据，每步都可能返回 Maybe

// 2a: 模拟三层查询
//   findDepartment(deptId) → Maybe<Department>
//   findManager(department) → Maybe<Manager>
//   getEmail(manager)       → Maybe<Email>
// 用 chain 串联，得到最终的 Maybe<Email>

function findDepartment(deptId) {
  const db = { "d1": { name: "Engineering", managerId: "m1" } };
  return Maybe.of(db[deptId]);
}

function findManager(department) {
  const db = { "m1": { name: "Alice", email: "alice@example.com" } };
  return Maybe.of(db[department.managerId]);
}

function getEmail(manager) {
  return Maybe.of(manager.email);
}

// 2b: getManagerEmail(deptId) — 串联三步查询
function getManagerEmail(deptId) {
  // TODO: 用 chain 串联 findDepartment → findManager → getEmail
  // 不使用 map 嵌套
}

// 练习3: map + chain 链式调用的实际意义
// 解释以下代码的行为:
//
// Maybe.of(order)
//   .map(o => o.customer)
//   .chain(c => Maybe.of(c.address))
//   .chain(a => Maybe.of(a.city))
//   .getOrElse('Unknown')
//
// TODO: 回答 — map 和 chain 分别用在什么环节？为什么？

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Maybe chain", () => {
  it("Just.chain 应正确串联", () => {
    const result = Maybe.of(5)
      .chain((x) => Maybe.of(x * 2))
      .chain((x) => Maybe.of(x + 1));
    assert.equal(result.getOrElse(0), 11);
  });

  it("Nothing.chain 应安全短路", () => {
    const result = Maybe.of(null)
      .chain((x) => Maybe.of(x * 2))
      .chain((x) => Maybe.of(x + 1));
    assert.equal(result.getOrElse(99), 99);
  });

  it("chain 不会像 map 一样产生嵌套 Maybe", () => {
    const chained = Maybe.of(5).chain((x) => Maybe.of(x));
    assert.ok(chained instanceof Maybe);
    // map 会产生 Just(Just(5))，chain 只产生 Just(5)
    assert.equal(chained.getOrElse(0), 5);
  });
});

describe("练习2: chain 串联查询", () => {
  it("存在的部门应正确获取经理邮箱", () => {
    const result = getManagerEmail("d1");
    assert.equal(result.getOrElse("not found"), "alice@example.com");
  });

  it("不存在的部门应返回 Nothing", () => {
    const result = getManagerEmail("d999");
    assert.equal(result.getOrElse("not found"), "not found");
  });
});
