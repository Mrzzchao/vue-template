import 'es6-promise/auto'
import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router/index.js'
import {createStore} from './store/index.js'

export function createApp () {
    // create router and store instances
    const router = createRouter()
    const store = createStore()

    // create the app instance, injecting both the router and the store
    const app = new Vue(Object.assign({
        router,
        store
    }, App))

    app.$mount('#app')

    // expose the app, the router and the store.
    return { app, router, store }
}

createApp()
