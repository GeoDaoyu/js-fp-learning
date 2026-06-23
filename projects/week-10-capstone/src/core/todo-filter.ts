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
          t.text.toLowerCase().includes(query.toLowerCase()),
        );

export const paginate =
  (page: number, pageSize: number) =>
  (todos: Todo[]): Todo[] =>
    todos.slice((page - 1) * pageSize, page * pageSize);