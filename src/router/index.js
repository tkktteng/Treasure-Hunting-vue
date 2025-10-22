import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GameView from '../views/GameView.vue'
import UserView from '../views/UserView.vue'
import RankingView from '../views/RankingView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useUserStore } from '../stores/useUserStore'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/game',
    name: 'game',
    component: GameView,
    meta: { requiresAuth: true }
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: RankingView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 路由守卫 - 检查登录状态
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userStore = useUserStore()
    if (!userStore.isLoggedIn) {
      next({ name: 'user', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router