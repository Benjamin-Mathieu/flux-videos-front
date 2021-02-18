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
        </div>

    </div>
</template>
<script>
export default {
    data()
    {
        return{
            formulaire : true,
            title:'',
            checkbox_private: false,
            checkbox_anonymous:false,
            checkbox_urgency: false
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
                var connection = new RTCMultiConnection();

                // this line is VERY_important
                connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

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
            //windows en cas de ragequit
            api.delete('stream').then(response=>
            {
                
                connection.closeSocket();
            }).catch(error=>{
                alert(error.response.data.message)
            })
        }
    }
}
</script>
<style scoped>
video{
    width:50%;
}
</style>