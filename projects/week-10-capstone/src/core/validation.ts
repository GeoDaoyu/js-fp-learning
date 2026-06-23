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