# 第 05 周 · Ramda 进阶

## 本周概览

本周在 Ramda 基础上深入，学习组合函数、条件逻辑的无 if/else 表达、以及 lens（透镜）——一种函数式的"getter/setter"模式。

## 核心概念

### compose / pipe

Ramda 内置了组合函数：

```js
const f = R.compose(Math.abs, R.add(1), R.multiply(2))
//  = Math.abs(R.add(1)(R.multiply(2)(x)))
f(-1)  // 1

const g = R.pipe(R.multiply(2), R.add(1), Math.abs)
//  = Math.abs(R.add(1)(R.multiply(2)(x)))
g(-1)  // 1
```

### 替代 if/else

用 Ramda 的条件函数替代命令式分支：

```js
// R.ifElse(条件, 真分支, 假分支)
const abs = R.ifElse(
  R.lt(R.__, 0),   // x < 0 ?
  R.negate,        // true:  取反
  R.identity,      // false: 原样返回
)
abs(-5)  // 5
abs(5)   // 5

// R.when(条件, 变换) — 只处理 true
const ensurePositive = R.when(R.lt(R.__, 0), Math.abs)

// R.cond — 多路分支，类似 switch
const grade = R.cond([
  [R.lt(R.__, 60), R.always('F')],
  [R.lt(R.__, 70), R.always('D')],
  [R.lt(R.__, 80), R.always('C')],
  [R.lt(R.__, 90), R.always('B')],
  [R.T,            R.always('A')],  // 默认分支
])
grade(85)  // 'B'
```

### Lens（透镜）

Lens 是"函数式的 getter/setter"——把**读**和**写**封装成一个值：

```js
const user = { name: 'Alice', profile: { city: 'Beijing' } }

// 创建 lens
const cityLens = R.lensPath(['profile', 'city'])

// 读
R.view(cityLens, user)  // 'Beijing'

// 写（不可变）
R.set(cityLens, 'Shanghai', user)
// { name: 'Alice', profile: { city: 'Shanghai' } }

// 基于当前值更新
R.over(cityLens, R.toUpper, user)
// { name: 'Alice', profile: { city: 'BEIJING' } }
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-ramda-compose | Ramda compose/pipe 进阶使用 |
| 02-ramda-conditionals | ifElse/when/unless/cond 替代命令式分支 |
| 03-ramda-lens | Lens：view/set/over |
| 04-ramda-combinators | evolve/converge/useWith 组合器 |
| 05-ramda-comprehensive | 完整业务场景用 Ramda 重写 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- `R.compose` / `R.pipe` 是 Ramda 的数据处理引擎
- `ifElse`/`when`/`unless`/`cond` 让分支变为表达式
- Lens 是"可组合的 getter/setter"，适合深层嵌套数据
- 用 Ramda 重构后代码更短、更声明式
