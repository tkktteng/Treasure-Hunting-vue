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
        <i class="fa fa-map-marker mr-2"></i>秘密洞穴
      </div>
    </div>

    <div class="img-container">
      <img src="https://img95.699pic.com/photo/60053/6175.jpg_wh860.jpg" alt="黑暗的洞穴" class="scene-img">
    </div>

    <div class="content-container">
      <p id="cave-text" class="text-xl mb-6">{{ sceneText }}</p>
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
const sceneText = ref('正在探索神秘洞穴...')
const canProceed = ref(false)
const buttonText = ref('开启宝箱')
const isFailure = ref(false)

onMounted(() => {
  gameStore.addLogEntry('进入秘密洞穴深处')

  // 模拟洞穴探索
  setTimeout(() => {
    const random = Math.random();
    let result;

    if (random < 0.25) {
      // 失败情况
      isFailure.value = true
      result = "洞穴突然开始坍塌!你侥幸逃脱，但失去了方向..."
      buttonText.value = "返回地图"
    } else {
      // 成功情况
      result = "在洞穴深处发现了一个被封印的宝箱，上面刻着古老的符文..."
      gameStore.updateProgress(80)
      gameStore.completeLocation('cave')
    }

    sceneText.value = result
    gameStore.addLogEntry(result, isFailure.value)
    canProceed.value = true
  }, 2500);
})

const goBack = () => {
  gameStore.navigateToScene('panorama')
}

const proceed = () => {
  if (isFailure.value) {
    gameStore.navigateToScene('fail')
  } else {
    gameStore.navigateToScene('treasure')
  }
}
</script>