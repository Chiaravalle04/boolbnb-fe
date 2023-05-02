import { createRouter, createWebHistory } from 'vue-router';

import AppHome from './pages/AppHome.vue';
import AppShowApartment from './pages/AppShowApartment.vue';
import AppSearchedApartments from './pages/AppSearchedApartments.vue';
import AppError from './pages/AppError.vue';
import AppWhoWeAre from './pages/AppWhoWeAre.vue';

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
        },
        {
            path: '/who-we-are',
            name: 'who-we-are',
            component: AppWhoWeAre
        }
    ]
});

export { router };