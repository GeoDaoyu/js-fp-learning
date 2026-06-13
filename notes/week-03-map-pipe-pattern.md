# Week 03 · map(pipe) vs pipe(map) 选择原则

## 规则

优先用 `map(pipe(...))`，把组合放在**元素层面**，而不是数组层面。

```js
// 推荐：元素级组合
const transform = pipe(addGrade, addPassed, formatStudent);
students.map(transform);

// 不推荐：数组级组合（三次遍历，且语义混乱）
pipe(map(addGrade), map(addPassed), map(formatStudent))(students);
```

## 什么时候必须用 pipe(map(...))

管道中混入了**改变数组结构**的操作（`filter`、`sort`、`reduce`）时，无法降维到逐元素，只能用数组级 pipe：

```js
// filter 改变数组长度，sort 改变顺序——必须在数组层面操作
pipe(
  filter(s => s.passed),
  sort((a, b) => b.score - a.score),
  map(s => s.name),
  map(s => s.toUpperCase())
)(students);
```

## 为什么 map(pipe) 更好

1. **符合 FP 直觉**：`addGrade` 等函数是 `Student → Student`，自然应该在元素层面组合，`map` 只是把组合提升到数组上下文
2. **单次遍历**：`map(pipe(f, g, h))` 遍历一次，`pipe(map(f), map(g), map(h))` 遍历三次
3. **可复用**：组合后的 `transform` 可以提取出来独立使用
4. **与 Haskell/ML 系语言一致**：`map (f . g . h)` 就是标准写法
