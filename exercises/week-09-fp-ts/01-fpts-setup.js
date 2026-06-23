// ==========================================
// Week 09 · Day 1: fp-ts 环境搭建 & 基础语法
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe, flow } from "fp-ts/function";
import { describe, it, expect } from "vitest";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: fp-ts pipe — 替代手写 pipe/compose
// fp-ts 的 pipe 是"值先行"的管道，第一个参数是值，后续是函数
// 语法: pipe(value, fn1, fn2, fn3, ...)

// 1a: 用 pipe 重写: "hello world" → 大写 → 去空格 → 反转
function processString(str) {
  return pipe(
    str,
    (s) => s.toUpperCase(),
    (s) => s.replace(/\s/g, ""),
    (s) => s.split("").reverse().join(""),
  );
}

// 1b: 用 pipe 重写: 数字数组 → filter 偶数 → map 翻倍 → reduce 求和
function sumOfDoubledEvens(arr) {
  return pipe(
    arr,
    (xs) => xs.filter((x) => x % 2 === 0),
    (xs) => xs.map((x) => x * 2),
    (xs) => xs.reduce((acc, x) => acc + x, 0),
  );
}

// 练习2: flow — 创建函数组合（不立即执行）
// flow 和 pipe 类似，但 flow 不传第一个值，返回一个组合后的函数
// 语法: flow(fn1, fn2, fn3) 等价于 x => pipe(x, fn1, fn2, fn3)

// 2a: 用 flow 创建一个函数，将字符串数组转为大写并排序
const toUpperSorted = flow(
  (arr) => arr.map((s) => s.toUpperCase()),
  (arr) => [...arr].sort(),
);

// 2b: 用 flow 创建一个函数，计算数组所有偶数的平方和
const sumOfEvenSquares = flow(
  (arr) => arr.filter((x) => x % 2 === 0),
  (arr) => arr.map((x) => x * x),
  (arr) => arr.reduce((acc, x) => acc + x, 0),
);

// 练习3: fp-ts vs 手写 pipe 对比（写在注释里）
//
// 3a. fp-ts 的 pipe(value, fn1, fn2) 和我们手写的 pipe(fn1, fn2)(value)
//     在类型推断上有什么优势（TypeScript 场景）？
//
// 手写 pipe 的类型签名通常是：
//   pipe(fn1, fn2)(value)
//   → 先组合函数，再传入值。但 TypeScript 很难推断每一步的中间类型，
//     因为 "组合函数" 这个动作本身需要知道 fn1 的输出 = fn2 的输入，
//     而手写 pipe 的类型声明往往只能写成 "任意函数 → 任意函数"，
//     中间类型被擦除了。
//
// fp-ts 的 pipe(value, fn1, fn2) 优势在于：
//   - 值先行，TypeScript 从 value 的类型出发，可以逐步推断每一次
//     函数调用后的类型变化，每一步都有精确的类型信息。
//   - 比如 pipe("hello", s => s.length, n => n * 2)，
//     TS 能推断: string → number → number，每一步都明确。
//   - 手写 pipe 要做同样的类型推断，需要写复杂的泛型重载
//     （每个参数数量都要单独声明），而 fp-ts 已经帮你做好了。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: pipe", () => {
  it("processString 应正确转换", () => {
    expect(processString("hello world")).toBe("DLROWOLLEH");
  });

  it("sumOfDoubledEvens 应正确计算", () => {
    // [1,2,3,4,5,6] → evens [2,4,6] → doubled [4,8,12] → sum 24
    expect(sumOfDoubledEvens([1, 2, 3, 4, 5, 6])).toBe(24);
  });
});

describe("练习2: flow", () => {
  it("toUpperSorted 应转为大写并排序", () => {
    expect(toUpperSorted(["banana", "apple", "cherry"])).toEqual([
      "APPLE",
      "BANANA",
      "CHERRY",
    ]);
  });

  it("sumOfEvenSquares 应计算偶数的平方和", () => {
    // [1,2,3,4] → evens [2,4] → squares [4,16] → sum 20
    expect(sumOfEvenSquares([1, 2, 3, 4])).toBe(20);
  });
});
