<template>
  <div class="article-list">
    <div v-if="articles.length === 0" class="empty-state">
      <div class="empty-icon">📝</div>
      <h3 class="empty-title">暂无文章</h3>
      <p class="empty-description">
        {{ emptyMessage || '还没有发布的文章，敬请期待！' }}
      </p>
    </div>
    
    <div v-else class="articles-grid">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        class="article-item"
      />
    </div>
    
    <div v-if="showLoadMore && hasMoreArticles" class="load-more-container">
      <GlassButton 
        variant="secondary" 
        @click="$emit('load-more')"
        :loading="loading"
      >
        {{ loading ? '加载中...' : '加载更多' }}
      </GlassButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from '@/types'
import ArticleCard from './ArticleCard.vue'
import GlassButton from './GlassButton.vue'

interface Props {
  articles: Article[]
  loading?: boolean
  showLoadMore?: boolean
  hasMoreArticles?: boolean
  emptyMessage?: string
}

interface Emits {
  'load-more': []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.article-list {
  width: 100%;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.article-item {
  height: 100%;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.empty-icon {
  font-size: 64px;
  opacity: 0.6;
  margin-bottom: 16px;
}

.empty-title {
  color: var(--glass-text-primary);
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.empty-description {
  color: var(--glass-text);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  max-width: 400px;
}

.load-more-container {
  text-align: center;
  padding: 20px 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .empty-state {
    padding: 60px 20px;
  }
  
  .empty-icon {
    font-size: 48px;
  }
  
  .empty-title {
    font-size: 20px;
  }
  
  .empty-description {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
}
</style>