// ==========================================
// Week 03 · Day 4: Compose + Pipe 概念与实现
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: compose2 — 组合两个函数
// compose2(f, g)(x) → f(g(x))  （从右向左执行）
function compose2(f, g) {
  return (x) => f(g(x));
}

// 练习2: compose — 组合任意多个函数
// compose(f, g, h)(x) → f(g(h(x)))  （从右向左）
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

// 练习3: pipe — 管道（从左向右）
// pipe(f, g, h)(x) → h(g(f(x)))  （从左向右）
function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

// 练习4: compose 与 pipe 对比（写在注释里）
//
// 4a. 什么时候用 compose，什么时候用 pipe？
//
// 两者结果完全等价：pipe(f, g, h)(x) === compose(h, g, f)(x)（顺序对调）。
// 区别只在读法和心智模型：
// - compose 源自数学 f ∘ g ∘ h，compose(f, g, h) 最外层 f 最后执行，
//   贴合代数/数学语义。
// - pipe 源自 Unix |，pipe(f, g, h) 左到右就是数据流向，
//   读起来像"先 f 再 g 最后 h"的步骤列表。
// 实战选择：
// - 业务流水线（processData、ETL、shell 风）→ 用 pipe，左到右更直观
// - 底层工具库 / 代数操作 → 用 compose，贴合数学语义
// - 应用层代码通常 pipe 更友好；Ramda 默认暴露 compose
// - 关键是团队内统一，混用会增加阅读负担

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: compose2", () => {
  it("应组合两个函数（右→左）", () => {
    const add1 = (x) => x + 1;
    const double = (x) => x * 2;
    const doubleThenAdd1 = compose2(add1, double);
    assert.equal(doubleThenAdd1(3), 7); // add1(double(3)) = add1(6) = 7
  });
});

describe("练习2: compose", () => {
  it("应组合多个函数（右→左）", () => {
    const add1 = (x) => x + 1;
    const double = (x) => x * 2;
    const square = (x) => x * x;

    const fn = compose(add1, double, square);
    // add1(double(square(3))) = add1(double(9)) = add1(18) = 19
    assert.equal(fn(3), 19);
  });

  it("单函数应原样返回", () => {
    const fn = compose((x) => x * 2);
    assert.equal(fn(5), 10);
  });
});

describe("练习3: pipe", () => {
  it("应串联多个函数（左→右）", () => {
    const add1 = (x) => x + 1;
    const double = (x) => x * 2;
    const square = (x) => x * x;

    const fn = pipe(add1, double, square);
    // square(double(add1(3))) = square(double(4)) = square(8) = 64
    assert.equal(fn(3), 64);
  });

  it("pipe 和 compose 对调顺序结果相同", () => {
    const f = (x) => x + 1;
    const g = (x) => x * 2;
    const h = (x) => x - 3;

    // pipe(f, g, h) 应从左到右：h(g(f(x)))
    assert.equal(pipe(f, g, h)(5), compose(h, g, f)(5));
  });
});
