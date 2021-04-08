<template>
    <div class="sidebarProfil" :class="{ 'sidebarProfil-toggled-of': !isOpenProfil}">

        <div class="img">
            <img src="https://avatars.dicebear.com/api/bottts/gablapute.svg" alt="">
        </div>
        <div class="information">
            <p class="pseudo">Pseudo</p>
            <p class="email">emaio@gmail.com</p>
        </div>
        <hr>
        <div class="btn">
            <router-link to="">
                <img src="../assets/icons/log-out.svg" alt="">
                <a href="">Se Déconnecter</a>
            </router-link>

            <br>
            <router-link to="">
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
  data() {
    return {
      isOpenProfil: true
    };
  },

  mounted() {
    this.emitter.on("toggle-sidebarProfil", isOpenProfil => {
      this.isOpenProfil = isOpenProfil;
    });
  }
};
</script>

<style lang="scss">

.main2{
    float:right;
    border: 1px solid black;
    width: 15%;
    background-color: #474747;

    div.sidebarProfil{
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
}

div.sidebarProfil-toggled-of{
    display: none;
}

    
</style>

