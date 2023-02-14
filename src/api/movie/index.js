import { axiosInstance } from "../../utils/Axiosinstace";

export const getAllmovies = async () => {
  const URL = "/mba/api/v1/movies";
  try {
    const response = await axiosInstance.get(URL);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getmovie = async (id) => {
  const URL = `/mba/api/v1/movies/${id}`;
  try {
    const response = await axiosInstance.get(URL);
    return response;
  } catch (error) {
    return error;
  }
};

export const removemovie = async (movie) => {
  const URL = `/mba/api/v1/movies/${movie._id}`;

  try {
    const response = await axiosInstance.delete(URL, {
      headers: { "x-access-token": localStorage.getItem("accessToken") },
    });
    return response;
  } catch (error) {
    return error;
  }
};
