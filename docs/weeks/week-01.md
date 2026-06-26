# 第 01 周 · 纯函数与数组高阶方法

## 本周概览

本周是 FP 学习的起点。你将理解函数式编程最重要的概念——**纯函数**，学会区分纯函数与副作用函数，并掌握 JavaScript 数组的三大高阶方法：`map`、`filter`、`reduce`。

## 核心概念

### 纯函数 (Pure Function)

纯函数满足两个条件：
1. **相同输入，永远得到相同输出**（引用透明）
2. **没有可观察的副作用**

```js
// ✅ 纯函数
function square(n) {
  return n * n
}

function addItem(arr, item) {
  return [...arr, item]  // 不修改原数组
}
```

### 副作用 (Side Effect)

副作用是指函数与外部世界发生的交互：

| 副作用类型 | 示例 |
|-----------|------|
| I/O 操作 | `console.log()`, `fetch()`, `fs.readFile()` |
| DOM 操作 | `document.getElementById()` |
| 修改外部变量 | 改变全局/闭包变量 |
| 随机数/时间 | `Math.random()`, `Date.now()` |

```js
// ❌ 有副作用 — 修改了外部变量
let count = 0
function increment() {
  count++  // 副作用：改变了外部状态
  return count
}
```

### map — 映射/转换

对数组每个元素应用函数，返回新数组。

```js
const numbers = [1, 2, 3]
const doubled = numbers.map(x => x * 2)  // [2, 4, 6]
```

### filter — 筛选

返回满足条件的元素组成的新数组。

```js
const numbers = [1, 2, 3, 4, 5]
const evens = numbers.filter(x => x % 2 === 0)  // [2, 4]
```

### reduce — 聚合/累积

将数组"归约"为单个值。`reduce` 是最强大的数组方法——`map` 和 `filter` 都可以用 `reduce` 实现。

```js
const numbers = [1, 2, 3, 4, 5]

// 基本用法：求和
const sum = numbers.reduce((acc, cur) => acc + cur, 0)  // 15

// 用 reduce 实现 map
const doubled = numbers.reduce((acc, cur) => [...acc, cur * 2], [])
// [2, 4, 6, 8, 10]

// 用 reduce 实现 filter
const evens = numbers.reduce(
  (acc, cur) => cur % 2 === 0 ? [...acc, cur] : acc,
  []
)  // [2, 4]
```

### find / some / every

```js
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
]

users.find(u => u.age >= 18)   // { name: 'Alice', age: 25 }
users.some(u => u.age >= 18)   // true — 是否存在
users.every(u => u.age >= 18)  // false — 是否全部
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-pure-functions | 判断纯函数/副作用、手写纯函数和副作用函数 |
| 02-higher-order | 高阶函数基础：函数作为参数和返回值 |
| 03-filter-find | `filter`/`find`/`some`/`every` 筛选类方法 |
| 04-reduce-basics | `reduce` 实现求和、求积、求最值 |
| 05-reduce-advanced | `reduce` 实现分组、数组转对象、全链路聚合 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- **纯函数** = 相同输入 → 相同输出 + 无副作用
- **map** 转换，**filter** 筛选，**reduce** 聚合
- 永远不要修改原始数组——返回新数组
- `reduce` 是万能方法，可以实现 `map` 和 `filter`
