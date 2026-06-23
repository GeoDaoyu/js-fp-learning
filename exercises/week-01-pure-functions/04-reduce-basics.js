// ==========================================
// Week 01 · Day 4: reduce 基础用法
// ==========================================
import { describe, it, expect } from "vitest";


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 用 reduce 求和
function sum(arr) {
  return arr.reduce((a, b) => a + b);
}

// 练习2: 用 reduce 求乘积
function product(arr) {
  return arr.reduce((a, b) => a * b, 1);
}

// 练习3: 用 reduce 求最大值
function max(arr) {
  return arr.reduce((a, b) => (a > b ? a : b), -Infinity);
}

// 练习4: 用 reduce 求最小值
function min(arr) {
  return arr.reduce((a, b) => (a < b ? a : b), Infinity);
}

// 练习5: 理解初始值的影响
// 5a: reduce 不带初始值 — 计算数组元素个数（用 reduce 实现 count）
function count(arr) {
  return arr.reduce((count, _) => count + 1, 0);
}

// 5b: reduce 带初始值 0 — 计算所有正数的总和，负数视为 0
function sumPositive(arr) {
  return arr.reduce((sum, curr) => sum + (curr > 0 ? curr : 0), 0);
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: reduce 求和", () => {
  it("应返回 55", () => {
    expect(sum(numbers)).toBe(55);
  });
  it("空数组应返回正确的默认行为", () => {
    // reduce 空数组不带初始值会抛错，这是正常的 JS 行为
    expect(() => sum([])).toThrow();
  });
});

describe("练习2: reduce 求乘积", () => {
  it("应返回 3628800（10!）", () => {
    expect(product(numbers)).toBe(3628800);
  });
});

describe("练习3: reduce 求最大值", () => {
  it("应返回 10", () => {
    expect(max(numbers)).toBe(10);
  });
  it("单元素数组应返回该元素", () => {
    expect(max([42])).toBe(42);
  });
});

describe("练习4: reduce 求最小值", () => {
  it("应返回 1", () => {
    expect(min(numbers)).toBe(1);
  });
});

describe("练习5: 初始值的影响", () => {
  it("count 应返回数组长度", () => {
    expect(count(numbers)).toBe(10);
    expect(count([1, 2, 3])).toBe(3);
  });

  it("sumPositive 应将负数视为 0 并求和", () => {
    expect(sumPositive([5, -3, 7, -1, 2])).toBe(14);
  });
});
