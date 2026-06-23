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