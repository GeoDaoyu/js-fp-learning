// ==========================================
// Week 07 · Day 1: Either 函子 — Left / Right
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

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
  return b === 0 ? Either.left("division by zero") : Either.of(a / b);
}

// 2b: safeParse(jsonStr) — 安全解析 JSON
// 解析成功 → Right(obj)
// 解析失败 → Left(error message)
function safeParse(jsonStr) {
  try {
    return Either.of(JSON.parse(jsonStr));
  } catch (e) {
    return Either.left(e.message);
  }
}

// 练习3: Either 与 Maybe 的区别（写在注释里）
//
// 3a. Either 相比 Maybe 最大的优势是什么？
//
// Either 的 Left 可以携带错误信息，而 Maybe 的 Nothing 只是"空"。
// 这意味着：
// ① 调用方知道失败原因——Left("division by zero") vs Nothing（不知道为啥）
// ② 可以差异化处理——fold 的两个分支分别处理错误和成功，而 Maybe 只能 getOrElse 兜底
// ③ 适合"可恢复但需要告知"的场景——比如表单校验，Left 可以告诉你是哪个字段不合法

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Either 函子", () => {
  it("Right.map 应正常转换", () => {
    const result = Either.of(5)
      .map((x) => x * 2)
      .map((x) => x + 1);
    assert.equal(result.getOrElse(0), 11);
  });

  it("Left.map 应保持不变", () => {
    const result = Either.left("error")
      .map((x) => x * 2)
      .map((x) => x + 1);
    assert.equal(result.getOrElse(0), 0);
  });

  it("fold 应处理两种分支", () => {
    const ok = Either.of(10);
    const result1 = ok.fold(
      (err) => `Error: ${err}`,
      (val) => `Success: ${val}`,
    );
    assert.equal(result1, "Success: 10");

    const err = Either.left("not found");
    const result2 = err.fold(
      (err) => `Error: ${err}`,
      (val) => `Success: ${val}`,
    );
    assert.equal(result2, "Error: not found");
  });
});

describe("练习2: Either 异常处理", () => {
  it("safeDivide 正常除法", () => {
    assert.equal(safeDivide(10, 2).getOrElse(-1), 5);
  });

  it("safeDivide 除零应返回 Left", () => {
    const result = safeDivide(10, 0);
    assert.ok(result instanceof Left);
    assert.equal(result.fold((e) => e, () => ""), "division by zero");
  });

  it("safeParse 正确 JSON", () => {
    const result = safeParse('{"name":"Alice"}');
    assert.ok(result instanceof Right);
    assert.equal(result.map((o) => o.name).getOrElse(""), "Alice");
  });

  it("safeParse 错误 JSON", () => {
    const result = safeParse("{invalid}");
    assert.ok(result instanceof Left);
  });
});
