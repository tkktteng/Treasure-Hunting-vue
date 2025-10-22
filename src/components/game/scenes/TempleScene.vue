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
        <i class="fa fa-map-marker mr-2"></i>古老的神庙
      </div>
    </div>

    <div class="img-container">
      <img src="https://www.wankucg.com/wp-content/uploads/2023/02/1676717044-e7f47edc07c2f45.jpg" alt="古老的神庙" class="scene-img">
    </div>

    <div class="content-container">
      <p id="temple-text" class="text-xl mb-6">{{ sceneText }}</p>
      <GameButton
        @click="proceed"
        :primary="true"
        :disabled="!canProceed"
      >
        <i class="fa fa-arrow-right mr-2"></i>{{ buttonText }}
      </GameButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from '../../../stores/useGameStore'
import GameButton from '../../ui/GameButton.vue'

const gameStore = useGameStore()
const sceneText = ref('正在探索古老神庙...')
const canProceed = ref(false)
const buttonText = ref('探索洞穴')
const isFailure = ref(false)

onMounted(() => {
  gameStore.addLogEntry('到达古老的神庙，开始探索')

  // 模拟神庙探索
  setTimeout(() => {
    const random = Math.random();
    let result;

    if (random < 0.3) {
      // 失败情况
      isFailure.value = true
      result = "糟糕!遇到了神庙守卫!他们发现了你的踪迹，你被迫逃离..."
      buttonText.value = "返回地图"
    } else {
      // 成功情况
      result = "成功进入神庙，在主殿的壁画上发现了指向秘密洞穴的标记..."
      gameStore.updateProgress(60)
      gameStore.completeLocation('temple')
    }

    sceneText.value = result
    gameStore.addLogEntry(result, isFailure.value)
    canProceed.value = true
  }, 2000);
})

const goBack = () => {
  gameStore.navigateToScene('panorama')
}

const proceed = () => {
  if (isFailure.value) {
    gameStore.navigateToScene('fail')
  } else {
    gameStore.navigateToScene('cave')
  }
}
</script>