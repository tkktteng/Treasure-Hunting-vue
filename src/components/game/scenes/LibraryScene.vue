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
        <i class="fa fa-map-marker mr-2"></i>古老的图书馆
      </div>
    </div>

    <div class="img-container">
      <img src="https://picsum.photos/id/24/600/300" alt="古老的图书馆" class="scene-img">
    </div>

    <div class="content-container">
      <p id="library-text" class="text-xl mb-6">{{ sceneText }}</p>
      <GameButton
        @click="goToDecode"
        :primary="true"
        :disabled="!canProceed"
      >
        <i class="fa fa-arrow-right mr-2"></i>解码线索
      </GameButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from '../../../stores/useGameStore'
import GameButton from '../../ui/GameButton.vue'

const gameStore = useGameStore()
const sceneText = ref('正在图书馆中探索...')
const canProceed = ref(false)

onMounted(() => {
  gameStore.addLogEntry('进入古老的图书馆寻找线索')

  // 模拟获取线索
  setTimeout(() => {
    const clue = "在古老的图书馆里找到了第一个线索，上面写着：'唯有理解星辰的人，才能找到神庙的入口'..."
    sceneText.value = clue
    gameStore.addLogEntry(clue)
    gameStore.updateProgress(20)
    gameStore.completeLocation('library')
    canProceed.value = true
  }, 1000);
})

const goBack = () => {
  gameStore.navigateToScene('panorama')
}

const goToDecode = () => {
  gameStore.navigateToScene('decode')
}
</script>