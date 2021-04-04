<template>
  <Header />
  <div class="main">
    <Sidebar />
  </div>

  <div class="main2">
    <SidebarProfil/>
  </div>
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import SidebarProfil from "@/components/PopopProfil.vue";


export default {
  components: {
    Header,
    Sidebar,
    SidebarProfil

  },

  mounted() {
    this.chargerStreams();
    this.emitter.on("charger-streams", this.chargerStreams)
  },

  methods: {
    chargerStreams() {
      api.get("home").then(response => {
        this.$store.commit("setStreams", response.data.streams);
        console.log(response.data.streams)
        console.log(this.$store.state.streams)
      }).catch(error => {
        console.log(error.response.data.message)
      })
    }
  }
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;

  a {
    font-weight: bold;
    text-decoration: none;
  }

  .main {
    display: flex;
  }
}
</style>
