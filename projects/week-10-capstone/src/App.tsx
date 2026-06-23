import { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import "./App.css";

function App() {
  const { state, visibleTodos, totalPages, dispatch } = useTodos();
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    if (inputText.trim() !== "") {
      dispatch({ type: "ADD_TODO", text: inputText });
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
  };

  const stats = {
    total: state.todos.length,
    completed: state.todos.filter((t) => t.completed).length,
    active: state.todos.filter((t) => !t.completed).length,
  };

  const filters: Array<{ label: string; value: "all" | "active" | "completed" }> = [
    { label: "全部", value: "all" },
    { label: "未完成", value: "active" },
    { label: "已完成", value: "completed" },
  ];

  return (
    <div className="app">
      <h1>FP Todo App</h1>

      <div className="stats">
        总计 {stats.total} · 未完成 {stats.active} · 已完成 {stats.completed}
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="搜索待办事项..."
        value={state.query}
        onChange={(e) => dispatch({ type: "SET_QUERY", query: e.target.value })}
      />

      <div className="filter-bar">
        {filters.map((f) => (
          <button
            key={f.value}
            className={`filter-btn ${state.filter === f.value ? "active" : ""}`}
            onClick={() => dispatch({ type: "SET_FILTER", filter: f.value })}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="todo-list">
        {visibleTodos.length === 0 ? (
          <li className="empty">暂无待办事项</li>
        ) : (
          visibleTodos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? "completed" : ""}`}>
              <label className="todo-label">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch({ type: "TOGGLE_TODO", id: todo.id })}
                />
                <span className="todo-text">{todo.text}</span>
              </label>
              <button
                className="delete-btn"
                onClick={() => dispatch({ type: "REMOVE_TODO", id: todo.id })}
              >
                删除
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="pagination">
        <button
          disabled={state.page <= 1}
          onClick={() => dispatch({ type: "SET_PAGE", page: state.page - 1 })}
        >
          上一页
        </button>
        <span>
          第 {state.page} / {totalPages} 页
        </span>
        <button
          disabled={state.page >= totalPages}
          onClick={() => dispatch({ type: "SET_PAGE", page: state.page + 1 })}
        >
          下一页
        </button>
      </div>

      <div className="add-bar">
        <input
          type="text"
          placeholder="添加新的待办事项..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAdd}>添加</button>
      </div>
    </div>
  );
}

export default App;