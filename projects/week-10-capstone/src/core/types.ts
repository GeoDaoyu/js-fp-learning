// src/core/types.ts

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export type FilterStatus = "all" | "completed" | "active";

export interface TodoState {
  todos: Todo[];
  filter: FilterStatus;
  query: string;
  page: number;
  pageSize: number;
  error: string | null;
}