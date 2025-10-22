<template>
  <div class="audio-control group relative">
    <!-- 主体控制区 -->
    <div class="flex items-center space-x-2 bg-gray-800/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-gray-700/70 transition-all duration-300 hover:bg-gray-800 hover:shadow-treasure-gold/20">
      <!-- 音量图标按钮 -->
      <button
        @click="toggleMute"
        class="p-2 rounded-full transition-all duration-300 hover:bg-gray-700/50 focus:outline-none relative overflow-hidden group/btn"
        aria-label="切换静音"
      >
        <!-- 点击波纹效果 -->
        <span class="absolute inset-0 bg-treasure-gold/20 rounded-full scale-0 group-hover/btn:scale-100 transition-transform duration-500 origin-center"></span>

        <!-- 音量图标（带状态过渡） -->
        <i class="fas text-lg relative z-10 transition-all duration-300"
          :class="[
            isMuted ? 'fa-volume-off text-gray-400' :
            volumePercent < 30 ? 'fa-volume-down text-treasure-sand' :
            'fa-volume-up text-treasure-gold'
          ]"
          :style="{ transform: isMuted ? 'rotate(15deg) scale(0.9)' : 'rotate(0) scale(1)' }"
        ></i>
      </button>

      <!-- 音量条容器（hover时展开） -->
      <div class="relative w-0 group-hover:w-28 h-2 transition-all duration-300 overflow-hidden">
        <!-- 音量轨道 -->
        <div class="absolute inset-0 rounded-full bg-gray-700/80 overflow-hidden">
          <div
            class="absolute left-0 top-0 h-full bg-gradient-to-r from-treasure-gold to-treasure-sand rounded-full transition-all duration-200 ease-out"
            :style="{ width: volumePercent + '%' }"
          ></div>
        </div>

        <!-- 交互滑块（扩大点击区域） -->
        <input
          type="range"
          min="0"
          max="100"
          :value="volumePercent"
          @input="handleVolumeChange"
          @mousedown="isDragging = true"
          @mouseup="isDragging = false"
          @mouseleave="isDragging = false"
          class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          :disabled="!gameStore.currentAudio"
          aria-label="调节音量"
        >

        <!-- 自定义滑块按钮（带悬浮动效） -->
        <div
          class="absolute top-1/2 left-[var(--volume-position)] w-4 h-4 rounded-full bg-treasure-gold shadow-md border-2 border-gray-800 transition-all duration-200 z-20"
          :style="{
            '--volume-position': volumePercent + '%',
            transform: `translate(-50%, -50%) ${isDragging || (volumePercent < 5 ? 'scale(1.2)' : 'scale(1)')}`,
            boxShadow: `0 0 ${isDragging ? '8px' : '4px'} rgba(212, 175, 55, ${isDragging ? '0.5' : '0.3'})`
          }"
          :class="{ 'opacity-50': !gameStore.currentAudio }"
        ></div>
      </div>
    </div>

    <!-- 音量百分比提示（hover时显示） -->
    <div
        class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-treasure-sand text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
    >
      {{ isMuted ? '静音' : volumePercent + '%' }}
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import {useGameStore} from '../../stores/useGameStore'
import {useUserStore} from '../../stores/useUserStore'

const gameStore = useGameStore()
const userStore = useUserStore()

// 状态管理
const volumePercent = ref(Math.round(gameStore.volume * 100))
const isMuted = ref(userStore.muted)
const isDragging = ref(false) // 跟踪滑块拖动状态

// 监听音量和静音状态变化
watch(() => gameStore.volume, (v) => volumePercent.value = Math.round(v * 100))
watch(() => userStore.muted, (v) => isMuted.value = v)

// 音量调节
const handleVolumeChange = (e) => {
  const val = parseInt(e.target.value)
  if (!isNaN(val)) {
    gameStore.setVolume(val / 100)
    if (val > 0 && userStore.muted) {
      userStore.toggleMute() // 非静音时自动取消静音
    }
  }
}

// 切换静音
const toggleMute = () => {
  userStore.toggleMute()
  if (gameStore.currentAudio) {
    gameStore.currentAudio.muted = userStore.muted
  }
}
</script>

<style scoped>
/* 自定义金色阴影 */
.shadow-treasure-gold\/20 {
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.2);
}
</style>