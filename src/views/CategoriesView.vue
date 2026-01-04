<template>
  <div class="categories-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">文章分类</h1>
        <p class="page-description">
          按分类浏览文章，快速找到感兴趣的内容
        </p>
      </div>

      <div class="categories-grid">
        <RouterLink
          v-for="category in categories"
          :key="category.name"
          :to="`/categories/${category.name}`"
          class="category-card glass-hover"
        >
          <div class="category-icon">📁</div>
          <h3 class="category-name">{{ category.name }}</h3>
          <p class="category-description">{{ category.description }}</p>
          <div class="category-count">
            <span class="count-number">{{ category.count }}</span>
            <span class="count-label">篇文章</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { categories } from '@/data/categories'
import { ArticleService } from '@/services/articleService'

const categoryData = ref(categories)

onMounted(() => {
  // 更新文章数量
  categoryData.value = categories.map(category => ({
    ...category,
    count: ArticleService.getArticlesByCategory(category.name).length
  }))
})
</script>

<style scoped>
.categories-page {
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

.page-title {
  font-size: 48px;
  font-weight: 800;
  color: var(--glass-text-primary);
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #000000, #FFD700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  font-size: 18px;
  color: var(--glass-text);
  line-height: 1.6;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.category-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 32px;
  text-align: center;
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #667eea, #f093fb);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px 0 rgba(31, 38, 135, 0.5);
}

.category-icon {
  font-size: 48px;
  opacity: 0.8;
}

.category-name {
  color: var(--glass-text-primary);
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.category-description {
  color: var(--glass-text);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}

.category-count {
  display: flex;
  align-items: baseline;
  gap: 4px;
  color: var(--glass-text-primary);
}

.count-number {
  font-size: 24px;
  font-weight: 700;
}

.count-label {
  font-size: 14px;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .categories-page {
    padding: 20px 0;
  }
  
  .page-title {
    font-size: 36px;
  }
  
  .page-description {
    font-size: 16px;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .category-card {
    padding: 24px;
  }
  
  .category-icon {
    font-size: 40px;
  }
  
  .category-name {
    font-size: 20px;
  }
}
</style>