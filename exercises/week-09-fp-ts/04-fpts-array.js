// ==========================================
// Week 09 · Day 4: fp-ts 数组模块 & 常用数据结构
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe } from "fp-ts/function";
import * as A from "fp-ts/Array";
import * as O from "fp-ts/Option";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: fp-ts Array 模块基本操作
// A.map(fn)(arr), A.filter(pred)(arr), A.reduce(initial, fn)(arr)
// 注意: fp-ts 函数的参数顺序（数据在最后，函数在前 → 适合 pipe）

// 1a: A.map — 每个元素翻倍
function doubleAll(arr) {
  // TODO: 用 pipe(arr, A.map(x => x * 2))
}

// 1b: A.filter — 筛选偶数
function filterEven(arr) {
  // TODO
}

// 1c: A.reduce — 求和
function sumAll(arr) {
  // TODO
}

// 练习2: A.lookup — 安全索引访问
// A.lookup(index)(arr) → Option<element>
// index 越界返回 O.none

// 2a: safeGetAt(arr, index) — 安全获取指定位置元素
function safeGetAt(arr, index) {
  // TODO: 用 A.lookup(index)(arr)，返回 Option
}

// 练习3: 综合 — 用 fp-ts 串联数组操作
// 需求: 获取数组中前三个偶数的平方
// 1. filter 偶数 → 2. take 3 → 3. map 平方
function firstThreeEvenSquares(arr) {
  // TODO: pipe(arr, A.filter(...), A.takeLeft(3), A.map(...))
}

// 练习4: 对比原生数组方法和 fp-ts 数组模块（写在注释里）
//
// 4a. fp-ts 的 Array 模块相比原生 Array 方法有什么优势？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Array 基本操作", () => {
  it("doubleAll", () => {
    assert.deepEqual(doubleAll([1, 2, 3]), [2, 4, 6]);
  });

  it("filterEven", () => {
    assert.deepEqual(filterEven([1, 2, 3, 4]), [2, 4]);
  });

  it("sumAll", () => {
    assert.equal(sumAll([1, 2, 3, 4, 5]), 15);
  });
});

describe("练习2: lookup", () => {
  it("有效索引应返回 some", () => {
    const result = safeGetAt(["a", "b", "c"], 1);
    assert.ok(O.isSome(result));
    assert.equal(
      pipe(result, O.getOrElse(() => "x")),
      "b",
    );
  });

  it("越界索引应返回 none", () => {
    const result = safeGetAt(["a", "b", "c"], 99);
    assert.ok(O.isNone(result));
  });
});

describe("练习3: 综合", () => {
  it("firstThreeEvenSquares 应正确计算", () => {
    // [1,2,3,4,5,6,7,8] → evens [2,4,6,8] → take 3 [2,4,6] → squares [4,16,36]
    assert.deepEqual(
      firstThreeEvenSquares([1, 2, 3, 4, 5, 6, 7, 8]),
      [4, 16, 36],
    );
  });

  it("不足三个应返回所有", () => {
    assert.deepEqual(firstThreeEvenSquares([1, 2, 3]), [4]);
  });
});
