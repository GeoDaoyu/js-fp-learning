// ==========================================
// Week 09 · Day 3: fp-ts Either（错误处理）
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe } from "fp-ts/function";
import * as E from "fp-ts/Either";
import { describe, it, expect } from "vitest";

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
  return n > 0 ? E.right(n) : E.left("not positive");
}

// 1b: validateEven(n) → n % 2 === 0 ? E.right(n) : E.left('not even')
function validateEven(n) {
  return n % 2 === 0 ? E.right(n) : E.left("not even");
}

// 1c: 串联校验 validatePositive → validateEven
// 用 pipe + E.chain
function validateNumber(n) {
  return pipe(validatePositive(n), E.chain(validateEven));
}

// 练习2: E.tryCatch — 捕获异常为 Either
// 将可能抛错的函数转为 Either

// 2a: safeParseJSON(str) — 用 E.tryCatch 解析 JSON
function safeParseJSON(str) {
  return E.tryCatch(
    () => JSON.parse(str),
    (e) => String(e.message),
  );
}

// 练习3: 对比手写 Either 和 fp-ts Either（写在注释里）
//
// 3a. fp-ts Either 和我们手写的版本在使用方式上有什么不同？
//
// 除了和 Option 一样的 pipe vs 方法链差异外，fp-ts Either 还提供了：
//   - E.tryCatch：自动将同步抛出的异常捕获为 Left，避免了手写 try/catch
//   - E.fold：同时处理两种分支的折叠函数，比手写更类型安全
//   - E.mapLeft：只变换错误分支，正常分支保持不变
//   - 和其他模块的互操作：比如 O.toEither 将 Option 转 Either，
//     E.fromOption 反向转换，这些在手写版本中需要自己实现

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
