<template>
  <div id="app">
      <h1>Hello MChao</h1>
      <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import vueTap from 'v-tap'
Vue.use(vueTap)

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style>
</style>
