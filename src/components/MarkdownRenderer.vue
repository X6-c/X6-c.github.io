<template>
  <div class="markdown-content" v-html="renderedContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { marked } from 'marked'

interface Props {
  content: string
}

const props = defineProps<Props>()

// 简化的marked配置 - 只保留必要功能
marked.setOptions({
  breaks: true,
  gfm: true
})

// 直接渲染，无额外处理
const renderedContent = computed(() => {
  return props.content ? marked.parse(props.content) : ''
})
</script>

<style scoped>
/* 简化的Markdown渲染器样式 - 纯展示，无动画 */
.markdown-content {
  line-height: 1.7;
  color: var(--article-text);
  font-size: 16px;
  font-weight: 400;
  background: var(--article-bg);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--theme-border);
  box-shadow: var(--glass-shadow);
}

/* 标题样式 */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin: 2em 0 1em 0;
  font-weight: 700;
  line-height: 1.3;
  color: var(--article-heading);
}

.markdown-content :deep(h1) {
  font-size: 2.2em;
  border-bottom: 3px solid var(--article-link);
  padding-bottom: 0.5em;
  background: linear-gradient(135deg, hsla(0, 22%, 31%, 0.224), #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.markdown-content :deep(h2) {
  font-size: 1.8em;
  border-bottom: 2px solid var(--theme-border);
  padding-bottom: 0.4em;
}

.markdown-content :deep(h3) {
  font-size: 1.5em;
  color: var(--article-text-primary);
}

.markdown-content :deep(h4) {
  font-size: 1.3em;
  color: var(--article-text-primary);
}

.markdown-content :deep(h5) {
  font-size: 1.1em;
  color: var(--article-text);
}

.markdown-content :deep(h6) {
  font-size: 1em;
  color: var(--article-text);
  font-weight: 600;
}

/* 段落样式 */
.markdown-content :deep(p) {
  margin: 1.2em 0;
  color: var(--article-text);
  text-align: justify;
}

/* 列表样式 */
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 1.2em 0;
  padding-left: 2em;
  color: var(--article-text);
}

.markdown-content :deep(li) {
  margin: 0.6em 0;
  line-height: 1.6;
}

/* 引用块样式 */
.markdown-content :deep(blockquote) {
  margin: 1.8em 0;
  padding: 1.2em 1.8em;
  background: var(--article-quote-bg);
  border-left: 4px solid var(--article-link);
  border-radius: 12px;
  border: 1px solid var(--theme-border);
  color: var(--article-text-primary);
  font-style: italic;
}

/* 表格样式 */
.markdown-content :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 2em 0;
  background: var(--article-table-bg);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--theme-border);
}

.markdown-content :deep(th),
.markdown-content :deep(td) {
  border: 1px solid var(--theme-border);
  padding: 14px 16px;
  text-align: left;
  color: var(--article-text);
}

.markdown-content :deep(th) {
  background: var(--article-link);
  color: white;
  font-weight: 600;
  font-size: 0.95em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.markdown-content :deep(tr:nth-child(even)) {
  background: var(--theme-button-bg);
}

/* 代码块样式 */
.markdown-content :deep(pre) {
  margin: 1.8em 0;
  border-radius: 12px;
  overflow: hidden;
  background: var(--article-code-bg);
  border: 1px solid var(--theme-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.markdown-content :deep(code) {
  font-family: 'Fira Code', 'Monaco', 'Consolas', 'Menlo', monospace;
  font-size: 0.9em;
  line-height: 1.5;
}

.markdown-content :deep(pre code) {
  display: block;
  padding: 1.5em;
  overflow-x: auto;
  background: transparent;
  color: var(--article-text-primary);
}

/* 行内代码样式 */
.markdown-content :deep(:not(pre) > code) {
  background: var(--article-code-bg);
  padding: 0.3em 0.6em;
  border-radius: 6px;
  border: 1px solid var(--theme-border);
  color: var(--article-link);
  font-weight: 500;
}

/* 链接样式 */
.markdown-content :deep(a) {
  color: var(--article-link);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 2px solid transparent;
}

.markdown-content :deep(a:hover) {
  color: var(--article-heading);
  border-bottom-color: var(--article-heading);
}

/* 图片样式 */
.markdown-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 2em 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

/* 分隔线样式 */
.markdown-content :deep(hr) {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--theme-border), transparent);
  margin: 3em 0;
  border-radius: 2px;
}

/* 强调文本样式 */
.markdown-content :deep(strong) {
  color: var(--article-text-primary);
  font-weight: 700;
}

.markdown-content :deep(em) {
  color: var(--article-text);
  font-style: italic;
}

/* 删除线样式 */
.markdown-content :deep(del) {
  color: var(--theme-text-muted);
  text-decoration: line-through;
}

/* 键盘快捷键样式 */
.markdown-content :deep(kbd) {
  background: var(--article-code-bg);
  border: 1px solid var(--theme-border);
  border-radius: 6px;
  padding: 0.2em 0.6em;
  font-size: 0.85em;
  font-family: inherit;
  color: var(--article-text-primary);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .markdown-content {
    padding: 1.5rem;
    font-size: 15px;
  }

  .markdown-content :deep(h1) {
    font-size: 1.8em;
  }

  .markdown-content :deep(h2) {
    font-size: 1.5em;
  }

  .markdown-content :deep(pre code) {
    padding: 1em;
    font-size: 0.85em;
  }

  .markdown-content :deep(th),
  .markdown-content :deep(td) {
    padding: 10px 12px;
  }
}
</style>
