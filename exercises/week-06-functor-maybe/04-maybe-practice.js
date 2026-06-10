// ==========================================
// Week 06 · Day 4: Maybe 实战 — 空值安全处理
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 复用 Day 3 的 Maybe（重新定义或引用之前实现）
// 如果不想重新写，可以直接在此处定义简化版 Maybe

class Maybe {
  static of(value) {
    return value == null ? new Nothing() : new Just(value);
  }
}

class Just extends Maybe {
  constructor(value) { super(); this._value = value; }
  map(fn) { return Maybe.of(fn(this._value)); }
  chain(fn) { return fn(this._value); }
  getOrElse(_) { return this._value; }
}

class Nothing extends Maybe {
  map(_) { return this; }
  chain(_) { return this; }
  getOrElse(defaultVal) { return defaultVal; }
}

// 练习1: 安全访问多层嵌套数据
// 需求: 从 API 响应中安全提取 user.address.city
// 传统写法需要多次 if 判空，用 Maybe 改写

// 示例数据结构（模拟不完整的 API 响应）:
const apiResponse1 = { data: { user: { name: "Alice", address: { city: "Beijing" } } } };
const apiResponse2 = { data: { user: { name: "Bob" } } }; // 没有 address
const apiResponse3 = { data: null };

// 1a: getCity(response) — 安全获取 data.user.address.city
function getCity(response) {
  // TODO: 用 Maybe 链式调用安全取值
}

// 练习2: Maybe 处理表单数据
// 场景: 用户表单，有些字段可能为空

// 2a: formatGreeting(formData) — 安全格式化问候语
// 如果 name 存在 → "Hello, {name}!"
// 如果 name 不存在 → "Hello, Guest!"
function formatGreeting(formData) {
  // TODO: 用 Maybe
}

// 2b: getAgeInMonths(formData) — 安全计算年龄（月）
// 如果 age 存在 → age * 12
// 如果 age 不存在 → null 或不处理
function getAgeInMonths(formData) {
  // TODO: 用 Maybe，返回 Maybe 实例
}

// 练习3: Maybe 实战反思（写在注释里）
//
// 3a. Maybe 比传统的 if (val !== null) 好在哪？有什么不足？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 安全访问嵌套数据", () => {
  it("完整数据应正确获取 city", () => {
    assert.equal(getCity(apiResponse1).getOrElse("Unknown"), "Beijing");
  });

  it("缺少 address 应返回默认值", () => {
    assert.equal(getCity(apiResponse2).getOrElse("Unknown"), "Unknown");
  });

  it("data 为 null 应返回默认值", () => {
    assert.equal(getCity(apiResponse3).getOrElse("Unknown"), "Unknown");
  });

  it("不应抛出异常", () => {
    // 即使数据结构不完整，也不应抛错
    assert.doesNotThrow(() => getCity(apiResponse2));
    assert.doesNotThrow(() => getCity(apiResponse3));
  });
});

describe("练习2: 表单数据", () => {
  it("formatGreeting 有名字时应正确格式化", () => {
    assert.equal(formatGreeting({ name: "Alice", age: 25 }), "Hello, Alice!");
  });

  it("formatGreeting 无名字应使用默认", () => {
    assert.equal(formatGreeting({ age: 25 }), "Hello, Guest!");
    assert.equal(formatGreeting({}), "Hello, Guest!");
  });

  it("getAgeInMonths 应正确计算", () => {
    assert.equal(getAgeInMonths({ name: "A", age: 5 }).getOrElse(null), 60);
  });

  it("getAgeInMonths 缺 age 应返回 Nothing", () => {
    assert.ok(getAgeInMonths({ name: "A" }) instanceof Nothing);
  });
});
