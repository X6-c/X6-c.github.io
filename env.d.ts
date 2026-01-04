/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string
  // 添加其他环境变量类型
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 声明 .md 文件的 raw 导入
declare module '*.md?raw' {
  const content: string
  export default content
}

// 声明 .md 文件
declare module '*.md' {
  const content: string
  export default content
}
