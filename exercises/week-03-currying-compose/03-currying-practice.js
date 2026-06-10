// ==========================================
// Week 03 · Day 3: 柯里化实战 — 参数复用
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 手写一组柯里化的验证函数
// greaterThan(min)(value) — value > min 返回 true
const greaterThan = null; // TODO: 实现

// lessThan(max)(value) — value < max 返回 true
const lessThan = null; // TODO: 实现

// between(min, max)(value) — min < value < max 返回 true
const between = null; // TODO: 实现（复用了 greaterThan 和 lessThan）

// 练习2: filterBy — 柯里化的过滤器
// filterBy(predicate)(array) → 返回过滤后的数组
function filterBy(predicate) {
  // TODO: 返回一个函数，接收数组并用 predicate 过滤
}

// 练习3: mapOver — 柯里化的 map
// mapOver(fn)(array) → 返回映射后的数组
function mapOver(fn) {
  // TODO: 返回一个函数，接收数组并用 fn 映射
}

// 练习4: formatCurrency — 柯里化的格式化器
// formatCurrency(symbol)(amount) → 如 formatCurrency('¥')(100) → '¥100.00'
function formatCurrency(symbol) {
  // TODO: 返回一个函数，接收金额，返回格式化字符串（保留两位小数）
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 柯里化验证函数", () => {
  it("greaterThan", () => {
    assert.equal(greaterThan(10)(15), true);
    assert.equal(greaterThan(10)(5), false);
    assert.equal(greaterThan(0)(-1), false);
  });

  it("lessThan", () => {
    assert.equal(lessThan(10)(5), true);
    assert.equal(lessThan(10)(15), false);
  });

  it("between", () => {
    assert.equal(between(0, 100)(50), true);
    assert.equal(between(0, 100)(-10), false);
    assert.equal(between(0, 100)(150), false);
  });

  it("greaterThan 可用于数组方法", () => {
    assert.deepEqual([5, 15, 3, 20].filter(greaterThan(10)), [15, 20]);
  });
});

describe("练习2: filterBy", () => {
  it("应返回柯里化的过滤函数", () => {
    const nums = [1, 2, 3, 4, 5, 6];
    const getEvens = filterBy((n) => n % 2 === 0);
    assert.deepEqual(getEvens(nums), [2, 4, 6]);
  });
});

describe("练习3: mapOver", () => {
  it("应返回柯里化的映射函数", () => {
    const doubleAll = mapOver((x) => x * 2);
    assert.deepEqual(doubleAll([1, 2, 3]), [2, 4, 6]);
  });
});

describe("练习4: formatCurrency", () => {
  it("应返回柯里化的格式化器", () => {
    const toYuan = formatCurrency("¥");
    assert.equal(toYuan(100), "¥100.00");
    assert.equal(toYuan(99.9), "¥99.90");
    assert.equal(formatCurrency("$")(50), "$50.00");
  });
});
