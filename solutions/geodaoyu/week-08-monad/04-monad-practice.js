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
  return username.length >= 3
    ? Either.right(username)
    : Either.left("Username too short");
}

function validatePassword(password) {
  return password.length >= 6
    ? Either.right(password)
    : Either.left("Password too short");
}

function checkNotTaken(username) {
  return takenUsernames.includes(username)
    ? Either.left("Username already taken")
    : Either.right(username);
}

function register(username, password) {
  return Either.of(username)
    .chain(validateUsername)
    .chain((name) => validatePassword(password).map(() => name))
    .chain((name) => checkNotTaken(name))
    .map((name) => ({
      username: name,
      createdAt: new Date(),
    }));
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
// 2b: Monad chain 和 Promise.then 的异同：
//
// 相同点：
// - 都支持链式调用，将多个操作串联起来
// - 都能"展平"嵌套：chain 展平嵌套的 Monad，then 展平嵌套的 Promise
// - 都能短路：Left/Nothing 短路类似 Promise reject 的短路
//
// 不同点：
// - Promise 是异步的，Monad 是同步的
// - Promise.then 兼具 map 和 chain 的能力（自动识别返回值类型），
//   Monad 需要显式区分 map（普通值）和 chain（Monad 值）
// - Promise 主要处理"未来值"，Monad 主要处理"可能失败的值"或"可能为空的值"
// - Promise 的错误处理走 .catch，Monad 用 fold / getOrElse

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
