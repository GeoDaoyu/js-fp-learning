// ==========================================
// Week 08 · Day 4: Monad 实战 — 链式调用
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

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
    return Either.of(fn(this._value));
  }
  chain(fn) {
    return fn(this._value);
  }
  fold(_, rightFn) {
    return rightFn(this._value);
  }
  getOrElse(_) {
    return this._value;
  }
}

class Left extends Either {
  constructor(value) {
    super();
    this._value = value;
  }
  map(_) {
    return this;
  }
  chain(_) {
    return this;
  }
  fold(leftFn, _) {
    return leftFn(this._value);
  }
  getOrElse(defaultVal) {
    return defaultVal;
  }
}

// 练习1: Monad 链式调用 — 多个可能失败的操作串联
// 场景: 用户注册流程
//   1. 校验用户名格式（>= 3 字符）
//   2. 校验密码强度（>= 6 字符）
//   3. 检查用户名是否已被占用
//   4. 如果全部通过，返回注册信息
// 每一步都可能失败，用 Either + chain 串联

const takenUsernames = ["admin", "root", "system"];

function validateUsername(username) {
  // TODO: 校验用户名长度 >= 3，返回 Either
}

function validatePassword(password) {
  // TODO: 校验密码长度 >= 6，返回 Either
}

function checkNotTaken(username) {
  // TODO: 检查用户名是否已被占用，返回 Either
}

function register(username, password) {
  // TODO: 用 chain 串联 validateUsername → validatePassword → checkNotTaken
  // 返回 Either<error, { username, createdAt }>
}

// 练习2: Monad vs Promise
// Promise 的 .then() 兼具 map 和 chain 的能力
// 2a: 完成以下对比
//
// // Monad 风格:
// Either.of(5)
//   .chain(x => validateX(x))
//   .chain(y => validateY(y))
//
// // Promise 风格:
// Promise.resolve(5)
//   .then(x => validateX(x))
//   .then(y => validateY(y))
//
// 2b: 写一段话分析 Monad chain 和 Promise.then 的异同（写在注释里）
//
// 2b: TODO: 思考并写下你的理解 — Monad chain 和 Promise.then 的异同

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 注册流程", () => {
  it("有效的注册信息应通过", () => {
    const result = register("alice123", "password123");
    expect(result instanceof Right).toBe(true);
  });

  it("用户名过短应失败", () => {
    const result = register("ab", "password123");
    expect(result instanceof Left).toBe(true);
  });

  it("密码过短应失败", () => {
    const result = register("alice123", "123");
    expect(result instanceof Left).toBe(true);
  });

  it("用户名被占用应失败", () => {
    const result = register("admin", "password123");
    expect(result instanceof Left).toBe(true);
  });

  it("注册信息应包含用户名和时间", () => {
    const result = register("alice123", "password123");
    const data = result.getOrElse(null);
    expect(data.username).toBe("alice123");
    expect(data.createdAt instanceof Date).toBe(true);
  });
});
