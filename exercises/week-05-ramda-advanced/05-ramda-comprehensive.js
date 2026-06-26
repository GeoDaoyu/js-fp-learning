// ==========================================
// Week 05 · Day 5: Ramda 综合案例 + 周复盘
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it, expect } from "vitest";


const employees = [
  { name: "Alice", department: "Engineering", salary: 15000, years: 5 },
  { name: "Bob", department: "Engineering", salary: 12000, years: 2 },
  { name: "Charlie", department: "Sales", salary: 10000, years: 8 },
  { name: "Diana", department: "Sales", salary: 11000, years: 4 },
  { name: "Eve", department: "HR", salary: 9000, years: 6 },
  { name: "Frank", department: "Engineering", salary: 18000, years: 10 },
  { name: "Grace", department: "HR", salary: 9500, years: 1 },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 练习1: 用 Ramda 实现完整的业务分析管道
// 需求: 筛选 Engineering 部门 → 计算每个人的年薪(salary*12) + 奖金(years>3 则*1.2)
// → 按总包降序排列 → 取前三名 → 格式化为 { name, totalPackage }

function topEngineers(employeeList) {
  // TODO: 使用 R.pipe / R.filter / R.applySpec / R.converge 实现业务分析管道：
  // 筛选 Engineering 部门 → 计算年薪+奖金 → 排序 → 取前三
}

// 练习2: 部门统计报告
// 需求: 按 department 分组 → 统计每个部门的: 人数、平均工资、最高工资
// 期望格式: { Engineering: { count, avgSalary, maxSalary }, Sales: {...}, ... }

function departmentReport(employeeList) {
  // TODO: 使用 R.groupBy / R.map / R.applySpec 按部门统计人数、平均工资、最高工资
}

// 练习3: 用 Lens 实现薪资调整
// 所有 Engineering 部门且 years >= 5 的员工，薪资提升 10%
// 要求: 用 Lens 做不可变更新

function giveRaise(employeeList) {
  // TODO: 使用 R.allPass / R.when / R.over / R.lensProp 给符合条件的工程师涨薪 10%
}

// 练习4: Ramda 选型反思（写在注释里）
//
// 4a. 经过两周 Ramda 练习，你认为项目中什么场景适合用 Ramda，什么场景不适合？
//
// TODO: 思考并写下你的理解
//

// 4b. 对比 Ramda 与传统命令式代码，最大的心智转变是什么？
//
// TODO: 思考并写下你的理解

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: topEngineers", () => {
  it("应返回工程部总包前三", () => {
    const result = topEngineers(employees);
    // Engineering: Alice(5y,15000→18000*1.2=21600*12=259200), Bob(2y,12000→144000),
    //   Frank(10y,18000→21600*1.2=25920*12=311040)
    // sorted: Frank(311040), Alice(259200), Bob(144000)
    expect(result.length).toBe(3);
    expect(result[0]).toEqual({ name: "Frank", totalPackage: 259200 });
    expect(result[1]).toEqual({ name: "Alice", totalPackage: 216000 });
    expect(result[2]).toEqual({ name: "Bob", totalPackage: 144000 });
  });
});

describe("练习2: departmentReport", () => {
  it("应正确统计各部门", () => {
    const report = departmentReport(employees);
    expect(report.Engineering.count).toBe(3);
    expect(report.Sales.count).toBe(2);
    expect(report.HR.count).toBe(2);
    expect(report.Engineering.maxSalary).toBe(18000);
  });
});

describe("练习3: giveRaise", () => {
  it("应给符合条件的员工涨薪 10%", () => {
    const result = giveRaise(employees);
    // Alice (5y, Eng) → 16500, Frank (10y, Eng) → 19800
    const alice = result.find((e) => e.name === "Alice");
    const bob = result.find((e) => e.name === "Bob");
    const charlie = result.find((e) => e.name === "Charlie");
    expect(alice.salary).toBe(16500);
    expect(bob.salary).toBe(12000); // < 5 years
    expect(charlie.salary).toBe(10000); // not Engineering
  });

  it("不应修改原数组", () => {
    const snapshot = employees.map((e) => ({ ...e }));
    giveRaise(employees);
    expect(employees).toEqual(snapshot);
  });
});
