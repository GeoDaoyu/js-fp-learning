// ==========================================
// Week 05 · Day 5: Ramda 综合案例 + 周复盘
// ==========================================
// 需要先安装 Ramda: npm install ramda
import * as R from "ramda";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

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
  return R.pipe(
    R.filter(R.propEq("Engineering", "department")),
    R.map(
      R.applySpec({
        name: R.prop("name"),
        totalPackage: R.converge(R.multiply, [
          R.pipe(R.prop("salary"), R.multiply(12)),
          R.pipe(
            R.prop("years"),
            R.ifElse(R.gt(R.__, 3), R.always(1.2), R.always(1)),
          ),
        ]),
      }),
    ),
    R.sort(R.descend(R.prop("totalPackage"))),
    R.take(3),
  )(employeeList);
}

// 练习2: 部门统计报告
// 需求: 按 department 分组 → 统计每个部门的: 人数、平均工资、最高工资
// 期望格式: { Engineering: { count, avgSalary, maxSalary }, Sales: {...}, ... }

function departmentReport(employeeList) {
  return R.map(
    R.applySpec({
      count: R.length,
      avgSalary: R.pipe(R.map(R.prop("salary")), R.mean),
      maxSalary: R.pipe(R.map(R.prop("salary")), R.reduce(R.max, -Infinity)),
    }),
    R.groupBy(R.prop("department"), employeeList),
  );
}

// 练习3: 用 Lens 实现薪资调整
// 所有 Engineering 部门且 years >= 5 的员工，薪资提升 10%
// 要求: 用 Lens 做不可变更新

function giveRaise(employeeList) {
  const eligible = R.allPass([
    R.propEq("Engineering", "department"),
    R.propSatisfies(R.gte(R.__, 5), "years"),
  ]);
  return R.map(
    R.when(eligible, R.over(R.lensProp("salary"), R.multiply(1.1))),
    employeeList,
  );
}

// 练习4: Ramda 选型反思（写在注释里）
//
// 4a. 经过两周 Ramda 练习，你认为项目中什么场景适合用 Ramda，什么场景不适合？
//
// 适合：
// - 数据管道：filter → map → sort → take 这类串联转换，pipe 比嵌套函数调用清晰得多
// - 不可变更新：Lens 的 view/set/over 比手动 spread 嵌套对象安全且简洁
// - 条件逻辑：R.cond / R.ifElse / R.when 消除了 if-else 链，声明式且无遗漏分支
// - 数据派生：applySpec 一份数据转成多种视图，省去重复取值代码
//
// 不适合：
// - 性能敏感的热路径：Ramda 的柯里化和不可变拷贝有额外开销
// - 简单的属性访问：obj.price 比 R.prop("price")(obj) 直观，团队也不一定都熟悉 Ramda
// - 需要副作用（IO、DOM操作、数据库写入）：FP 管道天然排斥副作用，强行塞进去反而别扭

// 4b. 对比 Ramda 与传统命令式代码，最大的心智转变是什么？
//
// 从"怎么一步步做（how）"变成"数据要变成什么样（what）"。
// 命令式关注中间变量、循环、赋值顺序；Ramda 关注数据在各阶段的形态变化。
// 另一个转变是"数据最后传入"——先定义好转换规则的组合，数据作为最后参数注入，
// 这让管道可以提前声明、复用，而不是每次都要从数据出发重写逻辑。

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: topEngineers", () => {
  it("应返回工程部总包前三", () => {
    const result = topEngineers(employees);
    // Engineering: Alice(5y,15000→18000*1.2=21600*12=259200), Bob(2y,12000→144000),
    //   Frank(10y,18000→21600*1.2=25920*12=311040)
    // sorted: Frank(311040), Alice(259200), Bob(144000)
    assert.equal(result.length, 3);
    assert.deepEqual(result[0], { name: "Frank", totalPackage: 259200 });
    assert.deepEqual(result[1], { name: "Alice", totalPackage: 216000 });
    assert.deepEqual(result[2], { name: "Bob", totalPackage: 144000 });
  });
});

describe("练习2: departmentReport", () => {
  it("应正确统计各部门", () => {
    const report = departmentReport(employees);
    assert.equal(report.Engineering.count, 3);
    assert.equal(report.Sales.count, 2);
    assert.equal(report.HR.count, 2);
    assert.equal(report.Engineering.maxSalary, 18000);
  });
});

describe("练习3: giveRaise", () => {
  it("应给符合条件的员工涨薪 10%", () => {
    const result = giveRaise(employees);
    // Alice (5y, Eng) → 16500, Frank (10y, Eng) → 19800
    const alice = result.find((e) => e.name === "Alice");
    const bob = result.find((e) => e.name === "Bob");
    const charlie = result.find((e) => e.name === "Charlie");
    assert.equal(alice.salary, 16500);
    assert.equal(bob.salary, 12000); // < 5 years
    assert.equal(charlie.salary, 10000); // not Engineering
  });

  it("不应修改原数组", () => {
    const snapshot = employees.map((e) => ({ ...e }));
    giveRaise(employees);
    assert.deepEqual(employees, snapshot);
  });
});
