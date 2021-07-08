import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Article from '../components/ArticlePost.vue'
import ToDo from '../components/ToDo.vue'

import InvoiceView from '../views/InvoiceView.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/article',
        name: 'Article',
        component: Article
    },
    {
        path: '/todo',
        name: 'ToDo',
        component: ToDo
    },
    {
        path: '/invoice/:invoiceId',
        name: 'Invoice',
        component: InvoiceView
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;