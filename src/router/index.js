import {createRouter, createWebHistory} from "vue-router";
const HomeComponent = () => import('../public/pages/home.component.vue');
const AppointmentsComponent = () => import('../appointment/pages/appointment-list.component.vue');
const PageNotFoundComponent = () => import('../public/pages/page-not-found.component.vue');

const routes = [
    {
        path: '/home',
        name: 'home',
        component: HomeComponent,
        meta: {title: 'Home'}
    },
    {
        path: '/appointments',
        name: 'appointments',
        component: AppointmentsComponent,
        meta: {title: 'Appointments'}
    },
    {
        path: '/',
        name: 'default',
        redirect: {name: 'home'}
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: PageNotFoundComponent,
        meta: {title: 'Page Not Found'}
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
});

router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'HealthEdge';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});

export default router;