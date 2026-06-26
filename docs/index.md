---
layout: home

hero:
  name: "JS 函数式编程"
  text: "10 周学习指南"
  tagline: 从纯函数到 Monad，系统掌握 JavaScript 函数式编程
  actions:
    - theme: brand
      text: 开始学习
      link: /weeks/week-01
    - theme: alt
      text: 在本地练习
      link: /guide
    - theme: alt
      text: 查看练习题
      link: /exercises

features:
  - icon: 📐
    title: 纯函数优先
    details: 理解纯函数与副作用，学会用声明式思维编写可预测、可测试的代码
  - icon: 🔧
    title: 函数组合
    details: 掌握柯里化、偏函数、compose/pipe，用小型函数构建复杂逻辑
  - icon: 📦
    title: Ramda 工具库
    details: 学习工业级 FP 工具库 Ramda，体验自动柯里化和 point-free 风格
  - icon: 🧱
    title: 容器与函子
    details: 理解 Functor、Maybe、Either、Monad — 用类型安全处理空值与异常
  - icon: 🏭
    title: Effect-TS
    details: 使用 TypeScript 原生 FP 库 Effect-TS，将理论应用于实战项目
  - icon: ✅
    title: 动手练习
    details: 50 个渐进式练习 + 可本地运行的测试，边学边练，即时反馈
---

## 学习路线

|  阶段  |   周数   |              核心内容              |
|:------:|:--------:|:----------------------------------:|
| 范式转换 | 第 1-2 周 | 纯函数、高阶函数、闭包、不可变数据 |
| 函数组合 | 第 3 周   | 柯里化、偏函数、Compose/Pipe     |
| 工具实践 | 第 4-5 周 | Ramda 函数式工具库（基础 + 进阶） |
| 抽象提升 | 第 6-8 周 | Functor、Maybe、Either、Monad     |
| 实战收尾 | 第 9-10 周 | Effect-TS 入门 + 完整项目实战     |

## 如何使用

```bash
# 克隆仓库
git clone https://github.com/GeoDaoyu/js-fp-learning.git
cd js-fp-learning

# 安装依赖
pnpm install

# 测试某周练习
pnpm run week:01

# 运行全部测试
pnpm test
```

详细说明见 [学习指南](/guide)。

## 编码约束

- 全程不使用 `for` / `while` 循环
- 优先使用纯函数，副作用集中隔离
- 数据不可变（不修改原数组/对象）

---

开始你的 FP 学习之旅 → [第 01 周 · 纯函数与高阶方法](/weeks/week-01)
