import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import('@pages/home.vue' /* webpackChunkName: "pages/home" */)
// const Home = require('@pages/home.vue')
console.log(Home)
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
