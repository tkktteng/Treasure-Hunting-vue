import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null,
    users: [],
    muted: false
  }),

  getters: {
    isLoggedIn: (state) => !!state.currentUser,
    // 获取排行榜数据（按分数排序）
    rankingList: (state) => {
      return [...state.users]
        .sort((a, b) => (b.highestScore || 0) - (a.highestScore || 0))
        .slice(0, 10)
    }
  },

  actions: {
    // 初始化用户数据
    initUsers() {
      const savedUsers = localStorage.getItem('treasureHuntUsers')
      if (savedUsers) {
        this.users = JSON.parse(savedUsers)
      } else {
        // 默认用户数据
        this.users = [
          { id: 1, username: 'Explorer', password: '123456', highestScore: 850 },
          { id: 2, username: 'Adventurer', password: '123456', highestScore: 720 }
        ]
        this.saveUsers()
      }

      // 检查是否有保存的登录状态
      const savedLogin = localStorage.getItem('treasureHuntLogin')
      if (savedLogin) {
        const userId = parseInt(savedLogin)
        this.currentUser = this.users.find(user => user.id === userId)
      }

      // 加载音频设置
      const savedMuted = localStorage.getItem('treasureHuntMuted')
      this.muted = savedMuted === 'true'
    },

    // 保存用户数据到localStorage
    saveUsers() {
      localStorage.setItem('treasureHuntUsers', JSON.stringify(this.users))
    },

    // 用户登录
    login(username, password) {
      const user = this.users.find(u => u.username === username && u.password === password)
      if (user) {
        this.currentUser = user
        localStorage.setItem('treasureHuntLogin', user.id.toString())
        return true
      }
      return false
    },

    // 用户注册
    register(username, password) {
      if (this.users.some(u => u.username === username)) {
        return false // 用户名已存在
      }

      const newId = this.users.length > 0
        ? Math.max(...this.users.map(u => u.id)) + 1
        : 1

      const newUser = {
        id: newId,
        username,
        password,
        highestScore: 0
      }

      this.users.push(newUser)
      this.saveUsers()
      return true
    },

    // 用户登出
    logout() {
      this.currentUser = null
      localStorage.removeItem('treasureHuntLogin')
    },

    // 更新用户分数
    updateUserScore(score) {
      if (this.currentUser) {
        const userIndex = this.users.findIndex(u => u.id === this.currentUser.id)
        if (userIndex !== -1) {
          // 更新最高分
          if (!this.users[userIndex].highestScore || score > this.users[userIndex].highestScore) {
            this.users[userIndex].highestScore = score
            this.currentUser.highestScore = score
            this.saveUsers()
          }
        }
      }
    },

    // 切换音频静音状态
    toggleMute() {
      this.muted = !this.muted
      localStorage.setItem('treasureHuntMuted', this.muted)
    }
  }
})