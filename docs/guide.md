---
title: 学习指南
---

# 学习指南

本指南将帮助你设置本地开发环境并开始练习。

## 前置要求

- [Node.js](https://nodejs.org/) ≥ 18
- [pnpm](https://pnpm.io/) ≥ 8

## 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/GeoDaoyu/js-fp-learning.git
cd js-fp-learning
```

### 2. 安装依赖

```bash
pnpm install
```

这会安装：

| 依赖 | 用途 |
|------|------|
| **vitest** | 测试框架 |
| **ramda** | 函数式编程工具库（第 4-5 周使用） |
| **effect** | Effect-TS 库（第 9-10 周使用） |

### 3. 验证环境

```bash
pnpm test
```

## 练习工作流

每个练习文件分为两个区域：

- `=== 在这里写你的代码 ===` — **在这里填写你的实现**
- `=== 测试（不要修改） ===` — 测试代码，**不要修改**

### 标准流程

1. **打开当天练习文件**，阅读题目描述
2. **在代码区域写实现**，替代 `// TODO` 标记
3. **运行对应周的测试**：

```bash
pnpm run week:01    # 测试第 1 周
pnpm run week:02    # 测试第 2 周
# ... 以此类推
pnpm run week:10    # 测试第 10 周
```

4. **全部 `# pass` 全绿 → 完成！**

### 运行单个文件

```bash
npx vitest run exercises/week-01-pure-functions/01-pure-functions.js
```

## 编码约束

在整个学习过程中，请遵守以下规则：

| 约束 | 说明 |
|------|------|
| 🚫 禁用 for/while | 使用 map、filter、reduce、递归等 |
| ✅ 纯函数优先 | 副作用集中隔离、明确标注 |
| ✅ 数据不可变 | 不修改原数组/对象，返回新副本 |

## 推荐学习节奏

- **周一至周五**，每天约 2 小时
- **30-40 分钟**理论学习（阅读每周教程 + 核心概念）
- **80-90 分钟**代码练习
- 周末**休息**或复习

## 获取帮助

- 卡住了？先尝试看[答案参考](/solutions)
- 理解不了概念？回顾对应周的[教程](/weeks/week-01)
- 推荐搜索：`JavaScript functional programming`、`Ramda tutorial`、`Maybe monad explained`
