// ==========================================
// Week 09 · Day 2: fp-ts Option（对应 Maybe）
// ==========================================
// 需要先安装 fp-ts: npm install fp-ts
import { pipe } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { describe, it, expect } from "vitest";

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: fp-ts Option 基本操作
// O.some(value) → 有值
// O.none        → 无值（注意: none 是常量，不是函数调用）
// O.map(fn)(option) → 映射
// O.chain(fn)(option) → 展平
// O.getOrElse(() => defaultVal)(option) → 取值
// O.fromNullable(value) → 创建

// 1a: safeDivide(a, b) → Option<number>
function safeDivideFP(a, b) {
  return b === 0 ? O.none : O.some(a / b);
}

// 1b: safeGet(obj, key) → Option<value>
function safeGetFP(obj, key) {
  return O.fromNullable(obj[key]);
}

// 1c: safeToUpper(str) → 如果 str 非空，返回 O.some(str.toUpperCase())
//     否则 O.none
function safeToUpper(str) {
  return str ? O.some(str.toUpperCase()) : O.none;
}

// 练习2: 用 pipe + Option 链式处理
// 模拟: 从用户数据中安全提取 profile.settings.theme

// 2a: getTheme(user) — 安全获取 user.profile.settings.theme
// 用 pipe + O.fromNullable + O.map 或 O.chain
function getTheme(user) {
  return pipe(
    user,
    O.fromNullable,
    O.chainNullableK((u) => u.profile),
    O.chainNullableK((p) => p.settings),
    O.chainNullableK((s) => s.theme),
    O.getOrElse(() => "default"),
  );
}

// 练习3: 对比手写 Maybe 和 fp-ts Option（写在注释里）
//
// 3a. fp-ts Option 和我们手写的 Maybe 在使用上最大的不同是什么？
//
// 最大的不同是调用方式：手写 Maybe 用的是方法链式调用
//   Maybe.of(x).map(fn).chain(fn2).getOrElse(d)
// 而 fp-ts Option 用的是 pipe + 函数式调用
//   pipe(option, O.map(fn), O.chain(fn2), O.getOrElse(() => d))
//
// 这种差异源于设计哲学：手写版是 OOP 风格（方法挂在对象上），
// fp-ts 是纯函数式风格（数据与操作分离）。pipe 模式的好处是：
//   - 可以和任意模块的函数组合，不限于 Option 自己的方法
//   - TypeScript 类型推断更精准（每一步的类型变化都被追踪）
//   - 不需要"包装"对象，Option 本身就是一个普通值

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Option 基本操作", () => {
  it("safeDivideFP 正常除法", () => {
    const result = pipe(safeDivideFP(10, 2), O.getOrElse(() => -1));
    expect(result).toBe(5);
  });

  it("safeDivideFP 除零返回 none", () => {
    const result = pipe(safeDivideFP(10, 0), O.getOrElse(() => -1));
    expect(result).toBe(-1);
  });

  it("safeGetFP 存在属性", () => {
    const result = pipe(
      safeGetFP({ name: "Alice" }, "name"),
      O.getOrElse(() => "unknown"),
    );
    expect(result).toBe("Alice");
  });

  it("safeGetFP 不存在属性", () => {
    const result = pipe(
      safeGetFP({ name: "Alice" }, "age"),
      O.getOrElse(() => "unknown"),
    );
    expect(result).toBe("unknown");
  });

  it("safeToUpper 非空字符串", () => {
    const result = pipe(safeToUpper("hello"), O.getOrElse(() => ""));
    expect(result).toBe("HELLO");
  });

  it("safeToUpper 空字符串", () => {
    const result = pipe(safeToUpper(""), O.getOrElse(() => "empty"));
    expect(result).toBe("empty");
  });
});

describe("练习2: pipe + Option", () => {
  it("完整数据应获取 theme", () => {
    const user = { profile: { settings: { theme: "dark" } } };
    expect(getTheme(user)).toBe("dark");
  });

  it("缺失路径应返回默认值", () => {
    expect(getTheme({})).toBe("default");
    expect(getTheme(null)).toBe("default");
  });
});
