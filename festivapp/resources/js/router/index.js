import { createWebHistory, createRouter } from "vue-router";

import Home from '../pages/Home';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Posts from '../components/Posts';
import _Posts from '../components/_Posts.vue';
import EditPost from '../components/EditPost';
import AddPost from '../components/AddPost';

export const routes = [{
        name: 'home',
        path: '/',
        component: Home
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    {
        name: 'profile',
        path: '/profile',
        component: Profile
    },
    {
        name: 'posts',
        path: '/posts',
        component: Posts
    },
    {
        name: 'addpost',
        path: '/posts/add',
        component: AddPost
    },
    {
        name: 'posts-detail',
        path: '/posts/:id',
        component: _Posts
    },
    {
        name: 'editpost',
        path: '/posts/edit/:id',
        component: EditPost
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

export default router;