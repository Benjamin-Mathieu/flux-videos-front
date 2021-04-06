<template>
  <div class="public-streams">
    <div v-for="stream in $store.state.streams" :key="stream.id">
      <Stream :stream="stream"/>
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
    console.log(this.$store.state.token)
  },
}
</script>

<style lang="scss" scoped>
  .public-streams {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 1.5em;
  }
</style>