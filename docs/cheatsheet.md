---
title: 速查表
---

# FP 速查表

> 学习过程中持续补充，把核心概念浓缩在这里

## 核心原则

| 原则 | 说明 |
|------|------|
| 纯函数 | 相同输入 → 相同输出，无副作用 |
| 不可变数据 | 不修改原数据，返回新副本 |
| 声明式 | 描述"做什么"而非"怎么做" |
| 函数是一等公民 | 函数可赋值、传参、返回 |

## 常用数组方法

| 方法 | 用途 | 示例 |
|------|------|------|
| `map` | 映射/转换 | `arr.map(fn)` |
| `filter` | 筛选 | `arr.filter(pred)` |
| `reduce` | 聚合/累积 | `arr.reduce(fn, init)` |
| `find` | 查找第一个 | `arr.find(pred)` |
| `some` | 任一满足 | `arr.some(pred)` |
| `every` | 全部满足 | `arr.every(pred)` |
| `concat` | 合并数组(不可变) | `a.concat(b)` |
| `slice` | 截取(不可变) | `arr.slice(0, n)` |

## 核心模式

### 柯里化 (Currying)
```js
// 多参数 → 嵌套单参数
const add = a => b => a + b
const add5 = add(5)
```

### 偏函数 (Partial Application)
```js
const partial = (fn, ...args) => (...rest) => fn(...args, ...rest)
```

### Compose (从右向左)
```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
```

### Pipe (从左向右)
```js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
```

## Ramda 常用 API

| API | 用途 |
|-----|------|
| `R.map(fn, arr)` | 映射 |
| `R.filter(pred, arr)` | 筛选 |
| `R.reduce(fn, init, arr)` | 聚合 |
| `R.prop(name, obj)` | 取属性 |
| `R.pick(names, obj)` | 选取属性 |
| `R.omit(names, obj)` | 排除属性 |
| `R.assoc(name, val, obj)` | 设置属性(不可变) |
| `R.sortBy(fn, arr)` | 排序 |
| `R.groupBy(fn, arr)` | 分组 |
| `R.compose(...fns)` | 右向左组合 |
| `R.pipe(...fns)` | 左向右组合 |
| `R.ifElse(cond, t, f)` | 条件分支 |
| `R.when(cond, fn)` | 条件为真时执行 |
| `R.cond([[c1, f1], ...])` | 多路分支 |
| `R.lensPath(path)` | 创建透镜 |
| `R.view(lens, obj)` | 透镜读取 |
| `R.set(lens, val, obj)` | 透镜写入 |
| `R.over(lens, fn, obj)` | 透镜更新 |

## Effect-TS 常用 API

| API | 用途 |
|-----|------|
| `pipe(value, ...fns)` | 管道串联 |
| `Option.some(v)` / `Option.none()` | 创建 Option |
| `Option.fromNullable(v)` | 可空值转 Option |
| `Option.map(fn)` | Option 映射 |
| `Option.getOrElse(fn)` | 提取值或默认值 |
| `Either.right(v)` / `Either.left(e)` | 创建 Either |
| `Either.try(fns)` | 安全执行可能抛错的函数 |
| `Either.map(fn)` | Either 映射 |
| `Either.getOrElse(fn)` | 提取值或默认值 |
| `Array.map(fn)` | 数组映射 |
| `Array.filter(pred)` | 数组筛选 |

## 容器 / 函子 / 单子

| 概念 | 核心方法 | 解决的问题 |
|------|----------|-----------|
| Functor | `map` | 对容器内的值应用函数 |
| Maybe | `map` + null 分流 | 空值安全处理 |
| Either | `map` + 错误分支 | 异常/错误处理 |
| Monad | `map` + `chain` (flatMap) | 避免嵌套容器 |

### 函子定律
- **恒等律**: `functor.map(x => x)` ≡ `functor`
- **组合律**: `functor.map(x => f(g(x)))` ≡ `functor.map(g).map(f)`

### 单子定律
- **左单位**: `of(a).chain(f)` ≡ `f(a)`
- **右单位**: `m.chain(of)` ≡ `m`
- **结合律**: `m.chain(f).chain(g)` ≡ `m.chain(x => f(x).chain(g))`
