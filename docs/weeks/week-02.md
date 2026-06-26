# 第 02 周 · 闭包与不可变数据

## 本周概览

本周学习函数式编程中的两个关键概念：**闭包**（函数携带状态）和**不可变数据**（永远不修改原数据）。闭包让你用函数管理私有状态，不可变数据让你的程序更安全、更易调试。

## 核心概念

### 闭包 (Closure)

闭包 = 函数 + 函数定义时所在的词法作用域。当一个函数"记住"了它被创建时的环境变量，就形成了闭包。

```js
// 闭包实现私有计数器
function createCounter(initial = 0) {
  let count = initial  // 私有变量，外部无法直接访问
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
  }
}

const counter = createCounter(5)
counter.increment()  // 6
counter.increment()  // 7
counter.getValue()   // 7
```

### 闭包与函数式编程

闭包在 FP 中用途广泛：

```js
// 缓存函数 (memoization)
function memoize(fn) {
  const cache = {}  // 闭包变量
  return function (arg) {
    if (arg in cache) return cache[arg]  // 命中缓存，跳过计算
    return (cache[arg] = fn(arg))
  }
}

const fastSquare = memoize(x => {
  console.log('computing...')
  return x * x
})

fastSquare(5)  // computing... → 25
fastSquare(5)  // 25 (直接从缓存取)
```

### 数组不可变操作

永远不修改原数组，用以下方法返回新数组：

```js
const arr = [1, 2, 3]

// 添加 → 用展开运算符或 concat
const added = [...arr, 4]          // [1, 2, 3, 4]
const prepend = [0, ...arr]        // [0, 1, 2, 3]

// 删除 → 用 filter
const removed = arr.filter(x => x !== 2)  // [1, 3]

// 修改 → 用 map
const updated = arr.map(x => x === 2 ? 20 : x)  // [1, 20, 3]

// 截取 → 用 slice (不可变)
const sliced = arr.slice(0, 2)  // [1, 2]
```

### 对象不可变操作

```js
const user = { name: 'Alice', age: 25 }

// 修改单个属性
const updated = { ...user, age: 26 }  // { name: 'Alice', age: 26 }

// 嵌套对象更新
const state = {
  user: { name: 'Alice', profile: { theme: 'dark' } },
}
const newState = {
  ...state,
  user: {
    ...state.user,
    profile: {
      ...state.user.profile,
      theme: 'light',
    },
  },
}
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-closures-basics | 闭包基础：FP 风格计数器、私有状态 |
| 02-memoization | 实现记忆函数（缓存计算结果） |
| 03-array-immutability | 数组不可变操作（增删改截取） |
| 04-object-immutability | 对象及嵌套对象的不可变更新 |
| 05-comprehensive | 综合训练：纯函数 + 闭包 + 不可变数据 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- 闭包 = 函数记住它被创建时的环境
- 不可变数据：**永远不修改原数组/对象**，返回新副本
- 数组不可变：`map`、`filter`、展开 `...`、`concat`、`slice`
- 对象不可变：展开运算符 `...`、`Object.assign`
