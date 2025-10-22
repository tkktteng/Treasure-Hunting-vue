<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <GameButton
        @click="goBack"
        :secondary="true"
      >
        <i class="fa fa-arrow-left mr-2"></i>返回地图
      </GameButton>
      <div class="text-treasure-sand font-bold">
        <i class="fa fa-map-marker mr-2"></i>宝藏密室
      </div>
    </div>

    <div class="img-container">
      <img src="https://pic.52112.com/2019/06/12/JPG-190612_204/xLAcPN1QJ0_small.jpg" alt="宝藏室" class="scene-img animate-glow">
    </div>

    <div class="content-container">
      <p class="text-2xl mb-6 text-treasure-gold text-shadow">恭喜！你找到了传说中的宝藏！</p>
      <p class="text-xl mb-8">无数的金银珠宝和古老的文物展现在你面前...</p>
      <div class="flex flex-col sm:flex-row gap-4">
        <GameButton
          @click="playAgain"
          :primary="true"
        >
          <i class="fa fa-refresh mr-2"></i>重新开始冒险
        </GameButton>
        <GameButton
          @click="viewRanking"
        >
          <i class="fa fa-trophy mr-2"></i>查看排行榜
        </GameButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameStore } from '../../../stores/useGameStore'
import { useRouter } from 'vue-router'
import GameButton from '../../ui/GameButton.vue'

const gameStore = useGameStore()
const router = useRouter()

onMounted(() => {
  gameStore.completeGame(true)
})

const goBack = () => {
  gameStore.navigateToScene('panorama')
}

const playAgain = () => {
  gameStore.startNewGame()
}

const viewRanking = () => {
  router.push('/ranking')
}
</script>