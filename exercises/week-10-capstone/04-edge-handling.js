// ==========================================
// Week 10 · Day 4: 边界处理（Option / Either）
// ==========================================
//
// 今日任务: 用 Maybe/Option 和 Either 处理空值与异常，
// 让项目对非法输入、边界条件具备完整的容错能力。
//
// ==========================================
// === 识别边界条件 ===
// ==========================================
//
// 典型需要处理的情况:
//
// 空值 (Maybe/Option):
//   - 空数组、空对象、null/undefined 属性
//   - 不存在的 ID、缺失的配置项
//   - API 返回的不完整数据
//
// 异常 (Either):
//   - 输入格式校验失败
//   - 业务规则违反（如 age < 0）
//   - 文件不存在、权限不足
//   - 网络请求失败
//
// ==========================================
// === 项目 A (Todo App) 参考 ===
// ==========================================
//
//   - 空搜索 query → 返回全部结果
//   - 不存在的 todo id → Nothing
//   - 空文本 todo → Left('Text cannot be empty')
//   - localStorage 读取失败 → 用默认数据
//
// ==========================================
// === 项目 B (CLI 工具) 参考 ===
// ==========================================
//
//   - 文件不存在 → Either.left('File not found')
//   - 空文件 → Maybe.nothing (或返回空统计)
//   - 无效正则表达式 → Either.left('Invalid regex')
//   - 编码错误 → Either.left('Encoding error')
//
// ==========================================
// === 今日任务清单 ===
// ==========================================
//
// 1. [x] 列出项目中所有可能出错的环节
// 2. [x] 为每个环节用 Maybe 或 Either 包装
// 3. [x] 用 chain 串联多个可能失败的操作
// 4. [x] 确保整个 pipeline 的错误能统一收集和处理
// 5. [x] 测试: 正常输入 + 异常输入都跑一遍
//
// ==========================================
// === 在这里写你的边界处理代码 ===
// ==========================================

import { pipe } from "effect";
import { Option as O, Either as E } from "effect";
import { describe, it, expect } from "vitest";

// 你的 Maybe / Either 处理器:

// --- Option 处理器: 空值安全 ---

// findTodoById: 查找 todo，不存在返回 O.none
function findTodoById(todos, id) {
  // TODO: 用 pipe + O.fromNullable 查找 todo，不存在返回 O.none
}

// safeGetLocalStorage: 安全读取 localStorage，失败返回 O.none
function safeGetLocalStorage(key) {
  // TODO: 安全读取 localStorage，失败或不存在返回 O.none
}

// getTodoText: 安全获取 todo 文本，不存在返回默认值
function getTodoText(todos, id) {
  // TODO: 用 pipe + O.map + O.getOrElse 安全获取 todo 文本，不存在返回默认值
}

// --- Either 处理器: 校验与异常 ---

// validateTodoText: 校验 todo 文本
function validateTodoText(text) {
  // TODO: 校验 todo 文本：非空且不超过 200 字，返回 Either
}

// validatePage: 校验页码参数
function validatePage(page, pageSize, total) {
  // TODO: 校验页码 >= 1 且不超过最大页数，返回 Either
}

// chain 串联:

// safeAddTodo: 用 Either 串联校验 → 创建 todo
// 返回 Either<error, todo>
function safeAddTodo(todos, text, id, createdAt) {
  // TODO: 用 pipe + E.map 串联 validateTodoText → 创建 todo → 追加到数组
}

// 错误统一处理:

// processTodoAction: 统一处理 todo 操作的错误
// 根据操作类型执行不同的校验，返回 Either<error, result>
function processTodoAction(todos, action) {
  // TODO: 根据 action.type 分派 ADD/UPDATE/DELETE 操作
  // ADD: validateTodoText → 创建新 todo → 追加
  // UPDATE: findTodoById → validateTodoText → 更新文本
  // DELETE: findTodoById → 删除
  // 全程用 Either 统一错误处理
}

// ==========================================
// === 测试（不要修改） ===
// ==========================================

const testTodos = [
  { id: "1", text: "Learn FP", completed: false, createdAt: 1000 },
  { id: "2", text: "Build Todo App", completed: true, createdAt: 2000 },
];

describe("Option: 空值安全", () => {
  it("findTodoById 存在时返回 some", () => {
    const result = findTodoById(testTodos, "1");
    expect(O.isSome(result)).toBe(true);
    pipe(
      result,
      O.map((t) => expect(t.text).toBe("Learn FP"))
    );
  });

  it("findTodoById 不存在时返回 none", () => {
    const result = findTodoById(testTodos, "999");
    expect(O.isNone(result)).toBe(true);
  });

  it("getTodoText 不存在时返回默认值", () => {
    const result = getTodoText(testTodos, "999");
    expect(result).toBe("未知待办事项");
  });

  it("getTodoText 存在时返回文本", () => {
    const result = getTodoText(testTodos, "2");
    expect(result).toBe("Build Todo App");
  });
});

describe("Either: 校验与异常", () => {
  it("validateTodoText 正常文本返回 right", () => {
    const result = validateTodoText("  Learn FP  ");
    expect(E.isRight(result)).toBe(true);
    if (E.isRight(result)) {
      expect(result.right).toBe("Learn FP");
    }
  });

  it("validateTodoText 空字符串返回 left", () => {
    const result = validateTodoText("");
    expect(E.isLeft(result)).toBe(true);
    if (E.isLeft(result)) {
      expect(result.left).toBe("待办事项不能为空");
    }
  });

  it("validateTodoText 超长文本返回 left", () => {
    const result = validateTodoText("a".repeat(201));
    expect(E.isLeft(result)).toBe(true);
    if (E.isLeft(result)) {
      expect(result.left).toBe("待办事项不能超过 200 字");
    }
  });

  it("validatePage 有效页码返回 right", () => {
    const result = validatePage(1, 10, 25);
    expect(E.isRight(result)).toBe(true);
  });

  it("validatePage 超出范围返回 left", () => {
    const result = validatePage(5, 10, 25);
    expect(E.isLeft(result)).toBe(true);
  });
});

describe("chain 串联 + 错误统一处理", () => {
  it("safeAddTodo 正常输入返回 right", () => {
    const result = safeAddTodo(testTodos, "New Todo", "3", 3000);
    expect(E.isRight(result)).toBe(true);
    if (E.isRight(result)) {
      expect(result.right).toHaveLength(3);
      expect(result.right[2].text).toBe("New Todo");
    }
  });

  it("safeAddTodo 空文本返回 left", () => {
    const result = safeAddTodo(testTodos, "   ", "3", 3000);
    expect(E.isLeft(result)).toBe(true);
  });

  it("processTodoAction ADD 正常", () => {
    const result = processTodoAction(testTodos, {
      type: "ADD",
      text: "Valid Todo",
      id: "3",
      createdAt: 3000,
    });
    expect(E.isRight(result)).toBe(true);
    if (E.isRight(result)) {
      expect(result.right).toHaveLength(3);
    }
  });

  it("processTodoAction DELETE 不存在的 id 返回 left", () => {
    const result = processTodoAction(testTodos, {
      type: "DELETE",
      id: "999",
    });
    expect(E.isLeft(result)).toBe(true);
    if (E.isLeft(result)) {
      expect(result.left).toBe("待办事项不存在");
    }
  });

  it("processTodoAction UPDATE 正常", () => {
    const result = processTodoAction(testTodos, {
      type: "UPDATE",
      id: "1",
      text: "Updated FP",
    });
    expect(E.isRight(result)).toBe(true);
    if (E.isRight(result)) {
      expect(result.right[0].text).toBe("Updated FP");
    }
  });

  it("processTodoAction 未知类型返回 left", () => {
    const result = processTodoAction(testTodos, { type: "UNKNOWN" });
    expect(E.isLeft(result)).toBe(true);
  });
});