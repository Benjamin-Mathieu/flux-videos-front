<template>
  <Header />
  <router-view />
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header,
  },

  mounted() {
    this.chargerStreams();
    this.emitter.on("charger-streams", this.chargerStreams);
  },

  methods: {
    chargerStreams() {
      api.get("home").then(response => {
        this.$store.commit("setStreams", response.data.streams);
        console.log(response.data)
        console.log(this.$store.state.streams)
      }).catch(error => {
        console.error(error.response.data.message)
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
    text-decoration: none;
  }

  .main2 {
    display: none;
  }


}
</style>
