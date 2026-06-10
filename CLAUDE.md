# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run all exercises
npm test

# Run a specific week
npm run week:01

# Run a single exercise file
node --test exercises/week-01-pure-functions/01-pure-functions.js

# Run a file without tests (just execute)
npm run run -- exercises/week-01-pure-functions/01-pure-functions.js
```

## Architecture

This is a **10-week functional programming learning repo** in JavaScript. Exercises use Node's native test runner (`node:test` + `node:assert/strict`) with ES modules.

### Repo structure

- `exercises/week-XX-topic/` — numbered exercise files (01-05) for each week
- `notes/` — learning notes for each week/day
- `projects/week-10-capstone/` — final capstone project
- `plan.md` — detailed daily schedule for all 10 weeks
- `cheatsheet.md` — living FP cheatsheet
- `resources.md` — learning resources and references

### Exercise file convention

Each exercise file has two clearly marked regions:
- **`=== 在这里写你的代码 ===`** — where the learner writes implementations. This is the only section that should be modified.
- **`=== 测试（不要修改） ===`** — the tests below this line must never be changed.

The learner fills in implementations so that `node --test <file>` passes all assertions.

### Learning constraints

- **No `for` or `while` loops** — use `map`, `filter`, `reduce`, recursion, etc.
- **Pure functions preferred** — side effects isolated and explicitly labeled
- **Immutable data** — never mutate original arrays/objects
- Weeks 4-5 introduce **Ramda** as the FP utility library
- Weeks 6-8 cover **Functor / Maybe / Either / Monad**
- Weeks 9-10 use **fp-ts** and a capstone project
