import {createRouter, createWebHistory} from 'vue-router'


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
                }, {
                    path: 'register',
                    name: 'welcome-register',
                    component: () => import('@/views/welcome/RegisterPage.vue')
                }, {
                    path: 'reset',
                    name: 'welcome-reset',
                    component: () => import('@/views/welcome/ResetPage.vue')
                }
            ]
        }, {
            path: '/index',
            name: 'index',
            component: () => import('@/views/IndexView.vue'),
            children: [
                {
                    path: '',
                    name: 'index-page',
                    component: () => import('@/views/index/IndexPage.vue')
                },
                {
                    path: '/userdata',
                    name: 'index-userdata',
                    component: () => import('@/views/index/UserDataPage.vue')
                }, {
                    path: '/student-data',
                    name: 'index-student-data',
                    component: () => import("@/views/index/StudentDataPage.vue")
                }
            ]
        }
    ]
})
//����·������
router.beforeEach((to, from, next) => {
    // const isUnauthorized = unauthorized()
    // if (to.name.startsWith('welcome-') && !isUnauthorized) {    //û�е�¼ ������¼ҳ��
    //     next('/index')
    // }else if (to.fullPath.startsWith('/index')&&isUnauthorized){    //�Ѿ���¼ �޷�������¼ҳ��
    //     next('/')
    // }else {
    //     next()
    // }
    if (to.path === '/') return next()
    let token = sessionStorage.getItem("access_token") === null ? localStorage.getItem("access_token") : sessionStorage.getItem("access_token");
    if (!token) return next("/")
    next()
})
export default router
