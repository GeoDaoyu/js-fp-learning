# FP Cheatsheet

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
const add = a => b => a + b;
const add5 = add(5);
```

### 偏函数 (Partial Application)
```js
// 固定部分参数，返回新函数
const partial = (fn, ...args) => (...rest) => fn(...args, ...rest);
```

### Compose (从右向左)
```js
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
```

### Pipe (从左向右)
```js
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```

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
