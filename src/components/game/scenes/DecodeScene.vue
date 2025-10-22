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
        <i class="fa fa-map-marker mr-2"></i>研究室
      </div>
    </div>

    <div class="img-container">
      <img src="https://ts4.tc.mm.bing.net/th/id/OIP-C.PCWFKR3JVPAW-xUGLVp8wAHaLG?rs=1&pid=ImgDetMain&o=7&rm=3" alt="古老的手稿" class="scene-img">
    </div>

    <div class="content-container">
      <p id="decode-text" class="text-xl mb-4">{{ sceneText }}</p>
      <div class="w-full bg-gray-700 rounded-full h-2.5 mb-6">
        <div
          id="decode-progress"
          class="bg-treasure-gold h-2.5 rounded-full transition-all duration-3000 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
      <GameButton
        @click="goToTemple"
        :primary="true"
        :disabled="!canProceed"
      >
        <i class="fa fa-arrow-right mr-2"></i>前往神庙
      </GameButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from '../../../stores/useGameStore'
import GameButton from '../../ui/GameButton.vue'

const gameStore = useGameStore()
const sceneText = ref('正在解码古老文字...')
const progress = ref(0)
const canProceed = ref(false)

onMounted(() => {
  gameStore.addLogEntry('开始解码古老文字')

  // 模拟解码过程
  const interval = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      clearInterval(interval)
      // 解码完成后显示结果
      const result = "解码成功!根据星图指示，宝藏在'遗忘之谷'的古老神庙中，需要月光钥匙才能进入..."
      sceneText.value = result
      gameStore.addLogEntry(result)
      gameStore.updateProgress(40)
      gameStore.completeLocation('decode')
      canProceed.value = true
    }
  }, 300)
})

const goBack = () => {
  gameStore.navigateToScene('panorama')
}

const goToTemple = () => {
  gameStore.navigateToScene('temple')
}
</script>