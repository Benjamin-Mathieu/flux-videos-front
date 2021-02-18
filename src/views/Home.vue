<template>
  <div class="home">
      <div v-for="stream in $store.state.streams">
        <Stream :stream="stream"/>
      </div>
  </div>
</template>

<script>
import Stream from'@/components/Stream.vue';
import Video from'@/components/Video.vue';
export default {
  components:
  {
    Stream,
    Video
  },
  mounted()
  {
    
  }
}
</script>