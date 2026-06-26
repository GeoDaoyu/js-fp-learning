// ==========================================
// Week 03 · Day 1: 柯里化概念 + 简易实现
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: curry2 — 手动柯里化二元函数
// 接收一个 (a, b) => ... 的函数，返回 a => b => ...
function curry2(fn) {
  // TODO: 接收二元函数，返回 a => b => ... 的柯里化形式
}

// 练习2: curry3 — 手动柯里化三元函数
// 接收一个 (a, b, c) => ... 的函数，返回 a => b => c => ...
function curry3(fn) {
  // TODO: 接收三元函数，返回 a => b => c => ... 的柯里化形式
}

// 练习3: autoCurry — 自动柯里化任意函数
// 根据 fn.length 自动判断是否需要继续接收参数
// 当累计参数 >= fn.length 时调用原函数
function autoCurry(fn) {
  // TODO: 根据 fn.length 自动柯里化任意函数，累计参数足够时调用原函数
}

// 练习4: 柯里化问答（写在注释里）
//
// 4a. 柯里化与普通多参数函数调用有什么区别？举例说明。
//
// TODO: 思考并写下你的理解

// 4b. fn.length 在柯里化中的作用是什么？有什么局限性？
//
// TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: curry2", () => {
  it("应将二元函数转为柯里化形式", () => {
    const add = (a, b) => a + b;
    const curriedAdd = curry2(add);
    expect(typeof curriedAdd(1)).toBe("function");
    expect(curriedAdd(1)(2)).toBe(3);
  });

  it("应支持不同的二元函数", () => {
    const multiply = (a, b) => a * b;
    const curriedMul = curry2(multiply);
    expect(curriedMul(3)(5)).toBe(15);
  });
});

describe("练习2: curry3", () => {
  it("应将三元函数转为柯里化形式", () => {
    const join3 = (a, b, c) => `${a}-${b}-${c}`;
    const curried = curry3(join3);
    expect(curried("x")("y")("z")).toBe("x-y-z");
  });
});

describe("练习3: autoCurry", () => {
  it("一次传所有参数应直接调用", () => {
    const add = autoCurry((a, b, c) => a + b + c);
    expect(add(1, 2, 3)).toBe(6);
  });

  it("逐步传参", () => {
    const add = autoCurry((a, b, c) => a + b + c);
    expect(add(1)(2)(3)).toBe(6);
  });

  it("混合传参", () => {
    const add = autoCurry((a, b, c) => a + b + c);
    expect(add(1, 2)(3)).toBe(6);
    expect(add(1)(2, 3)).toBe(6);
  });

  it("应支持二元函数", () => {
    const mul = autoCurry((a, b) => a * b);
    expect(mul(4)(5)).toBe(20);
    expect(mul(4, 5)).toBe(20);
  });

  it("fn.length 局限性：默认参数不计入", () => {
    const fn = autoCurry((a, b = 10) => a + b);
    // fn.length === 1，所以传入 1 个参数就会调用
    expect(fn(5)).toBe(15);
  });
});
