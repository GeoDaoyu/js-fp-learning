# 第 03 周 · 柯里化与组合管道

## 本周概览

本周进入"函数的函数"领域。你会学到如何把多参数函数转成单参数函数链（**柯里化**）、如何固定部分参数（**偏函数**），以及如何把多个小函数拼成大逻辑（**compose/pipe**）。这些是 FP 代码简洁性的核心来源。

## 核心概念

### 柯里化 (Currying)

把 `f(a, b, c)` 变成 `f(a)(b)(c)`——每个函数只接受一个参数：

```js
// 普通函数
const add = (a, b) => a + b

// 柯里化版本
const curriedAdd = a => b => a + b
const add5 = curriedAdd(5)  // 先传第一个参数，得到一个"加5"的函数
add5(3)   // 8
add5(10)  // 15

// 实用例子：创建专用判断函数
const greaterThan = threshold => value => value > threshold
const isAdult = greaterThan(18)
isAdult(25)  // true
isAdult(15)  // false
```

### 手写柯里化工具

```js
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return (...next) => curried(...args, ...next)
  }
}

const add3 = (a, b, c) => a + b + c
const curriedAdd3 = curry(add3)
curriedAdd3(1)(2)(3)  // 6
curriedAdd3(1, 2)(3)  // 6
```

### 偏函数 (Partial Application)

柯里化是逐个参数化，偏函数是一次固定多个参数：

```js
function partial(fn, ...preset) {
  return (...later) => fn(...preset, ...later)
}

const greet = (greeting, name) => `${greeting}, ${name}!`
const sayHello = partial(greet, 'Hello')
sayHello('World')  // 'Hello, World!'
```

### Compose（从右向左）

```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)

const double = x => x * 2
const increment = x => x + 1
const doubleThenIncrement = compose(increment, double)
doubleThenIncrement(5)  // increment(double(5)) = 11
```

### Pipe（从左向右）

数据从左向右流动，更符合阅读习惯：

```js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const incrementThenDouble = pipe(increment, double)
incrementThenDouble(5)  // double(increment(5)) = 12
```

### 实战：管道处理数据

```js
const users = [
  { name: 'Alice', age: 25, active: true },
  { name: 'Bob', age: 17, active: false },
  { name: 'Charlie', age: 30, active: true },
]

const getActiveAdultNames = pipe(
  users => users.filter(u => u.active && u.age >= 18),
  adults => adults.map(u => u.name),
  names => names.sort(),
)

getActiveAdultNames(users)  // ['Alice', 'Charlie']
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-currying-basics | 柯里化概念与基础实现 |
| 02-partial-application | 偏函数工具实现与应用 |
| 03-currying-practice | 柯里化实战：参数复用 |
| 04-compose-pipe | compose/pipe 实现与对比 |
| 05-pipeline | 管道串联数据处理链路 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- **柯里化**：`f(a, b)` → `f(a)(b)`，每个函数只接受一个参数
- **偏函数**：一次固定多个参数，提前"配置"函数
- **compose**：从右向左，`compose(f, g)(x)` = `f(g(x))`
- **pipe**：从左向右，`pipe(f, g)(x)` = `g(f(x))`
- 柯里化 + pipe 是 FP 黄金组合——柯里化让函数可配置，pipe 串联执行
