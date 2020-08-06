<template>
  <div id="app">
    <NavigationPanel/>
    <Home></Home>
  </div>
</template>

<script lang="ts">

import Vue from "vue";
import Home from './pages/Home.vue';
import Nav from './components/Nav.vue';
console.log(process.env)
export default Vue.extend({
  name: 'App',
  components: {
    Home,
    NavigationPanel: Nav,
  }
});

</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
