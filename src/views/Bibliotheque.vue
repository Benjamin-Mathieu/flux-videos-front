<template>
  <div>tokokok</div>
  <video class="video" src="" controls></video>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },

  mounted() {
        api.get("/video/f7c8cdb1dc847783").then(response => {
          console.log(response.data);
          let video = document.querySelector('.video');
          video.src = 'http://2a9e322e8276.ngrok.io/api/video/b38596e9af29c33b';
          //cnsole.log(this.$store.state.streams)
        }).catch(error => {
          console.error(error.response.data.message)
        })
  },
}
</script>
