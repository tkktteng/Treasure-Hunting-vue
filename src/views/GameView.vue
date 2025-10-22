<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-adventure text-treasure-gold">寻宝冒险</h2>
      <GameButton
        @click="goToHome"
        :secondary="true"
      >
        <i class="fa fa-home mr-2"></i>返回首页
      </GameButton>
    </div>

    <GameContainer />
  </div>
</template>

<script setup>
import GameContainer from '../components/game/GameContainer.vue'
import GameButton from '../components/ui/GameButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push('/')
}
</script>