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
  return R.map((x) => x * 2)(arr);
}

// 1b: 筛选成年用户 — 用 R.filter
function filterAdults(userList) {
  return R.filter((user) => user.age >= 18)(userList);
}

// 1c: 求和 — 用 R.reduce
function sumAll(arr) {
  return R.reduce((acc, curr) => acc + curr, 0)(arr);
}

// 练习2: Ramda 自动柯里化
// Ramda 的函数都是自动柯里化的，可以直接部分应用

// 2a: 使用 R.add / R.multiply 创建特定函数
const increment = R.add(1);
const double = R.multiply(2);

// 2b: 用 R.prop 创建取 name 的函数
const getName = R.prop("name");

// 2c: 用 R.propEq 创建判断 name 是否为 'Alice' 的函数
const isAlice = R.propEq("Alice", "name");

// 练习3: Ramda 设计哲学问答（写在注释里）
//
// 3a. Ramda 的函数数据参数为什么要放在最后？
//
// 为了配合自动柯里化实现 point-free 风格。把数据放在最后，
// 可以先部分应用变换函数，得到一个"等待数据"的函数，然后直接
// 传给 pipe/compose 或作为回调使用，无需显式声明数据参数。
// 例如：R.map(fn) 本身就是一个可复用的变换函数，而不用写
// (arr) => arr.map(fn)。

// 3b. 对比 Ramda 的 map 和原生 Array.map，写法上有哪些不同？
//
// 1) Ramda 的 map 是自动柯里化的，可以部分应用：
//    R.map(fn)(arr) 而非 arr.map(fn)
// 2) 参数顺序相反：Ramda 先传变换函数，后传数据（函数优先，数据后置）
// 3) Ramda 的 map 可以操作 Array 以外的类型（如 Object、Functor），
//    原生 map 只是 Array 的方法

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
