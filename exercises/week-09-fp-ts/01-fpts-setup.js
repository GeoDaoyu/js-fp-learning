// ==========================================
// Week 09 · Day 1: fp-ts 环境搭建 & 基础语法
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe, flow } from "fp-ts/function";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: fp-ts pipe — 替代手写 pipe/compose
// fp-ts 的 pipe 是"值先行"的管道，第一个参数是值，后续是函数
// 语法: pipe(value, fn1, fn2, fn3, ...)

// 1a: 用 pipe 重写: "hello world" → 大写 → 去空格 → 反转
function processString(str) {
  // TODO: 用 pipe
}

// 1b: 用 pipe 重写: 数字数组 → filter 偶数 → map 翻倍 → reduce 求和
function sumOfDoubledEvens(arr) {
  // TODO: 用 pipe
}

// 练习2: flow — 创建函数组合（不立即执行）
// flow 和 pipe 类似，但 flow 不传第一个值，返回一个组合后的函数
// 语法: flow(fn1, fn2, fn3) 等价于 x => pipe(x, fn1, fn2, fn3)

// 2a: 用 flow 创建一个函数，将字符串数组转为大写并排序
const toUpperSorted = null; // TODO: 用 flow 定义

// 2b: 用 flow 创建一个函数，计算数组所有偶数的平方和
const sumOfEvenSquares = null; // TODO: 用 flow 定义

// 练习3: fp-ts vs 手写 pipe 对比（写在注释里）
//
// 3a. fp-ts 的 pipe(value, fn1, fn2) 和我们手写的 pipe(fn1, fn2)(value)
//     在类型推断上有什么优势（TypeScript 场景）？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: pipe", () => {
  it("processString 应正确转换", () => {
    assert.equal(processString("hello world"), "DLROWOLLEH");
  });

  it("sumOfDoubledEvens 应正确计算", () => {
    // [1,2,3,4,5,6] → evens [2,4,6] → doubled [4,8,12] → sum 24
    assert.equal(sumOfDoubledEvens([1, 2, 3, 4, 5, 6]), 24);
  });
});

describe("练习2: flow", () => {
  it("toUpperSorted 应转为大写并排序", () => {
    assert.deepEqual(
      toUpperSorted(["banana", "apple", "cherry"]),
      ["APPLE", "BANANA", "CHERRY"],
    );
  });

  it("sumOfEvenSquares 应计算偶数的平方和", () => {
    // [1,2,3,4] → evens [2,4] → squares [4,16] → sum 20
    assert.equal(sumOfEvenSquares([1, 2, 3, 4]), 20);
  });
});
