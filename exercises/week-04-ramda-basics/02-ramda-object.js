// ==========================================
// Week 04 · Day 2: Ramda 对象操作 API
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it, expect } from "vitest";


const user = {
  id: 1,
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  address: { city: "Beijing", street: "Chang'an Ave", zip: "100000" },
};

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: R.pick / R.omit — 挑选和排除属性

// 1a: pickPublic — 只保留 name 和 email
function pickPublic(user) {
  return R.pick(["name", "email"])(user);
}

// 1b: omitSensitive — 排除 email 和 address
function omitSensitive(user) {
  return R.omit(["email", "address"])(user);
}

// 练习2: R.assoc / R.dissoc — 添加和删除属性

// 2a: addRole(user, role) — 给 user 添加 role 属性
function addRole(user, role) {
  return R.assoc("role", role)(user);
}

// 2b: removeEmail(user) — 删除 email 属性
function removeEmail(user) {
  return R.dissoc("email")(user);
}

// 练习3: R.path / R.pathOr — 深层安全取值

// 3a: getCity(user) — 安全获取 address.city
function getCity(user) {
  return R.path(["address", "city"])(user);
}

// 3b: getZipOr(user, defaultZip) — 获取 zip，不存在时返回默认值
function getZipOr(user, defaultZip) {
  return R.pathOr(defaultZip, ["address", "zip"])(user);
}

// 练习4: R.evolve — 批量转换对象属性

// 4a: ageInfo(user) — 将 age 转为字符串，name 转为大写
// 期望: { ..., age: '25', name: 'ALICE' }
function ageInfo(user) {
  return R.evolve(
    {
      age: (age) => age.toString(),
      name: (name) => name.toUpperCase(),
    },
    user,
  );
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: pick / omit", () => {
  it("pickPublic 应只保留 name 和 email", () => {
    expect(pickPublic(user)).toEqual({
      name: "Alice",
      email: "alice@example.com",
    });
  });

  it("omitSensitive 应排除 email 和 address", () => {
    const result = omitSensitive(user);
    expect("email" in result).toBe(false);
    expect("address" in result).toBe(false);
    expect(result.name).toBe("Alice");
    expect(result.age).toBe(25);
  });
});

describe("练习2: assoc / dissoc", () => {
  it("addRole 应添加 role 属性", () => {
    const result = addRole(user, "admin");
    expect(result.role).toBe("admin");
    expect(result.name).toBe("Alice");
  });

  it("addRole 不应修改原对象", () => {
    const snapshot = { ...user };
    addRole(user, "admin");
    expect(user).toEqual(snapshot);
  });

  it("removeEmail 应删除 email", () => {
    const result = removeEmail(user);
    expect("email" in result).toBe(false);
  });
});

describe("练习3: path / pathOr", () => {
  it("getCity 应获取深层属性", () => {
    expect(getCity(user)).toBe("Beijing");
  });

  it("getCity 应对缺失路径返回 undefined", () => {
    expect(getCity({ name: "X" })).toBe(undefined);
  });

  it("getZipOr 应在存在时返回值，缺失时返回默认值", () => {
    expect(getZipOr(user, "000000")).toBe("100000");
    expect(getZipOr({ name: "X" }, "999999")).toBe("999999");
  });
});

describe("练习4: evolve", () => {
  it("ageInfo 应转换 age 和 name", () => {
    const result = ageInfo(user);
    expect(result.name).toBe("ALICE");
    expect(result.age).toBe("25");
  });

  it("不应修改其他属性", () => {
    const result = ageInfo(user);
    expect(result.email).toBe("alice@example.com");
  });

  it("不应修改原对象", () => {
    const snapshot = { ...user };
    ageInfo(user);
    expect(user).toEqual(snapshot);
  });
});
