import { marked } from 'marked'

// 配置marked选项
marked.setOptions({
  breaks: true,
  gfm: true,
})

// 预加载所有Markdown文件
const markdownModules = import.meta.glob('/src/data/articles/*.md', {
  query: '?raw',
  import: 'default'
})

/**
 * 从路径中提取文件名
 */
function getFilename(filePath: string): string {
  const parts = filePath.split('/')
  return parts[parts.length - 1] || ''
}

/**
 * 加载markdown文件内容
 * 使用Vite的动态导入功能，适用于开发和生产环境
 */
export async function loadMarkdownContent(filePath: string): Promise<string> {
  try {
    console.log('Loading markdown file from:', filePath)
    
    // 标准化路径格式
    let normalizedPath = filePath
      .replace(/^\.?\/*src\//, '')  // 移除 ./src/ 或 /src/
      .replace(/^\.\//, '')  // 移除开头的 ./
    
    // 确保路径以 .md 结尾
    if (!normalizedPath.endsWith('.md')) {
      normalizedPath += '.md'
    }
    
    // 提取文件名
    const filename = getFilename(normalizedPath)
    
    // 构建Vite glob导入的key路径
    const importPath = `/src/data/articles/${filename}`
    console.log('Import path:', importPath)
    
    // 查找对应的模块加载器
    const moduleLoader = markdownModules[importPath]
    
    if (!moduleLoader) {
      throw new Error(`Markdown file not found in preloaded modules: ${importPath}`)
    }
    
    // 动态加载Markdown内容
    const content = (await moduleLoader()) as string
    console.log('Successfully loaded markdown content, length:', content?.length)
    
    return content || ''
  } catch (error) {
    console.error('Error loading markdown file:', error)
    console.error('Error details:', {
      filePath,
      errorMessage: error instanceof Error ? error.message : String(error)
    })
    
    return `# Error\n\nFailed to load markdown content from: ${filePath}\n\n请确保文件存在于 src/data/articles/ 目录下。\n\n错误详情: ${error instanceof Error ? error.message : String(error)}`
  }
}



/**
 * 解析markdown内容，提取元数据
 */
export function parseMarkdownWithMetadata(content: string): { metadata: any, content: string } {
  // 简单的front matter解析
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontMatterRegex)
  
  if (match) {
    const frontMatter = match[1]
    const markdownContent = match[2]
    
    // 简单的YAML解析
    const metadata: any = {}
    if (frontMatter) {
      frontMatter.split('\n').forEach(line => {
        const parts = line.split(':')
        if (parts.length >= 2) {
          const key = parts[0]?.trim()
          const valueParts = parts.slice(1)
          const value = valueParts.join(':').trim()
          if (key) {
            metadata[key] = value.replace(/^["']|["']$/g, '') // 移除引号
          }
        }
      })
    }
    
    return { metadata, content: markdownContent || '' }
  }
  
  return { metadata: {}, content: content || '' }
}

/**
 * 将markdown转换为HTML
 */
export function markdownToHtml(content: string): string {
  return marked.parse(content) as string
}