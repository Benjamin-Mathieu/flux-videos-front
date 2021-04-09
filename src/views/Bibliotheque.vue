<template>
  <div class="bibli">
    <h1>Vos vidéos</h1>
    <div class="videos">

      <div v-for="video in this.videos" :key="video.id">
        <router-link :to="{name:'video',params:{id:video.id}}">

          <img src="https://via.placeholder.com/400x300/09f/fff.png" alt="">

        </router-link>
      </div>

    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      videos : []
    }
  },

  mounted() {
        api.get("/user/"+this.$store.state.UserCo['id']+"/videos",                 
                {
                    headers:{
                        'Authorization' : 'Bearer '+this.$store.state.token
                    }
                })
        .then(response => {
          console.log(response.data.user.videos);
          this.videos = response.data.user.videos;
          this.$store.commit("setUserVideo", this.videos);

          //cnsole.log(this.$store.state.streams)
        }).catch(error => {
          console.error(error.response.data.message)
        })

  },
}
</script>

<style lang="scss">
  @media screen and (min-width:320px) and(max-width: 640px) {
    video {
      width: 300px;
    }
  }

div.bibli{
  h1{
    text-align: center;
    margin-top: 40px;
    margin-bottom: 3em;
  }
}

.videos {
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1.5em;

  div{
    display: flex; justify-content: center; align-items: center;
  }
}
  
</style>
