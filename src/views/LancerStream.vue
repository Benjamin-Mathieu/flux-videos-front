<template>
    <div>
        <div class="FormLancerStream" v-if="formulaire">
            <h1 class="title">Lancer votre stream</h1>
            <form @submit.prevent="startStream">
                <div class="stream-name">
                    <label for="stream-name">Titre du stream: </label>
                    <br>
                    <input v-model="title" type="text" id="stream-name" placeholder="Titre du stream">
                </div>
                
                <div class="private-stream">
                    <label for="private">Mettre le stream en privé?</label>
                    <input v-model="checkbox_private" type="checkbox" id="private" name="visibility">
                </div>
                
                <div class="ano-stream">
                    <label for="anonymous">Anonyme</label>
                    <input v-model="checkbox_anonymous" type="checkbox" id="anonymous">
                </div>

                <div class="urgency-stream">
                    <label for="urgency">Mode urgence</label>
                    <input v-model="checkbox_urgency" type="checkbox" id="urgency">
                </div>

                <button class="startStream" ref="start-button">START</button>
            </form>
        </div>
        <div v-else>
            <button @click="stopStream">Arreter le stream</button>
            <button @click="recordStream">Record</button>
            <button @click="downloadStream">Download</button>
            <video></video>
        </div>

    </div>
</template>

<script>
var connection = new RTCMultiConnection();
// this line is VERY_important
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

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
            streamArray : []
        }
    },
    mounted()
    {

    },
    methods:
    {
        startStream()
        {
            api.post('stream',
            {
                title:this.title,
                visibility: this.checkbox_private,
                anonymous: this.checkbox_anonymous,
                urgency: this.checkbox_urgency
            }).then(response =>
            {
                this.formulaire = false
                this.streamArray = response.data
                console.log(response.data);
                connection.session = {
                    // audio: true,
                    // video: true,
                    screen: true,
                    oneway: true
                };
                connection.socketMessageEvent = 'screen-sharing';
                connection.sdpConstraints.mandatory = {
                    OfferToReceiveAudio: false,
                    OfferToReceiveVideo: false
                }
                let testid = response.data.id;
                connection.open(testid);
                console.log(connection)
                this.emitter.emit('charger-streams')
            }).catch(error=>
            {
                alert(error.response.data.message)
            })

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                console.log('getUserMedia supported.');
                navigator.mediaDevices.getUserMedia({audio:true, screen: true, video: true})

                // Success callback
                .then(stream => {
                    this.stream = stream;
                    
                    const mediaStream = new MediaStream(stream);
                    const video = document.querySelector('video');
                    video.srcObject = mediaStream;

                    const mediaRecorder = new MediaRecorder(stream, {mimeType : "video/webm"});
                    this.recorder = mediaRecorder;
                    
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
            // windows en cas de ragequit
            api.delete('/stream/'+this.streamArray['id']).then(response=>
            {
                alert('le stream est stop')
                this.$router.push('/');
            }).catch(error=>{
                alert(error.response.data.message)
            })
        },
        downloadStream()
        {
            this.recorder.stop();
            this.stream.getTracks().forEach(track => { track.stop(); });
            let blob = new Blob(this.recordedChunks, {type: "video/mpeg"});
            let url =  URL.createObjectURL(blob);
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = this.clipName + '.mpeg';
            a.click();
            setTimeout(function() { URL.revokeObjectURL(url); }, 100);
        }
    }//method
}
</script>

<style lang="scss">

div.FormLancerStream{
    border: solid 1px black;
    width: 50%;
    margin: auto;
    margin-top:50px;
    border-radius: 2%;
    box-shadow: 0px 0px 30px 0px;

    h1.title{
        text-align: center;
        font-size: 40px;
        margin-bottom: 40px;
        margin-top:40px;
    }

    div.stream-name{
        width: 80%;
        margin: auto;
        margin-bottom: 20px;
        input{
            width: 100%;
            height: 40px;
        }
    }
    div.private-stream{
        width: 80%;
        margin: auto;
        margin-bottom: 20px;
        position: relative;
        padding: 15px 30px 15px 62px;
        border: 3px solid #fff;
        border-radius: 100px;
        color: #fff;
        background-color: #6a8494;
        box-shadow: 0 0 20px rgba(0, 0, 0, .2);

        input[type="checkbox"]{
            margin-left: 20px;
        }
    }

    div.ano-stream{
        width: 80%;
        margin: auto;
        margin-bottom: 20px;
        position: relative;
        padding: 15px 30px 15px 62px;
        border: 3px solid #fff;
        border-radius: 100px;
        color: #fff;
        background-color: #6a8494;
        box-shadow: 0 0 20px rgba(0, 0, 0, .2);

        input[type="checkbox"]{
            margin-left: 20px;
        }
    }

    div.urgency-stream{
        width: 80%;
        margin: auto;
        margin-bottom: 20px;
        position: relative;
        padding: 15px 30px 15px 62px;
        border: 3px solid #fff;
        border-radius: 100px;
        color: #fff;
        background-color: #6a8494;
        box-shadow: 0 0 20px rgba(0, 0, 0, .2);

        input[type="checkbox"]{
            margin-left: 20px;
        }
    }

    button.startStream{
        display: block;
        margin: auto;
        margin-top: 20px;
        margin-bottom: 40px;
        width: 40%;
        height: 55px;
        
        background-color: rgb(110, 101, 230);
        color: white;
        border-radius: 10px;
    }

}
    
</style>