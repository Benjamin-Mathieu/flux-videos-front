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
    .public-streams {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 1.5em;
    }
    .public-streams div {
      display: flex; justify-content: center; align-items: center;
    }
  }
  
</style>