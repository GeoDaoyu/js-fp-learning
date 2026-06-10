// ==========================================
// Week 09 · Day 3: fp-ts Either（错误处理）
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: fp-ts Either 基本操作
// E.right(value) → 正常
// E.left(error)  → 错误
// E.map(fn)(either) → 映射
// E.chain(fn)(either) → 展平
// E.fold(leftFn, rightFn)(either) → 同时处理两种
// E.getOrElse(() => defaultVal)(either) → 取值
// E.tryCatch(fn, onError)(...) → 捕获异常

// 1a: validatePositive(n) → n > 0 ? E.right(n) : E.left('not positive')
function validatePositive(n) {
  // TODO
}

// 1b: validateEven(n) → n % 2 === 0 ? E.right(n) : E.left('not even')
function validateEven(n) {
  // TODO
}

// 1c: 串联校验 validatePositive → validateEven
// 用 pipe + E.chain
function validateNumber(n) {
  // TODO
}

// 练习2: E.tryCatch — 捕获异常为 Either
// 将可能抛错的函数转为 Either

// 2a: safeParseJSON(str) — 用 E.tryCatch 解析 JSON
function safeParseJSON(str) {
  // TODO: E.tryCatch(() => JSON.parse(str), (e) => String(e.message))
}

// 练习3: 对比手写 Either 和 fp-ts Either（写在注释里）
//
// 3a. fp-ts Either 和我们手写的版本在使用方式上有什么不同？
//
// TODO: 回答

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Either 基本操作", () => {
  it("validatePositive 应正确判断", () => {
    assert.ok(E.isRight(validatePositive(5)));
    assert.ok(E.isLeft(validatePositive(-1)));
    assert.equal(
      pipe(validatePositive(10), E.getOrElse(() => 0)),
      10,
    );
  });

  it("validateEven 应正确判断", () => {
    assert.ok(E.isRight(validateEven(4)));
    assert.ok(E.isLeft(validateEven(3)));
  });

  it("validateNumber 串联校验", () => {
    assert.ok(E.isRight(validateNumber(6)));
    assert.ok(E.isLeft(validateNumber(-2)));
    assert.ok(E.isLeft(validateNumber(3)));
  });

  it("validateNumber 返回正确的值", () => {
    const result = pipe(validateNumber(8), E.getOrElse(() => -1));
    assert.equal(result, 8);
  });
});

describe("练习2: tryCatch", () => {
  it("safeParseJSON 正确 JSON", () => {
    const result = pipe(
      safeParseJSON('{"name":"Alice"}'),
      E.map((o) => o.name),
      E.getOrElse(() => "error"),
    );
    assert.equal(result, "Alice");
  });

  it("safeParseJSON 错误 JSON", () => {
    const result = safeParseJSON("{invalid}");
    assert.ok(E.isLeft(result));
  });
});
