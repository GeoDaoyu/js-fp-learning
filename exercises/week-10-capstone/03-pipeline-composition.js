// ==========================================
// Week 10 · Day 3: 逻辑串联（pipe/compose）
// ==========================================
//
// 今日任务: 用 pipe/compose 串联 Day 2 的纯函数，构建完整的业务逻辑。
//
// ==========================================
// === 设计你的数据管道 ===
// ==========================================
//
// 项目 A (Todo App) 参考管道:
//
//   filter → search → sort → paginate
//
// 示例:
//   const processTodos = (todos, filter, query, page, pageSize) =>
//     pipe(
//       todos,
//       filterByStatus(filter),
//       searchTodos(query),
//       sortByCreatedAt,
//       paginate(page, pageSize),
//     );
//
// 项目 B (CLI 工具) 参考管道:
//
//   readFile → splitLines → filter → sort → unique → join → writeFile
//
//  注意: readFile 和 writeFile 是副作用，应在管道的边界处理
//  中间的 splitLines → filter → sort → unique 都是纯函数
//
// ==========================================
// === 今日任务清单 ===
// ==========================================
//
// 1. [x] 列出项目中可以用 pipe 串联的操作序列
// 2. [x] 确认每个步骤的函数签名互相对齐（输入输出类型一致）
// 3. [x] 实现至少 3 条不同的 pipeline
// 4. [x] 为每条 pipeline 写测试用例
//
// ==========================================
// === 在这里写你的 pipeline ===
// ==========================================

import { pipe } from "fp-ts/function";
import { describe, it, expect } from "vitest";

// 复用 Day 2 的纯函数（复制到这里以便独立运行）
// 注意: 实际项目中这些函数在 src/core/ 下，这里为了练习独立定义

// --- 数据转换函数 ---
const addTodo = (todos, text, id, createdAt) => [
  ...todos,
  { id, text, completed: false, createdAt },
];

const toggleTodo = (todos, id) =>
  todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));

const removeTodo = (todos, id) => todos.filter((t) => t.id !== id);

// --- 筛选/搜索/分页（柯里化） ---
const filterByStatus = (status) => (todos) => {
  if (status === "all") return todos;
  if (status === "completed") return todos.filter((t) => t.completed);
  return todos.filter((t) => !t.completed);
};

const searchTodos = (query) => (todos) =>
  query === ""
    ? todos
    : todos.filter((t) => t.text.toLowerCase().includes(query.toLowerCase()));

const paginate = (page, pageSize) => (todos) =>
  todos.slice((page - 1) * pageSize, page * pageSize);

// --- 排序函数 ---
const sortByCreatedAt = (todos) =>
  [...todos].sort((a, b) => a.createdAt - b.createdAt);

// ==========================================
// Pipeline 1: 核心展示管道（筛选 → 搜索 → 分页）
// 用于 Todo 列表页面展示：先按状态筛选，再按关键词搜索，最后分页
// ==========================================

const processTodos = (todos, filter, query, page, pageSize) =>
  pipe(
    todos,
    filterByStatus(filter),
    searchTodos(query),
    paginate(page, pageSize)
  );

// ==========================================
// Pipeline 2: 搜索后排序管道（搜索 → 排序 → 分页）
// 用于"搜索"场景：搜索匹配后按创建时间排序，再分页
// ==========================================

const searchAndSortTodos = (todos, query, page, pageSize) =>
  pipe(
    todos,
    searchTodos(query),
    sortByCreatedAt,
    paginate(page, pageSize)
  );

// ==========================================
// Pipeline 3: 统计管道（筛选 → 统计）
// 用于顶部统计栏：统计当前筛选条件下的数量
// 注意: 筛选不影响原始数据，返回的是统计结果
// ==========================================

const getStats = (todos, filter) =>
  pipe(
    todos,
    filterByStatus(filter),
    (filtered) => ({
      total: filtered.length,
      completed: filtered.filter((t) => t.completed).length,
      active: filtered.filter((t) => !t.completed).length,
    })
  );

// ==========================================
// === 测试你的 pipeline ===
// ==========================================
//
// 可以用 console.log、node:test 或者直接手动验证。
// 确保: 相同输入 → 相同输出、不修改原数据。
//

const testData = [
  { id: "1", text: "Learn FP", completed: false, createdAt: 3000 },
  { id: "2", text: "Build Todo App", completed: true, createdAt: 1000 },
  { id: "3", text: "Learn fp-ts", completed: false, createdAt: 2000 },
  { id: "4", text: "Write Tests", completed: true, createdAt: 5000 },
  { id: "5", text: "Ship it", completed: false, createdAt: 4000 },
];

describe("Pipeline 1: processTodos", () => {
  it("filter → search → paginate 应按顺序执行", () => {
    // 筛选 active → 搜索 "Learn" → 第 1 页，每页 10 条
    const result = processTodos(testData, "active", "learn", 1, 10);
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
    expect(result.every((t) => t.text.toLowerCase().includes("learn"))).toBe(
      true
    );
  });

  it("分页应正确切片", () => {
    const result = processTodos(testData, "all", "", 1, 2);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
  });

  it("不应修改原数组", () => {
    const original = [...testData];
    processTodos(testData, "all", "", 1, 10);
    expect(testData).toEqual(original);
  });
});

describe("Pipeline 2: searchAndSortTodos", () => {
  it("搜索后应按 createdAt 升序排列", () => {
    // 搜索 "Learn" → 找到 id 1 和 3 → 按 createdAt 排序 (2000, 3000)
    const result = searchAndSortTodos(testData, "learn", 1, 10);
    expect(result).toHaveLength(2);
    // 按 createdAt 升序: id 3 (2000) 在前, id 1 (3000) 在后
    expect(result[0].id).toBe("3");
    expect(result[1].id).toBe("1");
  });

  it("忽略无匹配的搜索词", () => {
    const result = searchAndSortTodos(testData, "xyz", 1, 10);
    expect(result).toHaveLength(0);
  });
});

describe("Pipeline 3: getStats", () => {
  it("不筛选时统计全部", () => {
    const stats = getStats(testData, "all");
    expect(stats).toEqual({ total: 5, completed: 2, active: 3 });
  });

  it("筛选已完成的统计", () => {
    const stats = getStats(testData, "completed");
    expect(stats).toEqual({ total: 2, completed: 2, active: 0 });
  });

  it("筛选未完成的统计", () => {
    const stats = getStats(testData, "active");
    expect(stats).toEqual({ total: 3, completed: 0, active: 3 });
  });
});