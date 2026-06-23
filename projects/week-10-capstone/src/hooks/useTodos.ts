// src/hooks/useTodos.ts
import { useReducer, useEffect, useMemo } from "react";
import { Either } from "effect";
import type { Todo, TodoState, FilterStatus } from "../core/types";
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

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
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