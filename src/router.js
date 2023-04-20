import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppShowApartment from './pages/AppShowApartment.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/apartments/:slug',
            name: 'app-show-apartments',
            component: AppShowApartment
        },
    ]
});

export { router };