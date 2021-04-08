<template>
  <div class="main">
    <h1>Publiques</h1>
    <div class="public-streams">
      <div v-for="stream in $store.state.streams" :key="stream.id">
        <Stream :stream="stream"/>
      </div>
    </div>
  </div>
</template>

<script>
import Stream from'@/components/Stream.vue';
export default {
  components: {
    Stream
  },
  mounted() {
    console.log("userCo", this.$store.state.UserCo);
  },
}
</script>

<style lang="scss" scoped>

  .main {
    width: 90%; margin: 0 auto;
    @media screen and(max-width: 600px) {
      width: 80%;
      margin: auto;
    }
    h1{
      text-align: center;
    }
    .public-streams {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 1.5em;
      @media screen and(max-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .public-streams div {
      display: flex; justify-content: center; align-items: center;
      @media screen and(max-width: 600px) {
        grid-column-start: 1;
        grid-column-end: 4;
      }
    }
  }
  
  
</style>