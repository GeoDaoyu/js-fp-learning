# 第 09 周 · Effect-TS 入门

## 本周概览

前 8 周你手写了 Functor/Maybe/Either/Monad 来理解原理。这周开始使用 **Effect-TS**——TypeScript 生态中最强大的 FP 库，提供了生产级的 Option、Either 等类型。

## 核心概念

### 环境搭建

```bash
npm install effect
```

```js
import { pipe, Option, Either, Array as Arr } from 'effect'
```

### Option（对应 Maybe）

```js
import { Option } from 'effect'

// 创建 Option
Option.some(5)                         // Some(5)
Option.none()                          // None
Option.fromNullable(value)             // null/undefined → None

// 使用 pipe + Option.map
pipe(
  Option.fromNullable(user),
  Option.map(u => u.profile),
  Option.map(p => p.city),
  Option.getOrElse(() => 'Unknown'),
)
```

### Either（错误处理）

```js
import { Either } from 'effect'

// 创建 Either
Either.right('success')     // Right
Either.left('invalid')      // Left

// 转换可能抛异常的函数
const safeParse = Either.try({
  try: () => JSON.parse(raw),
  catch: () => 'Invalid JSON',
})

// 链式处理
pipe(
  safeParse,
  Either.map(data => data.name),
  Either.getOrElse(() => 'Unknown'),
)
```

### 数组操作

Effect-TS 提供了管道友好的数组模块：

```js
import { Array as Arr } from 'effect'

pipe(
  [1, 2, 3, 4, 5],
  Arr.map(x => x * 2),
  Arr.filter(x => x > 5),
  Arr.reduce(0, (acc, x) => acc + x),
)
```

### pipe 是第一公民

Effect-TS 中 `pipe` 是核心：

```js
import { pipe } from 'effect'

pipe(
  value,
  fn1,    // fn1(value)
  fn2,    // fn2(fn1(value))
  fn3,    // fn3(fn2(fn1(value)))
)
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-effect-setup | Effect-TS 环境搭建与基础语法 |
| 02-effect-option | Option 处理空值，对比手写 Maybe |
| 03-effect-either | Either 处理异常，对比手写 Either |
| 04-effect-array | 数组遍历、转换、聚合 |
| 05-effect-comprehensive | 用 Effect-TS 重写前序案例 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- Effect-TS 的 `Option` 对应手写的 `Maybe`
- Effect-TS 的 `Either` 对应手写的 `Either`
- `pipe(value, fn1, fn2, fn3)` 是核心模式
- 手写容器帮助理解原理 → 生产中用成熟库
