// ==========================================
// Week 04 · Day 5: Ramda 重构旧代码 + 周复盘
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 用 Ramda 重构 reduce 实现 map 和 filter
// 之前我们手写了 myMap / myFilter，现在用 Ramda 的 reduce 重写

// 1a: myMapR(arr, fn) — 用 R.reduce 实现 map
function myMapR(arr, fn) {
  return R.reduce((acc, curr) => [...acc, fn(curr)], [])(arr);
}

// 1b: myFilterR(arr, predicate) — 用 R.reduce 实现 filter
function myFilterR(arr, predicate) {
  return R.reduce(
    (acc, curr) => (predicate(curr) ? [...acc, curr] : [...acc]),
    [],
  )(arr);
}

// 练习2: 用 Ramda pipe 重构数据处理管道
// 以前我们写 arr.filter(...).map(...).reduce(...)
// 现在用 R.pipe 实现等价逻辑

const orders = [
  { category: "electronics", amount: 300 },
  { category: "books", amount: 50 },
  { category: "electronics", amount: 150 },
  { category: "clothing", amount: 80 },
  { category: "books", amount: 30 },
  { category: "clothing", amount: 120 },
];

// 2: electronicsRevenue — 统计电子产品的总收入
// 要求: 用 R.pipe 串联，不用链式方法
function electronicsRevenue(orderList) {
  return R.pipe(
    R.filter(R.propEq("electronics", "category")),
    R.map(R.prop("amount")),
    R.sum,
  )(orderList);
}

// 练习3: 用 Ramda 重构闭包记忆化
// 用 Ramda 的工具（R.has, R.identity 等）简化之前的 memoize

function memoizeR(fn) {
  const cache = {};
  return (key) => {
    if (R.has(key, cache)) return cache[key];
    cache[key] = fn(key);
    return cache[key];
  };
}

// 练习4: Ramda 使用习惯总结（写在注释里）
//
// 4a. 经过本周练习，Ramda 相比原生 JS 在哪些场景优势最明显？
//
// 1) 数据管道场景 — 用 R.pipe 串联多个变换步骤，比链式调用更灵活，
//    可以组合任意函数而不仅限于数组方法。
// 2) 部分应用和 point-free — 自动柯里化使得可以先定义变换逻辑，
//    后传入数据，减少了 (x) => ... 这样的匿名函数包装。
// 3) 不可变操作 — assoc/dissoc/evolve 等 API 天然返回新对象，
//    不需要手动 spread，避免了意外修改原数据的风险。
// 4) 深层安全取值 — path/pathOr 处理嵌套属性比 a?.b?.c 更简洁，
//    且能提供默认值。
//
// 4b. Ramda 有哪些你觉得不直观或需要适应的地方？
//
// 1) 参数顺序 — 数据放最后是 Ramda 的核心设计，但习惯了数据优先
//    的开发者需要适应，尤其是在阅读代码时需要找到管道末端的数据。
// 2) 调试困难 — point-free 风格减少了中间变量，使得断点和
//    console.log 不如命令式代码方便，定位问题需要更多经验。
// 3) API 记忆负担 — Ramda 函数名偏函数式术语（如 evolve、converge），
//    不如原生方法名直观，需要一定的学习成本。
// 4) 团队协作 — 大部分团队成员更熟悉原生 JS 写法，Ramda 风格
//    可能增加代码审查和上手的门槛。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 重构 map / filter", () => {
  it("myMapR 应等价于 Array.map", () => {
    expect(myMapR([1, 2, 3], R.multiply(2))).toEqual([2, 4, 6]);
  });

  it("myFilterR 应等价于 Array.filter", () => {
    expect(myFilterR([1, 2, 3, 4], (x) => x % 2 === 0)).toEqual([2, 4],);
  });
});

describe("练习2: 重构管道", () => {
  it("electronicsRevenue 应统计电子产品总收入", () => {
    expect(electronicsRevenue(orders)).toBe(450);
  });
});

describe("练习3: 重构 memoize", () => {
  it("应缓存计算结果", () => {
    let calls = 0;
    const fn = memoizeR((x) => {
      calls++;
      return x * 2;
    });
    expect(fn(5)).toBe(10);
    expect(calls).toBe(1);
    expect(fn(5)).toBe(10);
    expect(calls).toBe(1); // 缓存命中
  });
});
