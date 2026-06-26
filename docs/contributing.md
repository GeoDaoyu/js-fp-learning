---
title: 如何贡献
---

# 如何贡献答案

欢迎提交你的练习答案！让这个仓库成为多种 FP 解法思路的汇集地。

## 贡献方式

### 1. Fork 本仓库

点击页面右上角的 Fork 按钮，将仓库 fork 到你的 GitHub 账户下。

### 2. 克隆你的 fork

```bash
git clone https://github.com/<你的用户名>/js-fp-learning.git
cd js-fp-learning
pnpm install
```

### 3. 创建你的答案目录

在 `solutions/` 下创建以你的名字命名的文件夹：

```bash
mkdir -p solutions/<你的名字>
```

名字可以是你的 GitHub 用户名、真名、或任何你喜欢的标识。**请使用英文、数字和短横线**，避免空格和特殊字符。

### 4. 复制练习文件并填写答案

将 `exercises/` 下的练习文件复制到你的答案目录，**保持相同的目录结构和文件名**：

```bash
# 比如你要做第 1 周的练习
mkdir -p solutions/<你的名字>/week-01-pure-functions
cp exercises/week-01-pure-functions/*.js solutions/<你的名字>/week-01-pure-functions/
```

然后在复制的文件中填写你的实现代码。

### 5. 确保测试全部通过

答案文件是**自包含的完整副本**，可以直接运行测试：

```bash
# 测试单个答案文件
npx vitest run solutions/<你的名字>/week-01-pure-functions/01-pure-functions.js

# 测试你所有答案文件
npx vitest run solutions/<你的名字>/
```

::: warning 注意
`pnpm test` 会同时运行 `exercises/` 下的空白练习，那些 `// TODO` 会导致测试失败。建议单独运行你答案目录的测试。
:::

### 6. 提交 PR

```bash
git add solutions/<你的名字>/
git commit -m "feat: add solutions by <你的名字>"
git push
```

然后在 GitHub 上发起 Pull Request。

## 答案规范

- **文件命名**：保持与练习文件相同的文件名（如 `01-pure-functions.js`）
- **目录结构**：与 `exercises/` 完全一致
- **代码风格**：不修改原有的 Test 代码段
- **一份文件一个答案**：每个练习文件对应一份完整的答案副本
- **文件是自包含的**：包括题目描述 + 实现 + 测试，可独立运行

## 常见问题

**Q: 练习题更新了怎么办？**

你的答案是一个**完整快照**——包含题目描述、你的实现和测试代码。即使未来练习题发生改动，你提交的答案仍然是一份完整的、可独立运行的记录。

**Q: 能否只提交部分答案？**

当然可以，不要求覆盖全部 10 周。提交你完成的部分即可。

**Q: 我的答案和别人的写法不一样？**

这正是我们鼓励的！同一种模式有不同实现风格，多种思路并存是 FP 的乐趣所在。
