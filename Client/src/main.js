import { createApp } from 'vue'
import App from './App.vue'
import { echo } from './plugins/echo';
import router from './router';
import axios from 'axios';
axios.defaults.baseURL = "http://project.test";

const app =createApp(App);

app.use(router);
app.use(echo);
app.mount('#app')
