<template>
    <div>
        <div v-if="formulaire">
        <form @submit.prevent="startStream">
        <label for="stream-name">Titre du stream: </label>
        <input v-model="title" type="text" id="stream-name">

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
        <input v-model="checkbox_urgency" type="checkbox" id="urgency">
        </div>
        <button ref="start-button">START</button>
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
            recordedChunks : []
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

                connection.session = {
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
        },
        stopStream()
        {
            // windows en cas de ragequit
            api.delete('stream/' + connection.sessionid).then(response=>
            {
                connection.closeSocket();
            }).catch(error=>{
                alert(error.response.data.message)
            })
        },
        recordStream()
        {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log('getUserMedia supported.');
            navigator.mediaDevices.getUserMedia({audio:true, screen: true, oneway: true})

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
        },//recordStream
        downloadStream()
        {
            this.recorder.stop();
            this.stream.getTracks().forEach(track => { track.stop(); });
            let blob = new Blob(this.recordedChunks, {type: "video/webm"});
            let url =  URL.createObjectURL(blob);
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = this.clipName + '.webm';
            a.click();
            setTimeout(function() { URL.revokeObjectURL(url); }, 100);
        }
    }//method
}
</script>