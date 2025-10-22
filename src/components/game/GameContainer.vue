<template>
  <div class="game-container min-h-screen p-4 md:p-6 max-w-7xl mx-auto bg-gray-900 text-gray-100">
    <!-- 游戏标题与导航 -->
    <header class="mb-6 flex justify-between items-center">
      <h1 class="text-2xl md:text-3xl font-bold text-treasure-gold">
        <i class="fas fa-compass mr-2"></i>神秘宝藏冒险
      </h1>
      <button
        @click="gameStore.startNewGame"
        class="px-4 py-2 bg-treasure-gold/20 hover:bg-treasure-gold/30 text-treasure-gold rounded-lg transition-colors text-sm"
      >
        <i class="fas fa-redo mr-1"></i> 重新开始
      </button>
    </header>

    <!-- 游戏进度 -->
    <div class="mb-6 bg-gray-800 bg-opacity-60 p-4 rounded-lg">
      <div class="flex justify-between items-center mb-2">
        <span class="text-treasure-sand">冒险进度</span>
        <span class="text-treasure-gold font-bold">{{ gameStore.progress }}%</span>
      </div>
      <ProgressBarComponent :value="gameStore.progress" />
      <div class="mt-2 text-right text-sm text-gray-300">
        当前得分: {{ gameStore.score }}
      </div>
    </div>

    <!-- 主内容区：场景 + 侧边装饰（核心布局调整） -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
      <!-- 中间大图场景（占3列） -->
      <div class="lg:col-span-3 bg-gray-800 bg-opacity-80 rounded-xl p-6 shadow-2xl border border-gray-700">
        <template v-if="gameStore.currentScene === 'panorama'">
          <PanoramaScene />
        </template>
        <template v-if="gameStore.currentScene === 'library'">
          <LibraryScene />
        </template>
        <template v-if="gameStore.currentScene === 'decode'">
          <DecodeScene />
        </template>
        <template v-if="gameStore.currentScene === 'temple'">
          <TempleScene />
        </template>
        <template v-if="gameStore.currentScene === 'cave'">
          <CaveScene />
        </template>
        <template v-if="gameStore.currentScene === 'treasure'">
          <TreasureScene />
        </template>
        <template v-if="gameStore.currentScene === 'success'">
          <SuccessScene />
        </template>
        <template v-if="gameStore.currentScene === 'fail'">
          <FailScene />
        </template>
      </div>

      <!-- 侧边装饰（占1列，位于大图右侧） -->
      <div class="lg:col-span-1 space-y-6">
        <SideDecorComponent />
      </div>
    </div>

    <!-- 冒险日志（底部全屏宽度） -->
    <div class="bg-gray-800 bg-opacity-60 rounded-xl p-5 border border-gray-700">
      <AdventureLogComponent />
    </div>

    <!-- 音量控制 -->
    <div class="fixed bottom-6 right-6 z-50">
      <AudioControlComponent />
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '../../stores/useGameStore'
// 基础组件
import ProgressBarComponent from '../ui/ProgressBarComponent.vue'
import AdventureLogComponent from './AdventureLogComponent.vue'
import SideDecorComponent from './SideDecorComponent.vue'
import AudioControlComponent from '../ui/AudioControlComponent.vue'
// 场景组件
import PanoramaScene from './scenes/PanoramaScene.vue'
import LibraryScene from './scenes/LibraryScene.vue'
import DecodeScene from './scenes/DecodeScene.vue'
import TempleScene from './scenes/TempleScene.vue'
import CaveScene from './scenes/CaveScene.vue'
import TreasureScene from './scenes/TreasureScene.vue'
import SuccessScene from './scenes/SuccessScene.vue'
import FailScene from './scenes/FailScene.vue'

const gameStore = useGameStore()
</script>

<style scoped>
/* 响应式调整：小屏幕下侧边装饰在场景下方 */
@media (max-width: 1023px) {
  .grid {
    gap: 4rem;
  }
}

/* 自定义主题色 */
:root {
  --color-treasure-gold: #d4af37;
  --color-treasure-sand: #e6c86e;
  --color-treasure-dark: #b8860b;
}

.text-treasure-gold {
  color: var(--color-treasure-gold);
}

.text-treasure-sand {
  color: var(--color-treasure-sand);
}
</style>