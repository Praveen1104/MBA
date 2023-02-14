import { axiosInstance } from "../../utils/Axiosinstace";

export const signin=async (User)=>{

    const URL='/mba/api/v1/auth/signIn';
      try{
        const response=await axiosInstance.post(URL,User);
        if(response.data && response.data.accessToken){
          const {name,userId,email,userTypes,accessToken}=response.data;
          localStorage.setItem("name",name);
          localStorage.setItem("userId",userId);
          localStorage.setItem("email",email);
          localStorage.setItem("userTypes",userTypes);
          localStorage.setItem("accessToken",accessToken);

          
        }
      return response;
      }
      catch(error){
        return error.response
      }

}

export const signup=async(User)=>{
  const URL='/mba/api/v1/auth/signup';

  try{
    const response=await axiosInstance.post(URL,User);
    return response;
  }
  catch(error){
      return error.response;
  }
}


export const signout=()=>{
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  localStorage.removeItem("userTypes");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userId");
  localStorage.removeItem("userStatus");
}