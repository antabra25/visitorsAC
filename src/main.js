import {createApp} from 'vue'
import store from './store/index.js'
import App from "./App.vue";
import "./index.css";
import "./assets/general.css";
import router from "./router/index.js";
import axios from "axios";
import VueAxios from "vue-axios";


axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.headers.post['Content-Type'] = 'application/json';
const app = createApp(App);
app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.mount('#app');

