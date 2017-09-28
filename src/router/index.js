import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = require('~pages/home.vue')

export function createRouter() {
    return new VueRouter({
        mode: 'hash',
        routes: [
            {
                path: '/home',
                component: Home,
                name: 'home'
            }
        ]
    })
}
