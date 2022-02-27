import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import MainLayout from '../components/layouts/MainLayout.vue'
import Main from '../components/pages/Main.vue'
import ReadingClub from "../components/pages/ReadingClub.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'main',
        component: Main,
        meta: {
            layout: MainLayout
        }
    },
    {
        path: '/reading-club',
        name: 'reading-club',
        component: ReadingClub
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
