export interface Article {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  coverImage?: string
  featured?: boolean
  markdownFile?: string
}

export interface Category {
  name: string
  description: string
  count: number
  color: string
}

export interface Tag {
  name: string
  count: number
  color: string
}

export interface SearchResult {
  article: Article
  relevance: number
}