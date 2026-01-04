<template>
  <RouterLink :to="`/articles/${article.id}`" class="article-card-link">
    <GlassCard class="article-card glass-hover" :hoverable="true">
      <!-- 封面图片 -->
      <div v-if="article.coverImage" class="article-cover">
        <img :src="article.coverImage" :alt="article.title" class="cover-image" />
        <div class="cover-overlay"></div>
      </div>

      <div class="article-card-content">
        <div class="article-header">
          <div class="article-meta">
            <span class="article-category">{{ article.category }}</span>
            <span class="article-date">{{ formatDate(article.date) }}</span>
            <span class="article-read-time">{{ article.readTime }}</span>
          </div>
          <h2 class="article-title">{{ article.title }}</h2>
        </div>

        <p class="article-excerpt">{{ article.excerpt }}</p>

        <div class="article-footer">
          <div class="article-tags">
            <GlassTag
              v-for="tag in article.tags.slice(0, 3)"
              :key="tag"
              :clickable="false"
            >
              {{ tag }}
            </GlassTag>
            <span v-if="article.tags.length > 3" class="more-tags">
              +{{ article.tags.length - 3 }}
            </span>
          </div>

          <div class="article-author">
            <span class="author-icon">👤</span>
            {{ article.author }}
          </div>
        </div>
      </div>
    </GlassCard>
  </RouterLink>
</template>

<script setup lang="ts">
import type { Article } from '@/types'
import GlassCard from './GlassCard.vue'
import GlassTag from './GlassTag.vue'

interface Props {
  article: Article
}

defineProps<Props>()

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString('zh-CN', options)
}
</script>

<style scoped>
.article-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.article-card {
  height: 100%;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.article-cover {
  position: relative;
  width: calc(100% + 46px);
  height: 200px;
  overflow: hidden;
  margin: -24px 24px 16px -24px;
  border-radius: 20px 0 0 0;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
  pointer-events: none;
}

.article-card:hover .cover-image {
  transform: scale(1.05);
}

.article-card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
}

.article-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #4a4a4a;
}

.article-category {
  background: rgba(102, 126, 234, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(102, 126, 234, 0.5);
  border-radius: 6px;
  padding: 4px 8px;
  font-weight: 500;
  color: var(--glass-text-primary);
  transition: all 0.3s ease;
}

.article-category:hover {
  background: rgba(102, 126, 234, 0.4);
}

.article-date,
.article-read-time {
  display: flex;
  align-items: center;
  gap: 4px;
}

.article-date::before {
  content: '📅';
}

.article-read-time::before {
  content: '⏱️';
}

.article-title {
  color: #2d2d2d;
  font-size: 24px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0;
}

.article-excerpt {
  color: #4a4a4a;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-top: auto;
}

.article-tags {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.more-tags {
  color: var(--glass-text);
  font-size: 12px;
  opacity: 0.8;
}

.article-author {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--glass-text);
  font-size: 14px;
  white-space: nowrap;
}

.author-icon {
  font-size: 16px;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .article-title {
    font-size: 20px;
  }

  .article-excerpt {
    font-size: 14px;
    -webkit-line-clamp: 2;
  }

  .article-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .article-meta {
    gap: 12px;
    font-size: 12px;
  }

  .featured-badge {
    top: 12px;
    right: 12px;
    font-size: 11px;
    padding: 4px 8px;
  }
}
</style>
