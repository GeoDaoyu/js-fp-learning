# Week 06 · 函子基础概念

## 什么是函子

函子（Functor）是具有 `map` 方法的容器，它把值包裹起来，让你在不取出值的情况下对值进行变换。

```js
// 不用函子：直接操作裸值
const result = reverse(trim(toUpperCase("hello")));

// 用函子：链式串联，读起来像管道
const result = Container.of("hello")
  .map(toUpperCase)
  .map(trim)
  .map(reverse);
```

## 函子两大定律

### 同一律（Identity）

对函子应用恒等函数 `x => x`，返回的函子应该等价于原函子。

```js
functor.map(x => x) // 与原 functor 值相等
```

### 复合律（Composition）

连续 `map` 两个函数的效果，等同于 `map` 这两个函数的组合。

```js
functor.map(g).map(h) === functor.map(x => h(g(x)))
```

> Array 也是函子——`[1,2,3].map(g).map(h)` 等同于 `[1,2,3].map(x => h(g(x)))`。

## of 的作用：Pointed Functor

`of` 是把一个普通值"提升"到函子上下文中的统一入口。

```js
Container.of(5); // 代替 new Container(5)
```

三个好处：
1. **屏蔽 `new`** — 使用方不关心构造函数细节
2. **统一接口** — 后续 Maybe、Either 都暴露相同的 `of`，切换类型无需改调用代码
3. **通向 Monad** — 同时有 `map` 和 `of` 的函子叫 Pointed Functor，是 Monad 的前置概念

## 最小化 Container 实现

```js
class Container {
  constructor(value) { this._value = value; }
  static of(value) { return new Container(value); }
  map(fn) { return new Container(fn(this._value)); }
  getValue() { return this._value; }
}
```
