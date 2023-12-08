import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 数据持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

axios.defaults.baseURL='http://localhost:8080'

const app = createApp(App)

app.use(router)

app.use(pinia)

app.mount('#app')
