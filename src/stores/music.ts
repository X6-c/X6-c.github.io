import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMusicStore = defineStore('music', () => {
  // 播放状态
  const isPlaying = ref(false)
  const currentSongIndex = ref(0)
  const audioPlayer = ref<HTMLAudioElement | null>(null)

  // 歌曲列表
  const songs = [
    {
      title: "或许从未拥有过",
      artist: "也许吧",
      url: "/src/assets/music/或许从未拥有过.mp3",
    },
    {
      title: "干脆点",
      artist: "网络歌手",
      url: "/src/assets/music/干脆点.mp3",
    },
    {
      title: "天亮以后说再见",
      artist: "网络歌手",
      url: "/src/assets/music/天亮以后说再见.mp3",
    },

    {
      title: "You are beautifu",
      artist: "网络歌手",
      url: "/src/assets/music/You are beautiful.mp3",
    }
  ]

  // 当前歌曲
  const currentSong = computed(() => songs[currentSongIndex.value])

  // 切换播放/暂停
  const togglePlay = () => {
    if (!audioPlayer.value || !currentSong.value) return

    if (isPlaying.value) {
      audioPlayer.value.pause()
    } else {
      audioPlayer.value.play().catch(err => {
        console.error('播放失败:', err)
        isPlaying.value = false
      })
    }
    isPlaying.value = !isPlaying.value
  }

  // 下一首
  const nextSong = () => {
    if (!audioPlayer.value) return

    currentSongIndex.value = (currentSongIndex.value + 1) % songs.length
    loadAndPlay()
  }

  // 加载并播放
  const loadAndPlay = () => {
    if (!audioPlayer.value || !currentSong.value) return

    audioPlayer.value.src = currentSong.value.url
    audioPlayer.value.load()

    if (isPlaying.value) {
      audioPlayer.value.play().catch(err => {
        console.error('自动播放下一首失败:', err)
        isPlaying.value = false
      })
    }
  }

  // 设置音频播放器实例
  const setAudioPlayer = (player: HTMLAudioElement) => {
    audioPlayer.value = player
    if (currentSong.value) {
      audioPlayer.value.src = currentSong.value.url
      audioPlayer.value.load()
    }
  }

  return {
    isPlaying,
    currentSongIndex,
    currentSong,
    songs,
    togglePlay,
    nextSong,
    loadAndPlay,
    setAudioPlayer,
    audioPlayer
  }
})
