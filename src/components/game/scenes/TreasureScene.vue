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
        <i class="fa fa-map-marker mr-2"></i>宝藏所在地
      </div>
    </div>

    <div class="img-container">
      <img src="https://img95.699pic.com/photo/60025/5448.jpg_wh860.jpg" alt="闪闪发光的宝箱" class="scene-img animate-float">
    </div>

    <div class="content-container">
      <p id="treasure-text" class="text-xl mb-6">{{ sceneText }}</p>
      <GameButton
        @click="attemptOpenTreasure"
        :primary="true"
        :disabled="!canProceed"
      >
        <i class="fa fa-unlock mr-2"></i>尝试打开宝箱
      </GameButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from '../../../stores/useGameStore'
import GameButton from '../../ui/GameButton.vue'

const gameStore = useGameStore()
const sceneText = ref('正在观察神秘宝箱...')
const canProceed = ref(false)

onMounted(() => {
  gameStore.addLogEntry('准备打开神秘宝箱')

  // 显示宝箱信息
  setTimeout(() => {
    const message = "这是一个古老的宝箱，上面刻满了神秘的符文，似乎需要特殊的方法才能打开..."
    sceneText.value = message
    gameStore.addLogEntry(message)
    canProceed.value = true
  }, 1000);
})

const goBack = () => {
  gameStore.navigateToScene('panorama')
}

const attemptOpenTreasure = () => {
  gameStore.addLogEntry('尝试破解宝箱封印...')

  // 模拟打开宝箱
  setTimeout(() => {
    const random = Math.random();

    if (random < 0.2) {
      // 失败情况
      const result = "宝箱被诅咒了!一股神秘力量将你击退，宝箱消失了..."
      gameStore.addLogEntry(result, true);
      gameStore.navigateToScene('fail');
    } else {
      // 成功情况
      gameStore.completeLocation('treasure');
      gameStore.navigateToScene('success');
    }
  }, 2000);
}
</script>