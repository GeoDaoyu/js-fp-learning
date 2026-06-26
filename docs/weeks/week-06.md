# 第 06 周 · Functor & Maybe

## 本周概览

前 5 周你一直在操作"裸值"。这周开始学习 **容器（Container）**——把值包装起来，通过容器的方法安全地操作内部值。你将实现自己的 Functor 和 Maybe，理解"空值安全"的函数式方案。

## 核心概念

### 容器思想

不在容器"外面"操作值，而是通过容器的 `map` 方法在"里面"操作：

```js
// 不在外面：
const result = fn(value)  // 直接操作值

// 在容器里面：
Container.of(value)
  .map(fn)  // fn 在容器内部执行
  .map(gn)  // 链式操作
```

### Functor（函子）

任何实现了 `map` 方法并满足两个定律的东西，就是一个 Functor：

```js
class Functor {
  constructor(value) {
    this._value = value
  }
  static of(value) {
    return new Functor(value)
  }
  map(fn) {
    return Functor.of(fn(this._value))
  }
}

Functor.of(5)
  .map(x => x + 1)
  .map(x => x * 2)  // Functor(12)
```

### 函子两大定律

1. **恒等律**：`functor.map(x => x)` ≡ `functor`
2. **组合律**：`functor.map(x => f(g(x)))` ≡ `functor.map(g).map(f)`

### Maybe：空值安全的 Functor

Maybe 的 `map` 会检查值是否为 `null`/`undefined`：

```js
class Just extends Maybe {
  map(fn) {
    return Maybe.of(fn(this._value))  // 有值 → 正常执行
  }
}

class Nothing extends Maybe {
  map(_) {
    return this  // 空值 → 直接跳过，不报错
  }
}
```

### Maybe 实战：消除空值判断

```js
// ❌ 传统写法 — 层层判空
function getUserCity(user) {
  if (user && user.profile && user.profile.city) {
    return user.profile.city.toUpperCase()
  }
  return 'Unknown'
}

// ✅ Maybe 写法 — 容器自动处理空值
function getUserCity(user) {
  return Maybe.of(user)
    .map(u => u.profile)
    .map(p => p.city)
    .map(c => c.toUpperCase())
    .getOrElse('Unknown')
}
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-functor-basics | 手写基础 Functor 结构与 map 方法 |
| 02-functor-laws | 代码验证恒等律和组合律 |
| 03-maybe | 实现 Maybe：Just/Nothing 基础结构 |
| 04-maybe-practice | Maybe 实战：接口数据判空重构 |
| 05-maybe-comprehensive | 多层嵌套数据空值安全处理 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- Functor = 实现了 `map` 的容器
- `map` 让你在容器"内部"操作值
- Maybe 让空值处理自动化——不需要写 `if (val != null)`
- `getOrElse` 在链的末端提供默认值
