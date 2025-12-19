<script setup>
import CreatePost from '@/components/CreatePost.vue';
import Header from '@/components/Header.vue';
import PostsIndex from '@/components/PostsIndex.vue';
import useAuth from '@/composables/useAuth';
import { usePostStore } from '@/stores/usePostStore';
import { onMounted } from 'vue';
const {authenticated} = useAuth();
 

const postStore = usePostStore();

const channel = Echo.channel('posts');

channel.listen("PostCreated", (post) => {
  postStore.pushPost(post);
});

channel.listen("PostDeleted", (payload)=>{
  // console.log(payload);
  
  postStore.removePostFromStore(payload.postid)
});
     
onMounted(()=>{
 if (!   authenticated.value) {
                // router.removeRoute();
                router.push('/login')
            }
})


</script>
<template>
    <div class="flex flex-col items-center px-4 mt-8">
        <!-- Header Section -->
        <div class="w-full max-w-2xl mb-8">
             <Header title='Home Page' />
        </div>
         
        <!-- Posts Section -->
        <div class="w-full max-w-4xl">
            <CreatePost  />
           <PostsIndex />
        </div>
    </div>
</template>



 