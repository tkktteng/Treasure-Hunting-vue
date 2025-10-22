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
        <i class="fa fa-map-marker mr-2"></i>困境
      </div>
    </div>

    <div class="img-container">
      <img src="https://ts1.tc.mm.bing.net/th/id/OIP-C.XVc37bPM-piL3Xp58cldOQHaE7?rs=1&pid=ImgDetMain&o=7&rm=3" alt="冒险失败" class="scene-img">
    </div>

    <div class="content-container">
      <p class="text-xl mb-6 text-red-400">冒险遇到了挫折！</p>
      <p class="text-lg mb-8">不要灰心，勇敢的探险家！你可以重新尝试...</p>
      <div class="flex flex-col sm:flex-row gap-4">
        <GameButton
          @click="tryAgain"
          :primary="true"
        >
          <i class="fa fa-refresh mr-2"></i>重新尝试
        </GameButton>
        <GameButton
          @click="returnToMap"
        >
          <i class="fa fa-map mr-2"></i>返回地图
        </GameButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGameStore } from '../../../stores/useGameStore'
import GameButton from '../../ui/GameButton.vue'

const gameStore = useGameStore()

onMounted(() => {
  gameStore.completeGame(false)
})

const goBack = () => {
  gameStore.navigateToScene('panorama')
}

const tryAgain = () => {
  // 返回上一个场景
  if (gameStore.completedLocations.includes('cave')) {
    gameStore.navigateToScene('treasure')
  } else if (gameStore.completedLocations.includes('temple')) {
    gameStore.navigateToScene('cave')
  } else if (gameStore.completedLocations.includes('decode')) {
    gameStore.navigateToScene('temple')
  } else if (gameStore.completedLocations.includes('library')) {
    gameStore.navigateToScene('decode')
  } else {
    gameStore.navigateToScene('library')
  }
}

const returnToMap = () => {
  gameStore.navigateToScene('panorama')
}
</script>