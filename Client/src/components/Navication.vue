<template>
    <nav class="flex items-center justify-between bg-gray-800 p-4 text-white">
        <!-- Left side: logo and navigation items -->
        <div class="flex items-center space-x-4">
            <span class="text-xl font-bold">Products Name</span>
            <RouterLink  v-if="authenticated" to="/" class="hover:underline">Dashboard</RouterLink>
            <RouterLink    to="/about" class="hover:underline">About</RouterLink>
        </div>

        <!-- Right side: user name and auth buttons -->
        <div class="flex items-center space-x-2">
            <span  v-if="authenticated" class="mr-2">{{ user.name }}</span>
            <button v-if="authenticated" @click="logoutHandel"  class="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded">Logout</button>
            <RouterLink to="/login" v-else class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded">Login</RouterLink>
        </div>
    </nav>
</template>

<script setup>
import useAuth from '@/composables/useAuth';

    const {authenticated, user, logout} = useAuth();

    const logoutHandel = async() => {
        await logout();
        window.location.reload()
    }


</script>

<style lang="scss" scoped>

</style>