<template>
  <div v-for="stream in $store.state.streams" :key="stream.id">
      <Stream :stream="stream"/>
    </div>
</template>

<script>
import Stream from'@/components/Stream.vue';
export default {
  components: {
    Stream
  },
  mounted() {
    
  },
}
</script>