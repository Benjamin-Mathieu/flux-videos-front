<template>
  <header>

    <button @click="showSideBar">
      <img class="icons" src="../assets/icons/menu-white-36dp.svg" alt="menu" />
    </button>
    <br>
    <Sidebar  :isOpen="this.isOpen"/>
    
    <form action="" class="search">
      <input type="text" placeholder="Rechercher" />
      <img class="icons" src="../assets/icons/search-black-36dp.svg" alt="search"/>
    </form>

    <button @click="launchUrgencyStream" class="stream-buttons">URGENCE</button>
    <button v-if="this.$store.state.UserCo" class="stream-buttons">
      <router-link to="/stream">Lancer Stream</router-link>
    </button>
    
    <img v-if="this.$store.state.UserCo" class="icons" src="../assets/icons/notifications_none-white-36dp.svg" alt="notifications"/>
    <button v-if="this.$store.state.token" @click="showSideBarProfile">
      <img class="icons" src="../assets/icons/account_circle-white-36dp.svg" alt="profil"/>
    </button>

    <button v-else @click="Connexion" style="background-color: transparent; border: none;">
      <img class="icons" src="../assets/icons/log-out.svg" alt="profil"/>
    </button>
    <SidebarProfil :isOpenProfil="this.isOpenProfil"/>
    
  </header>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import SidebarProfil from "@/components/PopopProfil.vue";

var connection = new RTCMultiConnection();
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

export default {
  components: {
    Sidebar,
    SidebarProfil
  },
  data() {
    return {
      sidebarOpen: false,
      sidebarProfil: true,
      isOpen: false,
      isOpenProfil: false,
      streamArray: [],
      stream : "",
      recorder: "",
      recordedChunks : [],
      streamArray : [],
    };
  },

  methods: {
    Connexion(){
      this.$router.push('/connexion');
    },
    showSideBar(){     
      this.isOpen = !this.isOpen;
      console.log(this.isOpen)

    },
    showSideBarProfile(){     
      this.isOpenProfil = !this.isOpenProfil;
      //console.log(this.isOpenProfil)
    },

    launchUrgencyStream() {
      connection.autoCreateMediaElement = false;
      api.post('stream',
      {
          title: "Urgent",
          visibility: true,
          anonymous: false,
          urgency: true
      }).then(response =>
      {
          this.streamArray = response.data
          connection.session = {
              audio: true,
              video: true,
              //screen: true,
              oneway: true
          };
          connection.socketMessageEvent = 'screen-sharing';
          connection.sdpConstraints.mandatory = {
              OfferToReceiveAudio: false,
              OfferToReceiveVideo: false
          }
          let testid = response.data.id;
          connection.open(testid);
          this.emitter.emit('charger-streams')
      }).catch(error=>
      {
          alert(error.response.data.message)
      })

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          console.log('getUserMedia supported.');

          navigator.mediaDevices.getUserMedia({audio:true, screen: true, video: true})
          .then(stream => {
              this.stream = stream;
              
              const mediaStream = new MediaStream(stream);
              video.srcObject = mediaStream;

              const mediaRecorder = new MediaRecorder(stream, {mimeType : "video/webm"});
              this.recorder = mediaRecorder;
              
              mediaRecorder.ondataavailable = e => {
                  this.recordedChunks.push(e.data);
              }
              mediaRecorder.start(100);
          })
          .catch(e => { console.error('getUserMedia() failed: ' + e); });
      }
        
    }
  }
};
</script>

<style lang="scss">
header {
  button:first-of-type{
    background-color: transparent;
    border: none;
  }

  button:nth-child(8){
    background-color: transparent;
    border: none;
  }



  height: 80px;
  background-color: #474747;
  display: flex; justify-content: center; align-items: center;
  .icons {
    height: 30px;
    width: 30px;
  }

  .stream-buttons {
    background-color: #ff2828;
    color: whitesmoke;
    padding: 0.7em;
    border-radius: 0.3em;
    border: none;
    margin: 1em;

    a{
      color: whitesmoke;
    }
  }

  form.search {
    position: relative;
    margin-right: auto;
    display: flex;
    align-items: center;

    img {
      transform: translateX(-30px);
    }

    input[type="text"] {
      height: 100%;
      width: 150px;
      padding: 0.5em;
      font-size: 1em;
      border: 1px solid grey;
      float: left;
      background: #f1f1f1;
      transition: width 0.7s ease-in-out;
    }

    input[type="text"]:focus {
      width: 600px;
    }
  }
}
</style>
