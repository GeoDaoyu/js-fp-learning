// ==========================================
// Week 07 · Day 2: Either 实战 — 数据校验
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

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
  const name = formData.name;
  return name ? Either.of(name) : Either.left("Name is required");
}

// 1b: validateAge(formData) — 校验 age
// age 不存在或 < 18 → Left('Must be 18 or older')
// 否则 → Right(age)
function validateAge(formData) {
  const age = formData.age;
  return age >= 18 ? Either.of(age) : Either.left("Must be 18 or older");
}

// 1c: validateEmail(formData) — 校验 email
// email 不存在或不含 @ → Left('Invalid email')
// 否则 → Right(email)
function validateEmail(formData) {
  const email = formData.email;
  return email && email.includes("@")
    ? Either.of(email)
    : Either.left("Invalid email");
}

// 练习2: 串联校验 — 多个校验步骤，任一失败则停止
// validateForm(formData)
//   先校验 name → 再校验 age → 再校验 email
//   全部通过 → Right(formData)
//   任一失败 → Left(错误信息)
// 要求: 用 chain 串联
function validateForm(formData) {
  return validateName(formData)
    .chain(() => validateAge(formData))
    .chain(() => validateEmail(formData))
    .map(() => formData);
}

// 练习3: Either 校验与命令式校验对比（写在注释里）
//
// 3a. Either 串联校验相比传统 if (err) return err 写法有什么优势？
//
// 传统写法：
//   if (!name) return 'Name required'
//   if (!age) return 'Must be 18'
//   if (!email) return 'Invalid email'
//
// Either 版本的优势：
// ① 短路是"自动的"——Left 在链上自然停止，不需要手动 return，减少漏掉某步判断的可能
// ② 类型统一——每一步返回 Either，链条结构一致，而传统写法的 return 可能是值也可能是错误字符串
// ③ 可组合——每个校验函数是独立的纯函数，可以复用、单独测试，而不是嵌在一大段 if-return 里
// ④ 调用方统一处理——fold 在末尾集中处理成功/失败，而不是在每层 if 里分散做不同的事

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 单字段校验", () => {
  it("validateName 应校验名字", () => {
    assert.equal(validateName({ name: "Alice" }).getOrElse(""), "Alice");
    assert.ok(validateName({}) instanceof Left);
    assert.ok(validateName({ name: "" }) instanceof Left);
  });

  it("validateAge 应校验年龄", () => {
    assert.equal(validateAge({ age: 25 }).getOrElse(0), 25);
    assert.ok(validateAge({ age: 15 }) instanceof Left);
    assert.ok(validateAge({}) instanceof Left);
  });

  it("validateEmail 应校验邮箱", () => {
    assert.equal(
      validateEmail({ email: "a@b.com" }).getOrElse(""),
      "a@b.com",
    );
    assert.ok(validateEmail({ email: "invalid" }) instanceof Left);
  });
});

describe("练习2: 串联校验", () => {
  it("全部通过应返回 Right(formData)", () => {
    const data = { name: "Alice", age: 25, email: "alice@example.com" };
    const result = validateForm(data);
    assert.ok(result instanceof Right);
    assert.equal(result.getOrElse(null), data);
  });

  it("第一个字段失败应返回 Left", () => {
    const result = validateForm({ name: "", age: 25, email: "ok@ok.com" });
    assert.ok(result instanceof Left);
  });

  it("中间字段失败应返回 Left", () => {
    const result = validateForm({ name: "Bob", age: 10, email: "ok@ok.com" });
    assert.ok(result instanceof Left);
  });
});
