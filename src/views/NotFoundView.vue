<template>
  <div class="text-center py-12">
    <div class="w-32 h-32 bg-treasure-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
      <i class="fa fa-compass text-5xl text-treasure-gold animate-spin"></i>
    </div>
    <h2 class="text-3xl font-adventure text-treasure-gold mb-4">迷路了！</h2>
    <p class="text-xl mb-8">你所寻找的页面不存在或已被移动</p>
    <GameButton
      @click="goToHome"
      :primary="true"
    >
      <i class="fa fa-home mr-2"></i>返回首页
    </GameButton>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import GameButton from '../components/ui/GameButton.vue'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>