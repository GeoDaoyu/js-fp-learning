// ==========================================
// Week 01 · Day 1: 纯函数 & 副作用
// ==========================================
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 判断下面函数的性质（写在注释里就行）
// 1. function greet(name) { return 'Hello ' + name; }           → 纯函数 / 副作用 ?
// 2. function logGreet(name) { console.log('Hello ' + name); }  → 纯函数 / 副作用 ?
// 3. let count = 0; function increment() { return ++count; }    → 纯函数 / 副作用 ?
// 4. function randomBetween(min, max) { return Math.random() * (max - min) + min; } → ?
// TODO: 标注每个函数的性质及原因

// 练习2: 手写 3 个纯函数
// TODO: 实现下面的函数

function square(n) {
  // TODO: 返回 n 的平方
}

function isEven(n) {
  // TODO: 判断 n 是否为偶数
}

function concatStrings(a, b) {
  // TODO: 拼接两个字符串
}

// 练习3: 手写 3 个有副作用的函数，并标注副作用类型
// TODO: 实现下面三个有副作用的函数（类型写在注释里）

// 副作用类型: _______
function updateDOM(id, text) {
  // TODO
}

// 副作用类型: _______
function saveToLocalStorage(key, value) {
  // TODO
}

// 副作用类型: _______
let counter = 0;
function incrementCounter() {
  // TODO
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe('练习2: 纯函数', () => {
  it('square(5) 应返回 25', () => {
    assert.equal(square(5), 25);
  });
  it('square(-3) 应返回 9', () => {
    assert.equal(square(-3), 9);
  });

  it('isEven(4) 应返回 true', () => {
    assert.equal(isEven(4), true);
  });
  it('isEven(7) 应返回 false', () => {
    assert.equal(isEven(7), false);
  });

  it('concatStrings 应拼接字符串', () => {
    assert.equal(concatStrings('Hello', 'World'), 'HelloWorld');
  });
});

describe('练习3: 副作用函数', () => {
  it('updateDOM 应存在且可调用', () => {
    assert.equal(typeof updateDOM, 'function');
  });

  it('saveToLocalStorage 应存在且可调用', () => {
    assert.equal(typeof saveToLocalStorage, 'function');
  });

  it('incrementCounter 应存在且可调用', () => {
    // 验证确实修改了外部变量
    const before = counter;
    incrementCounter();
    assert.notEqual(counter, before);
  });
});
