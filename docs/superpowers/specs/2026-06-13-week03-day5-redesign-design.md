# Week 03 · Day 5 重构设计

> 重构对象：`exercises/week-03-currying-compose/05-pipeline.js`
> 状态：设计中（待用户确认后进入实现）

## 背景与动机

当前 Day 5 实现存在两个设计问题：

1. **`autoCurry` 是死代码**——题目要求实现，但最终解法绕过了它，没有用到
2. **前置条件缺失**——注释说"请先实现以下工具函数"，但只列了 `autoCurry` 和 `pipe`，实际练习 3 还用到 `map`/`filter`/`sort`/`prop`，导致 `ReferenceError: filter is not defined`

练习 1 的命令式风格（嵌套三元）也是薄弱点。

学习者反馈：希望题目设计清晰、练习递进、工具用熟而不是学新东西。

## 设计目标

- 把 Day 5 改成"工具联用综合练习"，每个练习明确用上 Day 1-4 的工具
- TODO 填空式，对齐 Week 4 风格（避免 Q&A 注释式回答带来的"答非所问"问题）
- 工具函数全部在文件顶部"前置条件"区显式定义，与实际用法一致
- 删除 `autoCurry`（Week 4 由 Ramda 提供自动柯里化，这里不重复）

## 范围

- **本次重构**：仅 `05-pipeline.js`
- **不在范围**：Day 1-4、其他周、`notes/`、`cheatsheet.md`、`plan.md`

## 工具函数区（文件顶部）

显式列出本练习所需的全部工具函数，匹配实际用法：

```js
// Day 1: 柯里化工具
function curry2(fn) { return (a) => (b) => fn(a, b); }
function curry3(fn) { return (a) => (b) => (c) => fn(a, b, c); }

// Day 2: 偏函数工具
function partial(fn, ...presetArgs) { return (...rest) => fn(...presetArgs, ...rest); }
function partialRight(fn, ...presetArgs) { return (...rest) => fn(...rest, ...presetArgs); }

// Day 4: 管道
function pipe(...fns) { return (x) => fns.reduce((acc, fn) => fn(acc), x); }

// 数组/对象工具（柯里化形式，sort 用扩展避免原地修改）
const map = (fn) => (arr) => arr.map(fn);
const filter = (predicate) => (arr) => arr.filter(predicate);
const sort = (compareFn) => (arr) => [...arr].sort(compareFn);
const prop = (key) => (obj) => obj[key];
```

## 数据集

沿用当前 5 个学生：

```js
const students = [
  { name: "Alice", score: 85, grade: "" },
  { name: "Bob", score: 42, grade: "" },
  { name: "Charlie", score: 73, grade: "" },
  { name: "Diana", score: 91, grade: "" },
  { name: "Eve", score: 58, grade: "" },
];
```

## 四个练习的递进

### 练习 1：用 curry2/curry3 写学生谓词

意图：把"score 跟 threshold 比"做成可复用的柯里化谓词。

```js
// 1a: scoreAbove(threshold)(student) → student.score > threshold
const scoreAbove = null; // TODO: 用 curry2 实现

// 1b: scoreBelow(threshold)(student) → student.score < threshold
const scoreBelow = null; // TODO: 用 curry2 实现

// 1c: betweenScores(min, max)(student) → min <= score <= max
const betweenScores = null; // TODO: 用 curry3 实现
```

### 练习 2：用 partial 提取阈值

意图：演示"一次预设，多次复用"的偏函数实战价值。

```js
// 2a: isPassing = partial(scoreAbove, 60)
const isPassing = null; // TODO: 用 partial

// 2b: isExcellent = partial(scoreAbove, 90)
const isExcellent = null; // TODO: 用 partial
```

### 练习 3：pipe + map 处理数组

意图：复现"pipe 站在数组外、map 站在数组内"的函子律应用（Week 4-5 Ramda 周会用到）。

```js
function processStudents(studentList) {
  // TODO: 用 pipe + map 串联：
  //   - map(markPassed)：给每个学生加 passed 字段（true/false）
  //   - map(addGrade)：根据 score 加 grade 字段
  //   - map(formatStudent)：重命名为 { name, score, grade, passed }
  // 要求：在函数外定义 markPassed / addGrade / formatStudent
}
```

其中：
- `markPassed = (student) => ({ ...student, passed: isPassing(student) })`
- `addGrade`: 跟当前实现一致（>=90→A, >=80→B, >=70→C, >=60→D, 否则 F），用解构保持不可变
- `formatStudent`: 跟当前实现一致

### 练习 4：综合查询

意图：把所有工具串成"业务查询管道"，作为 Week 3 的小期末考。

```js
function topPerformers(threshold, limit, studentList) {
  // TODO: 用上前面所有工具拼出查询：
  //   1. 过滤分数 > threshold 的学生（用 scoreAbove + partial + filter）
  //   2. 按分数降序（用 sort）
  //   3. 取前 limit 个（用 Array.slice）
  //   4. 提取 name 字段（用 map(prop('name'))）
  //   5. 大写（map(name => name.toUpperCase())）
  // 提示：
  //   - const isAboveThreshold = partial(scoreAbove, threshold)
  //   - 注意 sort 的 compareFn：b.score - a.score 是降序
}
```

注：`scoreAbove` 是严格大于，所以 `threshold=60` 时刚好 60 分的学生被排除。这与练习 2 的 `isPassing = partial(scoreAbove, 60)` 行为一致。

## 测试设计

```js
describe("练习1: 柯里化谓词", () => {
  it("scoreAbove", () => {
    assert.equal(scoreAbove(60)({ score: 70 }), true);
    assert.equal(scoreAbove(60)({ score: 50 }), false);
    assert.equal(scoreAbove(60)({ score: 60 }), false);  // 严格大于
  });
  it("scoreBelow", () => {
    assert.equal(scoreBelow(60)({ score: 50 }), true);
    assert.equal(scoreBelow(60)({ score: 70 }), false);
  });
  it("betweenScores 包含边界", () => {
    assert.equal(betweenScores(50, 80)({ score: 50 }), true);
    assert.equal(betweenScores(50, 80)({ score: 80 }), true);
    assert.equal(betweenScores(50, 80)({ score: 49 }), false);
    assert.equal(betweenScores(50, 80)({ score: 81 }), false);
  });
});

describe("练习2: partial 提取阈值", () => {
  it("isPassing", () => {
    assert.equal(isPassing({ score: 60 }), false);  // 严格大于
    assert.equal(isPassing({ score: 61 }), true);
    assert.equal(isPassing({ score: 59 }), false);
  });
  it("isExcellent", () => {
    assert.equal(isExcellent({ score: 91 }), true);
    assert.equal(isExcellent({ score: 90 }), false);
  });
});

describe("练习3: pipe 处理链", () => {
  it("processStudents 输出正确字段", () => {
    const result = processStudents(students);
    assert.equal(result.length, 5);
    assert.equal(result[0].name, "Alice");
    assert.equal(result[0].grade, "B");
    assert.equal(result[0].passed, true);
    assert.deepEqual(Object.keys(result[0]), ["name", "score", "grade", "passed"]);
  });
  it("不修改原数组", () => {
    const before = JSON.stringify(students);
    processStudents(students);
    assert.equal(JSON.stringify(students), before);
  });
});

describe("练习4: 综合查询", () => {
  it("topPerformers(60, 2) 返回及格前两名大写", () => {
    // 及格: Diana(91), Alice(85), Charlie(73) — 降序取前 2
    assert.deepEqual(topPerformers(60, 2, students), ["DIANA", "ALICE"]);
  });
  it("topPerformers(80, 5) 只返回 80+ 的学生", () => {
    // 80+: Diana(91), Alice(85) — 只有 2 个
    assert.deepEqual(topPerformers(80, 5, students), ["DIANA", "ALICE"]);
  });
  it("threshold 高于所有学生返回空", () => {
    assert.deepEqual(topPerformers(100, 5, students), []);
  });
  it("limit=1 只返回第一名", () => {
    assert.deepEqual(topPerformers(60, 1, students), ["DIANA"]);
  });
});
```

## 已知边界与决策

- **`scoreAbove` 严格大于 vs `>=`**：当前设计用严格大于（与原练习 1 行为一致）。`betweenScores` 用包含边界（`>=` 和 `<=`）。
- **`isPassing = partial(scoreAbove, 60)` 严格大于 60**：所以 60 分不算 passing。如果学习者想用 `>=`，需要练习 4 的 hint 提示。但保持现状更简单一致。
- **`formatStudent` 字段顺序**：与当前一致（`name`, `score`, `grade`, `passed`）。
- **`sort` compareFn**：用 `[...arr].sort(...)`，符合 CLAUDE.md 不可变约束。

## 不做的事（YAGNI）

- 不引入 Ramda（Week 4 才学）
- 不实现 `autoCurry`（已删除）
- 不增加新的工具函数（slice 留给学习者直接用 `Array.prototype.slice`）
- 不写 Q&A 注释（对齐 Week 4 TODO 填空风格）
- 不修改 Day 1-4 文件
- 不修改 `plan.md`（内容描述仍然准确，只是 Day 5 实现细节调整）

## 验证方式

按 CLAUDE.md 的命令：
```bash
node --test exercises/week-03-currying-compose/05-pipeline.js
```
期望：所有 describe 块通过，0 fail。

学习者完成验证后，再用：
```bash
npm test
```
跑全周，确认没有回归。