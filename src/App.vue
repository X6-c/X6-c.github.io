<template>
  <div id="app">
    <DynamicBackground />
    <Navbar />
    <main class="main-content">
      <RouterView />
    </main>
    <Footer />
    <GlobalMusicPlayer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import GlobalMusicPlayer from './components/GlobalMusicPlayer.vue'
import DynamicBackground from './components/DynamicBackground.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-content {
  flex: 1;
  padding-top: 80px;
  position: relative;
  z-index: 1;
}
</style>