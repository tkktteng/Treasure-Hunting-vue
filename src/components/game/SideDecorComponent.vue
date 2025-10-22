<template>
  <div class="space-y-6">
    <!-- 神秘徽章卡片 -->
    <div class="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 shadow-lg overflow-hidden relative group">
      <!-- 装饰边框 -->
      <div class="absolute inset-0 border border-treasure-gold/20 rounded-xl pointer-events-none"></div>

      <h3 class="text-treasure-gold font-serif text-lg mb-4 flex items-center">
        <i class="fas fa-seal mr-2 opacity-70"></i>
        探险者徽章
      </h3>

      <!-- 动态纹章 -->
      <div class="w-full aspect-square max-w-[120px] mx-auto relative">
        <div class="absolute inset-0 rounded-full border-2 border-treasure-gold/30 animate-spin-slow opacity-70"></div>
        <div class="absolute inset-[10%] rounded-full border-2 border-treasure-gold/50 animate-spin-reverse-slow"></div>
        <div class="absolute inset-[20%] rounded-full bg-treasure-gold/10 flex items-center justify-center">
          <i class="fas fa-compass text-treasure-gold text-2xl transform transition-transform duration-10000 ease-in-out group-hover:rotate-360"></i>
        </div>
      </div>

      <p class="text-center text-gray-400 text-xs mt-4 opacity-70">
        神秘组织认证 · 1753
      </p>
    </div>

    <!-- 能量波动面板 -->
    <div class="bg-gray-800/70 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 shadow-lg relative overflow-hidden">
      <!-- 粒子背景 -->
      <div class="absolute inset-0" ref="particleContainer"></div>

      <h3 class="text-treasure-gold font-serif text-lg mb-4 relative z-10">
        <i class="fas fa-wave-square mr-2 opacity-70"></i>
        能量波动
      </h3>

      <!-- 装饰性数据条 -->
      <div class="space-y-3 relative z-10">
        <div>
          <div class="flex justify-between text-xs text-gray-400 mb-1">
            <span>空间稳定度</span>
            <span>78%</span>
          </div>
          <div class="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
            <div class="h-full w-[78%] bg-gradient-to-r from-treasure-gold/60 to-treasure-sand/40 rounded-full"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs text-gray-400 mb-1">
            <span>神秘场强</span>
            <span>42%</span>
          </div>
          <div class="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
            <div class="h-full w-[42%] bg-gradient-to-r from-treasure-gold/60 to-treasure-sand/40 rounded-full"></div>
          </div>
        </div>

        <div>
          <div class="flex justify-between text-xs text-gray-400 mb-1">
            <span>时间共振</span>
            <span>19%</span>
          </div>
          <div class="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
            <div class="h-full w-[19%] bg-gradient-to-r from-treasure-gold/60 to-treasure-sand/40 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 古老羊皮纸碎片 -->
    <div class="bg-[#2d2416]/80 backdrop-blur-sm rounded-xl p-4 border border-[#4a3b26]/30 shadow-lg transform rotate-1 transition-transform hover:rotate-0 duration-500">
      <div class="text-gray-300 text-xs italic leading-relaxed opacity-80">
        "在满月之夜，当星轨与神庙对齐时，<br>
        隐藏的通道将为真正的探险者敞开..."
      </div>
      <div class="mt-3 flex justify-end">
        <i class="fas fa-quote-right text-treasure-gold/30"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const particleContainer = ref(null)

// 粒子动画（纯装饰）
onMounted(() => {
  if (!particleContainer.value) return

  // 创建随机漂浮粒子
  const count = 15
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div')
    particle.className = 'absolute rounded-full bg-treasure-gold/10'

    // 随机样式
    const size = Math.random() * 3 + 1
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`
    particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`
    particle.style.animationDelay = `${Math.random() * 5}s`

    particleContainer.value.appendChild(particle)
  }
})
</script>

<style scoped>
/* 自定义动画 */
@keyframes float {
  0% { transform: translateY(0) translateX(0); opacity: 0.2; }
  25% { transform: translateY(-10px) translateX(5px); opacity: 0.5; }
  50% { transform: translateY(0) translateX(10px); opacity: 0.3; }
  75% { transform: translateY(10px) translateX(5px); opacity: 0.4; }
  100% { transform: translateY(0) translateX(0); opacity: 0.2; }
}

.animate-spin-slow {
  animation: spin 30s linear infinite;
}

.animate-spin-reverse-slow {
  animation: spin-reverse 25s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spin-reverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
</style>