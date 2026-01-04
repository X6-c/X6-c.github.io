import type { Article } from '@/types'

export const articles: Article[] = [
  {
    id: '1',
    title: '片云天共远，永夜月同孤',
    excerpt: '众鸟高飞尽，孤云独去闲，相看两不厌，只有敬亭山。',
    coverImage: '/src/assets/images/鸽子.gif',
    content: '', // 将从markdown文件加载
    markdownFile: '/src/data/articles/3.md',
    author: '那一拽风情',
    date: '2024-01-15',
    readTime: '5 分钟',
    category: '设计',
    tags: ['UI设计', '玻璃拟态', '前端开发'],
    featured: true
  },
  {
    id: '2',
    title: '花无人戴，酒无人劝，醉也无人管。',
    excerpt: '幽恨无人言说',
    coverImage: '/src/assets/images/d6.jpg',
    content: '', // 将从markdown文件加载
    markdownFile: '/src/data/articles/2.md',
    author: '那一拽风情',
    date: '2024-11-12',
    readTime: '8 分钟',
    category: '历史',
    tags: ['1', '2', '3', '武将'],
    featured: false
  },
  {
    id: '3',
    title: '无人与我立黄昏，无人问我粥可温。',
    excerpt: '匆匆弹指十年间，顾然回首早已物是人非。',
    coverImage: '/src/assets/images/天空.gif',
    content: '', // 将从markdown文件加载
    markdownFile: '/src/data/articles/4.md',
    author: '那一拽风情',
    date: '2025-11-10',
    readTime: '12 分钟',
    category: '技术',
    tags: ['Vue3', 'Composition API', '前端开发', 'JavaScript'],
    featured: true
  }
  ,
  {
    id: '4',
    title: '测试',
    excerpt: '真的假',
    coverImage: '/src/assets/images/3.png',
    content: '', // 将从markdown文件加载
    markdownFile: '/src/data/articles/cs.md',
    author: '那一拽风情',
    date: '2025-12-20',
    readTime: '12 分钟',
    category: '技术',
    tags: ['Vue3', 'Composition API', '前端开发', 'JavaScript'],
    featured: true
  }

]
