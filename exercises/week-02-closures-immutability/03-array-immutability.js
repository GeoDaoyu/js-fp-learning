// ==========================================
// Week 02 · Day 3: 数组不可变操作
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 所有函数禁止修改原数组，必须返回新数组
// 禁止使用 for / while

// 练习1: append — 在数组末尾追加元素
function append(arr, item) {
  return [...arr, item];
}

// 练习2: prepend — 在数组开头插入元素
function prepend(arr, item) {
  return [item, ...arr];
}

// 练习3: removeAt — 删除指定索引的元素
function removeAt(arr, index) {
  return arr.filter((_, i) => i !== index);
}

// 练习4: updateAt — 更新指定索引的元素
function updateAt(arr, index, newVal) {
  return arr.map((v, i) => (i === index ? newVal : v));
}

// 练习5: insertAt — 在指定索引处插入元素（原位置及之后的元素后移）
function insertAt(arr, index, item) {
  return [...arr.slice(0, index), item, ...arr.slice(index)];
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

const original = [1, 2, 3, 4, 5];

describe("练习1: append", () => {
  it("应在末尾追加元素", () => {
    assert.deepEqual(append(original, 6), [1, 2, 3, 4, 5, 6]);
  });

  it("不应修改原数组", () => {
    const arr = [1, 2, 3];
    append(arr, 4);
    assert.deepEqual(arr, [1, 2, 3]);
  });
});

describe("练习2: prepend", () => {
  it("应在开头插入元素", () => {
    assert.deepEqual(prepend(original, 0), [0, 1, 2, 3, 4, 5]);
  });

  it("不应修改原数组", () => {
    const arr = [1, 2, 3];
    prepend(arr, 0);
    assert.deepEqual(arr, [1, 2, 3]);
  });
});

describe("练习3: removeAt", () => {
  it("应删除指定索引的元素", () => {
    assert.deepEqual(removeAt(original, 0), [2, 3, 4, 5]);
    assert.deepEqual(removeAt(original, 2), [1, 2, 4, 5]);
    assert.deepEqual(removeAt(original, 4), [1, 2, 3, 4]);
  });

  it("不应修改原数组", () => {
    const arr = [1, 2, 3];
    removeAt(arr, 1);
    assert.deepEqual(arr, [1, 2, 3]);
  });
});

describe("练习4: updateAt", () => {
  it("应更新指定索引的元素", () => {
    assert.deepEqual(updateAt(original, 0, 10), [10, 2, 3, 4, 5]);
    assert.deepEqual(updateAt(original, 4, 50), [1, 2, 3, 4, 50]);
  });

  it("不应修改原数组", () => {
    const arr = [1, 2, 3];
    updateAt(arr, 1, 99);
    assert.deepEqual(arr, [1, 2, 3]);
  });
});

describe("练习5: insertAt", () => {
  it("应在指定索引处插入元素", () => {
    assert.deepEqual(insertAt(original, 0, 0), [0, 1, 2, 3, 4, 5]);
    assert.deepEqual(insertAt(original, 2, 99), [1, 2, 99, 3, 4, 5]);
    assert.deepEqual(insertAt(original, 5, 6), [1, 2, 3, 4, 5, 6]);
  });

  it("不应修改原数组", () => {
    const arr = [1, 2, 3];
    insertAt(arr, 1, 99);
    assert.deepEqual(arr, [1, 2, 3]);
  });
});
