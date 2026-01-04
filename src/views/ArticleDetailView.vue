<template>
  <div v-if="article" class="article-detail">
    <div class="container">
      <!-- Article Header -->
      <header class="article-header">
        <div class="article-breadcrumb">
          <RouterLink to="/" class="breadcrumb-link">首页</RouterLink>
          <span class="breadcrumb-separator">/</span>
          <RouterLink to="/articles" class="breadcrumb-link">文章</RouterLink>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">{{ article.title }}</span>
        </div>

        <div class="article-meta">
          <div class="article-category-badge">
            {{ article.category }}
          </div>
          <div v-if="article.featured" class="featured-badge">
            <span class="featured-icon">⭐</span>
            特色文章
          </div>
        </div>

        <h1 class="article-title">{{ article.title }}</h1>

        <div class="article-info">
          <div class="info-item">
            <span class="info-icon">👤</span>
            <span class="info-text">{{ article.author }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">📅</span>
            <span class="info-text">{{ formatDate(article.date) }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">⏱️</span>
            <span class="info-text">{{ article.readTime }}</span>
          </div>
        </div>

        <div class="article-tags">
          <GlassTag
            v-for="tag in article.tags"
            :key="tag"
            :clickable="false"
          >
            {{ tag }}
          </GlassTag>
        </div>
      </header>

      <!-- Article Content - 纯展示，无事件监听 -->
      <div class="article-content-wrapper">
        <article class="article-content">
          <MarkdownRenderer :content="article.content" />
        </article>

        <!-- Simple Actions -->
        <div class="article-actions">
          <GlassButton @click="goBack" variant="outline" class="action-button">
            ← 返回文章列表
          </GlassButton>
          <GlassButton @click="goToArticles" variant="secondary" class="action-button">
            浏览所有文章
          </GlassButton>
        </div>
      </div>
    </div>
  </div>

  <!-- Article Not Found -->
  <div v-else class="not-found">
    <div class="container">
      <div class="not-found-content">
        <div class="not-found-icon">📝</div>
        <h2 class="not-found-title">文章未找到</h2>
        <p class="not-found-description">
          抱歉，您访问的文章不存在或已被删除。
        </p>
        <GlassButton @click="goToArticles" variant="primary">
          浏览所有文章
        </GlassButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArticleService } from '@/services/articleService'
import type { Article } from '@/types'
import GlassButton from '@/components/GlassButton.vue'
import MarkdownRenderer from '@/components/MarkdownRenderer.vue'
import GlassTag from '@/components/GlassTag.vue'

const route = useRoute()
const router = useRouter()
const article = ref<Article | null>(null)

// 使用异步方法加载文章内容和markdown文件
onMounted(async () => {
  const articleId = route.params.id as string
  const foundArticle = await ArticleService.getArticleById(articleId)

  if (foundArticle) {
    article.value = foundArticle
  }
})

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
  return date.toLocaleDateString('zh-CN', options)
}

const goBack = () => {
  router.go(-1)
}

const goToArticles = () => {
  router.push('/articles')
}
</script>

<style scoped>
.article-detail {
  padding: 40px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Article Header */
.article-header {
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.article-breadcrumb {
  margin-bottom: 24px;
  font-size: 14px;
}

.breadcrumb-link {
  color: var(--glass-text);
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: var(--glass-text-primary);
}

.breadcrumb-separator {
  margin: 0 8px;
  color: var(--glass-text);
  opacity: 0.6;
}

.breadcrumb-current {
  color: var(--glass-text-primary);
  font-weight: 500;
}

.article-meta {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.article-category-badge {
  background: rgba(102, 126, 234, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(102, 126, 234, 0.5);
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--glass-text-primary);
}

.featured-badge {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 193, 7, 0.3));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.5);
  border-radius: 20px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.featured-icon {
  font-size: 14px;
}

.article-title {
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  line-height: 1.2;
  color: var(--glass-text-primary);
  margin: 0 0 24px 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.article-info {
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--glass-text);
  font-size: 14px;
}

.info-icon {
  font-size: 16px;
}

.info-text {
  font-weight: 400;
}

.article-tags {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

/* Article Content - 简化样式，无动画 */
.article-content-wrapper {
  margin-bottom: 40px;
}

.article-content {
  margin-bottom: 32px;
}

.article-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.action-button {
  min-width: 160px;
}

/* Not Found */
.not-found {
  padding: 120px 0;
  text-align: center;
}

.not-found-content {
  max-width: 500px;
  margin: 0 auto;
}

.not-found-icon {
  font-size: 64px;
  margin-bottom: 24px;
}

.not-found-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--glass-text-primary);
  margin-bottom: 16px;
}

.not-found-description {
  color: var(--glass-text);
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 768px) {
  .article-detail {
    padding: 20px 0;
  }

  .container {
    padding: 0 16px;
  }

  .article-header {
    margin-bottom: 24px;
    padding-bottom: 20px;
  }

  .article-title {
    font-size: 28px;
    margin-bottom: 16px;
  }

  .article-info {
    gap: 16px;
  }

  .article-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .action-button {
    width: 100%;
  }

  .not-found {
    padding: 80px 0;
  }

  .not-found-icon {
    font-size: 48px;
  }

  .not-found-title {
    font-size: 24px;
  }
}
</style>