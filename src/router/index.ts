import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '@/views/home/index.vue'
import { constRoutes } from './routes'

const router = createRouter({
    history: createWebHashHistory(), //hash模式
    routes: constRoutes,
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
})

export default router
