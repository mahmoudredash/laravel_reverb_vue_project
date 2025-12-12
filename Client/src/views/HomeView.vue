<script setup>
import axios from 'axios';
import { reactive } from 'vue';

     const form = reactive({
        email: 'test@example.com',
        password: 'password'
     });

     const login = () => {
        axios.get('/sanctum/csrf-cookie');
        axios.post('/login', form).then((response) => {
            console.log(response);
        });
     };
</script>
<template>
    <div>
        <form action="" @submit.prevent="login">
            <input type="email" v-model="form.email">
            <input type="password" v-model="form.password">
            <button type="submait">Login</button>
        </form>
    </div>
</template>



 