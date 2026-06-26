// ==========================================
// Week 02 · Day 4: 对象 & 嵌套对象不可变操作
// ==========================================
import { describe, it, expect } from "vitest";


// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 所有函数禁止修改原对象，必须返回新对象
// 禁止使用 for / while

// 练习1: updateProp — 更新对象的某个属性
function updateProp(obj, key, value) {
  return {
    ...obj,
    [key]: value,
  };
}

// 练习2: addProp — 给对象添加新属性
function addProp(obj, key, value) {
  return {
    ...obj,
    [key]: value,
  };
}

// 练习3: removeProp — 删除对象的某个属性
// 提示: 用解构 + rest
function removeProp(obj, key) {
  const { [key]: value, ...rest } = obj;
  return rest;
}

// 练习4: updateCity — 不可变更新嵌套对象的 city
// user 结构: { name, age, address: { city, street } }
// 要求: 返回新对象，不修改原 user 及原 user.address
function updateCity(user, newCity) {
  return {
    ...user,
    address: {
      ...user.address,
      city: newCity,
    },
  };
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

const base = { name: "Alice", age: 25 };

describe("练习1: updateProp", () => {
  it("应更新指定属性", () => {
    const result = updateProp(base, "age", 26);
    expect(result).toEqual({ name: "Alice", age: 26 });
  });

  it("不应修改原对象", () => {
    const obj = { x: 1, y: 2 };
    updateProp(obj, "x", 10);
    expect(obj).toEqual({ x: 1, y: 2 });
  });

  it("应返回新引用", () => {
    const result = updateProp(base, "name", "Bob");
    expect(result).not.toBe(base);
  });
});

describe("练习2: addProp", () => {
  it("应添加新属性", () => {
    const result = addProp(base, "city", "Beijing");
    expect(result).toEqual({ name: "Alice", age: 25, city: "Beijing" });
  });

  it("不应修改原对象", () => {
    const obj = { x: 1 };
    addProp(obj, "y", 2);
    expect(obj).toEqual({ x: 1 });
  });
});

describe("练习3: removeProp", () => {
  it("应删除指定属性", () => {
    const result = removeProp(base, "age");
    expect(result).toEqual({ name: "Alice" });
    expect("age" in result).toBe(false);
  });

  it("不应修改原对象", () => {
    const obj = { a: 1, b: 2 };
    removeProp(obj, "a");
    expect(obj).toEqual({ a: 1, b: 2 });
  });
});

describe("练习4: updateCity", () => {
  const user = {
    name: "Bob",
    age: 30,
    address: { city: "Shanghai", street: "Nanjing Rd" },
  };

  it("应更新嵌套的 city", () => {
    const result = updateCity(user, "Beijing");
    expect(result.address.city).toBe("Beijing");
    expect(result.address.street).toBe("Nanjing Rd");
  });

  it("不应修改原 user", () => {
    const snapshot = { ...user };
    updateCity(user, "Shenzhen");
    expect(user.address.city).toBe("Shanghai");
    expect(user).toEqual(snapshot);
  });

  it("不应修改原 user.address 的引用", () => {
    const oldAddress = user.address;
    const result = updateCity(user, "Guangzhou");
    expect(result.address).not.toBe(oldAddress);
  });

  it("原 address 内容不变", () => {
    const oldAddress = user.address;
    updateCity(user, "Chengdu");
    expect(oldAddress.city).toBe("Shanghai");
  });
});
