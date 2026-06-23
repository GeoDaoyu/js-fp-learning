// src/core/__tests__/todo-pipeline.test.ts
import { describe, it, expect } from "vitest";
import { getFilteredTodos, processTodos } from "../todo-pipeline";
import type { TodoState } from "../types";

const makeState = (overrides: Partial<TodoState> = {}): TodoState => ({
  todos: [
    { id: "1", text: "Learn FP", completed: false, createdAt: 1000 },
    { id: "2", text: "Build App", completed: true, createdAt: 2000 },
    { id: "3", text: "Learn Effect", completed: false, createdAt: 3000 },
    { id: "4", text: "Write Tests", completed: true, createdAt: 4000 },
    { id: "5", text: "Ship it", completed: false, createdAt: 5000 },
  ],
  filter: "all",
  query: "",
  page: 1,
  pageSize: 10,
  error: null,
  ...overrides,
});

describe("getFilteredTodos", () => {
  it("should apply filter and search without pagination", () => {
    const state = makeState({ filter: "active", query: "learn" });
    const result = getFilteredTodos(state);
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
    expect(result.every((t) => t.text.toLowerCase().includes("learn"))).toBe(true);
  });
});

describe("processTodos", () => {
  it("should apply filter → search → paginate in order", () => {
    const state = makeState({ filter: "active", query: "learn", pageSize: 10 });
    const result = processTodos(state);
    expect(result).toHaveLength(2);
    expect(result.every((t) => !t.completed)).toBe(true);
    expect(result.every((t) => t.text.toLowerCase().includes("learn"))).toBe(true);
  });

  it("should return empty array for page past the end", () => {
    const state = makeState({ page: 99 });
    const result = processTodos(state);
    expect(result).toHaveLength(0);
  });

  it("should not mutate the original array", () => {
    const state = makeState();
    processTodos(state);
    expect(state.todos).toHaveLength(5);
  });

  it("should filter by completed, then search, then paginate", () => {
    const state = makeState({ filter: "completed", query: "test", pageSize: 1 });
    const result = processTodos(state);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("4");
  });
});