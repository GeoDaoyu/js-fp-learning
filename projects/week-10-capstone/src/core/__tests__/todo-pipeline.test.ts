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