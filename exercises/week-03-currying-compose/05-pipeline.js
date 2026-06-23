// ==========================================
// Week 03 · Day 5: 组合 + 柯里化联用 + 周复盘
// ==========================================
import { describe, it, expect } from "vitest";


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

// 为了完成综合练习，请先实现以下工具函数：

// autoCurry（复用 Day1 的实现或重新实现）
function autoCurry(fn) {
  return (...accumulated) => {
    if (accumulated.length >= fn.length) return fn(...accumulated);
    return (...more) => autoCurry(fn)(...accumulated, ...more);
  };
}

// pipe（复用 Day4 的实现）
function pipe(...fns) {
  return (init) => fns.reduce((val, fn) => fn(val), init);
}

// 练习1: 拆分单一职责小函数
// 下面每个函数只做一件事，并尽量写成 point-free 风格

// addGrade: 根据 score 添加 grade 字段
// >= 90 → 'A', >= 80 → 'B', >= 70 → 'C', >= 60 → 'D', < 60 → 'F'
function addGrade(student) {
  const grade =
    student.score >= 90
      ? "A"
      : student.score >= 80
        ? "B"
        : student.score >= 70
          ? "C"
          : student.score >= 60
            ? "D"
            : "F";
  return { ...student, grade };
}

// addPassed: 添加 passed 字段（grade 不是 'F'）
function addPassed(student) {
  return { ...student, passed: student.grade !== "F" };
}

// formatStudent: 重命名为 { name, score, grade, passed }
function formatStudent(student) {
  const { name, score, grade, passed } = student;
  return { name, score, grade, passed };
}

// 练习2: 用 pipe 串联数据处理链路
// 处理所有学生: 加评分 → 加通过状态 → 格式化
function processStudents(studentList) {
  const map = autoCurry((fn, arr) => arr.map(fn));
  return pipe(map(addGrade), map(addPassed), map(formatStudent))(studentList);
}

// 练习3: point-free 风格
// 获取所有及格学生的名字（大写），按分数降序排列
// 要求: 用 pipe 串联，尽量 point-free
function topPassedNames(studentList) {
  const filter = autoCurry((fn, arr) => arr.filter(fn));
  const map = autoCurry((fn, arr) => arr.map(fn));
  const sort = autoCurry((fn, arr) => [...arr].sort(fn));
  return pipe(
    map(addGrade),
    map(addPassed),
    filter((s) => s.passed),
    sort((a, b) => b.score - a.score),
    map((s) => s.name),
    map((s) => s.toUpperCase()),
  )(studentList);
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

describe("练习1: 单一职责函数", () => {
  it("addGrade 应添加正确 grade", () => {
    expect(addGrade({ name: "X", score: 95 }).grade).toBe("A");
    expect(addGrade({ name: "X", score: 85 }).grade).toBe("B");
    expect(addGrade({ name: "X", score: 73 }).grade).toBe("C");
    expect(addGrade({ name: "X", score: 62 }).grade).toBe("D");
    expect(addGrade({ name: "X", score: 30 }).grade).toBe("F");
  });

  it("addGrade 不修改原对象", () => {
    const s = { name: "X", score: 85 };
    addGrade(s);
    expect("grade" in s).toBe(false);
  });

  it("addPassed 应正确判断", () => {
    expect(addPassed({ name: "X", grade: "A" }).passed).toBe(true);
    expect(addPassed({ name: "X", grade: "F" }).passed).toBe(false);
  });

  it("formatStudent 应重命名属性", () => {
    const result = formatStudent({
      name: "A",
      score: 80,
      grade: "B",
      passed: true,
      extra: 1,
    });
    expect(result).toEqual({
      name: "A",
      score: 80,
      grade: "B",
      passed: true,
    });
  });
});

describe("练习2: pipe 串联数据处理", () => {
  it("应完整处理学生数据", () => {
    const result = processStudents(students);
    expect(result.length).toBe(5);
    expect(result[0].name).toBe("Alice");
    expect(result[0].grade).toBe("B");
    expect(result[0].passed).toBe(true);
    expect(Object.keys(result[0])).toEqual([
      "name",
      "score",
      "grade",
      "passed",
    ]);
  });
});

describe("练习3: point-free 风格", () => {
  it("应返回及格学生大写名字，按分数降序", () => {
    const result = topPassedNames(students);
    // 及格: Alice(85), Charlie(73), Diana(91)
    // 按分降序: Diana(91), Alice(85), Charlie(73)
    expect(result).toEqual(["DIANA", "ALICE", "CHARLIE"]);
  });
});
