import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppShowApartment from './pages/AppShowApartment.vue';
import AppSearchedApartments from './pages/AppSearchedApartments.vue';
import AppError from './pages/AppError.vue';

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
            component: AppShowApartment,
        },
        {
            path: '/searched-apartments',
            name: 'searched-apartments',
            component: AppSearchedApartments
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'AppError',
            component: AppError
        }
    ]
});

export { router };