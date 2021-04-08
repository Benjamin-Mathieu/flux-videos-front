<template>
  <div class="main">
    
    <h1>Urgent</h1>
    <div v-if="$store.state.streams_urgency.length > 0" class="urgent-streams">
      <div v-for="stream in $store.state.streams_urgency" :key="stream.id">
        <Stream :stream="stream"/>
      </div>
    </div>
    <div v-else>
        <p>Aucun stream urgent pour le moment</p>
    </div>
    
    <h1>Publiques</h1>
    <div v-if="$store.state.streams_public.length > 0" class="public-streams">
      <div v-for="stream in $store.state.streams_public" :key="stream.id">
        <Stream :stream="stream"/>
      </div>
    </div>
    <div v-else>
        <p>Aucun stream publique pour le moment</p>
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