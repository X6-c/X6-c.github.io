<template>
  <div class="about-page">
    <div class="container">
      <div class="about-content">
        <!-- 个人信息卡片 - 使用PersonalInfoCard组件实现头像同步 -->
        <section class="intro-section">
          <PersonalInfoCard />
        </section>



        <!-- 留言板 -->
        <section class="guestbook-section">
          <GlassCard>
            <h2 class="guestbook-title">留言板（开发中）</h2>
            <div class="guestbook-form">
              <div class="form-group">
                <input
                  v-model="guestbookForm.name"
                  type="text"
                  placeholder="你的昵称"
                  class="form-input"
                  maxlength="20"
                />
              </div>
              <div class="form-group">
                <textarea
                  v-model="guestbookForm.message"
                  placeholder="留下你的想法..."
                  class="form-textarea"
                  maxlength="200"
                  rows="4"
                ></textarea>
                <div class="char-count">{{ guestbookForm.message.length }}/200</div>
              </div>
              <button
                @click="submitGuestbook"
                class="submit-btn"
                :disabled="!canSubmit()"
              >
                发送留言
              </button>
            </div>

            <div class="guestbook-list" v-if="guestbooks.length > 0">
              <h3>最近留言</h3>
              <div class="message-list">
                <div
                  v-for="(message, index) in guestbooks"
                  :key="index"
                  class="message-item"
                >
                  <div class="message-header">
                    <span class="message-author">{{ message.name }}</span>
                    <span class="message-time">{{ formatTime(message.timestamp) }}</span>
                  </div>
                  <div class="message-content">{{ message.message }}</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        <!-- 联系方式 -->
        <section class="contact-section">
          <GlassCard>
            <h2 class="contact-title">联系我</h2>
            <p class="contact-description">
              如果你对博客内容有任何建议或想要交流技术问题，欢迎通过以下方式联系我：
            </p>
            <div class="contact-methods">
              <div class="contact-item">
                <span class="contact-icon">📧</span>
                <span class="contact-text">hello@glaskblog.com</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">🐱</span>
                <span class="contact-text">GitHub: @glassblog</span>
              </div>
              <div class="contact-item">
                <span class="contact-icon">🐦</span>
                <span class="contact-text">Twitter: @glassblog</span>
              </div>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import PersonalInfoCard from '@/components/PersonalInfoCard.vue'
import GlassCard from '@/components/GlassCard.vue'

interface GuestbookMessage {
  name: string
  message: string
  timestamp: Date
}

// 留言板相关
const guestbooks = ref<GuestbookMessage[]>([])
const guestbookForm = ref({
  name: '',
  message: ''
})

const canSubmit = () => {
  return guestbookForm.value.name.trim() &&
         guestbookForm.value.message.trim() &&
         guestbookForm.value.message.length >= 5
}

// 留言板功能
const submitGuestbook = () => {
  if (!canSubmit()) return

  const newMessage: GuestbookMessage = {
    name: guestbookForm.value.name.trim(),
    message: guestbookForm.value.message.trim(),
    timestamp: new Date()
  }

  // 添加到留言列表
  guestbooks.value.unshift(newMessage)

  // 限制留言数量
  if (guestbooks.value.length > 10) {
    guestbooks.value = guestbooks.value.slice(0, 10)
  }

  // 清空表单
  guestbookForm.value = {
    name: '',
    message: ''
  }

  // 显示成功提示
  console.log('留言发送成功！')
}

const formatTime = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`

  return timestamp.toLocaleDateString('zh-CN')
}

onMounted(() => {
  // 模拟一些初始留言
  guestbooks.value = [
    {
      name: '访客小王',
      message: '博客设计得很漂亮，玻璃拟态效果很棒！',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      name: '前端爱好者',
      message: '学到了很多，感谢分享！',
      timestamp: new Date(Date.now() - 7200000)
    }
  ]
})
</script>

<style scoped>
.about-page {
  padding: 40px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* 留言板样式 */
.guestbook-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 32px 0;
  text-align: center;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.guestbook-form {
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-input, .form-textarea {
  width: 100%;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 16px;
  color: var(--glass-text-primary);
  font-size: 16px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input::placeholder, .form-textarea::placeholder {
  color: var(--glass-text);
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  background: var(--card-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.char-count {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  pointer-events: none;
}

.submit-btn {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px 32px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9), rgba(118, 75, 162, 0.9));
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.guestbook-list h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 20px 0;
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(147, 197, 253, 0.9));
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: aboutGradientShift 3s ease infinite;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.message-item:hover {
  background: var(--card-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.message-author {
  color: var(--glass-text-primary);
  font-weight: 600;
  font-size: 16px;
}

.message-time {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}

.message-content {
  color: var(--glass-text);
  line-height: 1.6;
  font-size: 15px;
}

/* Intro Section */
.intro-section {
  display: flex;
  justify-content: center;
}

/* Features Section */
.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: var(--glass-text-primary);
  margin: 0 0 40px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.feature-card {
  text-align: center;
  padding: 32px 24px;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  color: var(--glass-text-primary);
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.feature-card p {
  color: var(--glass-text);
  font-size: 16px;
  line-height: 1.6;
  margin: 0;
}

/* Stats Section */
.stats-section .stats-title {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: var(--glass-text-primary);
  margin: 0 0 32px 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 32px;
  text-align: center;
}

.stat-number {
  font-size: 36px;
  font-weight: 800;
  color: var(--glass-text-primary);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.6));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  color: var(--glass-text);
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
}

/* Contact Section */
.contact-section {
  text-align: center;
}

.contact-title {
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 16px 0;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: aboutGradientShift 3s ease infinite;
}

.contact-description {
  color: var(--glass-text);
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 24px 0;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--glass-text);
  font-size: 16px;
}

.contact-icon {
  font-size: 20px;
}

.contact-text {
  font-weight: 500;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-page {
    padding: 20px 0;
  }

  .about-content {
    gap: 40px;
  }

  .intro-section .intro-content {
    padding: 24px;
  }

  .avatar-image {
    font-size: 64px;
  }

  .intro-title {
    font-size: 28px;
  }

  .intro-description {
    font-size: 16px;
  }

  .section-title {
    font-size: 24px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .feature-card {
    padding: 24px 20px;
  }

  .feature-icon {
    font-size: 40px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  .stat-number {
    font-size: 28px;
  }
}
</style>
