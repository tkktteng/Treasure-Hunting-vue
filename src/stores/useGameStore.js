import { defineStore } from 'pinia'
import { useUserStore } from './useUserStore'

export const useGameStore = defineStore('game', {
  state: () => ({
    currentScene: 'panorama',
    progress: 0,
    logEntries: [],
    completedLocations: [],
    gameStarted: false,
    gameCompleted: false,
    score: 0,
    audioElements: {
      panorama: new Audio('https://assets.mixkit.co/music/preview/mixkit-adventure-game-theme-231.mp3'),
      library: new Audio('https://assets.mixkit.co/music/preview/mixkit-mystery-suspense-game-soundtrack-811.mp3'),
      decode: new Audio('https://assets.mixkit.co/music/preview/mixkit-curious-game-soundtrack-817.mp3'),
      temple: new Audio('https://assets.mixkit.co/music/preview/mixkit-epic-orchestral-fantasy-689.mp3'),
      cave: new Audio('https://assets.mixkit.co/music/preview/mixkit-dark-ambience-game-soundtrack-807.mp3'),
      treasure: new Audio('https://assets.mixkit.co/music/preview/mixkit-magical-forest-game-soundtrack-808.mp3'),
      success: new Audio('https://assets.mixkit.co/music/preview/mixkit-achievement-bell-600.mp3'),
      fail: new Audio('https://assets.mixkit.co/music/preview/mixkit-player-losing-or-failing-2042.mp3')
    }
  }),

  getters: {
    currentLog: (state) => state.logEntries.slice(-5) // 最近5条日志
  },

  actions: {
    // 初始化音频
    initAudio() {
      Object.values(this.audioElements).forEach(audio => {
        audio.loop = true
      })
    },

    // 播放场景音频
    playSceneAudio(scene) {
      const userStore = useUserStore()
      if (userStore.muted) return

      // 先停止所有音频
      Object.values(this.audioElements).forEach(audio => {
        audio.pause()
        audio.currentTime = 0
      })

      // 播放当前场景音频
      if (this.audioElements[scene]) {
        this.audioElements[scene].play().catch(e => {
          console.log('音频播放失败:', e)
        })
      }
    },

    // 开始新游戏
    startNewGame() {
      this.currentScene = 'panorama'
      this.progress = 0
      this.logEntries = []
      this.completedLocations = []
      this.gameStarted = true
      this.gameCompleted = false
      this.score = 0
      this.addLogEntry('冒险开始了！探索地图寻找宝藏线索...')
      this.playSceneAudio('panorama')
      this.saveGameState()
    },

    // 切换场景
    navigateToScene(scene) {
      this.currentScene = scene
      this.playSceneAudio(scene)
      this.saveGameState()
    },

    // 添加日志条目
    addLogEntry(text, isError = false) {
      this.logEntries.push({
        text,
        isError,
        timestamp: new Date().toISOString()
      })
      this.saveGameState()
    },

    // 更新游戏进度
    updateProgress(percent) {
      this.progress = percent
      // 根据进度增加分数
      this.score = Math.floor(percent * 10)
      this.saveGameState()
    },

    // 标记地点为已完成
    completeLocation(location) {
      if (!this.completedLocations.includes(location)) {
        this.completedLocations.push(location)
        this.saveGameState()
      }
    },

    // 完成游戏
    completeGame(success = true) {
      this.gameCompleted = true
      if (success) {
        this.updateProgress(100)
        this.addLogEntry('恭喜！你成功找到了宝藏！')
        // 奖励完成游戏的分数
        this.score += 500
      } else {
        this.addLogEntry('冒险失败了...', true)
      }
      this.saveGameState()

      // 将分数同步到用户数据
      const userStore = useUserStore()
      userStore.updateUserScore(this.score)
    },

    // 保存游戏状态到localStorage
    saveGameState() {
      const userStore = useUserStore()
      if (userStore.currentUser) {
        localStorage.setItem(`gameState_${userStore.currentUser.id}`, JSON.stringify({
          currentScene: this.currentScene,
          progress: this.progress,
          logEntries: this.logEntries,
          completedLocations: this.completedLocations,
          gameStarted: this.gameStarted,
          gameCompleted: this.gameCompleted,
          score: this.score
        }))
      }
    },

    // 加载游戏状态
    loadGameState() {
      const userStore = useUserStore()
      if (userStore.currentUser) {
        const savedState = localStorage.getItem(`gameState_${userStore.currentUser.id}`)
        if (savedState) {
          const parsedState = JSON.parse(savedState)
          this.currentScene = parsedState.currentScene
          this.progress = parsedState.progress
          this.logEntries = parsedState.logEntries
          this.completedLocations = parsedState.completedLocations
          this.gameStarted = parsedState.gameStarted
          this.gameCompleted = parsedState.gameCompleted
          this.score = parsedState.score
          return true
        }
      }
      return false
    }
  }
})