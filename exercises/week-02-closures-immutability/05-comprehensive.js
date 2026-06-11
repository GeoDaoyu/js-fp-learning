// ==========================================
// Week 02 · Day 5: 综合训练 — 闭包 + 不可变数据 + 纯函数
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

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
  let arr = [];
  return {
    push: (item) => {
      arr = [...arr, item];
      return arr.length;
    },
    pop: () => {
      const last = arr[arr.length - 1];
      arr = arr.slice(0, -1);
      return last;
    },
    peek: () => arr[arr.length - 1],
    size: () => arr.length,
    toArray: () => [...arr],
  };
}

// 练习2: 不可变数据处理 — 订单分析
// 2a: filterDelivered — 筛选状态为 'delivered' 的订单（返回新数组）
function filterDelivered(orderList) {
  return orderList.filter(({ status }) => status === "delivered");
}

// 2b: addTotal — 给每个订单添加 total = price * quantity（返回新数组）
function addTotal(orderList) {
  return orderList.map((v) => ({
    ...v,
    total: v.price * v.quantity,
  }));
}

// 2c: totalRevenue — 计算已交付订单的总收入（用 filter + map + reduce）
function totalRevenue(orderList) {
  return orderList
    .filter(({ status }) => status === "delivered")
    .map(({ price, quantity }) => price * quantity)
    .reduce((total, curr) => total + curr, 0);
}

// 练习3: createImmutableStore — 闭包封装不可变状态
// getState()   → 返回当前状态
// setState(partial) → 合并 partial 到状态（不可变），返回新状态
// 要求: setState 不修改旧 state 引用
function createImmutableStore(initialState) {
  let state = initialState;
  return {
    getState: () => state,
    setState: (partial) => {
      state = { ...state, ...partial };
      return state;
    },
  };
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: createStack", () => {
  it("push / pop / peek / size", () => {
    const s = createStack();
    assert.equal(s.size(), 0);
    assert.equal(s.push("a"), 1);
    assert.equal(s.push("b"), 2);
    assert.equal(s.size(), 2);
    assert.equal(s.peek(), "b");
    assert.equal(s.pop(), "b");
    assert.equal(s.size(), 1);
    assert.equal(s.peek(), "a");
  });

  it("空栈 pop 应返回 undefined", () => {
    const s = createStack();
    assert.equal(s.pop(), undefined);
  });

  it("toArray 应返回浅拷贝且不影响内部数据", () => {
    const s = createStack();
    s.push("x");
    s.push("y");
    const arr = s.toArray();
    assert.deepEqual(arr, ["x", "y"]);
    arr.push("z");
    assert.equal(s.size(), 2); // 内部不变
  });

  it("内部数据应私有", () => {
    const s = createStack();
    s.push("a");
    assert.equal(typeof s.items, "undefined");
    assert.equal(typeof s._items, "undefined");
  });
});

describe("练习2: 不可变数据处理", () => {
  const snapshot = [...orders];

  it("2a: filterDelivered 应筛选已交付订单", () => {
    const result = filterDelivered(orders);
    assert.equal(result.length, 3);
    result.forEach((o) => assert.equal(o.status, "delivered"));
  });

  it("2a: 不应修改原数组", () => {
    assert.deepEqual(orders, snapshot);
  });

  it("2b: addTotal 应添加 total 字段", () => {
    const result = addTotal(orders);
    assert.equal(result[0].total, 58);
    assert.equal(result[1].total, 50);
    assert.equal(result[3].total, 45);
  });

  it("2b: 不应修改原数组元素", () => {
    addTotal(orders);
    assert.equal("total" in orders[0], false);
  });

  it("2c: totalRevenue 应计算已交付订单总收入", () => {
    // delivered: id1 29*2=58, id3 29*1=29, id5 5*5=25 → 58+29+25 = 112
    assert.equal(totalRevenue(orders), 112);
  });

  it("2c: 不应修改原数组", () => {
    assert.deepEqual(orders, snapshot);
  });
});

describe("练习3: createImmutableStore", () => {
  it("getState 应返回初始状态", () => {
    const store = createImmutableStore({ count: 0, name: "test" });
    assert.deepEqual(store.getState(), { count: 0, name: "test" });
  });

  it("setState 应合并更新并返回新状态", () => {
    const store = createImmutableStore({ count: 0, name: "test" });
    const newState = store.setState({ count: 5 });
    assert.deepEqual(newState, { count: 5, name: "test" });
    assert.deepEqual(store.getState(), { count: 5, name: "test" });
  });

  it("setState 不应修改旧 state 引用", () => {
    const store = createImmutableStore({ count: 0 });
    const oldState = store.getState();
    store.setState({ count: 1 });
    assert.deepEqual(oldState, { count: 0 });
    assert.notEqual(store.getState(), oldState);
  });

  it("多次更新应累积", () => {
    const store = createImmutableStore({ a: 1, b: 2 });
    store.setState({ a: 10 });
    store.setState({ b: 20 });
    assert.deepEqual(store.getState(), { a: 10, b: 20 });
  });
});
