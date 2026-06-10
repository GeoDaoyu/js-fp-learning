// ==========================================
// Week 05 · Day 2: Ramda 谓词函数 & 条件逻辑
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const users = [
  { name: "Alice", age: 25, role: "admin", score: 85 },
  { name: "Bob", age: 17, role: "user", score: 42 },
  { name: "Charlie", age: 30, role: "admin", score: 95 },
  { name: "Diana", age: 20, role: "user", score: 73 },
  { name: "Eve", age: 15, role: "moderator", score: 58 },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: R.ifElse / R.when / R.unless — 条件转换

// 1a: classifyScore(score) — 将分数转为等级
// >= 90 → 'A', >= 80 → 'B', >= 70 → 'C', >= 60 → 'D', < 60 → 'F'
// 要求: 用多个 R.ifElse 嵌套或 R.cond
function classifyScore(score) {
  // TODO
}

// 1b: doubleIfAdult(user) — 如果是成年人(age>=18)，score 翻倍
// 要求: 用 R.when
function doubleIfAdult(user) {
  // TODO: 返回新对象
}

// 1c: banMinors(user) — 除非是成年人，否则标记 banned: true
// 要求: 用 R.unless
function banMinors(user) {
  // TODO: 返回新对象
}

// 练习2: R.cond — 多条件分支
// 将 if/else 链替换为 R.cond

// 2a: ageGroup(age) — 返回年龄段
// < 13 → 'child', < 18 → 'teen', < 60 → 'adult', >= 60 → 'senior'
// 要求: 用 R.cond
function ageGroup(age) {
  // TODO
}

// 练习3: R.allPass / R.anyPass — 组合谓词

// 3a: isAdminAdult — 判断是否既是 admin 又是成年人
const isAdminAdult = null; // TODO: 用 R.allPass

// 3b: isHighOrAdmin — 判断是否 score >= 90 或 role 为 admin
const isHighOrAdmin = null; // TODO: 用 R.anyPass

// 3c: getEligibleUsers(userList) — 筛选符合条件的用户（isAdminAdult）
function getEligibleUsers(userList) {
  // TODO: 用 R.filter + isAdminAdult
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: ifElse / when / unless", () => {
  it("classifyScore 应返回正确等级", () => {
    assert.equal(classifyScore(95), "A");
    assert.equal(classifyScore(85), "B");
    assert.equal(classifyScore(73), "C");
    assert.equal(classifyScore(62), "D");
    assert.equal(classifyScore(30), "F");
  });

  it("doubleIfAdult 应对成年人翻倍 score", () => {
    assert.equal(doubleIfAdult({ name: "A", age: 25, score: 40 }).score, 80);
    assert.equal(doubleIfAdult({ name: "B", age: 15, score: 40 }).score, 40);
  });

  it("banMinors 应标记未成年 banned", () => {
    assert.equal(banMinors({ name: "A", age: 25 }).banned, undefined);
    assert.equal(banMinors({ name: "B", age: 15 }).banned, true);
  });
});

describe("练习2: cond", () => {
  it("ageGroup 应返回正确年龄段", () => {
    assert.equal(ageGroup(10), "child");
    assert.equal(ageGroup(15), "teen");
    assert.equal(ageGroup(30), "adult");
    assert.equal(ageGroup(65), "senior");
  });
});

describe("练习3: allPass / anyPass", () => {
  it("isAdminAdult 应正确判断", () => {
    assert.equal(isAdminAdult({ role: "admin", age: 25 }), true);
    assert.equal(isAdminAdult({ role: "admin", age: 15 }), false);
    assert.equal(isAdminAdult({ role: "user", age: 30 }), false);
  });

  it("isHighOrAdmin 应正确判断", () => {
    assert.equal(isHighOrAdmin({ role: "admin", score: 50 }), true);
    assert.equal(isHighOrAdmin({ role: "user", score: 95 }), true);
    assert.equal(isHighOrAdmin({ role: "user", score: 50 }), false);
  });

  it("getEligibleUsers 应筛选符合条件的用户", () => {
    const result = getEligibleUsers(users);
    assert.equal(result.length, 2); // Alice, Charlie
    assert.deepEqual(result.map((u) => u.name), ["Alice", "Charlie"]);
  });
});
