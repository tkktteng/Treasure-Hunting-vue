<template>
  <div class="min-h-screen bg-treasure-dark text-white bg-map-pattern font-sans">
    <HeaderComponent />
    <main class="container mx-auto px-4 py-8 max-w-5xl">
      <RouterView />
    </main>
    <FooterComponent />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import HeaderComponent from './components/layout/HeaderComponent.vue'
import FooterComponent from './components/layout/FooterComponent.vue'
import { useUserStore } from './stores/useUserStore'
import { useGameStore } from './stores/useGameStore'

onMounted(() => {
  const userStore = useUserStore()
  userStore.initUsers()

  const gameStore = useGameStore()
  gameStore.initAudio()
})
</script>