import Vue from 'vue'
import Vuex from 'vuex'
import demo from './demo'

Vue.use(Vuex)

export function createStore() {
    return new Vuex.Store({
        modules: {
            demo
        }
    })
}
