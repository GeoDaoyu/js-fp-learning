// ==========================================
// Week 03 · Day 1: 柯里化概念 + 简易实现
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: curry2 — 手动柯里化二元函数
// 接收一个 (a, b) => ... 的函数，返回 a => b => ...
function curry2(fn) {
  return (a) => (b) => fn(a, b);
}

// 练习2: curry3 — 手动柯里化三元函数
// 接收一个 (a, b, c) => ... 的函数，返回 a => b => c => ...
function curry3(fn) {
  return (a) => (b) => (c) => fn(a, b, c);
}

// 练习3: autoCurry — 自动柯里化任意函数
// 根据 fn.length 自动判断是否需要继续接收参数
// 当累计参数 >= fn.length 时调用原函数
function autoCurry(fn) {
  return (...accumulated) => {
    if (accumulated.length >= fn.length) return fn(...accumulated);
    return (...more) => autoCurry(fn)(...accumulated, ...more);
  };
}

// 练习4: 柯里化问答（写在注释里）
//
// 4a. 柯里化与普通多参数函数调用有什么区别？举例说明。
//
// 普通多参数函数一次性接收所有参数：add(1, 2, 3)。
// 柯里化把它拆成单参数函数的链：add(1)(2)(3)，每一步只接一个参数。
// 关键收益是支持偏函数应用：const add10 = add(10) 得到一个"加10"的专用函数，
// 后续只需 add10(3) === 13，无需重复传第一个参数。

// 4b. fn.length 在柯里化中的作用是什么？有什么局限性？
//
// 作用：fn.length 返回函数声明时第一个默认参数之前的参数个数，
// 柯里化用它判断"参数是否已经收齐"。
// 局限性：
//   - 默认参数 (a, b = 10) 不计入 length（练习3最后一个测试就是这种情况）
//   - rest 参数 ...args 会让 fn.length === 0
//   - 解构参数也不计入

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: curry2", () => {
  it("应将二元函数转为柯里化形式", () => {
    const add = (a, b) => a + b;
    const curriedAdd = curry2(add);
    assert.equal(typeof curriedAdd(1), "function");
    assert.equal(curriedAdd(1)(2), 3);
  });

  it("应支持不同的二元函数", () => {
    const multiply = (a, b) => a * b;
    const curriedMul = curry2(multiply);
    assert.equal(curriedMul(3)(5), 15);
  });
});

describe("练习2: curry3", () => {
  it("应将三元函数转为柯里化形式", () => {
    const join3 = (a, b, c) => `${a}-${b}-${c}`;
    const curried = curry3(join3);
    assert.equal(curried("x")("y")("z"), "x-y-z");
  });
});

describe("练习3: autoCurry", () => {
  it("一次传所有参数应直接调用", () => {
    const add = autoCurry((a, b, c) => a + b + c);
    assert.equal(add(1, 2, 3), 6);
  });

  it("逐步传参", () => {
    const add = autoCurry((a, b, c) => a + b + c);
    assert.equal(add(1)(2)(3), 6);
  });

  it("混合传参", () => {
    const add = autoCurry((a, b, c) => a + b + c);
    assert.equal(add(1, 2)(3), 6);
    assert.equal(add(1)(2, 3), 6);
  });

  it("应支持二元函数", () => {
    const mul = autoCurry((a, b) => a * b);
    assert.equal(mul(4)(5), 20);
    assert.equal(mul(4, 5), 20);
  });

  it("fn.length 局限性：默认参数不计入", () => {
    const fn = autoCurry((a, b = 10) => a + b);
    // fn.length === 1，所以传入 1 个参数就会调用
    assert.equal(fn(5), 15);
  });
});
