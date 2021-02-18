<template>
  <form @submit.prevent="startStream">
    <label for="stream-name">Titre du stream: </label>
    <input v-model="title" type="text" id="stream-name">

    <div>
      <p>Mode de diffusion: </p>
      <label for="public">Publique </label>
      <input type="radio" id="public" name="visibility">
      <label for="private">Privé </label>
      <input type="radio" id="private" name="visibility">
    </div>
    
    <div>
      <label for="anonymous">Anonyme</label>
      <input v-model="checkbox_anonymous" type="checkbox" id="anonymous">
    </div>

    <div>
      <label for="urgency">Mode urgence</label>
      <input v-model="checkbox_urgency" type="checkbox" id="urgency">
    </div>
    <button>START</button>
  </form>
      <video playsinline controls autoplay ref="video"></video>
</template>

<script>
  const peerConnections = {};
  const config = {
    iceServers: [
      {
        "urls": "stun:stun.l.google.com:19302"
      }
    ]
  };

  const io = require("socket.io-client");
  const socket = io.connect("http://localhost:4000");

export default {
  data() {
    return {
      title : "",
      checkbox_public: false,
      checkbox_private: false,
      checkbox_anonymous: false,
      checkbox_urgency: false
    }
  },

  methods: {
    startStream() {
      socket.on("answer", (id, description) => {
      peerConnections[id].setRemoteDescription(description);
      });

      socket.on("watcher", id => {
      const peerConnection = new RTCPeerConnection(config); // Création d'une connexion peer to peer à chaque fois qu'un nouveau client rejoins le stream
      peerConnections[id] = peerConnection;
      let stream = this.$refs.video.srcObject;
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream)); // Ajout du stream local à la connexion en utilisant la méthode addTrack() en lui passant en paramètre le stream et les données track
      // L'event peerConnection.onicecandidate est apellé quand nous recevons un ICE candidate et il l'envoi au serveur express
      peerConnection.onicecandidate = event => {
        if(event.candidate) {
          socket.emit("candidate", id, event.candidate);
        }
      };

    // Envoi d'une offre de connexion au client avec peerConnection.createOffer() et appel de peerConnection.setLocalDescription() pour configurer la connexion
    peerConnection
        .createOffer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit("offer", id, peerConnection.localDescription);
        });
    });

    socket.on("candidate", (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });

    // Ferme la connexion du pair lorsqu'un client se déconnecte
    socket.on("disconnectPeer", id => {
      peerConnections[id].close();
      delete peerConnections[id];
    });

    // Stop la connexion du socket quand le client ferme la fenêtre du navigateur
    window.onunload = window.onbeforunload = () => {
      socket.close();
    };
    

// ACCES A LA CAM ET MICRO
    function hasGetUserMedia() {
      return !!(navigator.mediaDevices &&
      navigator.mediaDevices.getUserMedia);
    };
    if (hasGetUserMedia()) {
      const constraints = {
        audio: true,
        video: true
      };
        
    navigator.mediaDevices.getUserMedia(constraints).
      then((stream) => {
        this.$refs.video.srcObject = stream
        socket.emit("broadcaster");
        });
      } else {
        alert('getUserMedia() is not supported by your browser');
      };
    
    }   

  } //methods
}
</script>

<style lang="scss" scoped>
  form {
    width: 50%;
    margin: auto;
    padding: 1em;
    border: 1px solid #CCC;
  }
</style>