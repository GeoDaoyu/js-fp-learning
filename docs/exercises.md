---
title: 练习题目
---

<script setup>
import { ref, computed, onMounted } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', javascript)

const modules = import.meta.glob('../exercises/**/*.js', { query: '?raw', import: 'default', eager: true })

const exerciseTree = computed(() => {
  const tree = {}
  for (const [path, content] of Object.entries(modules)) {
    const match = path.match(/exercises\/week-(\d+)-([^/]+)\/(\d+)-(.+?)\.js$/)
    if (!match) continue
    const [, weekNum, topic, dayNum, name] = match
    const weekKey = `week-${weekNum}`
    if (!tree[weekKey]) {
      tree[weekKey] = {
        label: `第${String(weekNum).padStart(2, '0')}周 · ${topicLabel(topic)}`,
        exercises: [],
      }
    }
    tree[weekKey].exercises.push({
      path,
      content,
      day: dayNum,
      label: `练习${dayNum}: ${name.replace(/-/g, ' ')}`,
    })
  }
  for (const week of Object.values(tree)) {
    week.exercises.sort((a, b) => a.day.localeCompare(b.day))
  }
  return Object.entries(tree).sort((a, b) => a[0].localeCompare(b[0]))
})

function topicLabel(topic) {
  const labels = {
    'pure-functions': '纯函数',
    'closures-immutability': '闭包与不可变',
    'currying-compose': '柯里化与组合',
    'ramda-basics': 'Ramda 基础',
    'ramda-advanced': 'Ramda 进阶',
    'functor-maybe': 'Functor & Maybe',
    'either': 'Either',
    'monad': 'Monad',
    'effect-ts': 'Effect-TS',
    'capstone': '项目实战',
  }
  return labels[topic] || topic
}

const WEEK_KEY = 'fp-ex-week'
const EX_KEY = 'fp-ex-idx'

const selectedWeek = ref('')
const selectedExercise = ref('')

const weekOptions = computed(() =>
  exerciseTree.value.map(([key, data]) => ({ value: key, label: data.label }))
)

const exerciseOptions = computed(() => {
  const week = exerciseTree.value.find(([k]) => k === selectedWeek.value)
  if (!week) return []
  return week[1].exercises.map((ex, i) => ({ value: i, label: ex.label }))
})

const currentExercise = computed(() => {
  const week = exerciseTree.value.find(([k]) => k === selectedWeek.value)
  if (!week) return null
  const idx = typeof selectedExercise.value === 'number' ? selectedExercise.value : Number(selectedExercise.value)
  return week[1].exercises[idx] || null
})

const highlightedCode = computed(() => {
  if (!currentExercise.value) return ''
  return hljs.highlight(currentExercise.value.content, { language: 'javascript' }).value
})

function onWeekChange() {
  selectedExercise.value = ''
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(WEEK_KEY, selectedWeek.value)
    localStorage.removeItem(EX_KEY)
  }
}

function onExerciseChange() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(EX_KEY, selectedExercise.value)
  }
}

onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    const savedWeek = localStorage.getItem(WEEK_KEY)
    const savedEx = localStorage.getItem(EX_KEY)
    if (savedWeek && exerciseTree.value.find(([k]) => k === savedWeek)) {
      selectedWeek.value = savedWeek
      const week = exerciseTree.value.find(([k]) => k === savedWeek)
      if (savedEx !== null && week && week[1].exercises[Number(savedEx)]) {
        selectedExercise.value = Number(savedEx)
      }
    }
  }
})
</script>

# 练习题目

选择周和题目，在浏览器中查看练习题内容。

**建议克隆仓库在本地动手练习**，详见[学习指南](/guide)。

<div class="dropdown-group">
  <select v-model="selectedWeek" @change="onWeekChange">
    <option value="" disabled>-- 选择周 --</option>
    <option v-for="opt in weekOptions" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>

  <select v-model.number="selectedExercise" @change="onExerciseChange" :disabled="!exerciseOptions.length">
    <option value="" disabled>-- 选择题目 --</option>
    <option v-for="opt in exerciseOptions" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</div>

<div v-if="!selectedWeek" class="empty-state">
  👆 请先选择一周，然后选择要查看的题目
</div>

<div v-else-if="selectedExercise === '' && exerciseOptions.length" class="empty-state">
  👆 请选择一个题目来查看内容
</div>

<div v-else-if="!currentExercise" class="empty-state">
  该周暂无练习题
</div>

<div v-else class="code-viewer">
  <pre><code class="hljs language-js" v-html="highlightedCode"></code></pre>
</div>

<style>
/* github-dark theme overrides for dark mode */
html.dark .hljs { color: #e6edf3; }
html.dark .hljs-keyword { color: #ff7b72; }
html.dark .hljs-string { color: #a5d6ff; }
html.dark .hljs-number { color: #79c0ff; }
html.dark .hljs-comment { color: #8b949e; }
html.dark .hljs-title.function_ { color: #d2a8ff; }
html.dark .hljs-built_in { color: #ffa657; }
html.dark .hljs-literal { color: #79c0ff; }
html.dark .hljs-params { color: #e6edf3; }
html.dark .hljs-property { color: #79c0ff; }
html.dark .hljs-regexp { color: #ff7b72; }
html.dark .hljs-selector-class { color: #ff7b72; }
html.dark .hljs-meta { color: #8b949e; }
</style>
