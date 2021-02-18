<template>
    <div>
        Salut
    </div>
</template>

<script>
export default {
    data()
    {
        return{
            id:''
        }
    },
    methods: {

    },
    mounted()
    {
        /*Si pas de room existante avec
        
           connection.checkPresence(roomid, function(isRoomExist) {
            if (!isRoomExist) 
            {
                Faire un soft deletes et afficher stream fini
                PTet avec un event listener jsp
            }
        */
        if(this.$route.params.id)
        {
            let roomid = this.$route.params.id
            console.log(roomid)
            var connection = new RTCMultiConnection();
            // this line is VERY_important
            connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
            connection.session = {
                screen: true,
                oneway: true
            };
            connection.socketMessageEvent = 'screen-sharing';


            (function reCheckRoomPresence() {
                connection.checkPresence(roomid, function(isRoomExist) {
                    if (isRoomExist) {
                        connection.join(roomid);
                    }

                    //setTimeout(reCheckRoomPresence, 5000);
                });
            })();
        }
    }
}
</script>