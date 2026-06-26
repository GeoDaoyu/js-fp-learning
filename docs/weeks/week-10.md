# 第 10 周 · 项目实战

## 本周概览

最后一周，将前 9 周学到的所有 FP 技能应用到一个完整项目中。项目二选一，全程严格遵循 FP 规范：纯函数 + 不可变数据 + pipe/compose + Option/Either。

## 核心概念

本周不引入新概念，而是**综合运用**此前所有知识：

| 技能 | 在项目中的应用 |
|------|---------------|
| 纯函数 | 所有数据处理函数保持纯净 |
| map/filter/reduce | 数据转换全程使用高阶方法 |
| 不可变数据 | 不修改任何原始数据 |
| 柯里化 + pipe | 串联数据处理链路 |
| Maybe / Option | 处理可能为空的数据 |
| Either | 处理可能失败的操作 |

### 项目一：函数式 Todo 列表

```js
// 所有操作为纯函数：接收状态 + 操作 → 返回新状态
const addTodo = (todos, text) => [
  ...todos,
  { id: Date.now(), text, done: false },
]
const toggleTodo = (todos, id) =>
  todos.map(t => (t.id === id ? { ...t, done: !t.done } : t))
const removeTodo = (todos, id) =>
  todos.filter(t => t.id !== id)
const filterTodos = (todos, filter) =>
  filter === 'all'
    ? todos
    : todos.filter(t => t.done === (filter === 'done'))
```

### 项目二：Node.js CLI 文本处理工具

```js
// 读取 → 处理 → 输出，副作用集中在入口
const processFile = pipe(
  readLines,      // 副作用：读文件
  parseData,      // 纯函数
  filterValid,    // 纯函数
  transform,      // 纯函数
  formatOutput,   // 纯函数
)
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-project-planning | 项目选型 + 需求拆解 + 函数规划 |
| 02-core-pure-functions | 核心纯函数开发（数据处理、校验、转换） |
| 03-pipeline-composition | pipe/compose 串联业务逻辑 |
| 04-edge-handling | Option/Either 处理边界情况 |
| 05-final-review | 项目收尾 + 全周期总复盘 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- 把前 9 周的知识连成一条线：数据 → 纯函数处理 → pipe 串联 → Option/Either 处理边界
- FP 不是只用一次 `map` 或 `filter`，而是用一整套组合拳
- 10 周结束，但 FP 的学习才是开始——在实际项目中坚持用 FP 思维
