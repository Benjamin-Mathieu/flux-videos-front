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

  data() {
    return {
      public_stream : [],
      urgency_stream: [],
    }
  },

  mounted() {
    this.chargerStreams();
    this.emitter.on("charger-streams", this.chargerStreams);
  },

  methods: {
    chargerStreams() {
      api.get("home").then(response => {
        
        response.data.streams.forEach(stream => {

          if(stream.urgency == 0){
            this.public_stream.push(stream);
          }else{
            
            this.urgency_stream.push(stream);
          }
          
        });
        this.$store.commit("setStreams", this.public_stream, this.urgency_stream);
        console.log("ouiouioui");
        console.log(this.urgency_stream);
        //console.log(this.$store.state.streams)
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
