<script setup>
import { onMounted } from 'vue';
 
onMounted(() => {
  Echo.channel("posts").listen("PostCreated", (e) => {
    console.log("======");
    console.log(e);
  
  });
});
</script>

<template>
  <div>
    <router-view/>
  </div>
</template>

<style scoped></style>
