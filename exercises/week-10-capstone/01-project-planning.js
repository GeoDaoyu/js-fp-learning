// ==========================================
// Week 10 · Day 1: 项目选型 + 需求拆解
// ==========================================
//
// 第十周是结业项目周。从下面两个项目中二选一，用纯函数式编程完成。
// 全程遵循: 无 for/while、纯函数优先、数据不可变、副作用隔离。
//
// ==========================================
// === 项目选项 ===
// ==========================================
//
// 选项 A: 前端 — 纯函数式 Todo 应用
// ------------------------------------
// 功能需求:
//   - 列表展示（CRUD）
//   - 按状态筛选（全部/已完成/未完成）
//   - 搜索过滤
//   - 分页
//   - 状态管理用闭包 + 不可变数据
//   - 可选: 持久化到 localStorage
//
// 核心挑战:
//   - 所有状态更新用不可变方式
//   - 用 pipe/compose 串联筛选→搜索→分页逻辑
//   - Maybe/Either 处理空值和异常
//
// 选项 B: Node — 命令行文本处理工具
// ------------------------------------
// 功能需求:
//   - 读取文本文件
//   - 按行过滤 (grep 风格)
//   - 排序、去重、统计行数/词数/字符数
//   - 结果输出到文件或 stdout
//   - 支持管道组合多个操作
//
// 核心挑战:
//   - I/O 副作用隔离到最小区域
//   - 所有文本处理逻辑用纯函数 + pipe 实现
//   - Either 处理文件不存在、权限等异常
//
// ==========================================
// === 今日任务 ===
// ==========================================
//
// 1. [x] 选定项目（A 或 B）
// 2. [x] 列出功能清单，拆分为独立模块
// 3. [x] 画出核心数据流
// 4. [x] 标注每个环节的副作用边界（I/O、DOM、state mutation）
// 5. [x] 确定用到的 FP 工具: pipe/compose, Maybe, Either, Ramda/fp-ts
//
// 提示: 先把整体框架搭出来(纯函数 + 副作用外壳)，再逐模块填充。
//
// ==========================================
// === 在这里写你的规划 ===
// ==========================================
//
// 项目选择: [A] 前端 — 纯函数式 Todo 应用
//
// 功能模块拆分:
//
//   src/core/types.ts        — Todo, TodoState, FilterStatus 类型定义
//   src/core/todo-crud.ts    — 纯函数: addTodo, toggleTodo, removeTodo, updateTodoText
//   src/core/todo-filter.ts  — 纯函数: filterByStatus, searchTodos, paginate
//   src/core/todo-pipeline.ts — 核心管道: processTodos (filter → search → paginate)
//   src/core/validation.ts   — 边界处理: findTodoById (Option), validateTodoText (Either)
//   src/hooks/useTodos.ts    — 副作用边界: useReducer + localStorage 同步
//   src/App.tsx              — 纯渲染组件, 通过 props 接收数据, 通过 dispatch 派发事件
//
// 数据流草图:
//
//   User Input → dispatch(action) → reducer (纯函数) → new State
//                                                    ↓
//                            processTodos (pipe: filter → search → paginate)
//                                                    ↓
//                                            visibleTodos → render UI
//                                                    ↓
//                              useEffect → localStorage.setItem (副作用)
//
// 副作用边界:
//
//   - localStorage 读写: 集中在 useTodos.ts 的 loadTodos() 和 useEffect 中
//   - crypto.randomUUID(): 在 reducer 的 ADD_TODO 分支中调用
//   - Date.now(): 在 reducer 的 ADD_TODO 分支中调用
//   - 文本校验: 通过 validateTodoText 返回 Either, 在 reducer 中用 Either.isLeft 判断
//   - ID 查找: 通过 findTodoById 返回 Option, 在 reducer 中用 Option.isNone 判断
//   - React 组件( App.tsx ): 纯渲染, 只通过 dispatch 上报意图, 不直接操作数据
//
// 使用的 FP 工具:
//
//   - pipe (Effect): 串联 filterByStatus → searchTodos → paginate 数据处理管道
//   - Option (Effect): findTodoById 返回 Option<Todo>, 安全处理"不存在的 ID"
//   - Either (Effect): validateTodoText 返回 Either<string, string>, 区分校验成功/失败
//   - 柯里化 (手写): filterByStatus(status)(todos) / searchTodos(query)(todos) / paginate(page, pageSize)(todos)
//   - 不可变数据 (原生 JS): map / filter / slice / 扩展运算符, 不修改原数组
//   - useReducer: 状态管理遵循 (state, action) → state 纯函数模式
