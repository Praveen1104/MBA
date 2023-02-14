import { axiosInstance } from "../../utils/Axiosinstace"
export const getAllusers=async()=>{
    const URL='/mba/api/v1/users'
 
    try{
        const response=await axiosInstance.get(URL,{headers:{"x-access-token":localStorage.getItem("accessToken")}});
        return response;
    }
    catch(error){
        return error;
    }
}