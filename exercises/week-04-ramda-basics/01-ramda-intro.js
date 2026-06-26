// ==========================================
// Week 04 · Day 1: Ramda 入门 & 核心理念
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it, expect } from "vitest";


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
  // TODO: 用 R.map 将数组每个元素翻倍
}

// 1b: 筛选成年用户 — 用 R.filter
function filterAdults(userList) {
  // TODO: 用 R.filter 筛选年龄 >= 18 的用户
}

// 1c: 求和 — 用 R.reduce
function sumAll(arr) {
  // TODO: 用 R.reduce 求和
}

// 练习2: Ramda 自动柯里化
// Ramda 的函数都是自动柯里化的，可以直接部分应用

// 2a: 使用 R.add / R.multiply 创建特定函数
const increment = (n) => {
  // TODO: 用 R.add 创建加 1 函数
};
const double = (n) => {
  // TODO: 用 R.multiply 创建翻倍函数
};

// 2b: 用 R.prop 创建取 name 的函数
const getName = (obj) => {
  // TODO: 用 R.prop 获取 name 属性
};

// 2c: 用 R.propEq 创建判断 name 是否为 'Alice' 的函数
const isAlice = (obj) => {
  // TODO: 用 R.propEq 判断 name 是否为 'Alice'
};

// 练习3: Ramda 设计哲学问答（写在注释里）
//
// 3a. Ramda 的函数数据参数为什么要放在最后？
//
// TODO: 思考并写下你的理解

// 3b. 对比 Ramda 的 map 和原生 Array.map，写法上有哪些不同？
//
// TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Ramda 基本操作", () => {
  it("1a: doubleAll", () => {
    expect(doubleAll(numbers)).toEqual([2, 4, 6, 8, 10]);
  });

  it("1b: filterAdults", () => {
    const result = filterAdults(users);
    expect(result.length).toBe(2);
    expect(result.map((u) => u.name)).toEqual(["Alice", "Charlie"],);
  });

  it("1c: sumAll", () => {
    expect(sumAll(numbers)).toBe(15);
  });
});

describe("练习2: Ramda 自动柯里化", () => {
  it("increment 应 +1", () => {
    expect(increment(5)).toBe(6);
    expect(increment(-1)).toBe(0);
  });

  it("double 应翻倍", () => {
    expect(double(3)).toBe(6);
    expect(double(0)).toBe(0);
  });

  it("getName 应取 name 属性", () => {
    expect(getName({ name: "Alice" })).toBe("Alice");
    expect(users.map(getName)).toEqual(["Alice", "Bob", "Charlie"]);
  });

  it("isAlice 应判断 name", () => {
    expect(isAlice({ name: "Alice" })).toBe(true);
    expect(isAlice({ name: "Bob" })).toBe(false);
  });
});
