# Week 07 · Either + Maybe 选型与生态

## Maybe vs `?.` 可选链

ES2020 的 `?.` 只解决了"访问链路上的空值短路"，但 Maybe 的能力范围更广：

| 能力 | `?.` | Maybe |
|------|------|-------|
| 空值安全访问属性 | ✅ `user?.address?.city` | ✅ `.map(u => u.address)` |
| 空值后做**变换** | ❌ 只能接着 `?.` 访问 | ✅ `.map(fn)` 任意转换 |
| 空值后做**副作用分支** | ❌ 需要 `if (x == null)` | ✅ `.getOrElse(default)` |
| 组合多个可空值 | ❌ 嵌套判空 | ✅ `.chain()` 串联 |
| 作为返回值表达"可能没有" | ❌ `undefined` 丢失语义 | ✅ `Maybe` 签名明确 |

`?.` 本质是语法糖，Maybe 是类型系统的一部分。`?.` 没法阻止你忘记处理 null——函数返回 `undefined` 时调用方无感知；而 Maybe 强制调用方通过 `getOrElse` / `fold` 面对"不存在"的情况。

盒子的概念（map/chain/fold）在后续 FP 学习中会持续出现——Either、Task、IO、Reader 都是同一个模式：把值装进容器，在容器内部做变换，把副作用和纯逻辑分离开。

## Either 与 try/catch 的对比

`try/catch` 的核心问题：

```js
// 从签名看不出会不会抛异常
function parseConfig(raw) {
  return JSON.parse(raw); // 可能 throw
}
```

Either 把异常变成返回值，强制处理：

```js
function parseConfig(raw) {
  try {
    return Either.right(JSON.parse(raw));
  } catch (e) {
    return Either.left(`Parse error: ${e.message}`);
  }
}

// 调用方被迫面对两种结果
parseConfig(raw).fold(
  err => console.error(err),
  config => startApp(config)
);
```

## 常用 FP 库及 tryCatch 模式

### 通用封装模式

把不安全的操作包装成 Either：

```js
// 手工 tryCatch
const tryCatch = (fn) => {
  try {
    return Either.right(fn());
  } catch (e) {
    return Either.left(e.message);
  }
};

// 使用
const result = tryCatch(() => JSON.parse(raw))
  .map(data => data.user)
  .chain(user => tryCatch(() => fetchUser(user.id)));
```

### 库对照

| 库 | tryCatch 写法 | Either 命名 |
|---|---|---|
| **Effect-TS** (TS) | `Either` 模块不内置 tryCatch，手动 `try { right } catch { left }` | `Either` (`left`/`right`) |
| **fp-ts** (TS) | `E.tryCatch(() => JSON.parse(s), String)` | `Either` (`left`/`right`) |
| **Effect-TS** | `Effect.tryPromise(() => fetch(url))` | 内建 Either 模式 |
| **folktale** | `Result.try(() => riskyOp())` | `Result` (`Ok`/`Error`) |
| **true-myth** | `Result.tryOrElse(() => JSON.parse(r), e => ...)` | `Result` (`Ok`/`Err`) |
| **crocks** | `tryCatch(fn)` 返回 Either | `Either` (`Left`/`Right`) |

> Effect-TS 是目前 TypeScript 最完整的 FP 框架，把 Either + Task + Dependency Injection 整合在一起，Week 9-10 会用到。fp-ts 是其前身，API 高度兼容。

## Maybe + Either 对比

| | Maybe | Either |
|---|---|---|
| **用途** | 值可能不存在（null/undefined） | 操作可能失败（带错误信息） |
| **状态** | Just / Nothing | Right / Left |
| **错误信息** | ❌ 只有"无值" | ✅ Left 携带任意错误 |
| **典型场景** | 嵌套属性访问、可选字段 | 业务校验、IO 异常处理 |
| **互转** | `.toEither('error msg')` | `.toMaybe()` |

两种容器的协作模式：

- **Maybe → Either**：先判空再校验。Maybe 处理 null，转 Either 后引入带错误信息的业务规则
- **Either → Maybe**：先处理异常再安全访问。Either 处理业务错误后，转 Maybe 做后续空值安全操作，此时具体错误原因已不重要
