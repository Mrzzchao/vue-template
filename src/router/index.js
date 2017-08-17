import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Demo = require('~pages/demo.vue')

export function createRouter() {
    return new VueRouter({
        mode: 'hash',
        routes: [
            {
                path: '/demo',
                component: Demo,
                name: 'demo'
            }
        ]
    })
}
