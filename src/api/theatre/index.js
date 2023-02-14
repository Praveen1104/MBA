import { axiosInstance } from "../../utils/Axiosinstace";
export const getAlltheatres=async()=>{
    const URL="/mba/api/v1/theatres";
    try{
        const response =await  axiosInstance.get(URL);
        return response

    }
    catch(error){
        return error;
    }
}


export const gettheatrebyid=async(id)=>{
    const URL=`/mba/api/v1/theatres/${id}`
    try{
        const response=await axiosInstance.get(URL,{headers:{"x-access-token":localStorage.getItem("accessToken")}});
        return response;
    }
    catch(error){
        return error;
    }
}