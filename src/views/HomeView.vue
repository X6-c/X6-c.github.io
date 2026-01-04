<template>
  <div class="home">
    <!-- Personal Info Section -->
    <section class="personal-section">
      <div class="container">
        <PersonalInfoCard />
      </div>
    </section>

    <!-- Featured Articles -->
    <section v-if="featuredArticles.length > 0" class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-icon">⭐</span>
            特色文章
          </h2>
          <RouterLink to="/articles" class="view-all-link">
            查看全部 →
          </RouterLink>
        </div>
        <div class="featured-grid">
          <ArticleCard
            v-for="article in featuredArticles"
            :key="article.id"
            :article="article"
            class="featured-card"
          />
        </div>
      </div>
    </section>

    <!-- Latest Articles -->
    <section class="latest-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="title-icon">📝</span>
            最新文章
          </h2>
          <RouterLink to="/articles" class="view-all-link">
            查看全部 →
          </RouterLink>
        </div>
        <ArticleList :articles="latestArticles" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArticleService } from '@/services/articleService'
import type { Article } from '@/types'
import ArticleCard from '@/components/ArticleCard.vue'
import ArticleList from '@/components/ArticleList.vue'
import PersonalInfoCard from '@/components/PersonalInfoCard.vue'

const featuredArticles = ref<Article[]>([])
const latestArticles = ref<Article[]>([])

onMounted(() => {
  featuredArticles.value = ArticleService.getFeaturedArticles()
  latestArticles.value = ArticleService.getLatestArticles(3)
})
</script>

<style scoped>
.home {
  padding-top: 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Personal Info Section */
.personal-section {
  padding: 60px 0;
}

/* Section Styles */
.featured-section,
.latest-section {
  padding: 80px 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--glass-text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.title-icon {
  font-size: 28px;
}

.view-all-link {
  color: var(--glass-text-primary);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 8px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

.view-all-link:hover {
  background: var(--card-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(31, 38, 135, 0.15);
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.featured-card {
  animation: fadeIn 0.6s ease-out forwards;
}

.featured-card:nth-child(1) {
  animation-delay: 0.1s;
}

.featured-card:nth-child(2) {
  animation-delay: 0.2s;
}

.featured-card:nth-child(3) {
  animation-delay: 0.3s;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .featured-section,
  .latest-section {
    padding: 60px 0;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .section-title {
    font-size: 24px;
  }

  .featured-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>