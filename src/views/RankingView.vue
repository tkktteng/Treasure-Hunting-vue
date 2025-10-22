<template>
  <div>
    <h2 class="text-2xl font-adventure text-treasure-gold text-center mb-8">
      寻宝大师排行榜
    </h2>

    <div class="bg-gray-800 bg-opacity-80 rounded-xl p-6 shadow-2xl">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-700">
              <th class="py-3 px-4 text-left">排名</th>
              <th class="py-3 px-4 text-left">探险家</th>
              <th class="py-3 px-4 text-right">最高得分</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(user, index) in userStore.rankingList"
              :key="user.id"
              class="border-b border-gray-700 hover:bg-gray-700 transition-colors"
              :class="{ 'bg-treasure-gold bg-opacity-20': isCurrentUser(user) }"
            >
              <td class="py-3 px-4">
                <span class="flex items-center">
                  <span v-if="index < 3" class="inline-block w-6 h-6 rounded-full bg-treasure-gold text-treasure-dark text-xs font-bold flex items-center justify-center mr-2">
                    {{ index + 1 }}
                  </span>
                  <span v-else>{{ index + 1 }}</span>
                </span>
              </td>
              <td class="py-3 px-4">
                <div class="flex items-center">
                  <i class="fa fa-user-circle text-treasure-sand mr-2"></i>
                  {{ user.username }}
                  <span v-if="isCurrentUser(user)" class="ml-2 text-xs bg-treasure-gold text-treasure-dark px-2 py-0.5 rounded">你</span>
                </div>
              </td>
              <td class="py-3 px-4 text-right font-bold">{{ user.highestScore || 0 }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-6 text-center">
        <GameButton
          @click="goToGame"
          :primary="true"
          v-if="userStore.isLoggedIn"
        >
          <i class="fa fa-compass mr-2"></i>开始你的冒险
        </GameButton>
        <GameButton
          @click="goToLogin"
          :primary="true"
          v-if="!userStore.isLoggedIn"
        >
          <i class="fa fa-sign-in mr-2"></i>登录参与排行
        </GameButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/useUserStore'
import { useRouter } from 'vue-router'
import GameButton from '../components/ui/GameButton.vue'

const userStore = useUserStore()
const router = useRouter()

const isCurrentUser = (user) => {
  return userStore.currentUser && user.id === userStore.currentUser.id
}

const goToGame = () => {
  router.push('/game')
}

const goToLogin = () => {
  router.push('/user')
}
</script>