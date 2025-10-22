<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-2xl font-adventure text-treasure-gold text-center mb-8">
      {{ userStore.isLoggedIn ? '个人中心' : '登录/注册' }}
    </h2>

    <div v-if="!userStore.isLoggedIn">
      <div class="bg-gray-800 bg-opacity-80 rounded-xl p-6 shadow-2xl mb-6">
        <TabsComponent :tabs="['登录', '注册']" v-model:active-tab="activeTab">
          <template #tab-0>
            <LoginForm @login-success="handleLoginSuccess" />
          </template>
          <template #tab-1>
            <RegisterForm @register-success="handleRegisterSuccess" />
          </template>
        </TabsComponent>
      </div>
    </div>

    <div v-if="userStore.isLoggedIn">
      <div class="bg-gray-800 bg-opacity-80 rounded-xl p-6 shadow-2xl mb-6">
        <div class="text-center mb-6">
          <div class="w-24 h-24 bg-treasure-gold rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa fa-user text-4xl text-treasure-dark"></i>
          </div>
          <h3 class="text-xl font-bold">{{ userStore.currentUser.username }}</h3>
          <p class="text-treasure-sand">寻宝探险家</p>
        </div>

        <div class="space-y-4">
          <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
            <h4 class="text-gray-300 mb-2">个人成就</h4>
            <div class="flex justify-between items-center">
              <span>最高得分</span>
              <span class="text-treasure-gold font-bold">{{ userStore.currentUser.highestScore || 0 }}</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span>已完成冒险</span>
              <span class="text-treasure-gold font-bold">{{ completedAdventures }}</span>
            </div>
          </div>

          <div class="flex space-x-4">
            <GameButton
              @click="goToGame"
              :primary="true"
              class="flex-1"
            >
              <i class="fa fa-compass mr-2"></i>继续冒险
            </GameButton>
            <GameButton
              @click="logout"
              :danger="true"
              class="flex-1"
            >
              <i class="fa fa-sign-out mr-2"></i>退出登录
            </GameButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/useUserStore'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/useGameStore'
import TabsComponent from '../components/ui/TabsComponent.vue'
import LoginForm from '../components/user/LoginForm.vue'
import RegisterForm from '../components/user/RegisterForm.vue'
import GameButton from '../components/ui/GameButton.vue'
import { defineEmits } from 'vue'

const userStore = useUserStore()
const gameStore = useGameStore()
const router = useRouter()
const activeTab = ref(0)

// 计算已完成的冒险次数
const completedAdventures = computed(() => {
  return userStore.currentUser.highestScore > 0 ? 1 : 0
})

const handleLoginSuccess = () => {
  const redirectPath = router.currentRoute.value.query.redirect || '/game'
  router.push(redirectPath)
}

const handleRegisterSuccess = () => {
  activeTab.value = 0 // 注册成功后切换到登录标签
}

const goToGame = () => {
  router.push('/game')
}

const logout = () => {
  userStore.logout()
  gameStore.startNewGame()
  router.push('/')
}
</script>