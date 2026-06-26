// ==========================================
// Week 06 · Day 4: Maybe 实战 — 空值安全处理
// ==========================================
import { describe, it, expect } from "vitest";


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
  constructor(value) {
    super();
    this._value = value;
  }
  map(fn) {
    return Maybe.of(fn(this._value));
  }
  chain(fn) {
    return fn(this._value);
  }
  getOrElse(_) {
    return this._value;
  }
}

class Nothing extends Maybe {
  map(_) {
    return this;
  }
  chain(_) {
    return this;
  }
  getOrElse(defaultVal) {
    return defaultVal;
  }
}

// 练习1: 安全访问多层嵌套数据
// 需求: 从 API 响应中安全提取 user.address.city
// 传统写法需要多次 if 判空，用 Maybe 改写

// 示例数据结构（模拟不完整的 API 响应）:
const apiResponse1 = {
  data: { user: { name: "Alice", address: { city: "Beijing" } } },
};
const apiResponse2 = { data: { user: { name: "Bob" } } }; // 没有 address
const apiResponse3 = { data: null };

// 1a: getCity(response) — 安全获取 data.user.address.city
function getCity(response) {
  // TODO: 安全获取 data.user.address.city — 用 Maybe 链式 .map() 避免多层判空
}

// 练习2: Maybe 处理表单数据
// 场景: 用户表单，有些字段可能为空

// 2a: formatGreeting(formData) — 安全格式化问候语
// 如果 name 存在 → "Hello, {name}!"
// 如果 name 不存在 → "Hello, Guest!"
function formatGreeting(formData) {
  // TODO: 安全格式化问候语 — 有 name 返回 "Hello, {name}!"，否则返回 "Hello, Guest!"
}

// 2b: getAgeInMonths(formData) — 安全计算年龄（月）
// 如果 age 存在 → age * 12
// 如果 age 不存在 → null 或不处理
function getAgeInMonths(formData) {
  // TODO: 安全计算年龄（月）— age 存在返回 Just(age * 12)，否则返回 Nothing
}

// 练习3: Maybe 实战反思（写在注释里）
//
// 3a. Maybe 比传统的 if (val !== null) 好在哪？有什么不足？
//
// TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 安全访问嵌套数据", () => {
  it("完整数据应正确获取 city", () => {
    expect(getCity(apiResponse1).getOrElse("Unknown")).toBe("Beijing");
  });

  it("缺少 address 应返回默认值", () => {
    expect(getCity(apiResponse2).getOrElse("Unknown")).toBe("Unknown");
  });

  it("data 为 null 应返回默认值", () => {
    expect(getCity(apiResponse3).getOrElse("Unknown")).toBe("Unknown");
  });

  it("不应抛出异常", () => {
    // 即使数据结构不完整，也不应抛错
    expect(() => getCity(apiResponse2)).not.toThrow();
    expect(() => getCity(apiResponse3)).not.toThrow();
  });
});

describe("练习2: 表单数据", () => {
  it("formatGreeting 有名字时应正确格式化", () => {
    expect(formatGreeting({ name: "Alice", age: 25 })).toBe("Hello, Alice!");
  });

  it("formatGreeting 无名字应使用默认", () => {
    expect(formatGreeting({ age: 25 })).toBe("Hello, Guest!");
    expect(formatGreeting({})).toBe("Hello, Guest!");
  });

  it("getAgeInMonths 应正确计算", () => {
    expect(getAgeInMonths({ name: "A", age: 5 }).getOrElse(null)).toBe(60);
  });

  it("getAgeInMonths 缺 age 应返回 Nothing", () => {
    expect(getAgeInMonths({ name: "A" }) instanceof Nothing).toBe(true);
  });
});
