<template>
    <div>
        <h1>Watch stream</h1>
        <video playsinline controls autoplay ref="watcher"></video>
    </div>
</template>

<script>
let peerConnection;
const config = {
  iceServers: [
      { 
        "urls": "stun:stun.l.google.com:19302",
      },
    ]
};

const io = require("socket.io-client");
const socket = io.connect("http://localhost:4000");
console.log(socket)

export default {
    mounted() {
        socket.on("offer", (id, description) => {
            peerConnection = new RTCPeerConnection(config);
            peerConnection
            .setRemoteDescription(description)
            .then(() => peerConnection.createAnswer())
            .then(sdp => peerConnection.setLocalDescription(sdp))
            .then(() => {
            socket.emit("answer", id, peerConnection.localDescription);
            });
            peerConnection.ontrack = event => {
            this.$refs.watcher.srcObject = event.streams[0];
            };

            peerConnection.onicecandidate = event => {
                if (event.candidate) {
                socket.emit("candidate", id, event.candidate);
                }
             };
            });

            socket.on("candidate", (id, candidate) => {
            peerConnection
                .addIceCandidate(new RTCIceCandidate(candidate))
                .catch(e => console.error(e));
            });

            socket.on("connect", () => {
            socket.emit("watcher");
            });

            socket.on("broadcaster", () => {
            socket.emit("watcher");
            });

            window.onunload = window.onbeforeunload = () => {
            socket.close();
            peerConnection.close();
            };
    }
}
</script>