<template>

    <div class="votreVideo">
        <h1>Votre vidéo</h1>
        <video class="lavideo" controls></video>
        <p>Lien de votre vidéo : <a @click="linkVideo" href="">Lien</a></p>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            video : '',
            urlVideo: '',
        }
    },
    mounted() {
        
        this.$store.state.video.forEach(video => {

            if(video.id == this.$route.params.id){
                this.video = video;
                this.urlVideo = "http://22d562677bbc.ngrok.io/videos/"+video.name+".webm";
                let lavideo = document.querySelector(".lavideo");
                lavideo.src = this.urlVideo;
            }
            
        });

    },
    methods: {
        linkVideo(){
            window.open(this.urlVideo)
        }
    },
}
</script>

<style lang="scss">

div.votreVideo{
    width: 70%;
    margin:auto;

    h1{
        text-align: center;
        margin-top: 50px;
        margin-bottom: 1em;
    }

    .lavideo{
        display: block;
        margin:auto;
    }

    p{
        margin-top: 20px;
        text-align: center;
    }
}
    
</style>