<template>
    <div class="watch-stream">
        <h1>{{this.stream.title}}</h1>
        <div class="stream"></div>
        <div class="streamer">
            <div class="info-streamer">
                <img v-if="this.stream.anonymous == 0" class="gravatar" :src="'https://avatars.dicebear.com/api/bottts/'+this.creator.mail+'.svg'" alt="Avatar" width="20px">
                <img v-else class="gravatar" :src="'https://avatars.dicebear.com/api/bottts/imAnAnonymeUserIncroyable.svg'" alt="Avatar" width="20px">
                <div>
                    <router-link v-if="this.stream.anonymous == 0" :to="{name:'profile',params:{id:this.creator.id}}">
                        <h3 >{{this.creator.username}}</h3>
                    </router-link>
                    <h3 v-else>Anonymous User</h3>
                    <button class="subscribeStreamer" @click="subscribeStreamer"><img src="../assets/icons/heart.svg" alt="like-button"></button>
                    <p v-if="this.stream.anonymous == 0">{{this.creator.description}}</p>
                </div> 
            </div>
            <div class="social-icons">
                <a href="" target="_blank"><img src="../assets/icons/facebook.svg" alt="fb-icon"></a>
            </div>
        </div>
        <div v-if="this.stream.urgency != 0" id="map"></div>
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
import icon from '../../node_modules/leaflet/dist/images/marker-icon.png';


var connection = new RTCMultiConnection();
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

export default {
    data() {
        return {
            creator : [],
            stream : [],
        }
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
                let map = L.map("map").setView([latitude, longitude], 17);
                console.log(response.data);
                this.creator = response.data.creator;
                this.stream = response.data;
                console.error("hnezrfjuhngzhunejiglfkzegnheznghje");
                console.log(this.creator)
                let openStreetMapLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors',
                        maxZoom: 100,
                        tileSize: 512,
                        zoomOffset: -1
                    });

                let DefaultIcon = L.icon({
                        iconUrl: icon,
                        iconSize:   [30, 50], // size of the icon
                        iconAnchor: [15, 50]
                    });
                L.Marker.prototype.options.icon = DefaultIcon;


                L.marker([latitude, longitude]).addTo(map);
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
        },
        // test() {
        //     let users = [];
        //     connection.getAllParticipants().forEach(function(participantId) {
        //             var user = connection.peers[participantId];

        //             users.push(user);
        //         });
        //         console.log(users.length);
        // }
    }
}
</script>

<style lang="scss">

    .watch-stream {
        h1{
            text-align: center;
            margin-top:50px;
        }
        .stream {
            width: 80%;
            margin: auto;
            
            video {
                width: 100%;
            }
        }

        .streamer {
            width: 80%;
            
            img.gravatar {           
                width: 80px;   
            }
            div {
                margin: .7em;
            }
            .info-streamer {
                display: flex;
                background-color: #CCC; border-radius: 50%; height: 50px; width: 50px;
                margin-right: 1em;
                z-index: 1;
            }
            display: flex; justify-content: space-between;
            margin: auto;
        }

        #map {
            width: 800px; height: 400px;
            margin: auto;
        }

        button{
            width: 10%;
            height: 50px;
            color: white;
            background-color: rgb(25, 12, 214);
            border: none;
            border-radius: .3em;
            opacity: 0.9;
            
        }
        button:hover {
            cursor: pointer;
            opacity: 1;
            transition: .3s ease-in;
        }
        

        .chat {

        }

    }
    
</style>