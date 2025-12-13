import axios from "axios";
import  { reactive, computed }  from "vue";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const state = reactive({
    authenticated: false,
    user: {}
});


const login = async (credentials) => {
    await axios.get('/sanctum/csrf-cookie');
    try {
        await axios.post('/login', credentials).then(()=> setAuthenticated(true));
        return  attemp();

    } catch (error) {
        console.error(error);
    }
}

const logout = async()=> {
    await axios.get('/sanctum/csrf-cookie');
    try {
        await axios.post('/logout').then(()=> setAuthenticated(false));
        return  attemp();
        
    } catch (error) {
        console.error(error);
    }

}

const setAuthenticated = (value)=> {
    // console.log("SEt", value); 
    
    state.authenticated=value;
}

const setUser = (user) => state.user=user;


const attemp = async()=>{
        await axios.get("/api/user").then((response) => {
            setAuthenticated(true);

            setUser(response.data);

            return response;
        }).catch ((error) =>{
         setAuthenticated(false);        
        setUser({});
        return Promise.reject(null);
    })
}
export default function useAuth(){

    const authenticated = computed(() => state.authenticated);

    const user = computed(() => state.user);

    
    return {authenticated, user, login, attemp, logout}; 
}