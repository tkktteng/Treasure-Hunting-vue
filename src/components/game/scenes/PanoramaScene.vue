<template>
  <div class="relative w-full h-[60vh] md:h-[70vh] overflow-hidden rounded-lg">
    <!-- 地图背景图 -->
    <img
      src="https://picsum.photos/id/1036/1600/900"
      alt="冒险地图全景"
      class="w-full h-full object-cover"
    >

    <!-- 半透明遮罩 -->
    <div class="absolute inset-0 bg-black/20"></div>

    <!-- 交互提示 -->
    <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-lg text-sm">
      <i class="fas fa-info-circle text-accent mr-1"></i>
      点击标记探索地点
    </div>

    <!-- 图书馆（图标：book） -->
    <LocationMarker
      :top="'30%'"
      :left="'25%'"
      icon="book"
      label="图书馆"
      @click="goToScene('library')"
      :completed="gameStore.completedLocations.includes('library')"
    />

    <!-- 解码室（图标：code） -->
    <LocationMarker
      :top="'40%'"
      :left="'45%'"
      icon="code"
      label="解码室"
      @click="goToScene('decode')"
      :completed="gameStore.completedLocations.includes('decode')"
      :disabled="!gameStore.completedLocations.includes('library')"
    />

    <!-- 古老神庙（图标：landmark） -->
    <LocationMarker
      :top="'45%'"
      :left="'60%'"
      icon="landmark"
      label="古老神庙"
      @click="goToScene('temple')"
      :completed="gameStore.completedLocations.includes('temple')"
      :disabled="!gameStore.completedLocations.includes('decode')"
    />

    <!-- 神秘洞穴（图标：mountain） -->
    <LocationMarker
      :top="'60%'"
      :left="'30%'"
      icon="mountain"
      label="神秘洞穴"
      @click="goToScene('cave')"
      :completed="gameStore.completedLocations.includes('cave')"
      :disabled="!gameStore.completedLocations.includes('temple')"
    />

    <!-- 宝藏所在地（图标：diamond） -->
    <LocationMarker
      :top="'25%'"
      :left="'75%'"
      icon="diamond"
      label="宝藏所在地"
      @click="goToScene('treasure')"
      :completed="gameStore.completedLocations.includes('treasure')"
      :disabled="!gameStore.completedLocations.includes('cave')"
      :pulse="!gameStore.completedLocations.includes('treasure')"
    />
  </div>
</template>

<script setup>
import LocationMarker from '../LocationMarker.vue'
import { useGameStore } from '../../../stores/useGameStore'

const gameStore = useGameStore()

// 前往指定场景
const goToScene = (sceneName) => {
  gameStore.navigateToScene(sceneName)
  gameStore.addLogEntry(`进入了${getSceneName(sceneName)}，开始探索...`)
}

// 场景名称映射
const getSceneName = (scene) => {
  const names = {
    library: '图书馆',
    decode: '解码室',
    temple: '古老神庙',
    cave: '神秘洞穴',
    treasure: '宝藏所在地'
  }
  return names[scene] || scene
}
</script>