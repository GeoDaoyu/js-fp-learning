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