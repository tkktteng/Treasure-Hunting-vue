<template>
  <form @submit.prevent="handleLogin" class="space-y-4">
    <div>
      <label for="username" class="block text-sm font-medium text-gray-300 mb-1">用户名</label>
      <input
        type="text"
        id="username"
        v-model="username"
        class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-treasure-gold"
        required
      >
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-300 mb-1">密码</label>
      <input
        type="password"
        id="password"
        v-model="password"
        class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-treasure-gold"
        required
      >
    </div>
    <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
    <GameButton type="submit" :primary="true" class="w-full">
      <i class="fa fa-sign-in mr-2"></i>登录
    </GameButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/useUserStore'
import GameButton from '../ui/GameButton.vue'
import { useGameStore } from '../../stores/useGameStore'

const userStore = useUserStore()
const gameStore = useGameStore()
const username = ref('')
const password = ref('')
const error = ref('')

const emit = defineEmits(['login-success'])

const handleLogin = () => {
  error.value = ''
  if (userStore.login(username.value, password.value)) {
    // 登录成功后加载游戏状态
    gameStore.loadGameState()
    emit('login-success')
  } else {
    error.value = '用户名或密码错误'
  }
}
</script>