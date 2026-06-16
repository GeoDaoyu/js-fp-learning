# Week 05 · R.applySpec vs R.map 区别

## 核心区别

| | `R.map(fn, data)` | `R.applySpec(spec)` |
|---|---|---|
| 作用对象 | 数组中**每个元素** | **同一份数据** |
| 出入关系 | 一对多（一个函数 → 多个元素） | 多对一（多个函数 → 一个对象） |
| 返回类型 | 数组 | 对象 |

```js
const orders = [
  { price: 8000, quantity: 1 },
  { price: 150, quantity: 3 },
];

// map: 一个函数，作用于每个元素 → 输出数组
R.map(R.prop("price"), orders);
// → [8000, 150]

// applySpec: 多个函数，作用于同一份数据 → 输出对象
R.applySpec({
  price: R.prop("price"),
  qty: R.prop("quantity"),
})(orders[0]);
// → { price: 8000, qty: 1 }
```

## 结合使用

`R.map` + `R.applySpec` 是常见搭配：对数组元素逐个派生出结构化摘要。

```js
const summarizeAll = R.map(
  R.applySpec({
    productName: R.prop("product"),
    lineTotal: R.converge(R.multiply, [R.prop("price"), R.prop("quantity")]),
  })
);
// 每个元素进 → 摘要对象出，最终返回摘要数组
```
