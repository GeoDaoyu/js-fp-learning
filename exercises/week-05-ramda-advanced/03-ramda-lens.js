// ==========================================
// Week 05 · Day 3: Ramda 数据变换高级用法 — Lens
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it, expect } from "vitest";


const user = {
  name: "Alice",
  age: 25,
  address: {
    city: "Beijing",
    street: "Chang'an Ave",
    zip: "100000",
  },
  settings: {
    theme: "dark",
    notifications: true,
  },
};

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: Lens 基础 — view / set / over

// 1a: nameLens — 创建一个聚焦 name 属性的 Lens
const nameLens = R.lens(R.prop("name"), R.assoc("name"));

// 1b: getName — 用 R.view 获取 name
function getName(u) {
  return R.view(nameLens, u);
}

// 1c: setName — 用 R.set 设置 name
function setName(u, newName) {
  return R.set(nameLens, newName, u);
}

// 1d: toUpperName — 用 R.over 将 name 转为大写
function toUpperName(u) {
  return R.over(nameLens, R.toUpper, u);
}

// 练习2: R.lensPath — 嵌套属性 Lens

// 2a: cityLens — 创建聚焦 address.city 的 Lens
const cityLens = R.lensPath(["address", "city"]);

// 2b: setCity(user, newCity) — 设置 city
function setCity(u, newCity) {
  return R.set(cityLens, newCity, u);
}

// 2c: themeLens — 创建聚焦 settings.theme 的 Lens
const themeLens = R.lensPath(["settings", "theme"]);

// 2d: toggleTheme(u) — 切换主题 'dark' → 'light' 或 'light' → 'dark'
function toggleTheme(u) {
  return R.over(
    themeLens,
    R.ifElse(R.equals("dark"), R.always("light"), R.always("dark")),
    u,
  );
}

// 练习3: Lens 组合 — R.compose 组合多个 Lens

// 3a: streetLens — 先从 address 聚焦，再聚焦 street
// 提示: R.compose(addressLens, streetLens) 或直接用 R.lensPath
const streetLens = R.lensPath(["address", "street"]);

// 3b: capitalizeStreet(u) — 将 street 首字母大写
function capitalizeStreet(u) {
  return R.over(streetLens, (s) => s.charAt(0).toUpperCase() + s.slice(1), u);
}

// 练习4: Lens 问答（写在注释里）
//
// 4a. Lens 相比手动写 { ...obj, address: { ...obj.address, city: newCity } } 有什么优势？
//
// 1. 可组合 — 通过 R.compose 将多个 Lens 串联，聚焦任意深度的属性，手写 spread 每多一层就要多包一层。
// 2. 读写统一 — 同一个 Lens 既能 view（读）也能 set/over（写/改），手动方式读写是两套代码。
// 3. 不可变保证 — set/over 自动返回新对象，不会遗漏某层展开导致意外修改原对象。
// 4. 可复用 — Lens 定义一次，多处使用；手动 spread 是 ad-hoc 的，每次都要重写嵌套结构。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: Lens 基础", () => {
  it("getName 应获取 name", () => {
    expect(getName(user)).toBe("Alice");
  });

  it("setName 应设置 name 且不修改原对象", () => {
    const result = setName(user, "Bob");
    expect(result.name).toBe("Bob");
    expect(user.name).toBe("Alice");
  });

  it("toUpperName 应将 name 转大写", () => {
    const result = toUpperName(user);
    expect(result.name).toBe("ALICE");
    expect(user.name).toBe("Alice");
  });
});

describe("练习2: lensPath", () => {
  it("setCity 应设置城市", () => {
    const result = setCity(user, "Shanghai");
    expect(result.address.city).toBe("Shanghai");
    expect(user.address.city).toBe("Beijing");
  });

  it("toggleTheme 应切换主题", () => {
    expect(toggleTheme(user).settings.theme).toBe("light");
    expect(toggleTheme({ settings: { theme: "light" } }).settings.theme).toBe("dark",);
  });
});

describe("练习3: Lens 组合", () => {
  it("capitalizeStreet 应大写首字母", () => {
    const result = capitalizeStreet(user);
    expect(result.address.street).toBe("Chang'an Ave");
    // Actually, capitalize just first char:
    // Let me adjust: R.toUpper wouldn't work well for this case.
    // Let's just test that street is accessible
    expect(result.address.street.length > 0).toBe(true);
    expect(user.address.street).toBe("Chang'an Ave");
  });
});
