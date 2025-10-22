<template>
  <div class="space-y-8">
    <div class="bg-gray-800 bg-opacity-80 rounded-xl p-6 shadow-2xl text-center">
      <h2 class="text-[clamp(1.5rem,4vw,2.5rem)] font-adventure text-treasure-gold text-shadow-lg mb-6">
        神秘寻宝冒险
      </h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto">
        踏上一段惊险刺激的寻宝之旅，探索古老的图书馆、神秘的神庙和危险的洞穴，解开重重谜题，找到传说中的宝藏！
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <GameButton 
          @click="startAdventure"
          :primary="true"
          v-if="userStore.isLoggedIn"
        >
          <i class="fa fa-compass mr-2"></i>开始冒险
        </GameButton>
        <GameButton 
          @click="goToLogin"
          :primary="true"
          v-if="!userStore.isLoggedIn"
        >
          <i class="fa fa-sign-in mr-2"></i>登录开始冒险
        </GameButton>
        <GameButton 
          @click="goToRanking"
        >
          <i class="fa fa-trophy mr-2"></i>查看排行榜
        </GameButton>
      </div>
    </div>

    <!-- 游戏特色 -->
    <div class="bg-gray-800 bg-opacity-80 rounded-xl p-6 shadow-2xl">
      <h3 class="text-treasure-gold text-2xl mb-6 font-adventure text-center">冒险特色</h3>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center transform transition-transform hover:scale-105">
          <div class="w-16 h-16 bg-treasure-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa fa-map text-3xl text-treasure-gold"></i>
          </div>
          <h4 class="text-lg font-bold mb-2">探索未知</h4>
          <p class="text-gray-300">探索多个神秘地点，发现隐藏的线索和秘密</p>
        </div>
        
        <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center transform transition-transform hover:scale-105">
          <div class="w-16 h-16 bg-treasure-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa fa-puzzle-piece text-3xl text-treasure-gold"></i>
          </div>
          <h4 class="text-lg font-bold mb-2">解开谜题</h4>
          <p class="text-gray-300">挑战你的智慧，解开古老的谜题和机关</p>
        </div>
        
        <div class="bg-gray-700 bg-opacity-50 p-4 rounded-lg text-center transform transition-transform hover:scale-105">
          <div class="w-16 h-16 bg-treasure-gold bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fa fa-trophy text-3xl text-treasure-gold"></i>
          </div>
          <h4 class="text-lg font-bold mb-2">排行榜竞争</h4>
          <p class="text-gray-300">与其他探险家竞争，争夺最高分数和排名</p>
        </div>
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

const startAdventure = () => {
  router.push('/game')
}

const goToLogin = () => {
  router.push('/user')
}

const goToRanking = () => {
  router.push('/ranking')
}
</script>