import {createRouter, createWebHistory} from "vue-router";
import WelcomeView from "@/views/WelcomeView.vue";
import LoginPage from "@/views/welcome/LoginPage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routers: [
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
        }

    ]
})
export default router
