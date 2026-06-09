// ==========================================
// Week 01 · Day 4: reduce 基础用法
// ==========================================
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 用 reduce 求和
function sum(arr) {
  // TODO: 用 arr.reduce(...) 实现
}

// 练习2: 用 reduce 求乘积
function product(arr) {
  // TODO: 用 arr.reduce(...) 实现
}

// 练习3: 用 reduce 求最大值
function max(arr) {
  // TODO: 用 arr.reduce(...) 实现，禁止用 Math.max
}

// 练习4: 用 reduce 求最小值
function min(arr) {
  // TODO: 用 arr.reduce(...) 实现，禁止用 Math.min
}

// 练习5: 理解初始值的影响
// 5a: reduce 不带初始值 — 计算数组元素个数（用 reduce 实现 count）
function count(arr) {
  // TODO: 用 reduce 实现，不带初始值
}

// 5b: reduce 带初始值 0 — 计算所有正数的总和，负数视为 0
function sumPositive(arr) {
  // TODO: 用 reduce 实现，初始值设为 0
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe('练习1: reduce 求和', () => {
  it('应返回 55', () => {
    assert.equal(sum(numbers), 55);
  });
  it('空数组应返回正确的默认行为', () => {
    // reduce 空数组不带初始值会抛错，这是正常的 JS 行为
    assert.throws(() => sum([]));
  });
});

describe('练习2: reduce 求乘积', () => {
  it('应返回 3628800（10!）', () => {
    assert.equal(product(numbers), 3628800);
  });
});

describe('练习3: reduce 求最大值', () => {
  it('应返回 10', () => {
    assert.equal(max(numbers), 10);
  });
  it('单元素数组应返回该元素', () => {
    assert.equal(max([42]), 42);
  });
});

describe('练习4: reduce 求最小值', () => {
  it('应返回 1', () => {
    assert.equal(min(numbers), 1);
  });
});

describe('练习5: 初始值的影响', () => {
  it('count 应返回数组长度', () => {
    assert.equal(count(numbers), 10);
    assert.equal(count([1, 2, 3]), 3);
  });

  it('sumPositive 应将负数视为 0 并求和', () => {
    assert.equal(sumPositive([5, -3, 7, -1, 2]), 14);
  });
});
