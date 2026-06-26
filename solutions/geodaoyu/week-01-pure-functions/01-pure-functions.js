// ==========================================
// Week 01 · Day 1: 纯函数 & 副作用
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 判断下面函数的性质（写在注释里就行）
// 1. function greet(name) { return 'Hello ' + name; }           → 纯函数
// 2. function logGreet(name) { console.log('Hello ' + name); }  → 副作用 IO操作
// 3. let count = 0; function increment() { return ++count; }    → 副作用 外部变量
// 4. function randomBetween(min, max) { return Math.random() * (max - min) + min; } → 副作用 随机数
// TODO: 标注每个函数的性质及原因

// 练习2: 手写 3 个纯函数
// TODO: 实现下面的函数

function square(n) {
  return n * n;
}

function isEven(n) {
  return n % 2 === 0;
}

function concatStrings(a, b) {
  return a + b;
}

// 练习3: 手写 3 个有副作用的函数，并标注副作用类型
// TODO: 实现下面三个有副作用的函数（类型写在注释里）

// 副作用类型: IO操作
function updateDOM(id, text) {
  document.getElementById(id).innerHTML = text;
}

// 副作用类型: IO操作
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

// 副作用类型: 外部变量
let counter = 0;
function incrementCounter() {
  counter++;
  return counter;
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习2: 纯函数", () => {
  it("square(5) 应返回 25", () => {
    expect(square(5)).toBe(25);
  });
  it("square(-3) 应返回 9", () => {
    expect(square(-3)).toBe(9);
  });

  it("isEven(4) 应返回 true", () => {
    expect(isEven(4)).toBe(true);
  });
  it("isEven(7) 应返回 false", () => {
    expect(isEven(7)).toBe(false);
  });

  it("concatStrings 应拼接字符串", () => {
    expect(concatStrings("Hello", "World")).toBe("HelloWorld");
  });
});

describe("练习3: 副作用函数", () => {
  it("updateDOM 应存在且可调用", () => {
    expect(typeof updateDOM).toBe("function");
  });

  it("saveToLocalStorage 应存在且可调用", () => {
    expect(typeof saveToLocalStorage).toBe("function");
  });

  it("incrementCounter 应存在且可调用", () => {
    // 验证确实修改了外部变量
    const before = counter;
    incrementCounter();
    expect(counter).not.toBe(before);
  });
});
