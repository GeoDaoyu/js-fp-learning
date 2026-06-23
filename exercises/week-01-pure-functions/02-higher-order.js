// ==========================================
// Week 01 · Day 2: 一等公民函数 & 高阶函数入门
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 函数赋值、传参、返回函数

// 1a: 将匿名函数赋值给变量 greet
const greet = (name) => `Hello, ${name}!`; // TODO: 赋值一个函数，接收 name，返回 'Hello, {name}!'

// 1b: 编写一个函数 callWith5，接收一个函数 fn，用 5 作为参数调用它
function callWith5(fn) {
  return fn(5);
}

// 1c: 编写一个函数 makeMultiplier，接收 n，返回一个函数，该函数接收 x 并返回 x * n
function makeMultiplier(n) {
  return (x) => x * n;
}

// 练习2: 手写高阶函数

// 2a: 实现 repeat(times, fn) — 执行 fn 共 times 次，将每次结果收集到数组返回
function repeat(times, fn) {
  return new Array(times).fill(0).map(() => fn());
}

// 2b: 实现 twice(fn, x) — 对 x 连续应用 fn 两次，即 fn(fn(x))
function twice(fn, x) {
  return fn(fn(x));
}

// 练习3: 用 map 改写循环
const numbers = [1, 2, 3, 4, 5];

// 3a: 将每个数翻倍（替代 for 循环）
function doubleArray(arr) {
  return arr.map((v) => v * 2);
}

// 3b: 将每个数转为字符串
function stringifyArray(arr) {
  return arr.map((v) => String(v));
}

// 3c: 求每个数的平方再 +1
function squarePlusOne(arr) {
  return arr.map((v) => v * v + 1);
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 函数是一等公民", () => {
  it("greet 应返回问候语", () => {
    expect(typeof greet).toBe("function");
    expect(greet("World")).toBe("Hello, World!");
  });

  it("callWith5 应用 5 调用传入的函数", () => {
    const double = (x) => x * 2;
    expect(callWith5(double)).toBe(10);
  });

  it("makeMultiplier 应返回乘法函数", () => {
    const triple = makeMultiplier(3);
    expect(typeof triple).toBe("function");
    expect(triple(7)).toBe(21);
  });
});

describe("练习2: 高阶函数", () => {
  it("repeat 应执行 fn 指定次数并返回结果数组", () => {
    let i = 0;
    const result = repeat(4, () => i++);
    expect(result).toEqual([0, 1, 2, 3]);
  });

  it("twice 应对 x 连续应用 fn 两次", () => {
    const addOne = (x) => x + 1;
    expect(twice(addOne, 5)).toBe(7);
  });
});

describe("练习3: map 改写循环", () => {
  it("doubleArray 应返回翻倍后的数组", () => {
    expect(doubleArray(numbers)).toEqual([2, 4, 6, 8, 10]);
  });

  it("stringifyArray 应返回字符串数组", () => {
    expect(stringifyArray(numbers)).toEqual(["1", "2", "3", "4", "5"]);
  });

  it("squarePlusOne 应返回平方+1的数组", () => {
    expect(squarePlusOne([1, 2, 3])).toEqual([2, 5, 10]);
  });
});
