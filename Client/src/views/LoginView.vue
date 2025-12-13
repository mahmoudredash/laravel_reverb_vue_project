<template>
    <div class="flex w-full items-center justify-center min-h-screen bg-gray-100">
        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
            <!-- Logo / Title -->
            <div class="flex flex-col items-center mb-6">
                <!-- Placeholder for logo -->
                <svg class="w-12 h-12 text-indigo-600 mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zM12 11c0-2.21 1.79-4 4-4s4 1.79 4 4v1h-8z" />
                </svg>
                <h2 class="text-2xl font-semibold text-gray-800">LOGIN</h2>
            </div>
            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-medium mb-1" for="email">Email</label>
                    <input v-model="form.email" id="email" type="email" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-medium mb-1" for="password">Password</label>
                    <input v-model="form.password" id="password" type="password" required class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <button type="submit" class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors">Sign In</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import useAuth from '@/composables/useAuth';
import router from '@/router';
import { reactive, onMounted, onBeforeMount } from 'vue';
     const {login:loginAction, authenticated} =  useAuth();
        onBeforeMount(() => {
            if (authenticated.value) {
                // router.removeRoute();
                router.push('/')
            }
        });
    
 const form = reactive({
        email: 'test@example.com',
        password: 'password'
     });
   
const handleLogin = () =>  {
   loginAction(form).then(()=>{
    router.push({name: 'home'});
   })
}
</script>

<style lang="scss" scoped>

</style>