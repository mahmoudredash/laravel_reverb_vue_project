<script setup>

import PostCard from './PostCard.vue';
import { usePostStore } from '@/stores/usePostStore';
import { useIntersectionObserver } from '@vueuse/core';
import { onMounted, onUpdated, ref, useTemplateRef, watch} from 'vue';
const  postStore = usePostStore();

 
const target = useTemplateRef('target');
onMounted(async ()=>{
    await postStore.fetchPosts()
})
 
const { stop } = useIntersectionObserver(target, ([{isIntersecting}]) => {
    
    if(isIntersecting && postStore.isloaded){
        postStore.fetchNextpost(postStore.page);
        postStore.page += 1;
        console.log(postStore.page);
    }
})

watch(() => postStore.posts, (newPosts, oldPosts) => {
    // console.log('Posts changed!', newPosts);
}, { deep: true });
 
 
</script>
<template>
    <div style="display: block;">
        <PostCard v-for="post in postStore.posts" :key="post.id" :post="post"  />
        <div ref="target" class="-translate-x-20"></div>
    </div>
</template>