// ==========================================
// Week 09 · Day 4: fp-ts 数组模块 & 常用数据结构
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";
import { describe, it, expect } from "vitest";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: fp-ts Array 模块基本操作
// A.map(fn)(arr), A.filter(pred)(arr), A.reduce(initial, fn)(arr)
// 注意: fp-ts 函数的参数顺序（数据在最后，函数在前 → 适合 pipe）

// 1a: A.map — 每个元素翻倍
function doubleAll(arr) {
  return pipe(arr, A.map((x) => x * 2));
}

// 1b: A.filter — 筛选偶数
function filterEven(arr) {
  return pipe(arr, A.filter((x) => x % 2 === 0));
}

// 1c: A.reduce — 求和
function sumAll(arr) {
  return pipe(arr, A.reduce(0, (acc, x) => acc + x));
}

// 练习2: A.lookup — 安全索引访问
// A.lookup(index)(arr) → Option<element>
// index 越界返回 O.none

// 2a: safeGetAt(arr, index) — 安全获取指定位置元素
function safeGetAt(arr, index) {
  return A.lookup(index)(arr);
}

// 练习3: 综合 — 用 fp-ts 串联数组操作
// 需求: 获取数组中前三个偶数的平方
// 1. filter 偶数 → 2. take 3 → 3. map 平方
function firstThreeEvenSquares(arr) {
  return pipe(
    arr,
    A.filter((x) => x % 2 === 0),
    A.takeLeft(3),
    A.map((x) => x * x),
  );
}

// 练习4: 对比原生数组方法和 fp-ts 数组模块（写在注释里）
//
// 4a. fp-ts 的 Array 模块相比原生 Array 方法有什么优势？
//
// 1. 数据后置 + 柯里化：A.map(fn) 返回一个函数，天然适合 pipe
//    原生: arr.map(fn)  → 需要 (arr) => arr.map(fn) 才能传入 pipe
//    fp-ts: A.map(fn)   → 直接传给 pipe，无需包装
//
// 2. 类型安全操作：A.lookup 返回 Option，强制处理越界情况
//    原生 arr[index] 返回 undefined，类型系统无法区分"不存在"和"值是 undefined"
//
// 3. 不可变保证：fp-ts 的 Array 操作始终返回新数组
//    原生 sort/reverse 等方法会修改原数组，容易出错
//
// 4. 函数组合：A.filter、A.map、A.reduce 等可以直接作为函数传递和组合
//    不需要像原生方法那样用箭头函数包装

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Array 基本操作", () => {
  it("doubleAll", () => {
    expect(doubleAll([1, 2, 3])).toEqual([2, 4, 6]);
  });

  it("filterEven", () => {
    expect(filterEven([1, 2, 3, 4])).toEqual([2, 4]);
  });

  it("sumAll", () => {
    expect(sumAll([1, 2, 3, 4, 5])).toBe(15);
  });
});

describe("练习2: lookup", () => {
  it("有效索引应返回 some", () => {
    const result = safeGetAt(["a", "b", "c"], 1);
    expect(O.isSome(result)).toBe(true);
    expect(pipe(result, O.getOrElse(() => "x"))).toBe("b");
  });

  it("越界索引应返回 none", () => {
    const result = safeGetAt(["a", "b", "c"], 99);
    expect(O.isNone(result)).toBe(true);
  });
});

describe("练习3: 综合", () => {
  it("firstThreeEvenSquares 应正确计算", () => {
    // [1,2,3,4,5,6,7,8] → evens [2,4,6,8] → take 3 [2,4,6] → squares [4,16,36]
    expect(firstThreeEvenSquares([1, 2, 3, 4, 5, 6, 7, 8])).toEqual([4, 16, 36]);
  });

  it("不足三个应返回所有", () => {
    expect(firstThreeEvenSquares([1, 2, 3])).toEqual([4]);
  });
});
