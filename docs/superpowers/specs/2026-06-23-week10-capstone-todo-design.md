# Week 10 Capstone: 纯函数式 Todo 应用 — 设计文档

**日期**: 2026-06-23
**项目选项**: A（前端 Todo 应用）
**技术栈**: Vite + React + TypeScript + Effect（轻量集成）

## 架构概览

采用"纯函数层 + React 薄壳"架构，清晰分离纯函数和副作用。

```
src/
  core/
    types.ts              # Todo, TodoState, FilterStatus 类型定义
    todo-crud.ts          # CRUD 纯函数 (addTodo, toggleTodo, removeTodo, updateTodoText)
    todo-filter.ts        # 筛选/搜索/分页纯函数 (filterByStatus, searchTodos, paginate)
    todo-pipeline.ts      # pipe(filter → search → paginate) 核心 pipeline
    validation.ts         # validateTodoText → Either, findTodoById → Option
  hooks/
    useTodos.ts           # 唯一副作用边界：useReducer + localStorage
  App.tsx                 # 纯渲染组件
  App.css                 # 样式
  main.tsx                # 入口
```

## 数据模型

```typescript
interface Todo {
  id: string;          // crypto.randomUUID()
  text: string;
  completed: boolean;
  createdAt: number;   // Date.now()
}

type FilterStatus = "all" | "completed" | "active";

interface TodoState {
  todos: Todo[];       // 完整列表
  filter: FilterStatus;
  query: string;       // 搜索关键词
  page: number;        // 当前页码，1-based
  pageSize: number;    // 每页条数，默认 10
}
```

## 纯函数层（`src/core/`）

### todo-crud.ts — CRUD 操作

- `addTodo(todos, text, id, createdAt) → Todo[]` — 添加新 todo，返回新数组
- `toggleTodo(todos, id) → Todo[]` — 切换 completed 状态
- `removeTodo(todos, id) → Todo[]` — 删除指定 todo
- `updateTodoText(todos, id, text) → Todo[]` — 修改文本

所有函数不修改原数组，返回新数组。

### todo-filter.ts — 筛选搜索分页

- `filterByStatus(status) → (todos) → Todo[]` — 按状态筛选，柯里化
- `searchTodos(query) → (todos) → Todo[]` — 按文本搜索，大小写不敏感
- `paginate(page, pageSize) → (todos) → Todo[]` — 分页切片

函数签名设计为"数据最后"（last argument），方便柯里化和 pipe 组合。

### todo-pipeline.ts — 核心管道

```typescript
const processTodos = (state: TodoState): Todo[] =>
  pipe(
    state.todos,
    filterByStatus(state.filter),
    searchTodos(state.query),
    paginate(state.page, state.pageSize)
  );
```

### validation.ts — 边界处理

- `findTodoById(todos, id) → Option<Todo>` — 查找 todo，不存在返回 `None`
- `validateTodoText(text) → Either<string, string>` — 校验文本，空或超长返回 `Left`

## 副作用层（`src/hooks/useTodos.ts`）

唯一包含副作用的地方：

- **`useReducer`**：管理 `TodoState`，reducer 是纯函数 `(state, action) → state`
- **`loadTodos()`**：从 `localStorage` 读取初始数据，失败返回 `[]`
- **`useEffect`**：`state.todos` 变化时写入 `localStorage`
- **`dispatch`**：暴露给组件，用于派发 action

reducer 中调用 `core/` 纯函数处理数据，用 `Either.isLeft` 做分支判断。

## 组件层（`src/App.tsx`）

```
┌─────────────────────────────────────────┐
│  Todo App                    [统计信息]  │
├─────────────────────────────────────────┤
│  [  搜索框  ]                           │
├─────────────────────────────────────────┤
│  [All] [Active] [Completed]             │
├─────────────────────────────────────────┤
│  ☐ Todo 1                     [删除]    │
│  ☑ Todo 2                     [删除]    │
│  ...                                    │
├─────────────────────────────────────────┤
│           < 1  2  3 >                   │
├─────────────────────────────────────────┤
│  [  输入框  ]  [添加]                   │
└─────────────────────────────────────────┘
```

组件只负责渲染，数据通过 props 传入，事件通过 callback 上报，不包含业务逻辑。

## 副作用边界

| 边界 | 位置 | 处理方式 |
|------|------|---------|
| localStorage 读取 | `useTodos` hook 初始化 | `try/catch`，失败用 `[]` |
| localStorage 写入 | `useTodos` hook 的 `useEffect` | 自动同步，无额外处理 |
| ID 生成 | reducer 的 `ADD_TODO` 分支 | `crypto.randomUUID()` |
| 时间戳 | reducer 的 `ADD_TODO` 分支 | `Date.now()` |
| 文本校验 | reducer 中调用 `validateTodoText` | `Either.isLeft` 判断 |
| ID 查找 | reducer 中调用 `findTodoById` | `Option.isNone` 判断 |

## 使用的 FP 工具

| 工具 | 来源 | 用途 |
|------|------|------|
| `pipe` | Effect | 串联纯函数管道 |
| `Option` | Effect | 空值安全处理（查找 todo） |
| `Either` | Effect | 校验结果表达（成功/失败分支） |
| Array 不可变操作 | 原生 JS | `map`/`filter`/`slice`/扩展运算符 |
| 柯里化 | 手写 | 函数签名设计为 `(config) => (data) => result` |

## 测试策略

| 被测模块 | 测试方式 | 预估用例 |
|----------|---------|---------|
| `core/todo-crud` | vitest 纯函数测试 | 5 |
| `core/todo-filter` | vitest 纯函数测试 | 4 |
| `core/todo-pipeline` | vitest 纯函数测试 | 2 |
| `core/validation` | vitest 纯函数测试 | 4 |
| `hooks/useTodos` | `@testing-library/react` renderHook | 选做 1-2 |
| 组件 | 不做单元测试，手动验证 | 0 |

纯函数层测试完全独立，不需要 mock、不需要 DOM、不需要 React。

## 非功能约束

- 无 `for`/`while` 循环（全程 `map`/`filter`/`reduce`/递归）
- 所有数据不可变（不修改原数组/对象）
- 副作用隔离在 `useTodos.ts` 一个文件中
- 遵循项目已有的 Vitest 测试风格