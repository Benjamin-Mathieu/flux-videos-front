<template>
    <div class="watch-stream">
        <div class="stream"></div>
        <div class="streamer">
            <div class="info-streamer">
                <img src="../assets/icons/add_a_photo-24px.svg" alt="avatar-streamer" class="avatar-streamer">
                <div>
                    <h3>Pseudo du streamer</h3>
                    <button @click="subscribeStreamer"><img src="../assets/icons/heart.svg" alt="like-button"></button>
                    <p>Description....</p>
                </div> 
            </div>
            <div class="social-icons">
                <a href="" target="_blank"><img src="../assets/icons/facebook.svg" alt="fb-icon"></a>
            </div>
        </div>
        <div id="map"></div>


        <div class="chat">
            <ul id="messages"></ul>
            <form id="form" action="">
                <input id="input" autocomplete="off" /><button>PUTE</button>
            </form>
        </div>


    </div>
</template>

<script>


// var socket = io();

// var messages = document.getElementById('messages');
// var form = document.getElementById('form');
// var input = document.getElementById('input');

// form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     if (input.value) {
//         socket.emit('chat message', input.value);
//         input.value = '';
//     }
// });

// socket.on('chat message', function(msg) {
//     var item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });


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
                marker.bindPopup("<b>Lieu du stream</b>").openPopup();
                map.addLayer(openStreetMapLayer);

            }).catch(error=>
            {
                console.log("error")
            })
        } 
    },
    methods: {
        subscribeStreamer() {
            alert('Like');
        }
    }
}
</script>

<style lang="scss">

    .watch-stream {
        .stream {
            width: 80%;
            margin: auto;
            video {
                width: 100%;
            }
        }

        .streamer {
            width: 80%;
            .avatar-streamer {
                width: 80px; height: 80px;
            }
            div {
                margin: .7em;
            }
            .info-streamer {
                display: flex;
            }
            button {
                background-color: transparent;
                border: none;
            }
            display: flex; justify-content: space-between;
            margin: auto;
        }

        #map {
            width: 800px; height: 400px;
            margin: auto;
        }

        .chat {

        }

    }
    
</style>