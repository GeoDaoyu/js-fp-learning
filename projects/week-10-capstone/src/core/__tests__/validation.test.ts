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