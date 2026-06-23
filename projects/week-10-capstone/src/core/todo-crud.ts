// src/core/todo-crud.ts
import type { Todo } from "./types";

export const addTodo = (
  todos: Todo[],
  text: string,
  id: string,
  createdAt: number
): Todo[] => [...todos, { id, text, completed: false, createdAt }];

export const toggleTodo = (todos: Todo[], id: string): Todo[] =>
  todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));

export const removeTodo = (todos: Todo[], id: string): Todo[] =>
  todos.filter((t) => t.id !== id);

export const updateTodoText = (
  todos: Todo[],
  id: string,
  text: string
): Todo[] => todos.map((t) => (t.id === id ? { ...t, text } : t));