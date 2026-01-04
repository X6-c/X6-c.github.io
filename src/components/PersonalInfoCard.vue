<template>
  <div class="personal-info-card glass-fade-in">
    <!-- 头像部分 - 点击播放音乐后旋转 -->
    <div class="avatar-section">
      <div class="avatar-container" @click="toggleMusic">
        <!-- 图片头像 -->
        <img
          src="/avatar/profile.jpg"
          alt="头像"
          class="avatar"
          :class="{ 'rotating-glow': isPlaying }"
        />
        <div class="avatar-glow" :class="{ 'glow-active': isPlaying }"></div>
      </div>
    </div>

    <!-- 姓名部分 -->
    <div class="name-section">
      <h1 class="gradient-name">{{ personalInfo.name }}</h1>
      <div class="typing-text">
        <span class="typed-text" v-if="showTyping">{{ currentTypingText }}</span>
        <span class="cursor" :class="{ 'blink': showCursor && showTyping }" v-if="showTyping">|</span>
      </div>
    </div>

    <!-- 个人简介 -->
    <div class="bio-section">
      <p class="bio-text">{{ personalInfo.bio }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted } from 'vue'
import { useMusicStore } from '@/stores/music'

interface PersonalInfo {
  name: string
  bio: string
}

const personalInfo: PersonalInfo = {
  name: '那一拽风情',
  bio: '便纵有千种风情，更与何人说！'
}

// 音乐播放状态
const musicStore = useMusicStore()
const isPlaying = computed(() => musicStore.isPlaying)

// 点击头像切换音乐播放
const toggleMusic = () => {
  musicStore.togglePlay()
}

// 打字机效果 - 逐段显示消失的循环播放
const currentTypingText = ref('')
const showCursor = ref(true)
const showTyping = ref(true)

// 打印的诗句
const poetryLines = [
"点击头像播放音乐 ","那年",
"情不知所起，却如潮水漫过堤岸","一往情深，在心底筑起孤岛",
"月光洒在窗台，映出疲惫的影子","心中的苦，像落叶堆积成秋","无人能知，无人能懂",
"这无处安放的温柔，在夜色中飘零","我试图抓住风的衣角，却只触到冰冷的空气","温柔如沙，从指缝间悄然滑落，留下满地的寂寞与叹息",
"在钢筋森林的缝隙里，情感悄然萌芽","却无处生根，一往情深","化作街灯下的徘徊，心中的累，像尘埃般累积","无人能知，无人能懂",
"这无处安放的温柔，在喧嚣中沉寂","我望向人群，寻找一丝共鸣","却只看到匆忙的背影，温柔如雾在晨光中消散","留下空荡的街道和无尽的孤独",
"岁月如歌，却唱不尽心中的惆怅","情不知所起，却如烙印刻在灵魂","一往情深，在时光里沉淀成河","心中的苦像潮汐般往复","无人能知，无人能懂",
"这无处安放的温柔，在回忆中漂泊","我翻开旧日的情书，字迹已模糊情意却清晰","温柔如花在风中凋零","留下泛黄的纸页和未说的再见",
]

let currentLineIndex = 0
let currentCharIndex = 0
let typingInterval: number | null = null
let timeouts: number[] = []

const clearAllTimeouts = () => {
  timeouts.forEach(timeout => clearTimeout(timeout))
  timeouts = []
  if (typingInterval !== null) {
    clearInterval(typingInterval)
    typingInterval = null
  }
}

const typeText = () => {
  // 清除所有定时器
  clearAllTimeouts()

  // 重置状态
  currentLineIndex = 0
  currentCharIndex = 0
  currentTypingText.value = ''
  showTyping.value = true

  const typeNext = () => {
    if (currentLineIndex < poetryLines.length) {
      const currentLine = poetryLines[currentLineIndex] ?? ''

      if (currentLine && currentCharIndex < currentLine.length) {
        // 逐字打印
        currentTypingText.value += currentLine[currentCharIndex]
        currentCharIndex++
        typingInterval = setTimeout(() => typeNext(), 150) as unknown as number
      } else {
        // 当前行打印完成
        if (typingInterval !== null) {
          clearInterval(typingInterval)
          typingInterval = null
        }

        // 打印完成后消失
        const disappearTimeout = setTimeout(() => {
          showTyping.value = false
          currentTypingText.value = ''

          // 消失后稍作停顿，开始下一段
          const nextLineTimeout = setTimeout(() => {
            currentLineIndex++
            currentCharIndex = 0
            showTyping.value = true
            typeNext()
          }, 500)
          timeouts.push(nextLineTimeout as unknown as number)
        }, 2000) as unknown as number
        timeouts.push(disappearTimeout)
      }
    } else {
      // 所有诗句打印完成，重新开始
      const restartTimeout = setTimeout(() => {
        currentLineIndex = 0
        currentCharIndex = 0
        currentTypingText.value = ''
        showTyping.value = true
        typeNext()
      }, 500) as unknown as number
      timeouts.push(restartTimeout)
    }
  }

  typeNext()
}

onMounted(() => {
  typeText()
})

onUnmounted(() => {
  clearAllTimeouts()
})
</script>

<style scoped>
.personal-info-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 60px 40px;
  text-align: center;
  position: relative;
}

/* 头像部分 */
.avatar-section {
  margin-bottom: 40px;
  cursor: pointer;
  position: relative;
}

.avatar-container {
  position: relative;
  display: inline-block;
  width: 160px;
  height: 160px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

/* 播放音乐后旋转和发光 */
.avatar.rotating-glow {
  animation: rotateWithGlow 8s linear infinite;
  border-color: rgba(102, 126, 234, 0.8);
}

@keyframes rotateWithGlow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.avatar:hover {
  transform: scale(1.05);
}

/* 渐变色发光效果 */
.avatar-glow {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 1;
}

/* 激活时的发光效果 */
.avatar-glow.glow-active {
  opacity: 1;
  /* 渐变色发光 */
  background: radial-gradient(
    circle at center,
    rgba(102, 126, 234, 0.6) 0%,
    rgba(118, 75, 162, 0.4) 30%,
    rgba(67, 193, 196, 0.3) 50%,
    rgba(168, 85, 247, 0.2) 70%,
    transparent 100%
  );
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.15);
    opacity: 1;
  }
}

/* 姓名部分 */
.name-section {
  margin-bottom: 32px;
}

.gradient-name {
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 20px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 打字机文本 */
.typing-text {
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 16px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}

.typed-text {
  color: var(--glass-text-primary);
  font-size: 16px;
  line-height: 1.8;
  text-align: center;
  white-space: pre-wrap;
  font-style: italic;
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 20px;
  background: #2d2d2d;
  margin-left: 4px;
  vertical-align: middle;
}

.cursor.blink {
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* 个人简介 */
.bio-section {
  margin-bottom: 40px;
}

.bio-text {
  font-size: 16px;
  line-height: 1.8;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 动画效果 */
.glass-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
