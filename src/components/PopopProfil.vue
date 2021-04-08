<template>
    <div v-if="this.isOpenProfil" class="sidebarProfil">

        <div class="img">
            <img class="gravatar" :src="'https://avatars.dicebear.com/api/bottts/'+this.$store.state.UserCo['email']+'.svg'" alt="Avatar" width="20px">
        </div>
        <div class="information">
            <p class="pseudo">{{this.$store.state.UserCo['username']}}</p>
            <p class="email">{{this.$store.state.UserCo['email']}}</p>
        </div>
        <hr>
        <div class="btn">
            <a @click="Disconected">
                <img src="../assets/icons/log-out.svg" alt="">
                <a href="">Se Déconnecter</a>
            </a>

            <br>
            <router-link to="/Edit-profile">
            <img src="../assets/icons/edit.svg" alt="">
            <a href="">Editer profil</a>
            </router-link>
            <br>
            <router-link to="">
            <img src="../assets/icons/video.svg" alt="">
            <a href="">Mes vidéos</a>
            </router-link>

        </div>
        
    </div>

</template>

<script>
export default {
  props:['isOpenProfil'],
  methods: {
      Disconected(){
        this.$store.commit('setToken', false);
        this.$store.commit('setUserCo', false);
        this.$router.push('/connexion');
      }
  },
};
</script>

<style lang="scss">

    div.sidebarProfil{
        background-color: #474747;
        margin-top:300px;
        position: absolute;
        right: 0%;
        width: 10%;
        div.img{
            border: 1px solid black;
            border-radius: 100% ;
            width: 60%;
            margin:auto;
            margin-top: 15px;

            img{
                display: block;
                width: 100%;
                margin: auto;

            }
        }

        div.information{
            p{
                text-align:center;
                color: white;
            }
        }
        div.btn{
            
            img{
                margin-left:2%;
            }
            a{
                color:white;
            }
        }
    }


div.sidebarProfil-toggled-of{
    display: block;
}

    
</style>

