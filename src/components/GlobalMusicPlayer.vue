<template>
  <!-- 全局音乐播放器容器 -->
  <div class="global-music-player">
    <!-- 音乐控制面板 - 可展开/收起 -->
    <transition name="panel-slide">
      <div v-if="isPanelOpen" class="music-panel">
        <!-- 歌曲信息 -->
        <div class="song-info">
          <div class="song-title">{{ musicStore.currentSong?.title }}</div>
          <div class="song-artist">{{ musicStore.currentSong?.artist }}</div>
        </div>

        <!-- 进度条 -->
        <div class="progress-section">
          <div class="progress-bar" @click="seekProgress">
            <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
          </div>
          <div class="time-display">
            <span class="current-time">{{ formatTime(currentTime) }}</span>
            <span class="total-time">{{ formatTime(duration) }}</span>
          </div>
        </div>

        <!-- 控制按钮 -->
        <div class="controls-section">
          <button class="control-btn" @click="musicStore.nextSong" title="上一首">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
            </svg>
          </button>
          <button class="control-btn play-btn" @click="musicStore.togglePlay" :title="musicStore.isPlaying ? '暂停' : '播放'">
            <svg v-if="!musicStore.isPlaying" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          <button class="control-btn" @click="nextSong" title="下一首">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
            </svg>
          </button>
        </div>

        <!-- 音量控制 -->
        <div class="volume-section">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="volume-icon">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
          </svg>
          <input
            type="range"
            v-model="volume"
            min="0"
            max="1"
            step="0.01"
            class="volume-slider"
            @input="changeVolume"
          />
        </div>
      </div>
    </transition>

    <!-- 播放按钮 - 固定在右下角 -->
    <div
      class="play-button"
      :class="{ 'rotating': musicStore.isPlaying, 'active': isPanelOpen }"
      @click="togglePanel"
      @dblclick.stop="nextSong"
    >
      <!-- 图片头像 -->
      <img
        src="/avatar/profile.jpg"
        alt="头像"
        class="avatar-img"
      />
    </div>

    <!-- 隐藏的HTML5音频播放器 -->
    <audio
      ref="audioPlayer"
      @timeupdate="updateProgress"
      @loadedmetadata="updateDuration"
      @ended="musicStore.nextSong"
      @play="musicStore.isPlaying = true"
      @pause="musicStore.isPlaying = false"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useMusicStore } from '@/stores/music'

const musicStore = useMusicStore()
const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPanelOpen = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.7)

// 进度百分比
const progressPercentage = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

// 切换面板展开/收起
const togglePanel = () => {
  isPanelOpen.value = !isPanelOpen.value
}

// 下一首
const nextSong = () => {
  musicStore.nextSong()
}

// 更新进度
const updateProgress = () => {
  if (audioPlayer.value) {
    currentTime.value = audioPlayer.value.currentTime
  }
}

// 更新时长
const updateDuration = () => {
  if (audioPlayer.value) {
    duration.value = audioPlayer.value.duration
  }
}

// 跳转进度
const seekProgress = (event: MouseEvent) => {
  if (!audioPlayer.value) return

  const progressBar = event.currentTarget as HTMLElement
  const rect = progressBar.getBoundingClientRect()
  const clickX = event.clientX - rect.left
  const percentage = clickX / rect.width

  audioPlayer.value.currentTime = percentage * duration.value
}

// 修改音量
const changeVolume = () => {
  if (audioPlayer.value) {
    audioPlayer.value.volume = volume.value
  }
}

// 格式化时间
const formatTime = (seconds: number): string => {
  if (isNaN(seconds)) return '0:00'

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)

  return `${mins}:${secs.toString().padStart(2, '0')}`
}

onMounted(() => {
  if (audioPlayer.value) {
    musicStore.setAudioPlayer(audioPlayer.value)
    audioPlayer.value.volume = volume.value
  }
})
</script>

<style scoped>
.global-music-player {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

/* 音乐控制面板 */
.music-panel {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  padding: 20px;
  width: 280px;
  box-shadow: var(--glass-shadow);
  margin-bottom: 8px;
}

/* 面板展开动画 */
.panel-slide-enter-active,
.panel-slide-leave-active {
  transition: all 0.3s ease;
}

.panel-slide-enter-from,
.panel-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* 歌曲信息 */
.song-info {
  margin-bottom: 16px;
}

.song-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d2d2d;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song-artist {
  font-size: 14px;
  color: #4a4a4a;
}

/* 进度条 */
.progress-section {
  margin-bottom: 16px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  cursor: pointer;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.1s linear;
}

.time-display {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #4a4a4a;
}

/* 控制按钮 */
.controls-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.control-btn {
  background: var(--theme-button-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
  color: #2d2d2d;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: var(--theme-button-hover);
  transform: scale(1.1);
}

.play-btn {
  width: 48px;
  height: 48px;
}

/* 音量控制 */
.volume-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-icon {
  color: #4a4a4a;
}

.volume-slider {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  appearance: none;
  outline: none;
  cursor: pointer;
}

.volume-slider::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  background: var(--glass-text-primary);
  border-radius: 50%;
  cursor: pointer;
}

.volume-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  background: var(--glass-text-primary);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

/* 播放按钮 */
.play-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  -webkit-backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--glass-shadow);
  position: relative;
  overflow: hidden;
}

.play-button:hover {
  background: var(--theme-card-hover);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.15);
}

.play-button.active {
  border-color: rgba(102, 126, 234, 0.8);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
}

/* 头像图片样式 */
.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

/* 头像旋转动画 - 播放时持续旋转 */
.play-button.rotating .avatar-img {
  animation: rotate 8s linear infinite;
  border-color: rgba(102, 126, 234, 0.8);
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .global-music-player {
    bottom: 20px;
    right: 20px;
  }

  .play-button {
    width: 45px;
    height: 45px;
  }

  .avatar-img {
    width: 35px;
    height: 35px;
  }

  .music-panel {
    width: 240px;
    padding: 16px;
  }
}

/* 确保在所有主题下都有良好的可访问性 */
.play-button:focus,
.control-btn:focus {
  outline: 2px solid var(--glass-text-primary);
  outline-offset: 2px;
}
</style>
