---
title: 答案参考
---

<script setup>
import { ref, computed, onMounted } from 'vue'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', javascript)

const modules = import.meta.glob('../solutions/**/*.js', { query: '?raw', import: 'default', eager: true })

const solutionTree = computed(() => {
  const tree = {}
  for (const [path, content] of Object.entries(modules)) {
    const match = path.match(/solutions\/([^/]+)\/(week-\d+-[^/]+)\/(\d+-.+\.js)$/)
    if (!match) continue
    const [, author, weekDir, filename] = match
    if (!tree[author]) tree[author] = { label: author, weeks: {} }
    if (!tree[author].weeks[weekDir]) {
      const weekMatch = weekDir.match(/week-(\d+)-(.+)/)
      const weekNum = weekMatch ? weekMatch[1] : ''
      const topic = weekMatch ? weekMatch[2] : weekDir
      tree[author].weeks[weekDir] = {
        label: `第${String(weekNum).padStart(2, '0')}周 · ${topicLabel(topic)}`,
        exercises: [],
      }
    }
    const dayMatch = filename.match(/^(\d+)-(.+)\.js$/)
    tree[author].weeks[weekDir].exercises.push({
      path,
      content,
      label: dayMatch
        ? `练习${dayMatch[1]}: ${dayMatch[2].replace(/-/g, ' ')}`
        : filename,
    })
  }
  for (const author of Object.values(tree)) {
    for (const week of Object.values(author.weeks)) {
      week.exercises.sort((a, b) => a.label.localeCompare(b.label))
    }
  }
  return tree
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

const A_KEY = 'fp-sol-author'
const W_KEY = 'fp-sol-week'
const E_KEY = 'fp-sol-ex'

const selectedAuthor = ref('')
const selectedWeek = ref('')
const selectedExercise = ref('')

const authorOptions = computed(() =>
  Object.entries(solutionTree.value).map(([key, data]) => ({
    value: key,
    label: data.label,
  }))
)

const weekOptions = computed(() => {
  const author = solutionTree.value[selectedAuthor.value]
  if (!author) return []
  return Object.entries(author.weeks)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, data]) => ({ value: key, label: data.label }))
})

const exerciseOptions = computed(() => {
  const author = solutionTree.value[selectedAuthor.value]
  if (!author) return []
  const week = author.weeks[selectedWeek.value]
  if (!week) return []
  return week.exercises.map((ex, i) => ({ value: i, label: ex.label }))
})

const currentExercise = computed(() => {
  const author = solutionTree.value[selectedAuthor.value]
  if (!author) return null
  const week = author.weeks[selectedWeek.value]
  if (!week) return null
  const idx = typeof selectedExercise.value === 'number' ? selectedExercise.value : Number(selectedExercise.value)
  return week.exercises[idx] || null
})

const highlightedCode = computed(() => {
  if (!currentExercise.value) return ''
  return hljs.highlight(currentExercise.value.content, { language: 'javascript' }).value
})

function onAuthorChange() {
  selectedWeek.value = ''
  selectedExercise.value = ''
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(A_KEY, selectedAuthor.value)
    localStorage.removeItem(W_KEY)
    localStorage.removeItem(E_KEY)
  }
}

function onWeekChange() {
  selectedExercise.value = ''
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(W_KEY, selectedWeek.value)
    localStorage.removeItem(E_KEY)
  }
}

function onExerciseChange() {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(E_KEY, selectedExercise.value)
  }
}

onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    const a = localStorage.getItem(A_KEY)
    const w = localStorage.getItem(W_KEY)
    const e = localStorage.getItem(E_KEY)
    if (a && solutionTree.value[a]) {
      selectedAuthor.value = a
      if (w && solutionTree.value[a].weeks[w]) {
        selectedWeek.value = w
        if (e !== null && e !== undefined && e !== '') {
          selectedExercise.value = Number(e)
        }
      }
    }
  }
})
</script>

# 答案参考

查看不同贡献者的练习答案。**这些答案仅供参考，建议先自己尝试完成练习**，卡住时再来对照。

想提交自己的答案？见[如何贡献](/contributing)。

<div class="dropdown-group">
  <select v-model="selectedAuthor" @change="onAuthorChange">
    <option value="" disabled>-- 选择贡献者 --</option>
    <option v-for="opt in authorOptions" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>

  <select v-model="selectedWeek" @change="onWeekChange" :disabled="!weekOptions.length">
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

<div v-if="!selectedAuthor" class="empty-state">
  👆 请先选择一位贡献者
</div>

<div v-else-if="!weekOptions.length" class="empty-state">
  该贡献者暂无答案
</div>

<div v-else-if="!selectedWeek && weekOptions.length" class="empty-state">
  👆 请选择一个周
</div>

<div v-else-if="selectedExercise === '' && exerciseOptions.length" class="empty-state">
  👆 请选择一个题目
</div>

<div v-else-if="!currentExercise" class="empty-state">
  暂无对应答案
</div>

<div v-else class="code-viewer">
  <pre><code class="hljs language-js" v-html="highlightedCode"></code></pre>
</div>

<style>
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
