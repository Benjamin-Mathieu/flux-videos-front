<template>
    <div class="FormLancerStream" v-if="formulaire">
        <h1 class="title">Lancer votre stream</h1>
        <form @submit.prevent="startStream">
                <input v-model="title" type="text" id="stream-name" placeholder="Titre du stream">
                    <div>
                        <label for="private">Mettre le stream en privé?</label>
                        <input v-model="checkbox_private" type="checkbox" id="private" name="visibility">
                    </div>
                    <div>
                        <label for="anonymous">Anonyme</label>
                        <input v-model="checkbox_anonymous" type="checkbox" id="anonymous">
                    </div>
                    <div>
                        <label for="urgency">Mode urgence</label>
                        <input @click="getPosition" v-model="checkbox_urgency" type="checkbox" id="urgency">
                    </div>
            <button id="startStream" ref="start-button">START</button>
        </form>
    </div>
    <div class="emitter-options" v-else>

        <video class="video-stream" autoplay></video>
        <div class="btnStream">
            <button class="StopStream" @click="stopStream">Arreter le stream</button>
            <!-- <button class="Download" @click="downloadStream">Download</button> -->
        </div>
        <p class="linkStream" v-if="url != ''">Lien du stream : <a :href="url">{{url}}</a></p>
        
        <!-- <p v-if="this.checkbox_private == true">Lien du stream : localhost:8080/stream/{{this.roomid}}</p> -->
    </div>
</template>

<script>
var connection = new RTCMultiConnection();
// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

let gps = [];

export default {
    data()
    {
        return{
            formulaire : true,
            title:'',
            checkbox_private: false,
            checkbox_anonymous:false,
            checkbox_urgency: false,
            stream : "",
            recorder: "",
            recordedChunks : [],
            streamArray : [],
            roomid : "",
            url: "",
        }
    },
    created() {
        // Appel de la fonction stopStream lorsque le streamer ferme l'onglet ou la page
        window.addEventListener('beforeunload', () => {
            this.stopStream();
        }, false);
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
    methods:
    {
                startStream()
        {
            let username;
            if(this.$store.state.UserCo == false){
                username = null;
            }else{
                username = this.$store.state.UserCo.username;
            }

            api.post('stream',
            {
                title:this.title,
                visibility: this.checkbox_private,
                anonymous: this.checkbox_anonymous,
                urgency: this.checkbox_urgency,
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
                console.log(this.checkbox_private + "inchalla")
                if(this.checkbox_private == true){
                    this.url = window.location.href + "/" + roomid;
                }
                
                this.roomid  =roomid;
                connection.open(roomid);
                console.log(connection)
                this.emitter.emit('charger-streams')
            }).catch(error=>
            {
                alert(error.response.data.message)
            })

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                console.log('getUserMedia supported.');
                navigator.mediaDevices.getUserMedia({audio: true, video:true})
                .then(stream => {
                    this.stream = stream;
                    const mediaStream = new MediaStream(stream);
                    const video = document.querySelector('video');
                    video.srcObject = mediaStream;

                    const mediaRecorder = new MediaRecorder(stream, {mimeType : "video/webm", audioBitsPerSecond: 12800, videoBitsPerSecond: 200000});
                    this.recorder = mediaRecorder;
                    console.log(this.recorder);
                    mediaRecorder.ondataavailable = e => {
                        this.recordedChunks.push(e.data);
                    }
                    mediaRecorder.start(100);
                    console.log(mediaRecorder.state);
                    console.log("recorder started");
                })
                .catch(e => { console.error('getUserMedia() failed: ' + e); });
            }
        },
        stopStream()
        {
            connection.getAllParticipants().forEach(function(pid) {
                connection.disconnectWith(pid);
            });

            // stop all local cameras
            connection.attachStreams.forEach(function(localStream) {
                localStream.stop();
            });

            // close socket.io connection
            connection.closeSocket();

            console.log(this.streamArray['id'])
            
            api.delete('/stream/'+this.streamArray['id']).then(response=>
            {
                alert('le stream est stop')
                this.downloadStream();
                this.$router.push('/video');
            }).catch(error=>{
                alert(error.response.data.message)
            })
        },
        downloadStream()
        {
            this.recorder.stop();
            this.stream.getTracks().forEach(track => { track.stop(); });
            let blob = new Blob(this.recordedChunks, {type: "video/webm"});
            let url =  URL.createObjectURL(blob);
            console.log(blob);
            console.log(this.streamArray)
            console.log(this.streamArray['id'])
            const data = new FormData()
            data.append('status',this.streamArray.visibility)
            data.append('data',blob)
            data.append('id_stream',this.streamArray['id'])
            api.post('/video',data
            ).then(response=>
            {
                alert('video envoyé')
            }).catch(error=>{
                alert(error.response.data.message)
            })
        }
    }//method
}
</script>

<style lang="scss" scoped>

div.FormLancerStream{
    width: 50%;
    padding: 1em;
    margin: auto;
    margin-top:50px;
    border-radius: 2%;
    box-shadow: 0px 0px 1em 0px;
    text-align: center;

    form {
        display: flex; justify-content: center; align-items: center; flex-direction: column;

        label {
            margin-right: .7em;
        }

        #stream-name {
            width: 50%;
            padding: .7em;
            margin-bottom: 2em;

            height: 3em;
            margin-top: 20px;
            border-radius: .7em;
            border: 1px solid #ccc;
            padding: .3em;
        }

        #startStream{
            border: none;
            margin-top: 2em;
            padding: 1em;
            width: 30%;
            background-color: rgb(110, 101, 230);
            color: white;
            border-radius: .3em;
            opacity: .9;
        }
        #startStream:hover {
            cursor: pointer;
            opacity: 1;
            transition: .3s ease-in;
        }

    }

}
.video-stream {
    display:block;
    margin:auto;
    margin-top:30px;
    width: 50%;
}

div.btnStream{
    margin: auto;
    width: fit-content;
    .StopStream{
        margin: auto;
        margin-top: 1em;
        margin-right: 30px;
        background-color: #ff2828;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 1em;
        opacity: 0.9;
    }

    .Download{
        margin: auto;
        margin-top: 1em;
        background-color: rgb(110, 101, 230);
        color: white;
        border: none;
        border-radius: 5px;
        padding: 1em;
        opacity: 0.9;
    }
}

p.linkStream{
    margin-top:1em;
    text-align:center;
}



    
</style>