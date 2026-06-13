# Week 03 Day 5 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `05-pipeline.js` with a 4-exercise tool-reuse structure that fixes the autoCurry dead code and missing prerequisites issues, in TODO fill-in style aligned with Week 4.

**Architecture:** Single-file replacement. File structure: tool function definitions (Day 1/2/4 + array helpers) at top → 4 TODO exercises (curry predicates → partial thresholds → pipe chain → comprehensive query) → tests. No new files; no file splits.

**Tech Stack:** Node.js native test runner (`node:test` + `node:assert/strict`), ES modules. No Ramda (introduced in Week 4).

---

## File Structure

**Modify:**
- `exercises/week-03-currying-compose/05-pipeline.js` — full replacement with new structure

No new files. No file splits. The single file is already focused on a single day's exercises and stays that way.

---

### Task 1: Replace 05-pipeline.js with new scaffold

**Files:**
- Modify: `exercises/week-03-currying-compose/05-pipeline.js` (full replacement)

- [ ] **Step 1: Replace the entire file**

Write the following to `exercises/week-03-currying-compose/05-pipeline.js` (full content, overwrites existing):

```js
// ==========================================
// Week 03 · Day 5: 工具联用综合练习
// ==========================================
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const students = [
  { name: "Alice", score: 85, grade: "" },
  { name: "Bob", score: 42, grade: "" },
  { name: "Charlie", score: 73, grade: "" },
  { name: "Diana", score: 91, grade: "" },
  { name: "Eve", score: 58, grade: "" },
];

// ==========================================
// === 在这里写你的代码 ===
// ==========================================

// 工具函数区（Day 1-4 的实现复用 + 数组/对象工具）
function curry2(fn) {
  return (a) => (b) => fn(a, b);
}

function curry3(fn) {
  return (a) => (b) => (c) => fn(a, b, c);
}

function partial(fn, ...presetArgs) {
  return (...rest) => fn(...presetArgs, ...rest);
}

function partialRight(fn, ...presetArgs) {
  return (...rest) => fn(...rest, ...presetArgs);
}

function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

const map = (fn) => (arr) => arr.map(fn);
const filter = (predicate) => (arr) => arr.filter(predicate);
const sort = (compareFn) => (arr) => [...arr].sort(compareFn);
const prop = (key) => (obj) => obj[key];

// 练习1: 用 curry2/curry3 写学生谓词
// 1a: scoreAbove(threshold)(student) → student.score > threshold
const scoreAbove = null; // TODO: 用 curry2 实现

// 1b: scoreBelow(threshold)(student) → student.score < threshold
const scoreBelow = null; // TODO: 用 curry2 实现

// 1c: betweenScores(min, max)(student) → min <= score <= max
const betweenScores = null; // TODO: 用 curry3 实现

// 练习2: 用 partial 提取阈值
// 2a: isPassing = partial(scoreAbove, 60)
const isPassing = null; // TODO: 用 partial

// 2b: isExcellent = partial(scoreAbove, 90)
const isExcellent = null; // TODO: 用 partial

// 练习3: pipe + map 处理数组
function processStudents(studentList) {
  // TODO: 用 pipe + map 串联：
  //   - map(markPassed)：给每个学生加 passed 字段（true/false）
  //   - map(addGrade)：根据 score 加 grade 字段
  //   - map(formatStudent)：重命名为 { name, score, grade, passed }
  // 要求：在函数外定义 markPassed / addGrade / formatStudent
}

// 练习4: 综合查询
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

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 柯里化谓词", () => {
  it("scoreAbove", () => {
    assert.equal(scoreAbove(60)({ score: 70 }), true);
    assert.equal(scoreAbove(60)({ score: 50 }), false);
    assert.equal(scoreAbove(60)({ score: 60 }), false);
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
    assert.equal(isPassing({ score: 60 }), false);
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
    // 60+: Diana(91), Alice(85), Charlie(73) — 降序取前 2
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

- [ ] **Step 2: Verify file parses**

Run: `node --check exercises/week-03-currying-compose/05-pipeline.js`
Expected: exit code 0, no output

- [ ] **Step 3: Verify tests fail because of null placeholders (sanity check)**

Run: `node --test exercises/week-03-currying-compose/05-pipeline.js 2>&1 | tail -10`
Expected: Tests fail because `scoreAbove`/`scoreBelow`/etc. are `null` (e.g., "scoreAbove is not a function" or similar ReferenceError / TypeError). This confirms the scaffold loads and tests are well-formed.

- [ ] **Step 4: Commit**

```bash
git add exercises/week-03-currying-compose/05-pipeline.js
git commit -m "feat: redesign Week 03 Day 5 with 4-exercise tool-reuse scaffold"
```

---

### Task 2: Sanity check the change is scoped correctly

- [ ] **Step 1: Confirm only 05-pipeline.js was modified**

Run: `git diff --name-only HEAD~1 exercises/week-03-currying-compose/`
Expected output:
```
exercises/week-03-currying-compose/05-pipeline.js
```

- [ ] **Step 2: Confirm file contains expected sections**

Run: `grep -c "^// 练习" exercises/week-03-currying-compose/05-pipeline.js`
Expected output: `4` (one comment per练习)

Run: `grep -c "^describe(\"练习" exercises/week-03-currying-compose/05-pipeline.js`
Expected output: `4` (one describe per练习)

If either count is off, re-inspect the file content.

- [ ] **Step 3: Confirm autoCurry is gone**

Run: `grep -n "autoCurry" exercises/week-03-currying-compose/05-pipeline.js`
Expected: no output (autoCurry should not appear anywhere)

If "autoCurry" appears, the old content leaked through — re-do Task 1.

---

## Verification (after user fills in TODOs)

The user will then fill in the 7 TODO slots (scoreAbove, scoreBelow, betweenScores, isPassing, isExcellent, processStudents body, topPerformers body) and run:

```bash
node --test exercises/week-03-currying-compose/05-pipeline.js
```

Expected: 4 describe blocks pass, 0 fail, 11 tests total passing (3 + 2 + 2 + 4).

Then confirm no regression in the rest of Week 3:

```bash
node --test exercises/week-03-currying-compose/01-currying-basics.js
node --test exercises/week-03-currying-compose/02-partial-application.js
node --test exercises/week-03-currying-compose/03-currying-practice.js
node --test exercises/week-03-currying-compose/04-compose-pipe.js
```

Expected: each file passes, no regression in Day 1-4.