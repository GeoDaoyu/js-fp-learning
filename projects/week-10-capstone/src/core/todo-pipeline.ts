// src/core/todo-pipeline.ts
import { pipe } from "effect";
import type { TodoState } from "./types";
import { filterByStatus, searchTodos, paginate } from "./todo-filter";

export const getFilteredTodos = (state: TodoState) =>
  pipe(
    state.todos,
    filterByStatus(state.filter),
    searchTodos(state.query)
  );

export const processTodos = (state: TodoState) =>
  pipe(
    state.todos,
    filterByStatus(state.filter),
    searchTodos(state.query),
    paginate(state.page, state.pageSize)
  );