// ==========================================
// Week 02 · Day 1: 闭包原理与基础应用
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: createCounter — 闭包持有私有计数
// 返回 { inc, dec, get, reset }，外部无法直接访问 count
// inc() → count++ 并返回新值
// dec() → count-- 并返回新值
// get() → 返回当前 count
// reset() → 将 count 重置为 0，返回 0
function createCounter(initial = 0) {
  let count = initial;
  return {
    inc: () => {
      count++;
      return count;
    },
    dec: () => {
      count--;
      return count;
    },
    get: () => {
      return count;
    },
    reset: () => {
      count = 0;
      return count;
    },
  };
}

// 练习2: createSecret — 闭包封装私有数据
// 返回 { getSecret, setSecret }
// getSecret() → 返回当前 secret
// setSecret(newVal) → 更新 secret，返回更新后的值
function createSecret(initialSecret) {
  let secret = initialSecret;
  return {
    getSecret: () => secret,
    setSecret: (newVal) => {
      secret = newVal;
      return secret;
    },
  };
}

// 练习3: 闭包分析（写在注释里）
//
// 3a. 以下代码是否形成了闭包？简述原因。
//
// function makeGreeter(name) {
//   return function() { return 'Hi ' + name; };
// }
// const greet = makeGreeter('Alice');
// greet();
//
// 形成了闭包。makeGreeter 返回的内部函数引用了外层作用域的 name 变量，
// 且该引用在 makeGreeter 执行完毕后依然保持，greet() 调用时仍可访问 name。

// 3b. 闭包与普通函数的本质区别是什么？（一句话）
//
// 闭包能"记住"其定义时所在词法作用域的变量，即使外部函数已执行完毕；
// 普通函数只能访问自身参数和全局变量。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: createCounter", () => {
  it("基本功能: inc / dec / get", () => {
    const c = createCounter();
    assert.equal(c.get(), 0);
    assert.equal(c.inc(), 1);
    assert.equal(c.inc(), 2);
    assert.equal(c.dec(), 1);
    assert.equal(c.get(), 1);
  });

  it("支持自定义初始值", () => {
    const c = createCounter(10);
    assert.equal(c.get(), 10);
    assert.equal(c.inc(), 11);
  });

  it("reset 应重置为 0", () => {
    const c = createCounter(5);
    c.inc();
    c.inc();
    assert.equal(c.reset(), 0);
    assert.equal(c.get(), 0);
  });

  it("count 应私有，外部无法直接访问", () => {
    const c = createCounter();
    assert.equal(typeof c.count, "undefined");
  });

  it("多个实例应独立", () => {
    const a = createCounter(0);
    const b = createCounter(100);
    a.inc();
    assert.equal(a.get(), 1);
    assert.equal(b.get(), 100);
  });
});

describe("练习2: createSecret", () => {
  it("基本功能: get / set", () => {
    const s = createSecret("my-password");
    assert.equal(s.getSecret(), "my-password");
    assert.equal(s.setSecret("new-password"), "new-password");
    assert.equal(s.getSecret(), "new-password");
  });

  it("secret 应私有，外部无法直接访问", () => {
    const s = createSecret("hidden");
    assert.equal(typeof s.secret, "undefined");
    assert.equal(typeof s._secret, "undefined");
  });

  it("多个实例应独立", () => {
    const a = createSecret("a");
    const b = createSecret("b");
    assert.equal(a.getSecret(), "a");
    assert.equal(b.getSecret(), "b");
  });
});
