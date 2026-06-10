// ==========================================
// Week 06 · Day 1: 容器思想 & 基础函子
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 理解容器 — 一个最简单的 Container
// 实现一个 Container 类，包含:
//   - 构造函数接收 value
//   - map(fn) 方法: 将 fn 作用于 value，返回新的 Container

class Container {
  // TODO
}

// 练习2: 函子的两个要素（写在注释里）
//
// 2a. 一个 Functor（函子）需要满足哪两个条件？
//
// TODO: 回答

// 2b. Array.map 是函子吗？为什么？
//
// TODO: 回答

// 练习3: 用 Container 串联操作

// 3a: 将字符串 "hello world" 用 Container 封装
//   → map(toUpperCase) → map(去除空格) → map(反转)
//   → 最终得到 Container 包裹的结果
// toUpperCase: 全部大写
// removeSpaces: 去除所有空格
// reverse: 反转字符串

function processString(str) {
  // TODO: 使用 Container 链式处理
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Container", () => {
  it("应创建容器并支持 map", () => {
    const result = new Container(5).map((x) => x + 1).map((x) => x * 2);
    assert.ok(result instanceof Container);
  });

  it("map 应正确转换值", () => {
    const c = new Container(10);
    const result = c.map((x) => x / 2).map((x) => x.toString());
    // result 是一个 Container，需要通过某种方式取值
    assert.ok(result instanceof Container);
  });

  it("Container 应有取值方法", () => {
    const c = new Container(42);
    // 如果实现了 getValue / fold / join 之类的取值方法
    // 提示: 可以在 Container 上加一个 getValue() 方法
    if (typeof c.getValue === "function") {
      assert.equal(c.map((x) => x + 8).getValue(), 50);
    }
  });
});

describe("练习3: processString", () => {
  it("应串联处理字符串", () => {
    // "hello world" → uppercase → "HELLO WORLD" → remove spaces → "HELLOWORLD" → reverse → "DLROWOLLEH"
    const result = processString("hello world");
    // 如果实现了 getValue，可以直接比较
    if (result instanceof Container && typeof result.getValue === "function") {
      assert.equal(result.getValue(), "DLROWOLLEH");
    }
  });
});
