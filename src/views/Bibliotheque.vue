<template>
  <div class="bibli">
    <h1>Vos vidéos</h1>
    <div class="videos">
      
      <div class="video" v-for="video in this.videos" :key="video.id">
        <span><b>Nom:&nbsp</b> {{video.name}} </span>
        <span><b>Date:&nbsp</b> {{video.created_at}}</span>
        <router-link class="link" :to="{name:'video',params:{id:video.id}}">
          <span>Voir vidéo</span>
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

          let d = new Date(response.data.user.videos.created_at);
          let options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
          this.dateVideos = d.toLocaleDateString('fr-FR', options);

          this.videos = response.data.user.videos;
          this.$store.commit("setUserVideo", this.videos);

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
    margin-bottom: 2em;
  }
}

.videos {
  display: flex; flex-wrap: wrap; width: 80%; margin: auto;
  .video {
    border-radius: .3em;
    box-shadow: 0px 0px .5em 0px;
    margin: auto;
    margin-bottom: 2em; 
    width: fit-content;
    padding: 1em;
    background-color: #CCC;
  }
  .video > *{
    display: flex;
  }
  a.link {
    margin-top: .3em;
  }
}
  
</style>
