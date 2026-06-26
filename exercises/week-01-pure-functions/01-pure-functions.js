// ==========================================
// Week 01 · Day 1: 纯函数 & 副作用
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 判断下面函数的性质（写在注释里就行）
// 1. function greet(name) { return 'Hello ' + name; }           → ？
// 2. function logGreet(name) { console.log('Hello ' + name); }  → ？
// 3. let count = 0; function increment() { return ++count; }    → ？
// 4. function randomBetween(min, max) { return Math.random() * (max - min) + min; } → ？
// TODO: 标注每个函数的性质及原因

// 练习2: 手写 3 个纯函数
// TODO: 实现下面的函数

function square(n) {
  // TODO: 返回 n 的平方
}

function isEven(n) {
  // TODO: 判断 n 是否为偶数
}

function concatStrings(a, b) {
  // TODO: 拼接两个字符串并返回
}

// 练习3: 手写 3 个有副作用的函数，并标注副作用类型
// TODO: 实现下面三个有副作用的函数（类型写在注释里）

// TODO: 标注副作用类型
function updateDOM(id, text) {
  // TODO: 更新指定 id 元素的文本内容
}

// TODO: 标注副作用类型
function saveToLocalStorage(key, value) {
  // TODO: 将值保存到 localStorage
}

// TODO: 标注副作用类型
let counter = 0;
function incrementCounter() {
  // TODO: 自增计数器并返回新值
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
