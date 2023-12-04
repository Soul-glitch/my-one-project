import {createRouter, createWebHistory} from 'vue-router'
import {unauthorized} from "@/net";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: () => import('@/views/WelcomeView.vue'),
            children: [
                {
                    path: '',
                    name: 'welcome-login',
                    component: () => import('@/views/welcome/LoginPage.vue')
                }
            ]
        }, {
            path: '/index',
            name: 'index',
            component: () => import('@/views/IndexView.vue')
        }
    ]
})
//配置路由守卫
router.beforeEach((to, from, next) => {
    const isUnauthorized = unauthorized()

    if (to.name.startsWith('welcome-') && !isUnauthorized) {    //没有登录 跳到登录页面
        next('/index')
    }else if (to.fullPath.startsWith('/index')&&isUnauthorized){    //已经登录 无法跳到登录页面
        next('/')
    }else {
        next()
    }
})
export default router
