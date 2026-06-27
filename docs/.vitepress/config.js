import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'JS 函数式编程学习指南',
  description: '10 周 JavaScript 函数式编程学习计划 — 从纯函数到 Monad',
  lang: 'zh-CN',
  base: '/js-fp-learning/',
  srcExclude: ['superpowers/**'],

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/js-fp-learning/favicon.png' }],
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '练习题', link: '/exercises' },
      { text: '答案参考', link: '/solutions' },
      { text: '速查表', link: '/cheatsheet' },
      { text: '学习指南', link: '/guide' },
    ],

    sidebar: {
      '/weeks/': [
        { text: '第01周 · 纯函数与高阶方法', link: '/weeks/week-01' },
        { text: '第02周 · 闭包与不可变数据', link: '/weeks/week-02' },
        { text: '第03周 · 柯里化与组合管道', link: '/weeks/week-03' },
        { text: '第04周 · Ramda 基础', link: '/weeks/week-04' },
        { text: '第05周 · Ramda 进阶', link: '/weeks/week-05' },
        { text: '第06周 · Functor & Maybe', link: '/weeks/week-06' },
        { text: '第07周 · Either 异常处理', link: '/weeks/week-07' },
        { text: '第08周 · Monad 单子', link: '/weeks/week-08' },
        { text: '第09周 · Effect-TS 入门', link: '/weeks/week-09' },
        { text: '第10周 · 项目实战', link: '/weeks/week-10' },
      ],
      '/': [
        { text: '练习题', link: '/exercises' },
        { text: '答案参考', link: '/solutions' },
        { text: '速查表', link: '/cheatsheet' },
        { text: '学习指南', link: '/guide' },
        { text: '如何贡献', link: '/contributing' },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/GeoDaoyu/js-fp-learning' },
    ],

    outline: 'deep',

    footer: {
      message: '<a href="https://github.com/GeoDaoyu/js-fp-learning/blob/main/LICENSE" target="_blank">MIT Licensed</a> | Built with VitePress',
    },
  },

  vite: {
    server: {
      fs: {
        allow: ['..'],
      },
    },
  },
})
