import { createApp } from 'vue'
import App from './App.vue'
import { echo } from './plugins/echo';

// import './plugins/echo'; 
const app =createApp(App);

// app.use(router);
app.use(echo);
app.mount('#app')
