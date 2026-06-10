// ==========================================
// Week 10 · Day 2: 核心纯函数开发
// ==========================================
//
// 今日任务: 编写项目的核心纯函数。
// 所有函数必须: 无副作用、不修改输入参数、无 for/while。
//
// ==========================================
// === 通用工具函数（按需选用）===
// ==========================================
//
// 如果你选了项目 A (Todo App)，这里是一些参考:

// --- 数据转换函数 ---
// addTodo(todos, text) → 添加新 todo
// toggleTodo(todos, id) → 切换完成状态
// removeTodo(todos, id) → 删除 todo
// updateTodoText(todos, id, text) → 修改文本
//
// --- 筛选/搜索函数 ---
// filterByStatus(todos, status) → 按状态筛选
// searchTodos(todos, query) → 按文本搜索
//
// --- 分页函数 ---
// paginate(todos, page, pageSize) → 分页切片
//
// --- 统计函数 ---
// countByStatus(todos) → { total, completed, active }

// 如果你选了项目 B (CLI 文本工具)，这里是一些参考:

// --- 文本处理函数 ---
// splitLines(text) → string[] (按行分割)
// filterLines(lines, predicate) → 筛选行
// sortLines(lines, comparator) → 排序
// uniqueLines(lines) → 去重
// countStats(lines) → { lines, words, chars }
//
// --- 管道工具 ---
// processText(pipe)(text) → 应用管道处理文本
//
// ==========================================
// === 在这里写你的核心纯函数 ===
// ==========================================
//
// 提示:
//   1. 每个函数只做一件事
//   2. 用 pipe/compose 组合简单函数
//   3. 优先使用 Ramda 或 fp-ts
//   4. 对每个函数写 2-3 个测试用例（可以用 assert 或 console.log 验证）
//

