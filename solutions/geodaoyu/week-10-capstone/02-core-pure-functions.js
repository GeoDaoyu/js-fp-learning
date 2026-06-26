// ==========================================
// Week 10 · Day 2: 核心纯函数开发
// ==========================================
//
// 今日任务: 编写项目的核心纯函数。
// 所有函数必须: 无副作用、不修改输入参数、无 for/while。
//
// ==========================================
// === 通用工具函数（按需选用）===
// ==========================================
//
// 如果你选了项目 A (Todo App)，这里是一些参考:

// --- 数据转换函数 ---
// addTodo(todos, text) → 添加新 todo
// toggleTodo(todos, id) → 切换完成状态
// removeTodo(todos, id) → 删除 todo
// updateTodoText(todos, id, text) → 修改文本
//
// --- 筛选/搜索函数 ---
// filterByStatus(todos, status) → 按状态筛选
// searchTodos(todos, query) → 按文本搜索
//
// --- 分页函数 ---
// paginate(todos, page, pageSize) → 分页切片
//
// --- 统计函数 ---
// countByStatus(todos) → { total, completed, active }

// 如果你选了项目 B (CLI 文本工具)，这里是一些参考:

// --- 文本处理函数 ---
// splitLines(text) → string[] (按行分割)
// filterLines(lines, predicate) → 筛选行
// sortLines(lines, comparator) → 排序
// uniqueLines(lines) → 去重
// countStats(lines) → { lines, words, chars }
//
// --- 管道工具 ---
// processText(pipe)(text) → 应用管道处理文本
//
// ==========================================
// === 在这里写你的核心纯函数 ===
// ==========================================
//
// 提示:
//   1. 每个函数只做一件事
//   2. 用 pipe/compose 组合简单函数
//   3. 优先使用 Ramda 或 Effect-TS
//   4. 对每个函数写 2-3 个测试用例（可以用 assert 或 console.log 验证）
//

import { describe, it, expect } from "vitest";

// --- 数据转换函数（项目 A: Todo App）---

// addTodo: 添加新 todo，返回新数组（不修改原数组）
function addTodo(todos, text, id, createdAt) {
  return [...todos, { id, text, completed: false, createdAt }];
}

// toggleTodo: 切换指定 id 的完成状态，返回新数组
function toggleTodo(todos, id) {
  return todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
}

// removeTodo: 删除指定 id 的 todo，返回新数组
function removeTodo(todos, id) {
  return todos.filter((t) => t.id !== id);
}

// updateTodoText: 更新指定 id 的文本，返回新数组
function updateTodoText(todos, id, text) {
  return todos.map((t) => (t.id === id ? { ...t, text } : t));
}

// --- 筛选/搜索函数 ---

// filterByStatus: 按状态筛选（柯里化，数据最后）
function filterByStatus(status) {
  return function (todos) {
    if (status === "all") return todos;
    if (status === "completed") return todos.filter((t) => t.completed);
    return todos.filter((t) => !t.completed); // active
  };
}

// searchTodos: 按文本搜索，大小写不敏感（柯里化，数据最后）
function searchTodos(query) {
  return function (todos) {
    if (query === "") return todos;
    return todos.filter((t) =>
      t.text.toLowerCase().includes(query.toLowerCase())
    );
  };
}

// --- 分页函数 ---

// paginate: 分页切片（柯里化，数据最后）
function paginate(page, pageSize) {
  return function (todos) {
    return todos.slice((page - 1) * pageSize, page * pageSize);
  };
}

// --- 统计函数 ---

// countByStatus: 统计各状态数量
function countByStatus(todos) {
  return {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    active: todos.filter((t) => !t.completed).length,
  };
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

const makeTodo = (id, text, completed = false, createdAt = 1000) => ({
  id,
  text,
  completed,
  createdAt,
});

describe("CRUD 函数", () => {
  it("addTodo 应追加新 todo 且不修改原数组", () => {
    const todos = [makeTodo("1", "A")];
    const result = addTodo(todos, "B", "2", 2000);
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({ id: "2", text: "B", completed: false, createdAt: 2000 });
    expect(todos).toHaveLength(1);
  });

  it("toggleTodo 应切换完成状态且不修改原数组", () => {
    const todos = [makeTodo("1", "A", false)];
    const result = toggleTodo(todos, "1");
    expect(result[0].completed).toBe(true);
    expect(todos[0].completed).toBe(false);
  });

  it("removeTodo 应删除指定 id 且不修改原数组", () => {
    const todos = [makeTodo("1", "A"), makeTodo("2", "B")];
    const result = removeTodo(todos, "1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
    expect(todos).toHaveLength(2);
  });

  it("updateTodoText 应更新文本且不修改原数组", () => {
    const todos = [makeTodo("1", "A")];
    const result = updateTodoText(todos, "1", "Updated");
    expect(result[0].text).toBe("Updated");
    expect(todos[0].text).toBe("A");
  });
});

describe("筛选/搜索函数", () => {
  const todos = [
    makeTodo("1", "Learn FP", false),
    makeTodo("2", "Build App", true),
    makeTodo("3", "Write Tests", false),
  ];

  it("filterByStatus('all') 应返回全部", () => {
    expect(filterByStatus("all")(todos)).toHaveLength(3);
  });

  it("filterByStatus('completed') 应只返回已完成的", () => {
    const result = filterByStatus("completed")(todos);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("filterByStatus('active') 应只返回未完成的", () => {
    const result = filterByStatus("active")(todos);
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it("searchTodos 应大小写不敏感匹配", () => {
    const result = searchTodos("learn")(todos);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("searchTodos('') 应返回全部", () => {
    expect(searchTodos("")(todos)).toHaveLength(3);
  });
});

describe("分页函数", () => {
  const todos = [1, 2, 3, 4, 5].map((n) => makeTodo(String(n), `Todo ${n}`));

  it("paginate(1, 2) 应返回前 2 条", () => {
    const result = paginate(1, 2)(todos);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
  });

  it("paginate(2, 2) 应返回第 3-4 条", () => {
    const result = paginate(2, 2)(todos);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("3");
  });

  it("paginate(3, 2) 应返回最后 1 条", () => {
    const result = paginate(3, 2)(todos);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("5");
  });
});

describe("统计函数", () => {
  it("countByStatus 应正确统计", () => {
    const todos = [
      makeTodo("1", "A", false),
      makeTodo("2", "B", true),
      makeTodo("3", "C", false),
    ];
    const stats = countByStatus(todos);
    expect(stats).toEqual({ total: 3, completed: 1, active: 2 });
  });
});