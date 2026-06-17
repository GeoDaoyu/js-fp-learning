# Week 06 · Maybe 函子

## 核心思想

Maybe 把空值判断从"手动 if"变成"类型自动短路"。它只有两种状态：

| 状态 | 含义 | `map(fn)` 行为 |
|------|------|----------------|
| `Just(value)` | 有值 | 执行 `fn(value)`，结果包回 `Maybe.of()` |
| `Nothing` | 空值 | 不执行 `fn`，直接返回 `Nothing` |

```js
Maybe.of(42)        // → Just(42)
Maybe.of(null)      // → Nothing
Maybe.of(undefined) // → Nothing
```

## map vs chain — 最关键的区别

```
fn 返回普通值 → map    （map 自动包回 Maybe）
fn 返回 Maybe   → chain  （chain 不再包一层，防止 Just(Just(x))）
```

```js
// map: 取属性，返回普通值 → 用 map
Maybe.of(user)
  .map(u => u.profile)        // 返回普通对象/undefined
  .map(p => p.name)           // 返回普通 string/undefined

// chain: 判空逻辑返回值本身是 Maybe → 用 chain
Maybe.of(order)
  .map(o => o.discount)
  .map(d => d.rate)
  .chain(rate => rate > 0.5   // 这个函数体返回的是 Maybe
    ? Maybe.of(null)          // → Nothing
    : Maybe.of(rate))         // → Just(rate)
```

## 为什么 map 处理嵌套属性也安全

`Just.map` 的实现是 `Maybe.of(fn(this._value))`，如果 `fn` 返回 `null/undefined`，`Maybe.of` 会转成 `Nothing`，后续 `.map` 全部短路。

```js
// { data: null } → Just({ data: null })
//   .map(r => r.data)       → Maybe.of(null) → Nothing
//   .map(data => data.user) → Nothing.map → Nothing（短路，不执行 fn）
```

## 三种常见模式

### 1. 安全访问嵌套数据

```js
function getCity(response) {
  return Maybe.of(response)
    .map(r => r.data)
    .map(d => d.user)
    .map(u => u.address)
    .map(a => a.city);
    // 调用方: getCity(resp).getOrElse("Unknown")
}
```

### 2. 条件过滤

```js
function safeDiscount(order) {
  return Maybe.of(order)
    .map(o => o.discount)
    .map(d => d.rate)
    .chain(rate => rate > 0.5 ? Maybe.of(null) : Maybe.of(rate));
}
```

### 3. 表单默认值

```js
function formatGreeting(formData) {
  return Maybe.of(formData)
    .map(d => d.name)
    .map(name => `Hello, ${name}!`)
    .getOrElse("Hello, Guest!");
}
```

## fold 方法

`fold` 把 Maybe 结构"折叠"成一个最终值，同时处理 Nothing 和 Just 两种情况：

```js
Maybe.of(5).fold(0, x => x * 2);       // → 10（Just 时应用函数）
Maybe.of(null).fold(0, x => x * 2);    // → 0（Nothing 时返回默认值）
//               ↑        ↑
//           默认值    对 Just 的变换函数
```

| | Nothing | Just(x) |
|---|---|---|
| `getOrElse(d)` | 返回 `d` | 返回 `x` |
| `fold(d, fn)` | 返回 `d` | 返回 `fn(x)` |

本质是 catamorphism（结构折叠）——通过两个分支覆盖 Maybe 的所有可能形态。和数组 `reduce` 的思想同源，都是将容器结构消除、汇成一个最终值。

## 常用库

| 库 | 语言 | Maybe 命名 | 特点 |
|---|---|---|---|
| [fp-ts](https://github.com/gcanti/fp-ts) | TypeScript | `Option` (`some`/`none`) | 最主流，类型完备，Week 9-10 将使用 |
| [crocks](https://github.com/evilsoft/crocks) | JavaScript | `Maybe` | 文档友好，附带 `Result`、`Pair` 等工具 |
| [sanctuary](https://github.com/sanctuary-js/sanctuary) | JavaScript | `Maybe` | 严格类型检查，偏 Haskell 风格 |
| [monet](https://github.com/monet/monet.js) | JavaScript | `Maybe` | 轻量，提供 `Maybe`、`Either`、`Validation` |

### 命名对照

手写实现的 API 到各库基本一致，差异仅在一些术语：

| 手写 | fp-ts | crocks | 含义 |
|------|-------|--------|------|
| `Maybe.of(x)` | `O.some(x)` / `O.none` | `Maybe.Just(x)` / `Maybe.Nothing()` | 构造 |
| `.map(fn)` | `.pipe(O.map(fn))` | `.map(fn)` | 变换 |
| `.chain(fn)` | `.pipe(O.chain(fn))` | `.chain(fn)` | 扁平映射 |
| `.getOrElse(d)` | `O.getOrElse(() => d)` | `.option(d)` / `.either(() => d, x => x)` | 取值 |
| `.fold(d, fn)` | `O.match(() => d, fn)` | `.either(() => d, fn)` | 折叠 |

> fp-ts 用 `pipe(x, fn1, fn2, ...)` 而不是链式 `.fn1().fn2()`，这是函数式与 OOP 风格的接口差异点。
