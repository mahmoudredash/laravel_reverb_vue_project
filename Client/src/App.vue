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
    <h1>You did it!</h1>
    <p>test </p>
  </div>
</template>

<style scoped></style>
