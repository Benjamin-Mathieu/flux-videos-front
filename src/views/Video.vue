<template>

    <div class="votreVideo">
        <h1>Votre vidéo</h1>
        <video class="lavideo" controls></video>
        <p>Lien de votre vidéo : <a :href="'http://2a9e322e8276.ngrok.io/videos/'+this.video.name+'.webm'">Link</a></p>
    </div>
    
</template>

<script>
export default {
    data() {
        return {
            video : '',
        }
    },
    mounted() {
        
        this.$store.state.video.forEach(video => {

            if(video.id == this.$route.params.id){
                this.video = video;
                let link = "http://2a9e322e8276.ngrok.io/videos/"+video.name+".webm";
                let lavideo = document.querySelector(".lavideo");
                lavideo.src = link
            }
            
        });

    },
    methods: {
        linkVideo(){
            window.open("http://2a9e322e8276.ngrok.io/videos/"+this.video.name+".webm")
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