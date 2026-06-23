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
  return (...more) => fn(...presetArgs, ...more);
}

// 练习2: partialRight — 偏函数（从右固定参数）
// partialRight(fn, ...presetArgs) 返回新函数，剩余参数在前
function partialRight(fn, ...presetArgs) {
  return (...more) => fn(...more, ...presetArgs);
}

// 练习3: 对比题 — 柯里化 vs 偏函数（写在注释里）
//
// 3a. 柯里化 (currying) 和偏函数 (partial) 的核心区别是什么？
//
// 柯里化是结构变换：把 n 元函数拆成 n 个一元函数的链 f(a)(b)(c)，
// 每步只能传 1 个参数。
// 偏函数是参数预设：一次性固定部分参数，返回接收剩余参数的函数，
// 剩余参数可以是 1 个也可以是多个（partial(f, a)(b, c) 第二步传两个）。
// 关键区别：柯里化预设参数永远是 1 个且顺序固定，偏函数可一次预设任意多个。
// 柯里化是偏函数的特例：逐步 curry 等价于多次 partial。

// 3b. 什么场景适合用偏函数而不是柯里化？
//
// 1. 预设参数数量 ≠ 函数 arity：5 元函数想固定 2 个，柯里化拆 5 步做不到
// 2. 需要灵活的预设位置：partialRight 可从右固定，柯里化只能从左到右
// 3. 对接原生 API：arr.map(fn)、addEventListener 等多元方法用偏函数更自然
// 4. 事件回调/中间件：固定 handler 的部分参数（如 userId），让回调更简洁

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
