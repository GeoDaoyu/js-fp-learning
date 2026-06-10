// ==========================================
// Week 10 · Day 3: 逻辑串联（pipe/compose）
// ==========================================
//
// 今日任务: 用 pipe/compose 串联 Day 2 的纯函数，构建完整的业务逻辑。
//
// ==========================================
// === 设计你的数据管道 ===
// ==========================================
//
// 项目 A (Todo App) 参考管道:
//
//   filter → search → sort → paginate
//
// 示例:
//   const processTodos = (todos, filter, query, page, pageSize) =>
//     pipe(
//       todos,
//       filterByStatus(filter),
//       searchTodos(query),
//       sortByCreatedAt,
//       paginate(page, pageSize),
//     );
//
// 项目 B (CLI 工具) 参考管道:
//
//   readFile → splitLines → filter → sort → unique → join → writeFile
//
//  注意: readFile 和 writeFile 是副作用，应在管道的边界处理
//  中间的 splitLines → filter → sort → unique 都是纯函数
//
// ==========================================
// === 今日任务清单 ===
// ==========================================
//
// 1. [ ] 列出项目中可以用 pipe 串联的操作序列
// 2. [ ] 确认每个步骤的函数签名互相对齐（输入输出类型一致）
// 3. [ ] 实现至少 3 条不同的 pipeline
// 4. [ ] 为每条 pipeline 写测试用例
//
// ==========================================
// === 在这里写你的 pipeline ===
// ==========================================
//
// Pipeline 1:
//
//
// Pipeline 2:
//
//
// Pipeline 3:
//
//
// ==========================================
// === 测试你的 pipeline ===
// ==========================================
//
// 可以用 console.log、node:test 或者直接手动验证。
// 确保: 相同输入 → 相同输出、不修改原数据。
//

