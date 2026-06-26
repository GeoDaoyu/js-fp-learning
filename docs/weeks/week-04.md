# 第 04 周 · Ramda 基础

## 本周概览

前 3 周你手写了所有 FP 工具函数。这周开始使用成熟的开源库 **Ramda**——一个专为函数式编程设计的 JavaScript 工具库。Ramda 的核心哲学：**函数优先、数据后置、自动柯里化**。

## 核心概念

### Ramda 设计哲学

1. **函数优先，数据后置** — 数据参数永远放在最后
2. **自动柯里化** — 所有函数都自动柯里化
3. **不可变** — 永远不会修改输入数据

### 安装与导入

```bash
npm install ramda
```

```js
import * as R from 'ramda'
```

### 基础操作对比

```js
// 原生 JS
[1, 2, 3].map(x => x * 2)              // [2, 4, 6]
[1, 2, 3].filter(x => x > 1)           // [2, 3]
[1, 2, 3].reduce((a, b) => a + b, 0)   // 6

// Ramda（注意参数顺序：函数在前，数据在后）
R.map(x => x * 2, [1, 2, 3])           // [2, 4, 6]
R.filter(x => x > 1, [1, 2, 3])        // [2, 3]
R.reduce((a, b) => a + b, 0, [1, 2, 3]) // 6
```

### 自动柯里化的威力

因为 Ramda 函数自动柯里化，可以先传函数参数，稍后再传数据：

```js
const doubleAll = R.map(x => x * 2)   // 只传了变换函数
doubleAll([1, 2, 3])                   // [2, 4, 6]
doubleAll([4, 5, 6])                   // [8, 10, 12] — 复用！
```

### 常用对象操作

```js
const user = { name: 'Alice', age: 25, email: 'alice@example.com' }

R.prop('name', user)           // 'Alice'
R.pick(['name', 'age'], user)  // { name: 'Alice', age: 25 }
R.omit(['email'], user)        // { name: 'Alice', age: 25 }
R.assoc('age', 26, user)       // { ...user, age: 26 } — 不可变更新
```

### 对象数组操作

```js
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 17 },
  { name: 'Charlie', age: 30 },
]

R.sortBy(R.prop('age'), users)  // 按 age 排序（不可变）
R.groupBy(R.prop('age'), users) // 按 age 分组
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-ramda-intro | Ramda map/filter/reduce + 自动柯里化 |
| 02-ramda-object | 对象操作 API：prop/pick/omit/assoc |
| 03-ramda-array | 数组分组、排序、聚合 |
| 04-ramda-currying | 利用自动柯里化做参数复用 |
| 05-ramda-refactor | 将前 3 周手写工具重构为 Ramda 版本 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- Ramda 的核心理念：**函数优先，数据后置**
- 所有函数自动柯里化，可以部分应用
- `R.map(fn)` 返回的是可复用函数，可直接用于 pipe
- 永远不修改原始数据
