<template>
  <header class="bg-gray-900 bg-opacity-80 shadow-lg">
    <div class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <i class="fa fa-compass text-treasure-gold text-2xl mr-2"></i>
        <h1 class="text-[clamp(1.2rem,3vw,1.8rem)] font-adventure text-treasure-gold text-shadow">
          神秘寻宝冒险
        </h1>
      </div>

      <nav class="hidden md:flex space-x-6">
        <RouterLink
          to="/"
          class="hover:text-treasure-gold transition-colors"
          :class="{ 'text-treasure-gold': $route.name === 'home' }"
        >
          首页
        </RouterLink>
        <RouterLink
          to="/game"
          class="hover:text-treasure-gold transition-colors"
          :class="{ 'text-treasure-gold': $route.name === 'game' }"
          v-if="userStore.isLoggedIn"
        >
          开始冒险
        </RouterLink>
        <RouterLink
          to="/ranking"
          class="hover:text-treasure-gold transition-colors"
          :class="{ 'text-treasure-gold': $route.name === 'ranking' }"
        >
          排行榜
        </RouterLink>
        <RouterLink
          to="/user"
          class="hover:text-treasure-gold transition-colors"
          :class="{ 'text-treasure-gold': $route.name === 'user' }"
        >
          {{ userStore.isLoggedIn ? '个人中心' : '登录/注册' }}
        </RouterLink>
      </nav>

      <AudioControlComponent class="mr-4" />

      <button class="md:hidden text-xl" @click="isMobileMenuOpen = !isMobileMenuOpen">
        <i class="fa fa-bars"></i>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-gray-800 p-4">
      <div class="flex flex-col space-y-3">
        <RouterLink
          to="/"
          class="hover:text-treasure-gold transition-colors py-2"
          :class="{ 'text-treasure-gold': $route.name === 'home' }"
          @click="isMobileMenuOpen = false"
        >
          首页
        </RouterLink>
        <RouterLink
          to="/game"
          class="hover:text-treasure-gold transition-colors py-2"
          :class="{ 'text-treasure-gold': $route.name === 'game' }"
          v-if="userStore.isLoggedIn"
          @click="isMobileMenuOpen = false"
        >
          开始冒险
        </RouterLink>
        <RouterLink
          to="/ranking"
          class="hover:text-treasure-gold transition-colors py-2"
          :class="{ 'text-treasure-gold': $route.name === 'ranking' }"
          @click="isMobileMenuOpen = false"
        >
          排行榜
        </RouterLink>
        <RouterLink
          to="/user"
          class="hover:text-treasure-gold transition-colors py-2"
          :class="{ 'text-treasure-gold': $route.name === 'user' }"
          @click="isMobileMenuOpen = false"
        >
          {{ userStore.isLoggedIn ? '个人中心' : '登录/注册' }}
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/useUserStore'
import AudioControlComponent from '../ui/AudioControlComponent.vue'

const userStore = useUserStore()
const isMobileMenuOpen = ref(false)
</script>