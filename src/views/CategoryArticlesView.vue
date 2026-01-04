<template>
  <div class="category-articles">
    <div class="container">
      <div class="page-header">
        <div class="breadcrumb">
          <RouterLink to="/" class="breadcrumb-link">首页</RouterLink>
          <span class="separator">/</span>
          <RouterLink to="/categories" class="breadcrumb-link">分类</RouterLink>
          <span class="separator">/</span>
          <span class="current">{{ categoryName }}</span>
        </div>
        <h1 class="page-title">{{ categoryName }} 分类</h1>
        <p class="page-description">
          {{ getCategoryDescription() }}
        </p>
        <div class="category-stats">
          <span class="stats-count">{{ categoryArticles.length }} 篇文章</span>
        </div>
      </div>

      <ArticleList 
        :articles="categoryArticles" 
        :empty-message="`「${categoryName}」分类下暂无文章`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArticleService } from '@/services/articleService'
import { categories } from '@/data/categories'
import type { Article } from '@/types'
import ArticleList from '@/components/ArticleList.vue'

const route = useRoute()
const categoryName = ref('')
const categoryArticles = ref<Article[]>([])

onMounted(() => {
  categoryName.value = route.params.name as string
  categoryArticles.value = ArticleService.getArticlesByCategory(categoryName.value)
})

const getCategoryDescription = () => {
  const category = categories.find(c => c.name === categoryName.value)
  return category?.description || '探索这个分类下的所有文章'
}
</script>

<style scoped>
.category-articles {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.breadcrumb {
  margin-bottom: 24px;
  font-size: 14px;
}

.breadcrumb-link {
  color: var(--glass-text);
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: var(--glass-text-primary);
}

.separator {
  margin: 0 8px;
  color: var(--glass-text);
  opacity: 0.6;
}

.current {
  color: var(--glass-text-primary);
  font-weight: 500;
}

.page-title {
  font-size: 48px;
  font-weight: 800;
  color: var(--glass-text-primary);
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  font-size: 18px;
  color: var(--glass-text);
  line-height: 1.6;
  margin: 0 0 16px 0;
  max-width: 600px;
  margin: 0 auto 16px auto;
}

.category-stats {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.stats-count {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 8px 16px;
  color: var(--glass-text-primary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .category-articles {
    padding: 20px 0;
  }
  
  .page-title {
    font-size: 36px;
  }
  
  .page-description {
    font-size: 16px;
  }
}
</style>