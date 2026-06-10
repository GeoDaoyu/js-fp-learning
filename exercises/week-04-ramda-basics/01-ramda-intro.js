// ==========================================
// Week 04 · Day 1: Ramda 入门 & 核心理念
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const numbers = [1, 2, 3, 4, 5];
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 17, active: false },
  { name: "Charlie", age: 30, active: true },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 用 Ramda 重写数组基本操作
// 对比原生 JS 的 map/filter/reduce 与 Ramda 版本

// 1a: 每个数翻倍 — 用 R.map
function doubleAll(arr) {
  // TODO: 用 R.map
}

// 1b: 筛选成年用户 — 用 R.filter
function filterAdults(userList) {
  // TODO: 用 R.filter
}

// 1c: 求和 — 用 R.reduce
function sumAll(arr) {
  // TODO: 用 R.reduce
}

// 练习2: Ramda 自动柯里化
// Ramda 的函数都是自动柯里化的，可以直接部分应用

// 2a: 使用 R.add / R.multiply 创建特定函数
// const increment = ...   // TODO: 用 R.add 创建加 1 的函数
// const double = ...      // TODO: 用 R.multiply 创建翻倍的函数
const increment = null; // TODO: 用 R.add 创建
const double = null;    // TODO: 用 R.multiply 创建

// 2b: 用 R.prop 创建取 name 的函数
const getName = null; // TODO: 用 R.prop

// 2c: 用 R.propEq 创建判断 name 是否为 'Alice' 的函数
const isAlice = null; // TODO: 用 R.propEq

// 练习3: Ramda 设计哲学问答（写在注释里）
//
// 3a. Ramda 的函数数据参数为什么要放在最后？
//
// TODO: 回答

// 3b. 对比 Ramda 的 map 和原生 Array.map，写法上有哪些不同？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Ramda 基本操作", () => {
  it("1a: doubleAll", () => {
    assert.deepEqual(doubleAll(numbers), [2, 4, 6, 8, 10]);
  });

  it("1b: filterAdults", () => {
    const result = filterAdults(users);
    assert.equal(result.length, 2);
    assert.deepEqual(result.map((u) => u.name), ["Alice", "Charlie"]);
  });

  it("1c: sumAll", () => {
    assert.equal(sumAll(numbers), 15);
  });
});

describe("练习2: Ramda 自动柯里化", () => {
  it("increment 应 +1", () => {
    assert.equal(increment(5), 6);
    assert.equal(increment(-1), 0);
  });

  it("double 应翻倍", () => {
    assert.equal(double(3), 6);
    assert.equal(double(0), 0);
  });

  it("getName 应取 name 属性", () => {
    assert.equal(getName({ name: "Alice" }), "Alice");
    assert.deepEqual(users.map(getName), ["Alice", "Bob", "Charlie"]);
  });

  it("isAlice 应判断 name", () => {
    assert.equal(isAlice({ name: "Alice" }), true);
    assert.equal(isAlice({ name: "Bob" }), false);
  });
});
