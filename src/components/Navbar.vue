<template>
  <nav class="glass-navbar">
    <div class="container">
      <div class="navbar-content">
        <div class="navbar-brand">
          <RouterLink to="/" class="brand-link">
            <h1 class="brand-title">那一拽风情</h1>
          </RouterLink>
        </div>
        
        <div class="navbar-menu" :class="{ 'navbar-menu-open': isMenuOpen }">
          <RouterLink 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="navbar-link"
            @click="closeMenu"
          >
            {{ item.name }}
          </RouterLink>
        </div>
        

        
        <button 
          class="navbar-toggle"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 控制移动端菜单开关状态
const isMenuOpen = ref(false)

// 导航菜单项配置
interface MenuItem {
  name: string
  path: string
}

const menuItems: MenuItem[] = [
  { name: '首页', path: '/' },
  { name: '文章', path: '/articles' },
  { name: '分类', path: '/categories' },
  { name: '关于', path: '/about' }
]

/**
 * 切换移动端菜单显示状态
 * 在手机端控制导航菜单的展开和收起
 */
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value
}

/**
 * 关闭移动端菜单
 * 点击菜单项后自动收起菜单
 */
const closeMenu = (): void => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.glass-navbar {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand-link {
  text-decoration: none;
}

.brand-title {
  color: #2d2d2d;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.navbar-menu {
  display: flex;
  gap: 32px;
  align-items: center;
}

.navbar-link {
  color: #4a4a4a;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.2s ease, background 0.2s ease;
  padding: 8px 16px;
  border-radius: 8px;
  position: relative;
  will-change: color, background;
}

.navbar-link:hover,
.navbar-link.router-link-active {
  color: #2d2d2d;
  background: rgba(255, 255, 255, 0.6);
}

.navbar-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.8), rgba(240, 147, 251, 0.8));
  border-radius: 2px;
}

.navbar-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.2s ease;
  will-change: background;
}

.navbar-toggle:hover {
  background: rgba(0, 0, 0, 0.05);
}

.hamburger-line {
  width: 24px;
  height: 2px;
  background: #2d2d2d;
  transition: transform 0.2s ease, opacity 0.2s ease;
  will-change: transform, opacity;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-menu {
    position: fixed;
    top: 70px;
    right: -100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 16px;
    padding: 20px;
    flex-direction: column;
    gap: 16px;
    transition: right 0.3s ease;
    box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  }
  
  .navbar-menu-open {
    right: 20px;
  }
  
  .navbar-toggle {
    display: flex;
  }
  
  .navbar-link {
    font-size: 18px;
    padding: 12px 20px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease infinite;
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
}
</style>