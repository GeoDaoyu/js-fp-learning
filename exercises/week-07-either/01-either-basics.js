// ==========================================
// Week 07 · Day 1: Either 函子 — Left / Right
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 实现 Either 函子
// Either 有两个子类型:
// - Right(value): 表示正常/成功的值
// - Left(value):  表示错误/失败的值（通常是错误信息）
//
// Either 的 map 只在 Right 上执行，Left 直接跳过
// 需要实现:
//   - Either.of(value) → Right(value)
//   - Right(value).map(fn) → Right(fn(value))
//   - Left(value).map(fn)  → Left(value) (不变)
//   - getOrElse(defaultVal) — Right 返回值，Left 返回 defaultVal
//   - 额外: fold(leftFn, rightFn) — 同时处理两种情况

class Either {
  static of(value) {
    return new Right(value);
  }

  static left(value) {
    return new Left(value);
  }

  static right(value) {
    return new Right(value);
  }
}

class Right extends Either {
  constructor(value) {
    super();
    this._value = value;
  }

  map(fn) {
    return new Right(fn(this._value));
  }

  fold(_leftFn, rightFn) {
    return rightFn(this._value);
  }

  getOrElse(_defaultVal) {
    return this._value;
  }
}

class Left extends Either {
  constructor(value) {
    super();
    this._value = value;
  }

  map(_fn) {
    return this;
  }

  fold(leftFn, _rightFn) {
    return leftFn(this._value);
  }

  getOrElse(defaultVal) {
    return defaultVal;
  }
}

// 练习2: 用 Either 处理异常

// 2a: safeDivide(a, b) — 安全除法
// b === 0 → Left('division by zero')
// 否则 → Right(a / b)
function safeDivide(a, b) {
  // TODO: 实现安全除法 —— b === 0 返回 Left('division by zero')，否则返回 Right(a / b)
}

// 2b: safeParse(jsonStr) — 安全解析 JSON
// 解析成功 → Right(obj)
// 解析失败 → Left(error message)
function safeParse(jsonStr) {
  // TODO: 实现安全 JSON 解析 —— 成功返回 Right(obj)，失败返回 Left(error message)
}

// 练习3: Either 与 Maybe 的区别（写在注释里）
//
// 3a. Either 相比 Maybe 最大的优势是什么？
//
// TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Either 函子", () => {
  it("Right.map 应正常转换", () => {
    const result = Either.of(5)
      .map((x) => x * 2)
      .map((x) => x + 1);
    expect(result.getOrElse(0)).toBe(11);
  });

  it("Left.map 应保持不变", () => {
    const result = Either.left("error")
      .map((x) => x * 2)
      .map((x) => x + 1);
    expect(result.getOrElse(0)).toBe(0);
  });

  it("fold 应处理两种分支", () => {
    const ok = Either.of(10);
    const result1 = ok.fold(
      (err) => `Error: ${err}`,
      (val) => `Success: ${val}`,
    );
    expect(result1).toBe("Success: 10");

    const err = Either.left("not found");
    const result2 = err.fold(
      (err) => `Error: ${err}`,
      (val) => `Success: ${val}`,
    );
    expect(result2).toBe("Error: not found");
  });
});

describe("练习2: Either 异常处理", () => {
  it("safeDivide 正常除法", () => {
    expect(safeDivide(10, 2).getOrElse(-1)).toBe(5);
  });

  it("safeDivide 除零应返回 Left", () => {
    const result = safeDivide(10, 0);
    expect(result instanceof Left).toBe(true);
    expect(result.fold((e) => e, () => "")).toBe("division by zero");
  });

  it("safeParse 正确 JSON", () => {
    const result = safeParse('{"name":"Alice"}');
    expect(result instanceof Right).toBe(true);
    expect(result.map((o) => o.name).getOrElse("")).toBe("Alice");
  });

  it("safeParse 错误 JSON", () => {
    const result = safeParse("{invalid}");
    expect(result instanceof Left).toBe(true);
  });
});
