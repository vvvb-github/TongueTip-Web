import Vue from "vue";
import Router from "vue-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Detail from "@/pages/Detail";
import Order from "@/pages/Order";
import Orders from "@/pages/Orders";
import Admin from "@/pages/Admin";
import ErrorPage from "@/pages/404"
import Profile from "@/pages/Profile";
import Dishes from "@/pages/Dishes";

Vue.use(Router)

export default new Router({
    routes :[
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/detail',
            name: 'detail',
            component: Detail
        },
        {
            path: '/order',
            name: 'order',
            component: Order
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin
        },
        {
            path: '/dishes',
            name: 'dishes',
            component: Dishes
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },
        {
            path: '*',
            name: 'error',
            component: ErrorPage
        }
    ]
})