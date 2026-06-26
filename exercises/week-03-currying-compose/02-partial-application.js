// ==========================================
// Week 03 · Day 2: 柯里化优化 + 偏函数
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: partial — 偏函数（从左固定参数）
// partial(fn, ...presetArgs) 返回新函数，接收剩余参数
function partial(fn, ...presetArgs) {
  // TODO: 返回新函数，接收剩余参数，将 presetArgs 放在前面
}

// 练习2: partialRight — 偏函数（从右固定参数）
// partialRight(fn, ...presetArgs) 返回新函数，剩余参数在前
function partialRight(fn, ...presetArgs) {
  // TODO: 返回新函数，接收剩余参数，将 presetArgs 放在后面
}

// 练习3: 对比题 — 柯里化 vs 偏函数（写在注释里）
//
// 3a. 柯里化 (currying) 和偏函数 (partial) 的核心区别是什么？
//
// TODO: 思考并写下你的理解

// 3b. 什么场景适合用偏函数而不是柯里化？
//
// TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: partial", () => {
  it("应固定前置参数", () => {
    const greet = (greeting, name) => `${greeting}, ${name}!`;
    const sayHello = partial(greet, "Hello");
    expect(sayHello("Alice")).toBe("Hello, Alice!");
    expect(sayHello("Bob")).toBe("Hello, Bob!");
  });

  it("应支持多个前置参数", () => {
    const add3 = (a, b, c) => a + b + c;
    const add5to2 = partial(add3, 5, 2);
    expect(add5to2(3)).toBe(10);
  });

  it("传入所有参数应直接执行", () => {
    const add = (a, b) => a + b;
    expect(partial(add, 3)(5)).toBe(8);
  });
});

describe("练习2: partialRight", () => {
  it("应固定后置参数", () => {
    const greet = (greeting, name, punctuation) =>
      `${greeting}, ${name}${punctuation}`;
    const excited = partialRight(greet, "!");
    expect(excited("Hi", "Bob")).toBe("Hi, Bob!");
  });

  it("应支持多个后置参数", () => {
    const format = (name, age, city) => `${name} (${age}) - ${city}`;
    const withDetails = partialRight(format, 25, "Beijing");
    expect(withDetails("Alice")).toBe("Alice (25) - Beijing");
  });
});
