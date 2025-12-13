import { createApp } from 'vue'
import App from './App.vue'
import { echo } from './plugins/echo';
import router from './router';
import axios from 'axios';
import './main.css'
import useAuth from './composables/useAuth';

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;



const app =createApp(App);
const {attemp} = useAuth();



app.use(router);
app.use(echo);


attemp().then(() => {
    app.mount('#app');
}).catch(()=>{
    app.mount('#app');
})
