# 第 07 周 · Either 异常处理

## 本周概览

Maybe 解决了"空值"问题，但遇到"错误"时只会悄悄跳过。Either 提供了**带错误信息的失败分支**：`Right` 走正常流程，`Left` 携带错误详情。

## 核心概念

### Either：Left / Right

```js
class Right extends Either {
  map(fn) {
    return Either.of(fn(this._value))  // 正常 → 继续处理
  }
}

class Left extends Either {
  map(_) {
    return this  // 失败 → 短路，保留错误信息
  }
}

Either.of(value)       // Right(value)
Either.left('Invalid') // Left('Invalid')
```

### 数据校验管道

用 Either 串联多个校验步骤，任何一步失败，后续自动跳过：

```js
function validateUsername(name) {
  return name.length >= 3
    ? Either.right(name)
    : Either.left('用户名至少 3 个字符')
}

function validatePassword(pw) {
  return pw.length >= 6
    ? Either.right(pw)
    : Either.left('密码至少 6 个字符')
}

// fold：统一处理两个分支
function register(username, password) {
  return validateUsername(username)
    .chain(name => validatePassword(password).map(pw => ({ name, pw })))
    .fold(
      error => ({ success: false, error }),
      data => ({ success: true, ...data }),
    )
}
```

### Either vs try/catch

```js
// ❌ try/catch 是语句，不是表达式
let result
try {
  result = riskyOperation()
} catch (e) {
  result = fallbackValue
}

// ✅ Either 是表达式，可以直接赋值
const result = tryCatch(riskyOperation).fold(
  e => fallbackValue,
  value => value,
)
```

### fold：统一处理两个分支

```js
eitherResult.fold(
  error => `出错啦：${error}`,   // Left 处理
  value => `结果是：${value}`,   // Right 处理
)
```

## 对应练习

| 练习 | 内容 |
|------|------|
| 01-either-basics | 实现 Either：Left/Right 基础结构 |
| 02-either-validation | Either 实战：表单校验 + 校验链路 |
| 03-either-business | Either 实战：业务异常处理 |
| 04-maybe-either | Maybe + Either 混合使用 |
| 05-either-comprehensive | 完整业务场景：空值 + 异常全覆盖 |

→ [在练习浏览器中查看题目](/exercises)

## 本周小结

- Either = 带错误信息的 Maybe
- `Right` = 正常路径，`Left` = 错误路径
- `map` 只在 Right 上执行，Left 自动短路
- `fold` 统一处理两个分支，将错误信息变回普通值
