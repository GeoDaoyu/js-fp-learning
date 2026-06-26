// ==========================================
// Week 03 · Day 3: 柯里化实战 — 参数复用
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 手写一组柯里化的验证函数
// greaterThan(min)(value) — value > min 返回 true
const greaterThan = (min) => (value) => value > min;

// lessThan(max)(value) — value < max 返回 true
const lessThan = (max) => (value) => value < max;

// between(min, max)(value) — min < value < max 返回 true
const between = (min, max) => (value) =>
  greaterThan(min)(value) && lessThan(max)(value);

// 练习2: filterBy — 柯里化的过滤器
// filterBy(predicate)(array) → 返回过滤后的数组
function filterBy(predicate) {
  return (array) => array.filter(predicate);
}

// 练习3: mapOver — 柯里化的 map
// mapOver(fn)(array) → 返回映射后的数组
function mapOver(fn) {
  return (array) => array.map(fn);
}

// 练习4: formatCurrency — 柯里化的格式化器
// formatCurrency(symbol)(amount) → 如 formatCurrency('¥')(100) → '¥100.00'
function formatCurrency(symbol) {
  return (amount) => `${symbol}${amount.toFixed(2)}`;
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 柯里化验证函数", () => {
  it("greaterThan", () => {
    expect(greaterThan(10)(15)).toBe(true);
    expect(greaterThan(10)(5)).toBe(false);
    expect(greaterThan(0)(-1)).toBe(false);
  });

  it("lessThan", () => {
    expect(lessThan(10)(5)).toBe(true);
    expect(lessThan(10)(15)).toBe(false);
  });

  it("between", () => {
    expect(between(0, 100)(50)).toBe(true);
    expect(between(0, 100)(-10)).toBe(false);
    expect(between(0, 100)(150)).toBe(false);
  });

  it("greaterThan 可用于数组方法", () => {
    expect([5, 15, 3, 20].filter(greaterThan(10))).toEqual([15, 20]);
  });
});

describe("练习2: filterBy", () => {
  it("应返回柯里化的过滤函数", () => {
    const nums = [1, 2, 3, 4, 5, 6];
    const getEvens = filterBy((n) => n % 2 === 0);
    expect(getEvens(nums)).toEqual([2, 4, 6]);
  });
});

describe("练习3: mapOver", () => {
  it("应返回柯里化的映射函数", () => {
    const doubleAll = mapOver((x) => x * 2);
    expect(doubleAll([1, 2, 3])).toEqual([2, 4, 6]);
  });
});

describe("练习4: formatCurrency", () => {
  it("应返回柯里化的格式化器", () => {
    const toYuan = formatCurrency("¥");
    expect(toYuan(100)).toBe("¥100.00");
    expect(toYuan(99.9)).toBe("¥99.90");
    expect(formatCurrency("$")(50)).toBe("$50.00");
  });
});
