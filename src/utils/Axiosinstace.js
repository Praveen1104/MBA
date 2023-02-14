import axios from "axios";
import {API_BASE_URL,TIME_OUT} from '../config/config';

axios.defaults.headers.common['Common-Type']='application/json';
axios.defaults.headers.common['Accept']='application/json';

export const axiosInstance=axios.create({
    baseURL:API_BASE_URL,
    timeout:TIME_OUT
}) 
/*axiosInstance.interceptors.request.use(
    async(config)=>{
        const accessToken=localStorage.getItem("accessToken");
        if(accessToken){
        config.headers.common['x-access-token']=`${accessToken}`;
        }
        return config;
    },
    ()=>{}
)
*/