<template>
  <div class="articles-page">
    <div class="container">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">所有文章</h1>
          <p class="page-description">
            探索技术世界的精彩内容，分享编程经验与见解
          </p>
        </div>
        
        <!-- Search Bar -->
        <div class="search-section">
          <GlassInput
            v-model="searchQuery"
            placeholder="搜索文章标题、内容或标签..."
            class="search-input"
          />
          <GlassButton @click="performSearch" class="search-button">
            搜索
          </GlassButton>
        </div>
      </div>

      <!-- Filter Section -->
      <div class="filter-section">
        <div class="filter-group">
          <label class="filter-label">分类筛选：</label>
          <div class="filter-tags">
            <GlassTag
              v-for="category in categories"
              :key="category.name"
              :clickable="true"
              :class="{ active: selectedCategory === category.name }"
              @click="selectCategory(category.name)"
            >
              {{ category.name }} ({{ category.count }})
            </GlassTag>
            <GlassTag
              :clickable="true"
              :class="{ active: selectedCategory === '' }"
              @click="selectCategory('')"
            >
              全部
            </GlassTag>
          </div>
        </div>
        
        <div class="filter-group">
          <label class="filter-label">排序方式：</label>
          <select v-model="sortBy" class="sort-select">
            <option value="date">最新发布</option>
            <option value="title">标题排序</option>
            <option value="readTime">阅读时长</option>
          </select>
        </div>
      </div>

      <!-- Search Results -->
      <div v-if="searchResults.length > 0 && searchQuery" class="search-results">
        <h3 class="results-title">
          搜索 "{{ searchQuery }}" 的结果 ({{ searchResults.length }} 篇)
        </h3>
        <ArticleList :articles="searchResultArticles" />
      </div>

      <!-- Regular Articles List -->
      <div v-else>
        <ArticleList 
          :articles="filteredArticles" 
          :loading="loading"
          empty-message="暂无符合条件的文章，试试其他搜索词吧！"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredArticles.length === 0 && !searchQuery" class="empty-state">
        <div class="empty-icon">📚</div>
        <h3 class="empty-title">暂无文章</h3>
        <p class="empty-description">
          当前分类下还没有文章，请选择其他分类或稍后再来查看。
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { ArticleService } from '@/services/articleService'
import { categories } from '@/data/categories'
import type { Article, SearchResult } from '@/types'
import ArticleList from '@/components/ArticleList.vue'
import GlassInput from '@/components/GlassInput.vue'
import GlassButton from '@/components/GlassButton.vue'
import GlassTag from '@/components/GlassTag.vue'

const articles = ref<Article[]>([])
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('date')
const loading = ref(false)
const searchResults = ref<SearchResult[]>([])

onMounted(() => {
  loadArticles()
})

const loadArticles = () => {
  loading.value = true
  setTimeout(() => {
    articles.value = ArticleService.getAllArticles()
    loading.value = false
  }, 500)
}

const filteredArticles = computed(() => {
  let filtered = articles.value

  // 按分类筛选
  if (selectedCategory.value) {
    filtered = filtered.filter(article => article.category === selectedCategory.value)
  }

  // 排序
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'date':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'title':
        return a.title.localeCompare(b.title)
      case 'readTime':
        return parseInt(a.readTime) - parseInt(b.readTime)
      default:
        return 0
    }
  })

  return filtered
})

const searchResultArticles = computed(() => {
  return searchResults.value.map(result => result.article)
})

const performSearch = () => {
  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  loading.value = true
  setTimeout(() => {
    searchResults.value = ArticleService.searchArticles(searchQuery.value)
    loading.value = false
  }, 300)
}

const selectCategory = (category: string) => {
  selectedCategory.value = category
  searchQuery.value = ''
  searchResults.value = []
}

// 监听搜索词变化
watch(searchQuery, (newValue) => {
  if (!newValue.trim()) {
    searchResults.value = []
  }
})
</script>

<style scoped>
.articles-page {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Page Header */
.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.header-content {
  margin-bottom: 40px;
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

.search-section {
  display: flex;
  gap: 16px;
  max-width: 600px;
  margin: 0 auto;
  align-items: center;
}

.search-input {
  flex: 1;
}

/* Filter Section */
.filter-section {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.filter-label {
  color: var(--glass-text-primary);
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
}

.filter-tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-tags .glass-tag.active {
  background: rgba(102, 126, 234, 0.4);
  border-color: rgba(102, 126, 234, 0.6);
  color: var(--glass-text-primary);
}

.sort-select {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--glass-text-primary);
  font-size: 14px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sort-select:focus {
  border-color: var(--accent-color);
  background: var(--card-hover);
}

.sort-select option {
  background: #333;
  color: white;
}

/* Search Results */
.search-results {
  margin-bottom: 40px;
}

.results-title {
  color: var(--glass-text-primary);
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 24px 0;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 80px 20px;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.6;
}

.empty-title {
  color: var(--glass-text-primary);
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.empty-description {
  color: var(--glass-text);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  max-width: 400px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .articles-page {
    padding: 20px 0;
  }
  
  .page-title {
    font-size: 36px;
  }
  
  .page-description {
    font-size: 16px;
  }
  
  .search-section {
    flex-direction: column;
    max-width: 100%;
  }
  
  .search-input {
    width: 100%;
  }
  
  .filter-section {
    gap: 20px;
  }
  
  .filter-group {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .filter-tags {
    width: 100%;
  }
  
  .sort-select {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .page-header {
    margin-bottom: 40px;
  }
  
  .header-content {
    margin-bottom: 24px;
  }
  
  .page-title {
    font-size: 28px;
  }
}
</style>