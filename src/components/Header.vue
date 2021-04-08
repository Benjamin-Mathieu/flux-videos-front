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

let gps = [];

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
      roomid : "",
      url: "",
    };
  },

  mounted() {
    var startPos;
    var geoSuccess = (position) => {
        startPos = position;
        let latitude = startPos.coords.latitude;
        let longitude = startPos.coords.longitude;
        gps.push(latitude, longitude);
    };
    console.log(gps);
    navigator.geolocation.getCurrentPosition(geoSuccess);
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
      let username;
      if(this.$store.state.UserCo == false){
          username = null;
      }else{
          username = this.$store.state.UserCo.username;
      }

      api.post('stream',
      {
          title: "Urgent",
          visibility: true,
          anonymous: false,
          urgency: true,
          username: username,
          latitude: gps[0],
          longitude: gps[1]
      }).then(response =>
      {
          connection.autoCreateMediaElement = false;
          this.formulaire = false
          this.streamArray = response.data
          console.log(response.data);
          connection.session = {
              audio: true,
              data: true,
              video: true,
              //screen: true,
              oneway: true
          };
          connection.socketMessageEvent = 'screen-sharing';
          connection.sdpConstraints.mandatory = {
              OfferToReceiveAudio: true,
              OfferToReceiveVideo: true
          }
          let roomid = response.data.id;
          this.url = window.location.href + "/" + roomid;
          this.roomid  =roomid;
          connection.open(roomid);
          console.log(connection)

          window.open(window.location + "stream/" + this.roomid); //ouvre le stream dans le lien

          this.emitter.emit('charger-streams')
      }).catch(error=>
      {
          alert(error.response.data.message)
      })
      
      // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      //     console.log('getUserMedia supported.');
      //     navigator.mediaDevices.getUserMedia({audio: true, screen :true})
      //     .then(stream => {
      //         this.stream = stream;
      //         const mediaStream = new MediaStream(stream);
      //         const video = document.querySelector('video');
      //         video.srcObject = mediaStream;

      //         const mediaRecorder = new MediaRecorder(stream, {mimeType : "video/webm", audioBitsPerSecond: 12800, videoBitsPerSecond: 200000});
      //         this.recorder = mediaRecorder;
      //         console.log(this.recorder);
      //         mediaRecorder.ondataavailable = e => {
      //             this.recordedChunks.push(e.data);
      //         }
      //         mediaRecorder.start(100);
      //         console.log(mediaRecorder.state);
      //         console.log("recorder started");
      //     })
      //     .catch(e => { console.error('getUserMedia() failed: ' + e); });
      // }
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
