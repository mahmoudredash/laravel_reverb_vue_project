<template>
    <div class="p-4 mb-4 bg-white rounded-lg shadow-md">
        <div class="flex items-center mb-4">
            <img :src="post.user.avatar" alt="User Avatar" class="w-10 h-10 mr-3 rounded-full">
            <div>
                <p class="font-semibold">{{ post.user.name }}</p>
                <p class="font-mono">{{ post.id }}</p>
                <p class="text-sm text-gray-500">{{ new Date(post.created_at).toLocaleDateString() }}</p>
            </div>
        </div>
        <p class="mb-4 text-gray-800">{{ post.body }}</p>
        <button @click="$emit('view-more')" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">More Posts</button>
    </div>
</template>

<script setup>
    defineProps({post: {
            type: Object,
            required: true
        }});
</script>

 