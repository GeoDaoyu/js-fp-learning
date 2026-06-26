// ==========================================
// Week 07 · Day 2: Either 实战 — 数据校验
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// Either 基础类定义（复用或重新定义）
class Either {
  static of(value) { return new Right(value); }
  static left(value) { return new Left(value); }
  static right(value) { return new Right(value); }
}

class Right extends Either {
  constructor(value) { super(); this._value = value; }
  map(fn) { return Either.of(fn(this._value)); }
  chain(fn) { return fn(this._value); }
  fold(_, rightFn) { return rightFn(this._value); }
  getOrElse(_) { return this._value; }
}

class Left extends Either {
  constructor(value) { super(); this._value = value; }
  map(_) { return this; }
  chain(_) { return this; }
  fold(leftFn, _) { return leftFn(this._value); }
  getOrElse(defaultVal) { return defaultVal; }
}

// 练习1: 用 Either 实现表单字段校验
// 校验规则:
//   - name: 不能为空
//   - age: 必须 >= 18
//   - email: 必须包含 @

// 1a: validateName(formData) — 校验 name
// name 为空 → Left('Name is required')
// 否则 → Right(name)
function validateName(formData) {
  // TODO: 校验 name 不能为空 —— 空则 Left('Name is required')，否则 Right(name)
}

// 1b: validateAge(formData) — 校验 age
// age 不存在或 < 18 → Left('Must be 18 or older')
// 否则 → Right(age)
function validateAge(formData) {
  // TODO: 校验 age >= 18 —— 不足则 Left('Must be 18 or older')，否则 Right(age)
}

// 1c: validateEmail(formData) — 校验 email
// email 不存在或不含 @ → Left('Invalid email')
// 否则 → Right(email)
function validateEmail(formData) {
  // TODO: 校验 email 包含 @ —— 不含则 Left('Invalid email')，否则 Right(email)
}

// 练习2: 串联校验 — 多个校验步骤，任一失败则停止
// validateForm(formData)
//   先校验 name → 再校验 age → 再校验 email
//   全部通过 → Right(formData)
//   任一失败 → Left(错误信息)
// 要求: 用 chain 串联
function validateForm(formData) {
  // TODO: 用 chain 串联校验 name → age → email，全部通过返回 Right(formData)，任一失败短路返回 Left
}

// 练习3: Either 校验与命令式校验对比（写在注释里）
//
// 3a. Either 串联校验相比传统 if (err) return err 写法有什么优势？
//
// TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 单字段校验", () => {
  it("validateName 应校验名字", () => {
    expect(validateName({ name: "Alice" }).getOrElse("")).toBe("Alice");
    expect(validateName({}) instanceof Left).toBe(true);
    expect(validateName({ name: "" }) instanceof Left).toBe(true);
  });

  it("validateAge 应校验年龄", () => {
    expect(validateAge({ age: 25 }).getOrElse(0)).toBe(25);
    expect(validateAge({ age: 15 }) instanceof Left).toBe(true);
    expect(validateAge({}) instanceof Left).toBe(true);
  });

  it("validateEmail 应校验邮箱", () => {
    expect(validateEmail({ email: "a@b.com" }).getOrElse("")).toBe("a@b.com",);
    expect(validateEmail({ email: "invalid" }) instanceof Left).toBe(true);
  });
});

describe("练习2: 串联校验", () => {
  it("全部通过应返回 Right(formData)", () => {
    const data = { name: "Alice", age: 25, email: "alice@example.com" };
    const result = validateForm(data);
    expect(result instanceof Right).toBe(true);
    expect(result.getOrElse(null)).toBe(data);
  });

  it("第一个字段失败应返回 Left", () => {
    const result = validateForm({ name: "", age: 25, email: "ok@ok.com" });
    expect(result instanceof Left).toBe(true);
  });

  it("中间字段失败应返回 Left", () => {
    const result = validateForm({ name: "Bob", age: 10, email: "ok@ok.com" });
    expect(result instanceof Left).toBe(true);
  });
});
