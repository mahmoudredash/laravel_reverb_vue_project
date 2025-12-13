<script setup>
import Header from '@/components/Header.vue';
import useAuth from '@/composables/useAuth';
import { onMounted } from 'vue';
const {authenticated} = useAuth();
 

     
onMounted(()=>{
 if (!   authenticated.value) {
                // router.removeRoute();
                router.push('/login')
            }
})


</script>
<template>
    <div class="grid-rows-1 mt-8 flex justify-content-center items-center">
         <Header title="Home Page" /> 
    </div>
</template>



 