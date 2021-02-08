<template>
  <Header/>
  <Sidebar/>
  <router-view />
</template>

<script>
import Header from './components/Header.vue' 
import Sidebar from './components/Sidebar.vue' 

export default {
  components: {
    Header,
    Sidebar
  }
}
</script>


<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0; padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

a {
    font-weight: bold;
    text-decoration: none;
  }
</style>
