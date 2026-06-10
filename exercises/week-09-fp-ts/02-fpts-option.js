// ==========================================
// Week 09 · Day 2: fp-ts Option（对应 Maybe）
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: fp-ts Option 基本操作
// O.some(value) → 有值
// O.none        → 无值（注意: none 是常量，不是函数调用）
// O.map(fn)(option) → 映射
// O.chain(fn)(option) → 展平
// O.getOrElse(() => defaultVal)(option) → 取值
// O.fromNullable(value) → 创建

// 1a: safeDivide(a, b) → Option<number>
function safeDivideFP(a, b) {
  // TODO: b === 0 返回 O.none, 否则返回 O.some(a / b)
}

// 1b: safeGet(obj, key) → Option<value>
function safeGetFP(obj, key) {
  // TODO: 用 O.fromNullable
}

// 1c: safeToUpper(str) → 如果 str 非空，返回 O.some(str.toUpperCase())
//     否则 O.none
function safeToUpper(str) {
  // TODO
}

// 练习2: 用 pipe + Option 链式处理
// 模拟: 从用户数据中安全提取 profile.settings.theme

// 2a: getTheme(user) — 安全获取 user.profile.settings.theme
// 用 pipe + O.fromNullable + O.map 或 O.chain
function getTheme(user) {
  // TODO
  // 提示: pipe(
  //   user,
  //   O.fromNullable,
  //   O.map(u => u.profile),
  //   O.map(p => p.settings),
  //   O.map(s => s.theme),
  //   O.getOrElse(() => 'default')
  // )
}

// 练习3: 对比手写 Maybe 和 fp-ts Option（写在注释里）
//
// 3a. fp-ts Option 和我们手写的 Maybe 在使用上最大的不同是什么？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Option 基本操作", () => {
  it("safeDivideFP 正常除法", () => {
    const result = pipe(safeDivideFP(10, 2), O.getOrElse(() => -1));
    assert.equal(result, 5);
  });

  it("safeDivideFP 除零返回 none", () => {
    const result = pipe(safeDivideFP(10, 0), O.getOrElse(() => -1));
    assert.equal(result, -1);
  });

  it("safeGetFP 存在属性", () => {
    const result = pipe(
      safeGetFP({ name: "Alice" }, "name"),
      O.getOrElse(() => "unknown"),
    );
    assert.equal(result, "Alice");
  });

  it("safeGetFP 不存在属性", () => {
    const result = pipe(
      safeGetFP({ name: "Alice" }, "age"),
      O.getOrElse(() => "unknown"),
    );
    assert.equal(result, "unknown");
  });

  it("safeToUpper 非空字符串", () => {
    const result = pipe(safeToUpper("hello"), O.getOrElse(() => ""));
    assert.equal(result, "HELLO");
  });

  it("safeToUpper 空字符串", () => {
    const result = pipe(safeToUpper(""), O.getOrElse(() => "empty"));
    assert.equal(result, "empty");
  });
});

describe("练习2: pipe + Option", () => {
  it("完整数据应获取 theme", () => {
    const user = { profile: { settings: { theme: "dark" } } };
    assert.equal(getTheme(user), "dark");
  });

  it("缺失路径应返回默认值", () => {
    assert.equal(getTheme({}), "default");
    assert.equal(getTheme(null), "default");
  });
});
