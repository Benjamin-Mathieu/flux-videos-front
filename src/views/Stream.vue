<template>
  <div>
    <h2>Lancer webcam/audio</h2>
    <button @click="startStream" id="start">START</button>
    <video playsinline controls autoplay ref="video"></video>

  </div>
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
  methods: {
    startStream() {
      socket.on("answer", (id, description) => {
      peerConnections[id].setRemoteDescription(description);
      });

      socket.on("watcher", id => {
      const peerConnection = new RTCPeerConnection(config); // Création d'une connexion peer to peer à chaque fois qu'un nouveau client rejoins le stream
      peerConnections[id] = peerConnection; // 
      let stream = this.$refs.video.srcObject;
      stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
      peerConnection.onicecandidate = event => {
        if(event.candidate) {
          socket.emit("candidate", id, event.candidate);
        }
      };

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

    socket.on("disconnectPeer", id => {
      peerConnections[id].close();
      delete peerConnections[id];
    });

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
        //video: true
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