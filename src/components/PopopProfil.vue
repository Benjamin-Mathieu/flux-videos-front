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
            <a href="" @click="Disconected">
                <img src="../assets/icons/log-out.svg" alt="icons">
                Se Déconnecter
            </a>

            <br>
            <router-link to="/Edit-profile">
            <img src="../assets/icons/edit.svg" alt="">
            <a href="">Editer profil</a>
            </router-link>

            <router-link to="/video">
                <img src="../assets/icons/video.svg" alt="icons">
                Mes vidéos
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
        margin-top: 389.2px;
        position: absolute;
        right: 0%;
        width: 250px;
        opacity: 0.9;
        @media screen and (min-width:320px) and(max-width: 600px) {
            margin-top: 310px;
        }

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
            margin: 0.3em 0;
            p{
                text-align:center;
                color: white;
            }
        }
        div.btn{
            margin: 0.3em 0; display: flex; flex-direction: column;
            img{
                margin: 0 .3em;
                vertical-align: bottom;
            }
            a{
                color:white;
            }
            a:hover {
                background-color: rgba(232, 232, 232, 0.2);
            }

            > * {
                margin-bottom: .3em;
            }
            @media screen and (min-width:320px) and(max-width: 600px) {
                a{
                    font-size: 11px;
                }
            }
        }
    }

    @media screen and (min-width:320px) and(max-width: 600px) {
        div.sidebarProfil{
            width: 25%;
        }
    }
div.sidebarProfil-toggled-of{
    display: block;
}

</style>

