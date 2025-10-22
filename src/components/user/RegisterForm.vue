<template>
  <form @submit.prevent="handleRegister" class="space-y-4">
    <div>
      <label for="reg-username" class="block text-sm font-medium text-gray-300 mb-1">用户名</label>
      <input
        type="text"
        id="reg-username"
        v-model="username"
        class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-treasure-gold"
        required
        minlength="3"
      >
    </div>
    <div>
      <label for="reg-password" class="block text-sm font-medium text-gray-300 mb-1">密码</label>
      <input
        type="password"
        id="reg-password"
        v-model="password"
        class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-treasure-gold"
        required
        minlength="6"
      >
    </div>
    <div>
      <label for="reg-confirm" class="block text-sm font-medium text-gray-300 mb-1">确认密码</label>
      <input
        type="password"
        id="reg-confirm"
        v-model="confirmPassword"
        class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-treasure-gold"
        required
      >
    </div>
    <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
    <p v-if="success" class="text-green-400 text-sm">{{ success }}</p>
    <GameButton type="submit" :primary="true" class="w-full">
      <i class="fa fa-user-plus mr-2"></i>注册
    </GameButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '../../stores/useUserStore'
import GameButton from '../ui/GameButton.vue'

const userStore = useUserStore()
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')

const emit = defineEmits(['register-success'])

const handleRegister = () => {
  error.value = ''
  success.value = ''

  if (password.value !== confirmPassword.value) {
    error.value = '两次输入的密码不一致'
    return
  }

  if (userStore.register(username.value, password.value)) {
    success.value = '注册成功，请登录'
    // 清空表单
    username.value = ''
    password.value = ''
    confirmPassword.value = ''
    // 通知父组件切换到登录标签
    setTimeout(() => {
      emit('register-success')
    }, 1500)
  } else {
    error.value = '用户名已存在'
  }
}
</script>