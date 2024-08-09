import { createWebHistory, createRouter } from 'vue-router'
import LogInView from '../views/LogIn.vue'
import UserProfileView from '../views/UserProfile.vue'
import { useAuthUser } from '@/stores/useAuthUser'

const routes = [
    { path: '/', component: UserProfileView, meta: { requiresAuth: true } },
    { path: '/login', component: LogInView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to) => {
    const { isLoggedIn } = useAuthUser()()

    if (to.meta.requiresAuth && !isLoggedIn) {
        return '/login'
    }
})
