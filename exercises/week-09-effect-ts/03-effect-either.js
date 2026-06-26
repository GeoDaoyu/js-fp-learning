// ==========================================
// Week 09 · Day 3: Effect-TS Either（错误处理）
// ==========================================
// 需要先安装 effect: npm install effect
import { pipe } from "effect";
import { Either as E } from "effect";
import { describe, it, expect } from "vitest";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: Effect-TS Either 基本操作
// E.right(value) → 正常
// E.left(error)  → 错误
// E.map(fn, either) → 映射
// E.flatMap(fn, either) → 展平
// E.match({ onLeft, onRight }) → 同时处理两种
// E.getOrElse(() => defaultVal, either) → 取值
// 注: Effect-TS 没有 E.tryCatch，需要手动 try/catch 包装

// 1a: validatePositive(n) → n > 0 ? E.right(n) : E.left('not positive')
function validatePositive(n) {
  // TODO: n > 0 返回 E.right(n)，否则 E.left('not positive')
}

// 1b: validateEven(n) → n % 2 === 0 ? E.right(n) : E.left('not even')
function validateEven(n) {
  // TODO: n % 2 === 0 返回 E.right(n)，否则 E.left('not even')
}

// 1c: 串联校验 validatePositive → validateEven
// 用 pipe + E.flatMap
function validateNumber(n) {
  // TODO: 用 pipe + E.flatMap 串联 validatePositive → validateEven
}

// 练习2: 手动 try/catch — 捕获异常为 Either
// Effect-TS 的 Either 模块不提供 tryCatch，直接用 try/catch 包装

// 2a: safeParseJSON(str) — 解析 JSON，异常转 Either.left
function safeParseJSON(str) {
  // TODO: 手动 try/catch 解析 JSON，成功返回 E.right，失败返回 E.left
}

// 练习3: 对比手写 Either 和 Effect-TS Either（写在注释里）
//
// 3a. Effect-TS Either 和我们手写的版本在使用方式上有什么不同？
//     TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Either 基本操作", () => {
  it("validatePositive 应正确判断", () => {
    expect(E.isRight(validatePositive(5))).toBe(true);
    expect(E.isLeft(validatePositive(-1))).toBe(true);
    expect(pipe(validatePositive(10), E.getOrElse(() => 0))).toBe(10);
  });

  it("validateEven 应正确判断", () => {
    expect(E.isRight(validateEven(4))).toBe(true);
    expect(E.isLeft(validateEven(3))).toBe(true);
  });

  it("validateNumber 串联校验", () => {
    expect(E.isRight(validateNumber(6))).toBe(true);
    expect(E.isLeft(validateNumber(-2))).toBe(true);
    expect(E.isLeft(validateNumber(3))).toBe(true);
  });

  it("validateNumber 返回正确的值", () => {
    const result = pipe(validateNumber(8), E.getOrElse(() => -1));
    expect(result).toBe(8);
  });
});

describe("练习2: tryCatch", () => {
  it("safeParseJSON 正确 JSON", () => {
    const result = pipe(
      safeParseJSON('{"name":"Alice"}'),
      E.map((o) => o.name),
      E.getOrElse(() => "error"),
    );
    expect(result).toBe("Alice");
  });

  it("safeParseJSON 错误 JSON", () => {
    const result = safeParseJSON("{invalid}");
    expect(E.isLeft(result)).toBe(true);
  });
});
