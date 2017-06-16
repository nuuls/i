<template>
  <div id="app">
    <img src="./assets/nuuls.png" @click="root()" class="center big-img">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    root () {
      this.$router.push('/')
    }
  }
}
</script>

<style>

* {
  font-family: Roboto, monospace;
  color: #e8e8e8;
}

body {
  background-color: #1c1c1c;
}

.big-img {
  max-width: 70%;
  max-height: 15rem;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
