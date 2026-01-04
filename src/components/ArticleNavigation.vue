<template>
  <nav class="article-navigation">
    <div class="nav-container">
      <!-- 上一篇文章 -->
      <div v-if="prevArticle" class="nav-item prev">
        <RouterLink :to="`/article/${prevArticle.id}`" class="nav-link">
          <div class="nav-content">
            <span class="nav-label">
              <span class="nav-icon">←</span>
              上一篇
            </span>
            <h3 class="nav-title">{{ prevArticle.title }}</h3>
            <p class="nav-meta">{{ formatDate(prevArticle.date) }}</p>
          </div>
        </RouterLink>
      </div>

      <!-- 分隔线 -->
      <div v-if="prevArticle && nextArticle" class="nav-divider"></div>

      <!-- 下一篇文章 -->
      <div v-if="nextArticle" class="nav-item next">
        <RouterLink :to="`/article/${nextArticle.id}`" class="nav-link">
          <div class="nav-content">
            <span class="nav-label">
              下一篇
              <span class="nav-icon">→</span>
            </span>
            <h3 class="nav-title">{{ nextArticle.title }}</h3>
            <p class="nav-meta">{{ formatDate(nextArticle.date) }}</p>
          </div>
        </RouterLink>
      </div>

      <!-- 占位提示 -->
      <div v-if="!prevArticle && !nextArticle" class="no-navigation">
        <span class="no-nav-text">暂无其他文章</span>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { Article } from '@/types'

interface Props {
  prevArticle?: Article | null
  nextArticle?: Article | null
}

withDefaults(defineProps<Props>(), {
  prevArticle: null,
  nextArticle: null
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  }
  return date.toLocaleDateString('zh-CN', options)
}
</script>

<style scoped>
.article-navigation {
  margin: 3em 0 2em;
  padding: 0 1em;
}

.nav-container {
  display: flex;
  gap: 2rem;
  align-items: stretch;
  justify-content: space-between;
}

.nav-item {
  flex: 1;
  min-width: 0;
}

.nav-link {
  display: block;
  text-decoration: none;
  color: inherit;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  height: 100%;
}

.nav-link:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
  border-color: rgba(66, 184, 131, 0.3);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.nav-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.nav-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-icon {
  font-weight: bold;
}

.nav-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 0 0.5rem 0;
  color: rgba(255, 255, 255, 0.9);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.nav-meta {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  margin-top: auto;
}

.nav-divider {
  width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.1), transparent);
  align-self: center;
  margin: 0 1rem;
}

.no-navigation {
  flex: 1;
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.no-nav-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-divider {
    width: 100%;
    height: 1px;
    margin: 0.5rem 0;
  }
  
  .nav-link {
    padding: 1.25rem;
  }
  
  .nav-title {
    font-size: 0.9rem;
  }
}
</style>