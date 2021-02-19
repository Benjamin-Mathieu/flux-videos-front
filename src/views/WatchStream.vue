<template>
    <div class="watch-stream">
        <div class="stream"></div>
        <div id="map"></div>
    </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";


export default {
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
                audio: true,
                video: true,
                oneway: true
            };
            connection.socketMessageEvent = 'screen-sharing';

            connection.onstream = function(event) {
                let video = event.mediaElement;
                let stream = document.querySelector(".stream").appendChild(video);
                stream.classList.add("stream");
            }; 


            (function reCheckRoomPresence() {
                connection.checkPresence(roomid, function(isRoomExist) {
                    if (isRoomExist) {
                        connection.join(roomid);
                    }

                    // setTimeout(reCheckRoomPresence, 5000);
                });
            })();
            
// Ajout de la carte Leaflet pour le stream
            api.get("stream/" + roomid)
            .then(response => {
                let latitude = response.data.latitude;
                let longitude = response.data.longitude;
                console.log(latitude, longitude);
                let map = L.map("map").setView([latitude, longitude], 15);
            
                let openStreetMapLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 50
                    });

                let marker = L.marker([latitude, longitude]).addTo(map);
                marker.bindPopup("<b>Vous êtes ici !</b>").openPopup();
                map.addLayer(openStreetMapLayer);

            }).catch(error=>
            {
                console.log("error")
            })
        }

        
    }
}
</script>

<style lang="scss">

    .watch-stream {
        .stream {
            width: 80%;
            margin: auto;
        }
        #map {
            height: 400px; width: 400px;
        }

    }
    
</style>