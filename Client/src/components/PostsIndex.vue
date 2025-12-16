<script setup>

import PostCard from './PostCard.vue';
import usePost from '@/composables/usePost';
import { useIntersectionObserver } from '@vueuse/core';
import { onMounted, ref, useTemplateRef} from 'vue';

const {posts, fetchPosts, fetchNextpost} = usePost();
const page = ref(2);


const allposts = ref([]);
const target = useTemplateRef('target');
onMounted(async ()=>{
    await fetchPosts()
   allposts.value = posts.value;
})
 
const { stop } = useIntersectionObserver(target, ([{isIntersecting}]) => {
    
    if(isIntersecting){
        fetchNextpost(page.value);
        allposts.value = posts.value;
        page.value += 1;
        console.log(page.value);
    }
})



const handleViewMore = () => {
    console.log("OK");
    
}

</script>
<template>
    <div style="display: block;">
        <PostCard v-for="post in allposts" :key="post.id" :post="post" @view-more="handleViewMore" />
        <div ref="target" class="-translate-x-20"></div>
    </div>
</template>