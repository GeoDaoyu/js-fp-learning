// ==========================================
// Week 05 · Day 2: Ramda 谓词函数 & 条件逻辑
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it, expect } from "vitest";


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
  return R.cond([
    [R.gte(R.__, 90), R.always("A")],
    [R.gte(R.__, 80), R.always("B")],
    [R.gte(R.__, 70), R.always("C")],
    [R.gte(R.__, 60), R.always("D")],
    [R.T, R.always("F")],
  ])(score);
}

// 1b: doubleIfAdult(user) — 如果是成年人(age>=18)，score 翻倍
// 要求: 用 R.when
function doubleIfAdult(user) {
  return R.when(
    R.propSatisfies(R.gte(R.__, 18), "age"),
    R.over(R.lensProp("score"), R.multiply(2)),
  )(user);
}

// 1c: banMinors(user) — 除非是成年人，否则标记 banned: true
// 要求: 用 R.unless
function banMinors(user) {
  return R.unless(
    R.propSatisfies(R.gte(R.__, 18), "age"),
    R.over(R.lensProp("banned"), R.always(true)),
  )(user);
}

// 练习2: R.cond — 多条件分支
// 将 if/else 链替换为 R.cond

// 2a: ageGroup(age) — 返回年龄段
// < 13 → 'child', < 18 → 'teen', < 60 → 'adult', >= 60 → 'senior'
// 要求: 用 R.cond
function ageGroup(age) {
  return R.cond([
    [R.lt(R.__, 13), R.always("child")],
    [R.lt(R.__, 18), R.always("teen")],
    [R.lt(R.__, 60), R.always("adult")],
    [R.T, R.always("senior")],
  ])(age);
}

// 练习3: R.allPass / R.anyPass — 组合谓词

// 3a: isAdminAdult — 判断是否既是 admin 又是成年人
const isAdminAdult = R.allPass([
  R.propEq("admin", "role"),
  R.propSatisfies(R.gte(R.__, 18), "age"),
]);

// 3b: isHighOrAdmin — 判断是否 score >= 90 或 role 为 admin
const isHighOrAdmin = R.anyPass([
  R.propSatisfies(R.gte(R.__, 90), "score"),
  R.propEq("admin", "role"),
]);

// 3c: getEligibleUsers(userList) — 筛选符合条件的用户（isAdminAdult）
function getEligibleUsers(userList) {
  return R.filter(isAdminAdult)(userList);
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: ifElse / when / unless", () => {
  it("classifyScore 应返回正确等级", () => {
    expect(classifyScore(95)).toBe("A");
    expect(classifyScore(85)).toBe("B");
    expect(classifyScore(73)).toBe("C");
    expect(classifyScore(62)).toBe("D");
    expect(classifyScore(30)).toBe("F");
  });

  it("doubleIfAdult 应对成年人翻倍 score", () => {
    expect(doubleIfAdult({ name: "A", age: 25, score: 40 }).score).toBe(80);
    expect(doubleIfAdult({ name: "B", age: 15, score: 40 }).score).toBe(40);
  });

  it("banMinors 应标记未成年 banned", () => {
    expect(banMinors({ name: "A", age: 25 }).banned).toBe(undefined);
    expect(banMinors({ name: "B", age: 15 }).banned).toBe(true);
  });
});

describe("练习2: cond", () => {
  it("ageGroup 应返回正确年龄段", () => {
    expect(ageGroup(10)).toBe("child");
    expect(ageGroup(15)).toBe("teen");
    expect(ageGroup(30)).toBe("adult");
    expect(ageGroup(65)).toBe("senior");
  });
});

describe("练习3: allPass / anyPass", () => {
  it("isAdminAdult 应正确判断", () => {
    expect(isAdminAdult({ role: "admin", age: 25 })).toBe(true);
    expect(isAdminAdult({ role: "admin", age: 15 })).toBe(false);
    expect(isAdminAdult({ role: "user", age: 30 })).toBe(false);
  });

  it("isHighOrAdmin 应正确判断", () => {
    expect(isHighOrAdmin({ role: "admin", score: 50 })).toBe(true);
    expect(isHighOrAdmin({ role: "user", score: 95 })).toBe(true);
    expect(isHighOrAdmin({ role: "user", score: 50 })).toBe(false);
  });

  it("getEligibleUsers 应筛选符合条件的用户", () => {
    const result = getEligibleUsers(users);
    expect(result.length).toBe(2); // Alice, Charlie
    expect(result.map((u) => u.name)).toEqual(["Alice", "Charlie"],);
  });
});
