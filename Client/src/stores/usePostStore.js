import axios from 'axios';
import { defineStore } from "pinia";

export const usePostStore = defineStore('post', {
   
    state: () => ({
        page: 2,
        posts: [],
        isloaded: false
    }),

    actions: {
       async fetchPosts (pageNumber=1) {
            try {
                    let response = await axios.get(`/api/posts?page=${pageNumber}`);
            
                this.posts = [... this.posts, ...response.data.data];
                    this.isloaded =true;
            } catch (error) {
                console.error(error);
            }    
       },
        async fetchNextpost (pageNumber=this.page) {

            try {
                this.fetchPosts(pageNumber);
            } catch (error) {
                console.log(error);
            }
        },
        async createPost(form)  {
            try {
                const response = await axios.post(`/api/posts`,form, {
                            headers:{
                                "X-Socket-Id": Echo.socketId(), 
                            },
                    });
                this.pushPost(response.data.data);
                return response.data;
                
            } catch (error) {   
                 return Promise.reject(error.response);
            }   
        },
         async deletePost(postId){
            try {
                await axios.delete(`/api/posts/${postId}`);
                
                this.removePostFromStore(postId);
            } catch (error) {
                console.log(error);
                
            }
         },

         removePostFromStore(postId){
            this.posts = this.posts.filter((post)=> post.id != postId);
         },
        pushPost(post){
            // this.posts.pop();
            if(this.posts.find((item) => item.id == post.id)){

                return;
            }
            this.posts = [post, ...this.posts];

        }
    }
});