import axios from "axios";
import {ref} from "vue"


export default function usePost(){


const posts = ref([]);

const fetchPosts = async(pageNumber=1)=> {
    try {
        let response = await axios.get(`/api/posts?page=${pageNumber}`);
        
        posts.value = [...posts.value, ...response.data.data];
    } catch (error) {
        console.error(error);
    }    
};

const fetchNextpost = async (pageNumber=1) => {

    try {
        fetchPosts(pageNumber);
    } catch (error) {
        console.log(error);
    }
}

return  {posts, fetchPosts, fetchNextpost };

}