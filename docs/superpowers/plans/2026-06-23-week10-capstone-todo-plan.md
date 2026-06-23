# Week 10 Capstone Todo App — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pure functional Todo app with Vite + React + TypeScript + Effect (lightweight integration: pipe, Option, Either).

**Architecture:** Pure function layer (`src/core/`) handles all business logic with zero side effects. A single React hook (`src/hooks/useTodos.ts`) is the sole side-effect boundary, managing state via `useReducer` and syncing to `localStorage`. The React component (`App.tsx`) is pure rendering only.

**Tech Stack:** Vite 6, React 19, TypeScript 5.7, Effect (latest), Vitest, @testing-library/react

## Global Constraints

- No `for`/`while` loops — use `map`, `filter`, `reduce`, recursion only
- All data immutable — never mutate original arrays/objects
- Side effects isolated in `useTodos.ts` only
- Follow existing Vitest test style (ESM, `describe`/`it`/`expect`)
- Pure functions must be independently testable without React/DOM/mocks

---

## File Structure

```
projects/week-10-capstone/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── core/
│   │   ├── types.ts
│   │   ├── todo-crud.ts
│   │   ├── todo-filter.ts
│   │   ├── todo-pipeline.ts
│   │   ├── validation.ts
│   │   └── __tests__/
│   │       ├── todo-crud.test.ts
│   │       ├── todo-filter.test.ts
│   │       ├── todo-pipeline.test.ts
│   │       └── validation.test.ts
│   └── hooks/
│       └── useTodos.ts
```

---

### Task 1: Scaffold Vite + React + TypeScript Project

**Files:**
- Create: `projects/week-10-capstone/package.json`
- Create: `projects/week-10-capstone/tsconfig.json`
- Create: `projects/week-10-capstone/tsconfig.node.json`
- Create: `projects/week-10-capstone/vite.config.ts`
- Create: `projects/week-10-capstone/index.html`
- Create: `projects/week-10-capstone/src/main.tsx`
- Create: `projects/week-10-capstone/src/vite-env.d.ts`

**Interfaces:**
- Produces: Working Vite dev server, project ready for modules

- [ ] **Step 1: Create package.json**

```json
{
  "name": "week-10-capstone-todo",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "effect": "^3.13.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.0",
    "@testing-library/react": "^16.1.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "jsdom": "^25.0.0",
    "typescript": "~5.7.0",
    "vite": "^6.0.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Create vite.config.ts**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
  },
});
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FP Todo App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 6: Create src/vite-env.d.ts**

```typescript
/// <reference types="vite/client" />
```

- [ ] **Step 7: Create src/main.tsx (placeholder)**

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

- [ ] **Step 8: Install dependencies**

Run: `cd projects/week-10-capstone && pnpm install`
Expected: All dependencies installed without errors

- [ ] **Step 9: Verify dev server starts**

Run: `cd projects/week-10-capstone && pnpm run dev` (then Ctrl+C to stop)
Expected: Vite dev server starts without errors

- [ ] **Step 10: Commit**

```bash
git add projects/week-10-capstone/
git commit -m "feat: scaffold Vite + React + TypeScript project for week 10 capstone"
```

---

### Task 2: Types and Data Model

**Files:**
- Create: `projects/week-10-capstone/src/core/types.ts`

**Interfaces:**
- Produces: `Todo`, `FilterStatus`, `TodoState` types used by all subsequent modules

- [ ] **Step 1: Create types.ts**

```typescript
// src/core/types.ts

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type FilterStatus = "all" | "completed" | "active";

export interface TodoState {
  todos: Todo[];
  filter: FilterStatus;
  query: string;
  page: number;
  pageSize: number;
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `cd projects/week-10-capstone && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add projects/week-10-capstone/src/core/types.ts
git commit -m "feat: add Todo data model types"
```

---

### Task 3: CRUD Pure Functions

**Files:**
- Create: `projects/week-10-capstone/src/core/todo-crud.ts`
- Create: `projects/week-10-capstone/src/core/__tests__/todo-crud.test.ts`

**Interfaces:**
- Produces:
  - `addTodo(todos: Todo[], text: string, id: string, createdAt: number): Todo[]`
  - `toggleTodo(todos: Todo[], id: string): Todo[]`
  - `removeTodo(todos: Todo[], id: string): Todo[]`
  - `updateTodoText(todos: Todo[], id: string, text: string): Todo[]`

- [ ] **Step 1: Write failing tests**

```typescript
// src/core/__tests__/todo-crud.test.ts
import { describe, it, expect } from "vitest";
import { addTodo, toggleTodo, removeTodo, updateTodoText } from "../todo-crud";
import type { Todo } from "../types";

const makeTodo = (id: string, text: string, completed = false, createdAt = 1000): Todo => ({
  id, text, completed, createdAt,
});

describe("addTodo", () => {
  it("should append a new todo to the array", () => {
    const todos: Todo[] = [makeTodo("1", "A")];
    const result = addTodo(todos, "B", "2", 2000);
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual({ id: "2", text: "B", completed: false, createdAt: 2000 });
  });

  it("should not mutate the original array", () => {
    const todos: Todo[] = [makeTodo("1", "A")];
    addTodo(todos, "B", "2", 2000);
    expect(todos).toHaveLength(1);
  });
});

describe("toggleTodo", () => {
  it("should toggle completed from false to true", () => {
    const todos: Todo[] = [makeTodo("1", "A", false)];
    const result = toggleTodo(todos, "1");
    expect(result[0].completed).toBe(true);
  });

  it("should toggle completed from true to false", () => {
    const todos: Todo[] = [makeTodo("1", "A", true)];
    const result = toggleTodo(todos, "1");
    expect(result[0].completed).toBe(false);
  });

  it("should not mutate the original array", () => {
    const todos: Todo[] = [makeTodo("1", "A", false)];
    toggleTodo(todos, "1");
    expect(todos[0].completed).toBe(false);
  });

  it("should return same array if id not found", () => {
    const todos: Todo[] = [makeTodo("1", "A")];
    const result = toggleTodo(todos, "999");
    expect(result).toEqual(todos);
  });
});

describe("removeTodo", () => {
  it("should remove the todo with matching id", () => {
    const todos: Todo[] = [makeTodo("1", "A"), makeTodo("2", "B")];
    const result = removeTodo(todos, "1");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("should not mutate the original array", () => {
    const todos: Todo[] = [makeTodo("1", "A"), makeTodo("2", "B")];
    removeTodo(todos, "1");
    expect(todos).toHaveLength(2);
  });
});

describe("updateTodoText", () => {
  it("should update the text of todo with matching id", () => {
    const todos: Todo[] = [makeTodo("1", "A")];
    const result = updateTodoText(todos, "1", "Updated");
    expect(result[0].text).toBe("Updated");
  });

  it("should not mutate the original array", () => {
    const todos: Todo[] = [makeTodo("1", "A")];
    updateTodoText(todos, "1", "Updated");
    expect(todos[0].text).toBe("A");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd projects/week-10-capstone && npx vitest run src/core/__tests__/todo-crud.test.ts`
Expected: All 8 tests FAIL (module not found)

- [ ] **Step 3: Implement todo-crud.ts**

```typescript
// src/core/todo-crud.ts
import type { Todo } from "./types";

export const addTodo = (
  todos: Todo[],
  text: string,
  id: string,
  createdAt: number
): Todo[] => [...todos, { id, text, completed: false, createdAt }];

export const toggleTodo = (todos: Todo[], id: string): Todo[] =>
  todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));

export const removeTodo = (todos: Todo[], id: string): Todo[] =>
  todos.filter((t) => t.id !== id);

export const updateTodoText = (
  todos: Todo[],
  id: string,
  text: string
): Todo[] => todos.map((t) => (t.id === id ? { ...t, text } : t));
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd projects/week-10-capstone && npx vitest run src/core/__tests__/todo-crud.test.ts`
Expected: All 8 tests PASS

- [ ] **Step 5: Commit**

```bash
git add projects/week-10-capstone/src/core/todo-crud.ts projects/week-10-capstone/src/core/__tests__/todo-crud.test.ts
git commit -m "feat: add CRUD pure functions for todo management"
```

---

### Task 4: Filter, Search, and Paginate Pure Functions

**Files:**
- Create: `projects/week-10-capstone/src/core/todo-filter.ts`
- Create: `projects/week-10-capstone/src/core/__tests__/todo-filter.test.ts`

**Interfaces:**
- Consumes: `Todo`, `FilterStatus` from `types.ts`
- Produces:
  - `filterByStatus(status: FilterStatus): (todos: Todo[]) => Todo[]`
  - `searchTodos(query: string): (todos: Todo[]) => Todo[]`
  - `paginate(page: number, pageSize: number): (todos: Todo[]) => Todo[]`

- [ ] **Step 1: Write failing tests**

```typescript
// src/core/__tests__/todo-filter.test.ts
import { describe, it, expect } from "vitest";
import { filterByStatus, searchTodos, paginate } from "../todo-filter";
import type { Todo } from "../types";

const todos: Todo[] = [
  { id: "1", text: "Learn FP", completed: false, createdAt: 1000 },
  { id: "2", text: "Build Todo App", completed: true, createdAt: 2000 },
  { id: "3", text: "Write Tests", completed: false, createdAt: 3000 },
  { id: "4", text: "Learn Effect", completed: true, createdAt: 4000 },
  { id: "5", text: "Ship it", completed: false, createdAt: 5000 },
];

describe("filterByStatus", () => {
  it("should return all todos when status is 'all'", () => {
    const result = filterByStatus("all")(todos);
    expect(result).toHaveLength(5);
  });

  it("should return only completed todos", () => {
    const result = filterByStatus("completed")(todos);
    expect(result).toHaveLength(2);
    expect(result.every((t) => t.completed)).toBe(true);
  });

  it("should return only active (not completed) todos", () => {
    const result = filterByStatus("active")(todos);
    expect(result).toHaveLength(3);
    expect(result.every((t) => !t.completed)).toBe(true);
  });

  it("should not mutate the original array", () => {
    filterByStatus("completed")(todos);
    expect(todos).toHaveLength(5);
  });
});

describe("searchTodos", () => {
  it("should return all todos when query is empty", () => {
    const result = searchTodos("")(todos);
    expect(result).toHaveLength(5);
  });

  it("should match case-insensitive partial text", () => {
    const result = searchTodos("learn")(todos);
    expect(result).toHaveLength(2);
    expect(result.map((t) => t.id)).toEqual(["1", "4"]);
  });

  it("should return empty array when no match", () => {
    const result = searchTodos("xyz")(todos);
    expect(result).toHaveLength(0);
  });

  it("should not mutate the original array", () => {
    searchTodos("learn")(todos);
    expect(todos).toHaveLength(5);
  });
});

describe("paginate", () => {
  it("should return first page with correct page size", () => {
    const result = paginate(1, 2)(todos);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("1");
    expect(result[1].id).toBe("2");
  });

  it("should return second page", () => {
    const result = paginate(2, 2)(todos);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe("3");
    expect(result[1].id).toBe("4");
  });

  it("should return remaining items on last page", () => {
    const result = paginate(3, 2)(todos);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("5");
  });

  it("should not mutate the original array", () => {
    paginate(1, 2)(todos);
    expect(todos).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd projects/week-10-capstone && npx vitest run src/core/__tests__/todo-filter.test.ts`
Expected: All 11 tests FAIL

- [ ] **Step 3: Implement todo-filter.ts**

```typescript
// src/core/todo-filter.ts
import type { Todo, FilterStatus } from "./types";

export const filterByStatus =
  (status: FilterStatus) =>
  (todos: Todo[]): Todo[] =>
    status === "all"
      ? todos
      : status === "completed"
        ? todos.filter((t) => t.completed)
        : todos.filter((t) => !t.completed);

export const searchTodos =
  (query: string) =>
  (todos: Todo[]): Todo[] =>
    query === ""
      ? todos
      : todos.filter((t) =>
          t.text.toLowerCase().includes(query.toLowerCase())
        );

export const paginate =
  (page: number, pageSize: number) =>
  (todos: Todo[]): Todo[] =>
    todos.slice((page - 1) * pageSize, page * pageSize);
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd projects/week-10-capstone && npx vitest run src/core/__tests__/todo-filter.test.ts`
Expected: All 11 tests PASS

- [ ] **Step 5: Commit**

```bash
git add projects/week-10-capstone/src/core/todo-filter.ts projects/week-10-capstone/src/core/__tests__/todo-filter.test.ts
git commit -m "feat: add filter, search, and paginate pure functions"
```

---

### Task 5: Pipeline Composition

**Files:**
- Create: `projects/week-10-capstone/src/core/todo-pipeline.ts`
- Create: `projects/week-10-capstone/src/core/__tests__/todo-pipeline.test.ts`

**Interfaces:**
- Consumes: `TodoState` from `types.ts`, `filterByStatus`, `searchTodos`, `paginate` from `todo-filter.ts`
- Produces: `processTodos(state: TodoState): Todo[]`

- [ ] **Step 1: Write failing tests**

```typescript
// src/core/__tests__/todo-pipeline.test.ts
import { describe, it, expect } from "vitest";
import { processTodos } from "../todo-pipeline";
import type { Todo, TodoState } from "../types";

const todos: Todo[] = [
  { id: "1", text: "Learn FP", completed: false, createdAt: 1000 },
  { id: "2", text: "Build App", completed: true, createdAt: 2000 },
  { id: "3", text: "Learn Effect", completed: false, createdAt: 3000 },
  { id: "4", text: "Write Tests", completed: true, createdAt: 4000 },
  { id: "5", text: "Ship it", completed: false, createdAt: 5000 },
];

describe("processTodos", () => {
  it("should apply filter → search → paginate in order", () => {
    const state: TodoState = {
      todos,
      filter: "active",
      query: "learn",
      page: 1,
      pageSize: 10,
    };
    const result = processTodos(state);
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
    expect(result.every((t) => t.text.toLowerCase().includes("learn"))).toBe(true);
  });

  it("should return empty array for page past the end", () => {
    const state: TodoState = {
      todos,
      filter: "all",
      query: "",
      page: 99,
      pageSize: 10,
    };
    const result = processTodos(state);
    expect(result).toHaveLength(0);
  });

  it("should not mutate the original array", () => {
    const state: TodoState = {
      todos,
      filter: "all",
      query: "",
      page: 1,
      pageSize: 10,
    };
    processTodos(state);
    expect(todos).toHaveLength(5);
  });

  it("should filter by completed, then search, then paginate", () => {
    const state: TodoState = {
      todos,
      filter: "completed",
      query: "test",
      page: 1,
      pageSize: 1,
    };
    const result = processTodos(state);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("4");
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd projects/week-10-capstone && npx vitest run src/core/__tests__/todo-pipeline.test.ts`
Expected: All 4 tests FAIL

- [ ] **Step 3: Implement todo-pipeline.ts**

```typescript
// src/core/todo-pipeline.ts
import { pipe } from "effect";
import type { TodoState } from "./types";
import { filterByStatus, searchTodos, paginate } from "./todo-filter";

export const processTodos = (state: TodoState) =>
  pipe(
    state.todos,
    filterByStatus(state.filter),
    searchTodos(state.query),
    paginate(state.page, state.pageSize)
  );
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd projects/week-10-capstone && npx vitest run src/core/__tests__/todo-pipeline.test.ts`
Expected: All 4 tests PASS

- [ ] **Step 5: Commit**

```bash
git add projects/week-10-capstone/src/core/todo-pipeline.ts projects/week-10-capstone/src/core/__tests__/todo-pipeline.test.ts
git commit -m "feat: add pipeline composition with Effect pipe"
```

---

### Task 6: Validation with Option and Either

**Files:**
- Create: `projects/week-10-capstone/src/core/validation.ts`
- Create: `projects/week-10-capstone/src/core/__tests__/validation.test.ts`

**Interfaces:**
- Consumes: `Todo` from `types.ts`
- Produces:
  - `findTodoById(todos: Todo[], id: string): Option.Option<Todo>`
  - `validateTodoText(text: string): Either.Either<string, string>`

- [ ] **Step 1: Write failing tests**

```typescript
// src/core/__tests__/validation.test.ts
import { describe, it, expect } from "vitest";
import { Option, Either } from "effect";
import { findTodoById, validateTodoText } from "../validation";
import type { Todo } from "../types";

const todos: Todo[] = [
  { id: "1", text: "Learn FP", completed: false, createdAt: 1000 },
  { id: "2", text: "Build App", completed: true, createdAt: 2000 },
];

describe("findTodoById", () => {
  it("should return Some(todo) when id exists", () => {
    const result = findTodoById(todos, "1");
    expect(Option.isSome(result)).toBe(true);
    if (Option.isSome(result)) {
      expect(result.value.text).toBe("Learn FP");
    }
  });

  it("should return None when id does not exist", () => {
    const result = findTodoById(todos, "999");
    expect(Option.isNone(result)).toBe(true);
  });

  it("should return None for empty array", () => {
    const result = findTodoById([], "1");
    expect(Option.isNone(result)).toBe(true);
  });
});

describe("validateTodoText", () => {
  it("should return Right(trimmed) for valid text", () => {
    const result = validateTodoText("  Learn FP  ");
    expect(Either.isRight(result)).toBe(true);
    if (Either.isRight(result)) {
      expect(result.right).toBe("Learn FP");
    }
  });

  it("should return Left for empty string", () => {
    const result = validateTodoText("");
    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(result.left).toBe("待办事项不能为空");
    }
  });

  it("should return Left for whitespace-only string", () => {
    const result = validateTodoText("   ");
    expect(Either.isLeft(result)).toBe(true);
  });

  it("should return Left for text exceeding 200 characters", () => {
    const longText = "a".repeat(201);
    const result = validateTodoText(longText);
    expect(Either.isLeft(result)).toBe(true);
    if (Either.isLeft(result)) {
      expect(result.left).toBe("待办事项不能超过 200 字");
    }
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd projects/week-10-capstone && npx vitest run src/core/__tests__/validation.test.ts`
Expected: All 7 tests FAIL

- [ ] **Step 3: Implement validation.ts**

```typescript
// src/core/validation.ts
import { Option, Either } from "effect";
import type { Todo } from "./types";

export const findTodoById = (
  todos: Todo[],
  id: string
): Option.Option<Todo> => Option.fromNullable(todos.find((t) => t.id === id));

export const validateTodoText = (text: string): Either.Either<string, string> => {
  const trimmed = text.trim();
  if (trimmed === "") return Either.left("待办事项不能为空");
  if (trimmed.length > 200) return Either.left("待办事项不能超过 200 字");
  return Either.right(trimmed);
};
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd projects/week-10-capstone && npx vitest run src/core/__tests__/validation.test.ts`
Expected: All 7 tests PASS

- [ ] **Step 5: Commit**

```bash
git add projects/week-10-capstone/src/core/validation.ts projects/week-10-capstone/src/core/__tests__/validation.test.ts
git commit -m "feat: add validation with Effect Option and Either"
```

---

### Task 7: useTodos Hook (Side-Effect Boundary)

**Files:**
- Create: `projects/week-10-capstone/src/hooks/useTodos.ts`

**Interfaces:**
- Consumes: All types from `types.ts`, CRUD functions from `todo-crud.ts`, filter functions from `todo-filter.ts`, `processTodos` from `todo-pipeline.ts`, `validateTodoText` from `validation.ts`
- Produces: `useTodos()` hook returning `{ state, visibleTodos, totalPages, dispatch }`

- [ ] **Step 1: Create a temporary App.tsx placeholder for type checking**

```tsx
// src/App.tsx (temporary placeholder)
function App() {
  return <div>Todo App</div>;
}
export default App;
```

- [ ] **Step 2: Implement useTodos.ts**

```typescript
// src/hooks/useTodos.ts
import { useReducer, useEffect, useMemo } from "react";
import { Either } from "effect";
import type { TodoState, FilterStatus } from "../core/types";
import * as CRUD from "../core/todo-crud";
import * as Filter from "../core/todo-filter";
import { processTodos } from "../core/todo-pipeline";
import { validateTodoText } from "../core/validation";

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: string }
  | { type: "REMOVE_TODO"; id: string }
  | { type: "UPDATE_TODO"; id: string; text: string }
  | { type: "SET_FILTER"; filter: FilterStatus }
  | { type: "SET_QUERY"; query: string }
  | { type: "SET_PAGE"; page: number };

const STORAGE_KEY = "fp-todo-app";

function reducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case "ADD_TODO": {
      const validated = validateTodoText(action.text);
      if (Either.isLeft(validated)) return state;
      const text = validated.right;
      const id = crypto.randomUUID();
      const now = Date.now();
      return { ...state, todos: CRUD.addTodo(state.todos, text, id, now) };
    }
    case "TOGGLE_TODO":
      return { ...state, todos: CRUD.toggleTodo(state.todos, action.id) };
    case "REMOVE_TODO":
      return { ...state, todos: CRUD.removeTodo(state.todos, action.id) };
    case "UPDATE_TODO": {
      const validated = validateTodoText(action.text);
      if (Either.isLeft(validated)) return state;
      return {
        ...state,
        todos: CRUD.updateTodoText(state.todos, action.id, validated.right),
      };
    }
    case "SET_FILTER":
      return { ...state, filter: action.filter, page: 1 };
    case "SET_QUERY":
      return { ...state, query: action.query, page: 1 };
    case "SET_PAGE":
      return { ...state, page: action.page };
  }
}

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Parameters<typeof CRUD.addTodo>[0]) : [];
  } catch {
    return [];
  }
}

export function useTodos() {
  const [state, dispatch] = useReducer(reducer, {
    todos: loadTodos(),
    filter: "all",
    query: "",
    page: 1,
    pageSize: 10,
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  const visibleTodos = useMemo(() => processTodos(state), [state]);

  const totalPages = useMemo(() => {
    const filtered = Filter.filterByStatus(state.filter)(
      Filter.searchTodos(state.query)(state.todos)
    );
    return Math.max(1, Math.ceil(filtered.length / state.pageSize));
  }, [state.todos, state.filter, state.query, state.pageSize]);

  return { state, visibleTodos, totalPages, dispatch };
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd projects/week-10-capstone && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add projects/week-10-capstone/src/hooks/useTodos.ts projects/week-10-capstone/src/App.tsx
git commit -m "feat: add useTodos hook as sole side-effect boundary"
```

---

### Task 8: App Component and Styles

**Files:**
- Modify: `projects/week-10-capstone/src/App.tsx` (replace placeholder)
- Create: `projects/week-10-capstone/src/App.css`

**Interfaces:**
- Consumes: `useTodos` from `hooks/useTodos.ts`
- Produces: Complete working Todo app UI

- [ ] **Step 1: Implement App.tsx**

```tsx
// src/App.tsx
import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  const { state, visibleTodos, totalPages, dispatch } = useTodos();
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    if (inputText.trim() !== "") {
      dispatch({ type: "ADD_TODO", text: inputText });
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  const stats = {
    total: state.todos.length,
    completed: state.todos.filter((t) => t.completed).length,
    active: state.todos.filter((t) => !t.completed).length,
  };

  const filters: Array<{ label: string; value: "all" | "active" | "completed" }> = [
    { label: "全部", value: "all" },
    { label: "未完成", value: "active" },
    { label: "已完成", value: "completed" },
  ];

  return (
    <div className="app">
      <h1>FP Todo App</h1>

      <div className="stats">
        总计 {stats.total} · 未完成 {stats.active} · 已完成 {stats.completed}
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="搜索待办事项..."
        value={state.query}
        onChange={(e) => dispatch({ type: "SET_QUERY", query: e.target.value })}
      />

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-btn ${state.filter === f.value ? "active" : ""}`}
            onClick={() => dispatch({ type: "SET_FILTER", filter: f.value })}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {visibleTodos.length === 0 ? (
          <li className="empty">暂无待办事项</li>
        ) : (
          visibleTodos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
                />
                <span className="todo-text">{todo.text}</span>
              </label>
              <button
                className="delete-btn"
                onClick={() => dispatch({ type: "REMOVE_TODO", id: todo.id })}
              >
                删除
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="pagination">
        <button
          disabled={state.page <= 1}
          onClick={() => dispatch({ type: "SET_PAGE", page: state.page - 1 })}
        >
          上一页
        </button>
        <span>
          第 {state.page} / {totalPages} 页
        </span>
        <button
          disabled={state.page >= totalPages}
          onClick={() => dispatch({ type: "SET_PAGE", page: state.page + 1 })}
        >
          下一页
        </button>
      </div>

      <div className="add-bar">
        <input
          type="text"
          placeholder="添加新的待办事项..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAdd}>添加</button>
      </div>
    </div>
  );
}

export default App;
```

- [ ] **Step 2: Implement App.css**

```css
/* src/App.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #f5f5f5;
  color: #333;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
}

.app {
  max-width: 560px;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

h1 {
  font-size: 24px;
  margin-bottom: 12px;
  text-align: center;
}

.stats {
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-bottom: 16px;
}

.search-input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  margin-bottom: 12px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #4a90d9;
}

.filter-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.filter-btn {
  flex: 1;
  padding: 8px 0;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.filter-btn.active {
  background: #4a90d9;
  color: #fff;
  border-color: #4a90d9;
}

.todo-list {
  list-style: none;
  margin-bottom: 16px;
  min-height: 100px;
}

.empty {
  text-align: center;
  color: #bbb;
  padding: 32px 0;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  flex: 1;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
  color: #bbb;
}

.delete-btn {
  background: none;
  border: none;
  color: #e06060;
  cursor: pointer;
  font-size: 13px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background 0.2s;
}

.delete-btn:hover {
  background: #fef0f0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  font-size: 14px;
}

.pagination button {
  padding: 6px 14px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.pagination button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.add-bar {
  display: flex;
  gap: 8px;
}

.add-bar input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
}

.add-bar input:focus {
  border-color: #4a90d9;
}

.add-bar button {
  padding: 10px 20px;
  background: #4a90d9;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}

.add-bar button:hover {
  background: #3a7bc8;
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd projects/week-10-capstone && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 4: Verify dev server works**

Run: `cd projects/week-10-capstone && npx vite build`
Expected: Build succeeds without errors

- [ ] **Step 5: Commit**

```bash
git add projects/week-10-capstone/src/App.tsx projects/week-10-capstone/src/App.css
git commit -m "feat: implement Todo app UI with pure rendering component"
```

---

### Task 9: Final Integration Verification

**Files:**
- No new files — verify all existing files work together

- [ ] **Step 1: Run all unit tests**

Run: `cd projects/week-10-capstone && npx vitest run`
Expected: All 30 tests PASS (8 CRUD + 11 filter + 4 pipeline + 7 validation)

- [ ] **Step 2: Run TypeScript type check**

Run: `cd projects/week-10-capstone && npx tsc --noEmit`
Expected: No errors

- [ ] **Step 3: Run production build**

Run: `cd projects/week-10-capstone && npx vite build`
Expected: Build succeeds, output in `dist/`

- [ ] **Step 4: Verify no for/while loops in source**

Run: `cd projects/week-10-capstone && grep -rn "for\s*(" src/ --include="*.ts" --include="*.tsx" || echo "No for loops found"`
Run: `cd projects/week-10-capstone && grep -rn "while\s*(" src/ --include="*.ts" --include="*.tsx" || echo "No while loops found"`
Expected: No matches for either

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: final integration verification, all tests pass"
```