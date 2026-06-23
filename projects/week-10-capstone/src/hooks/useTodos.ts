// src/hooks/useTodos.ts
import { useReducer, useEffect, useMemo } from "react";
import { Either, Option } from "effect";
import type { Todo, TodoState, FilterStatus } from "../core/types";
import * as CRUD from "../core/todo-crud";
import { getFilteredTodos, processTodos } from "../core/todo-pipeline";
import { validateTodoText, findTodoById } from "../core/validation";

type Action =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: string }
  | { type: "REMOVE_TODO"; id: string }
  | { type: "UPDATE_TODO"; id: string; text: string }
  | { type: "SET_FILTER"; filter: FilterStatus }
  | { type: "SET_QUERY"; query: string }
  | { type: "SET_PAGE"; page: number }
  | { type: "CLEAR_ERROR" };

const STORAGE_KEY = "fp-todo-app";

function reducer(state: TodoState, action: Action): TodoState {
  switch (action.type) {
    case "ADD_TODO": {
      const validated = validateTodoText(action.text);
      if (Either.isLeft(validated))
        return { ...state, error: validated.left };
      const text = validated.right;
      const id = crypto.randomUUID();
      const now = Date.now();
      return {
        ...state,
        error: null,
        todos: CRUD.addTodo(state.todos, text, id, now),
      };
    }
    case "TOGGLE_TODO": {
      const found = findTodoById(state.todos, action.id);
      if (Option.isNone(found)) return { ...state, error: "待办事项不存在" };
      return {
        ...state,
        error: null,
        todos: CRUD.toggleTodo(state.todos, action.id),
      };
    }
    case "REMOVE_TODO": {
      const found = findTodoById(state.todos, action.id);
      if (Option.isNone(found)) return { ...state, error: "待办事项不存在" };
      return {
        ...state,
        error: null,
        todos: CRUD.removeTodo(state.todos, action.id),
      };
    }
    case "UPDATE_TODO": {
      const found = findTodoById(state.todos, action.id);
      if (Option.isNone(found)) return { ...state, error: "待办事项不存在" };
      const validated = validateTodoText(action.text);
      if (Either.isLeft(validated))
        return { ...state, error: validated.left };
      return {
        ...state,
        error: null,
        todos: CRUD.updateTodoText(state.todos, action.id, validated.right),
      };
    }
    case "SET_FILTER":
      return { ...state, filter: action.filter, page: 1, error: null };
    case "SET_QUERY":
      return { ...state, query: action.query, page: 1, error: null };
    case "SET_PAGE":
      return { ...state, page: action.page, error: null };
    case "CLEAR_ERROR":
      return { ...state, error: null };
  }
}

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is Todo =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "text" in item &&
        "completed" in item &&
        "createdAt" in item
    );
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
    error: null,
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todos));
  }, [state.todos]);

  const visibleTodos = useMemo(() => processTodos(state), [state]);

  const totalPages = useMemo(() => {
    const filtered = getFilteredTodos(state);
    return Math.max(1, Math.ceil(filtered.length / state.pageSize));
  }, [state.todos, state.filter, state.query, state.pageSize]);

  return { state, visibleTodos, totalPages, dispatch };
}