import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mitt from "mitt";
import axios from 'axios'


const emitter = mitt();
let app = createApp(App);
window.api = axios.create({
    baseURL: 'http://192.168.0.11:8081/api/',
    withCredentials: false
    /*headers: {
        'crossorigin': 'true',
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    }*/
});
app.config.globalProperties.emitter = emitter;
app.use(store);
app.use(router);
app.mount("#app");
