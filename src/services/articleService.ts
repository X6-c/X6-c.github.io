import { articles as defaultArticles } from '@/data/articles'
import type { Article, SearchResult } from '@/types'
import { loadMarkdownContent } from '@/utils/markdownLoader'

export class ArticleService {
  /**
   * 获取所有文章
   */
  static getAllArticles(): Article[] {
    return defaultArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  /**
   * 获取特色文章
   */
  static getFeaturedArticles(): Article[] {
    const allArticles = this.getAllArticles()
    return allArticles.filter(article => article.featured)
  }

  /**
   * 根据ID获取文章（同步版本，使用缓存内容）
   */
  static getArticleByIdSync(id: string): Article | undefined {
    const allArticles = this.getAllArticles()
    return allArticles.find(article => article.id === id)
  }

  /**
   * 根据ID获取文章（异步版本，加载markdown内容）
   */
  static async getArticleById(id: string): Promise<Article | undefined> {
    const allArticles = this.getAllArticles()
    const article = allArticles.find(article => article.id === id)

    if (article && article.markdownFile) {
      try {
        article.content = await loadMarkdownContent(article.markdownFile)
      } catch (error) {
        console.error('Failed to load markdown content:', error)
        article.content = '# 内容加载失败\n\n抱歉，文章内容暂时无法加载。'
      }
    }

    return article
  }

  /**
   * 根据分类获取文章
   */
  static getArticlesByCategory(category: string): Article[] {
    const allArticles = this.getAllArticles()
    return allArticles.filter(article => article.category === category)
  }

  /**
   * 根据标签获取文章
   */
  static getArticlesByTag(tag: string): Article[] {
    const allArticles = this.getAllArticles()
    return allArticles.filter(article => article.tags.includes(tag))
  }

  /**
   * 搜索文章
   */
  static searchArticles(query: string): SearchResult[] {
    const allArticles = this.getAllArticles()
    const searchTerm = query.toLowerCase().trim()

    if (!searchTerm) {
      return []
    }

    return allArticles
      .map(article => {
        const titleScore = article.title.toLowerCase().includes(searchTerm) ? 3 : 0
        const excerptScore = article.excerpt.toLowerCase().includes(searchTerm) ? 2 : 0
        const contentScore = article.content.toLowerCase().includes(searchTerm) ? 1 : 0
        const tagScore = article.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ? 2 : 0
        const categoryScore = article.category.toLowerCase().includes(searchTerm) ? 2 : 0

        const relevance = titleScore + excerptScore + contentScore + tagScore + categoryScore

        return {
          article,
          relevance
        }
      })
      .filter(result => result.relevance > 0)
      .sort((a, b) => b.relevance - a.relevance)
  }

  /**
   * 获取最新文章
   */
  static getLatestArticles(limit: number = 5): Article[] {
    return this.getAllArticles().slice(0, limit)
  }

  /**
   * 获取相关文章（简化版本）
   */
  static getRelatedArticles(currentArticle: Article, limit: number = 3): Article[] {
    const allArticles = this.getAllArticles()
    return allArticles
      .filter(article =>
        article.id !== currentArticle.id &&
        (article.category === currentArticle.category ||
         article.tags.some(tag => currentArticle.tags.includes(tag)))
      )
      .slice(0, limit)
  }

  /**
   * 获取相邻文章（上一篇和下一篇）
   */
  static getAdjacentArticles(currentArticleId: string): { prev: Article | null, next: Article | null } {
    const sortedArticles = this.getAllArticles()
    const currentIndex = sortedArticles.findIndex(article => article.id === currentArticleId)

    if (currentIndex === -1) {
      return { prev: null, next: null }
    }

    const prev = currentIndex > 0 ? (sortedArticles[currentIndex - 1] ?? null) : null
    const next = currentIndex < sortedArticles.length - 1 ? (sortedArticles[currentIndex + 1] ?? null) : null

    return { prev, next }
  }

  /**
   * 获取文章数量统计
   */
  static getArticleStats() {
    const allArticles = this.getAllArticles()
    const totalArticles = allArticles.length
    const categories = new Set(allArticles.map(article => article.category))
    const tags = new Set(allArticles.flatMap(article => article.tags))

    return {
      totalArticles,
      totalCategories: categories.size,
      totalTags: tags.size,
      featuredArticles: allArticles.filter(article => article.featured).length
    }
  }
}
