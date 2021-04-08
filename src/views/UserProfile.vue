<template>
    <div class="the-profile">
        <div class="personal-information">
            <img class="gravatar" :src="'https://avatars.dicebear.com/api/bottts/'+this.user.mail+'.svg'" alt="Avatar" width="20px">
            <div>
                <h1>{{this.user.username}}</h1>
                <img src="../assets/icons/heart.svg" alt="like-button">
            </div>

        </div>
        <hr>
        <div class="bio">
            <h3>Biographie:</h3>
            <p v-if="this.user.descritpion != ''">{{this.user.description}}</p>
            <p v-else>Pas de description....</p>
        </div>
        <hr>
        <div class="social-media">
            <a href="" target="_blank"><img src="../assets/icons/facebook.svg" alt="fb-icon"></a>
            <a href="" target="_blank"><img src="../assets/icons/instagram.svg" alt="fb-icon"></a>
            <a href="" target="_blank"><img src="../assets/icons/twitter.svg" alt="fb-icon"></a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: [],
        }
    },

    mounted() {
        this.getProfile();
    },

    methods: {
        getProfile(){
            if(this.$route.params.id){
                api.get("user/"+this.$route.params.id).then(response => {              
                    console.log(response.data.user);
                    this.user = response.data.user;
                    console.log(this.user.description)
                }).catch(error => {
                    console.error(error.response.data.message)
                })
            }

        }
    },
}
</script>

<style lang="scss">

div.the-profile{
    width: 50%;
    margin:auto;
    margin-top: 50px;
    border: 1px solid black;
    box-shadow: 0px 0px 1em 0px;
    border-radius: 2%;
    padding: 1.5em;

    hr{
        width: 80%;
        margin: auto;
        border: solid 1px rgba($color: #a1a1a1, $alpha: 0.5);
        margin-top: 20px;
    }

    div.personal-information{
        width: 100%;
        margin:auto;
        margin-top: 50px;

        img.gravatar{
            display: block;
            margin:auto;
            width: 200px;
        }

        div{
            display: flex;
            margin: auto;
            width: fit-content;
            h1{
                text-align: center;
                margin-right : 20px;
            }

        }
    }

    div.bio{

        margin-top: 20px;
        display: flex;
    }

    div.social-media{
        margin-top: 50px;
        display: flex;
        justify-content: space-evenly;
    }



}




    
</style>