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
    
  },
}
</script>

<style lang="scss" scoped>

  .main {
    width: 90%; margin: 0 auto;
    @media screen and (min-width:450px) and(max-width: 600px) {
      width: 80%;
    }
    h1{
      text-align: center;
    }
    .public-streams {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 1.5em;
      @media screen and (min-width:450px) and(max-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
    .public-streams div {
      display: flex; justify-content: center; align-items: center;
      @media screen and (min-width:450px) and(max-width: 600px) {
        grid-column-start: 1;
        grid-column-end: 4;
      }
    }

    .urgent-streams {
      display: grid;
      grid-template-columns: auto auto;
      grid-gap: 1.5em;
    }
    .urgent-streams div {
      display: flex; justify-content: center; align-items: center;
    }
  }
  
  
</style>