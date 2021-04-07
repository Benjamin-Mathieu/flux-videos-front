import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import mitt from "mitt";
import axios from 'axios';

const emitter = mitt();
let app = createApp(App);
window.api = axios.create({
    baseURL: "http://aac74449caf2.ngrok.io/api",
    withCredentials: false
});
app.config.globalProperties.emitter = emitter;
app.use(store);
app.use(router);
app.mount("#app");
