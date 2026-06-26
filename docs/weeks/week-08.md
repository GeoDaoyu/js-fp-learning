# 第 08 周 · Monad 单子

## 本周概览

Maybe 和 Either 有一个问题：当 `map` 的回调返回 Maybe/Either 时，会得到**嵌套容器**（`Maybe(Maybe(value))`）。Monad 通过 `chain`（也叫 `flatMap`）自动"展平"嵌套。

## 核心概念

### 嵌套容器问题

```js
// 问题：map 返回 Maybe 时产生嵌套
Maybe.of(user)
  .map(u => Maybe.of(u.profile))  // Maybe(Maybe(profile)) ← 嵌套
  .map(p => p.city)               // 无法直接访问！

// 解决：用 chain 代替 map
Maybe.of(user)
  .chain(u => Maybe.of(u.profile)) // Maybe(profile) ← 自动展平
  .map(p => p.city)               // 正常访问
```

### chain (flatMap)

```js
class Just extends Maybe {
  chain(fn) {
    return fn(this._value)  // 执行 fn 并直接返回结果（不包装）
  }
}

class Nothing extends Maybe {
  chain(_) {
    return this  // 继续短路
  }
}
```

### Monad 三大定律

1. **左单位律**：`of(a).chain(f)` ≡ `f(a)`
2. **右单位律**：`m.chain(of)` ≡ `m`
3. **结合律**：`m.chain(f).chain(g)` ≡ `m.chain(x => f(x).chain(g))`

### Monad vs Promise

Promise 的 `.then()` 其实就是一个 Monad：

```js
// Promise 风格
Promise.resolve(5)
  .then(x => Promise.resolve(x + 1))  // then 自动展平
  .then(x => x * 2)                    // 12

// Monad 风格
Either.of(5)
  .chain(x => Either.of(x + 1))        // chain 自动展平
  .map(x => x * 2)                      // 12
```

关键区别：Promise 是异步的，Monad 是同步的。

### map vs chain 的选择

```js
// 回调返回普通值 → 用 map
Either.of(5).map(x => x + 1)

// 回调返回容器 → 用 chain
Either.of(5).chain(x => validateX(x))
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-monad-basics | Monad 概念与基础实现 |
| 02-maybe-monad | Maybe 改造为 Monad（新增 chain） |
| 03-either-monad | Either 改造为 Monad（新增 chain） |
| 04-monad-practice | 链式调用实战：注册流程 |
| 05-monad-comprehensive | Maybe + Either + Monad 全链路 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- Monad = Functor + `chain` (flatMap)
- `chain` 解决嵌套容器问题
- Promise `.then()` 就是异步 Monad
- 判断用 `map` 还是 `chain`：回调返回**普通值** → `map`，返回**容器** → `chain`
