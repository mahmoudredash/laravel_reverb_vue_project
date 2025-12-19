<template>
    <form class="space-y-2" @submit.prevent="savePost">
        <div class="mb-4">
            <label for="post-body" class="block text-sm font-medium text-gray-700">Post body</label>
            <text-area v-model="form.body" id="post-body" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <p v-if="error.data?.message" class="mt-2 text-ssm text-red-600" id="email-error">
                {{ error.data.message }}
            </p>
        </div>
        <primary-button   :iswork="lockedB.value" >Create New Post</primary-button>
    </form>
</template>

<script setup>
import { reactive, ref, defineEmits } from 'vue';
import PrimaryButton from './PrimaryButton.vue';
import TextArea from './TextArea.vue';
import { usePostStore } from '@/stores/usePostStore';
    const form = reactive({

        body:""
    });
    const error = ref({status: 200});
    const lockedB = ref(false); 
    const postStore= usePostStore();
 
    const savePost = async () =>{
        lockedB.value = true;
        await postStore.createPost(form).then((posts) => {
            form.body ="";
            // console.log(posts);
              lockedB.value = false;
        }).catch((err) => {
            console.log(err.data.message);
            if (err.data) {
                error.value = {
                    status: err.data.status,
                    data: { message: err.data.message }
                };
                lockedB.value = false;
            } else {
                error.value = {
                    status: 500,
                    data: { message: err.message || 'An unexpected error occurred.' }
                };
                    lockedB.value = false;
            }
        });
        

    }
 
</script>

<style lang="scss" scoped>

</style>