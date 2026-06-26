// ==========================================
// Week 02 · Day 5: 综合训练 — 闭包 + 不可变数据 + 纯函数
// ==========================================
import { describe, it, expect } from "vitest";


const orders = [
  { id: 1, product: "Book", price: 29, quantity: 2, status: "delivered" },
  { id: 2, product: "Pen", price: 5, quantity: 10, status: "pending" },
  { id: 3, product: "Book", price: 29, quantity: 1, status: "delivered" },
  { id: 4, product: "Notebook", price: 15, quantity: 3, status: "cancelled" },
  { id: 5, product: "Pen", price: 5, quantity: 5, status: "delivered" },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: createStack — 闭包 + 内部不可变数组
// push(item) → 添加元素，返回新长度
// pop()     → 移除并返回栈顶元素（空栈返回 undefined）
// peek()    → 返回栈顶元素但不移除
// size()    → 返回栈大小
// toArray() → 返回栈的浅拷贝数组（不影响内部数据）
// 内部用不可变方式操作（不用 push/pop 原地修改）
function createStack() {
  // TODO: 使用闭包和不可变数组，返回包含 push, pop, peek, size, toArray 方法的对象
}

// 练习2: 不可变数据处理 — 订单分析
// 2a: filterDelivered — 筛选状态为 'delivered' 的订单（返回新数组）
function filterDelivered(orderList) {
  // TODO: 用 filter 筛选状态为 'delivered' 的订单，返回新数组
}

// 2b: addTotal — 给每个订单添加 total = price * quantity（返回新数组）
function addTotal(orderList) {
  // TODO: 用 map 给每个订单添加 total = price * quantity 字段，返回新数组
}

// 2c: totalRevenue — 计算已交付订单的总收入（用 filter + map + reduce）
function totalRevenue(orderList) {
  // TODO: 用 filter + map + reduce 计算已交付订单的总收入，返回数值
}

// 练习3: createImmutableStore — 闭包封装不可变状态
// getState()   → 返回当前状态
// setState(partial) → 合并 partial 到状态（不可变），返回新状态
// 要求: setState 不修改旧 state 引用
function createImmutableStore(initialState) {
  // TODO: 使用闭包封装不可变状态，返回 getState / setState 方法
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: createStack", () => {
  it("push / pop / peek / size", () => {
    const s = createStack();
    expect(s.size()).toBe(0);
    expect(s.push("a")).toBe(1);
    expect(s.push("b")).toBe(2);
    expect(s.size()).toBe(2);
    expect(s.peek()).toBe("b");
    expect(s.pop()).toBe("b");
    expect(s.size()).toBe(1);
    expect(s.peek()).toBe("a");
  });

  it("空栈 pop 应返回 undefined", () => {
    const s = createStack();
    expect(s.pop()).toBe(undefined);
  });

  it("toArray 应返回浅拷贝且不影响内部数据", () => {
    const s = createStack();
    s.push("x");
    s.push("y");
    const arr = s.toArray();
    expect(arr).toEqual(["x", "y"]);
    arr.push("z");
    expect(s.size()).toBe(2); // 内部不变
  });

  it("内部数据应私有", () => {
    const s = createStack();
    s.push("a");
    expect(typeof s.items).toBe("undefined");
    expect(typeof s._items).toBe("undefined");
  });
});

describe("练习2: 不可变数据处理", () => {
  const snapshot = [...orders];

  it("2a: filterDelivered 应筛选已交付订单", () => {
    const result = filterDelivered(orders);
    expect(result.length).toBe(3);
    result.forEach((o) => expect(o.status).toBe("delivered"));
  });

  it("2a: 不应修改原数组", () => {
    expect(orders).toEqual(snapshot);
  });

  it("2b: addTotal 应添加 total 字段", () => {
    const result = addTotal(orders);
    expect(result[0].total).toBe(58);
    expect(result[1].total).toBe(50);
    expect(result[3].total).toBe(45);
  });

  it("2b: 不应修改原数组元素", () => {
    addTotal(orders);
    expect("total" in orders[0]).toBe(false);
  });

  it("2c: totalRevenue 应计算已交付订单总收入", () => {
    // delivered: id1 29*2=58, id3 29*1=29, id5 5*5=25 → 58+29+25 = 112
    expect(totalRevenue(orders)).toBe(112);
  });

  it("2c: 不应修改原数组", () => {
    expect(orders).toEqual(snapshot);
  });
});

describe("练习3: createImmutableStore", () => {
  it("getState 应返回初始状态", () => {
    const store = createImmutableStore({ count: 0, name: "test" });
    expect(store.getState()).toEqual({ count: 0, name: "test" });
  });

  it("setState 应合并更新并返回新状态", () => {
    const store = createImmutableStore({ count: 0, name: "test" });
    const newState = store.setState({ count: 5 });
    expect(newState).toEqual({ count: 5, name: "test" });
    expect(store.getState()).toEqual({ count: 5, name: "test" });
  });

  it("setState 不应修改旧 state 引用", () => {
    const store = createImmutableStore({ count: 0 });
    const oldState = store.getState();
    store.setState({ count: 1 });
    expect(oldState).toEqual({ count: 0 });
    expect(store.getState()).not.toBe(oldState);
  });

  it("多次更新应累积", () => {
    const store = createImmutableStore({ a: 1, b: 2 });
    store.setState({ a: 10 });
    store.setState({ b: 20 });
    expect(store.getState()).toEqual({ a: 10, b: 20 });
  });
});
