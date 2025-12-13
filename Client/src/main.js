import { createApp } from 'vue'
import App from './App.vue'
import { echo } from './plugins/echo';
import router from './router';
import axios from 'axios';
import './main.css'
import useAuth from './composables/useAuth';

axios.defaults.baseURL = "http://project.test";



const app =createApp(App);
const {attemp} = useAuth();



app.use(router);
app.use(echo);


attemp().then(() => {
    app.mount('#app');
}).catch(()=>{
    app.mount('#app');
})
