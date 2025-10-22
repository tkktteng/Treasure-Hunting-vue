import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// 先导入Tailwind基础样式
import './assets/tailwind.css'
// 再导入自定义样式（包含@layer utilities的文件）
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')