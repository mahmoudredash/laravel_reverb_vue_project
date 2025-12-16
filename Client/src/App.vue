<script setup>
import { onMounted } from "vue";
import Navication from "./components/Navication.vue";

onMounted(() => {
  Echo.channel("posts").listen("PostCreated", (e) => {
    console.log("======");
    console.log(e);
  });
});
</script>

<template>
  
  <div class="py-2 main-h-screan">
    <Navication />
    <div class="mx-auto lg-px-8">
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
