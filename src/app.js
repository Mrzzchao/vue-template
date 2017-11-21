import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from "./store"
import { sync } from "vuex-router-sync"
export function createApp () {
    // 创建 router 实例
    const router = createRouter()
    const store = createStore()
    sync(store, router)
    const app = new Vue({
        // 注入 router 到根 Vue 实例
        router,
        store,
        render: h => h(App)
    })
    // 返回 app 和 router 和 store
    return { app, router, store }
}
