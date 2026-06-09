// ==========================================
// Week 01 · Day 3: filter / find / some / every
// ==========================================
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 17, active: false },
  { name: 'Charlie', age: 30, active: true },
  { name: 'Diana', age: 20, active: true },
  { name: 'Eve', age: 15, active: false },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: filter — 筛选成年用户（age >= 18）
function getAdults(userList) {
  // TODO: 用 filter 实现
}

// 练习2: find — 查找第一个名为指定名字的用户
function findByName(userList, name) {
  // TODO: 用 find 实现
}

// 练习3: some — 判断是否存在未成年用户
function hasMinor(userList) {
  // TODO: 用 some 实现
}

// 练习4: every — 判断是否所有用户都活跃
function allActive(userList) {
  // TODO: 用 every 实现
}

// 练习5: 综合 — 筛选成年用户 → 提取姓名 → 转为大写
function getAdultNamesUpper(userList) {
  // TODO: 用 filter + map 链式处理
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe('练习1: filter 筛选', () => {
  it('应筛选出年龄 >= 18 的用户', () => {
    const result = getAdults(users);
    assert.equal(result.length, 3);
    assert.deepEqual(result.map(u => u.name), ['Alice', 'Charlie', 'Diana']);
  });
});

describe('练习2: find 查找', () => {
  it('应找到 Charlie', () => {
    const result = findByName(users, 'Charlie');
    assert.equal(result.name, 'Charlie');
    assert.equal(result.age, 30);
  });

  it('找不到时应返回 undefined', () => {
    assert.equal(findByName(users, 'Zoe'), undefined);
  });
});

describe('练习3: some 判断', () => {
  it('应返回 true（存在未成年）', () => {
    assert.equal(hasMinor(users), true);
  });

  it('全部成年时应返回 false', () => {
    assert.equal(hasMinor([{ name: 'A', age: 20 }]), false);
  });
});

describe('练习4: every 判断', () => {
  it('应返回 false（有用户不活跃）', () => {
    assert.equal(allActive(users), false);
  });

  it('全部活跃时应返回 true', () => {
    assert.equal(allActive([{ name: 'A', active: true }, { name: 'B', active: true }]), true);
  });
});

describe('练习5: 综合 filter + map', () => {
  it('应返回成年用户的大写姓名数组', () => {
    assert.deepEqual(getAdultNamesUpper(users), ['ALICE', 'CHARLIE', 'DIANA']);
  });
});
