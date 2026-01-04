<template>
  <footer class="glass-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">那一拽风情</h3>
          <p class="footer-description">
            我守着灯盏，望着满天星！
          </p>
          <p class="footer-description">
            一个人的孤独属于对世俗的格格不入！
          </p>
          <img src="/src/assets/images/d7.jpg" width="60%" height="50%">
        </div>

        <div class="footer-section">
          <h4 class="footer-subtitle">快速链接</h4>
          <div class="footer-links">
            <RouterLink to="/" class="footer-link">首页</RouterLink>
            <RouterLink to="/articles" class="footer-link">文章</RouterLink>
            <RouterLink to="/categories" class="footer-link">分类</RouterLink>
            <RouterLink to="/tags" class="footer-link">标签</RouterLink>
            <RouterLink to="/about" class="footer-link">关于</RouterLink>
          </div>
        </div>

        <div class="footer-section">
          <h4 class="footer-subtitle">社交媒体</h4>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="GitHub" title="GitHub">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter" title="Twitter">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="https://im.qq.com" class="social-link" aria-label="QQ" title="QQ">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.987 14.868c-4.402 0-8-1.656-8-3.7 0-2.043 3.598-3.7 8-3.7s8 1.657 8 3.7c0 2.044-3.598 3.7-8 3.7zm0-6.2c-3.645 0-6.6 1.122-6.6 2.5s2.955 2.5 6.6 2.5 6.6-1.122 6.6-2.5-2.955-2.5-6.6-2.5zM12.013 18.868c-2.1 0-4.094-.453-5.593-1.267l1.013-1.707c1.133.62 2.82 1.007 4.58 1.007 1.748 0 3.427-.387 4.553-1.007l1.02 1.713c-1.493.807-3.473 1.26-5.573 1.26zM19.99 10.5c0 3.314-2.462 5.5-6.5 5.5h-3c-4.038 0-6.5-2.186-6.5-5.5 0-2.248 1.247-4.14 3.16-5.014L7.5 4.5h9l-.148 1.014C18.747 6.36 19.99 8.252 19.99 10.5z"/>
              </svg>
            </a>
            <a href="https://www.youtube.com" class="social-link" aria-label="YouTube" title="YouTube">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://t.me" class="social-link" aria-label="Telegram" title="Telegram">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
              </svg>
            </a>
            <a href="https://www.bilibili.com" class="social-link" aria-label="哔哩哔哩" title="哔哩哔哩">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.7 7.7l-1.4-1.4-1.4 1.4-1.4-1.4L12.9 7.7l-1.4-1.4-1.4 1.4L8.7 6.3 7.3 7.7 5.9 6.3 4.5 7.7l-1.4-1.4-1.4 1.4c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0l1.4-1.4 1.4 1.4c.4.4 1 .4 1.4 0l1.4-1.4 1.4 1.4 1.4-1.4 1.4 1.4 1.4-1.4 1.4 1.4 1.4 1.4c.4.4 1 .4 1.4 0l1.4-1.4c.4-.4.4-1 0-1.4l-1.4-1.4zM19.5 13h-15c-.8 0-1.5.7-1.5 1.5v5c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5v-5c0-.8-.7-1.5-1.5-1.5zM7 18H5v-2h2v2zm4 0H9v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
              </svg>
            </a>
            <a href="https://weixin.qq.com" class="social-link" aria-label="微信" title="微信">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.32.32 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.268.268 0 0 0 .14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.03-.407-.032zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.969-.982z"/>
              </svg>
            </a>
            <a href="https://www.douyin.com" class="social-link" aria-label="抖音" title="抖音">
              <svg class="social-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} 那一拽风情. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
/* 页脚样式 - 支持主题切换 */
.glass-footer {
  /* 使用主题变量，自动适配亮色/暗色主题 */
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border-top: 1px solid var(--glass-border);
  margin-top: 80px;
  padding: 60px 0 20px;
  transition: all 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-title {
  color: #2d2d2d;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.footer-subtitle {
  color: #2d2d2d;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  transition: color 0.3s ease;
}

.footer-description {
  color: #4a4a4a;
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
  transition: color 0.3s ease;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: #4a4a4a;
  text-decoration: none;
  font-size: 16px;
  transition: all 0.3s ease;
  padding: 4px 0;
}

.footer-link:hover {
  color: #2d2d2d;
  transform: translateX(4px);
}

.social-links {
  display: flex;
  gap: 16px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: var(--theme-button-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  color: #2d2d2d;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: var(--theme-button-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(31, 38, 135, 0.3);
}

.social-icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.footer-bottom {
  border-top: 1px solid var(--glass-border);
  padding-top: 20px;
  text-align: center;
  transition: border-color 0.3s ease;
}

.copyright {
  color: #4a4a4a;
  font-size: 14px;
  margin: 0;
  transition: color 0.3s ease;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .glass-footer {
    padding: 40px 0 20px;
    margin-top: 60px;
  }

  .footer-description {
    font-size: 14px;
  }

  .footer-link {
    font-size: 14px;
  }
}
</style>
