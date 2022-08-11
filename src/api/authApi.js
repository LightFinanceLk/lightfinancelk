import axiosApi from "./axiosApi";

const signUp = async (formData) => {
  return axiosApi.post(`auth/signup`, formData);
};

const login = async (formData) => {
  return axiosApi.post(`auth/login`, formData);
};

const authApi = { signUp, login };

export default authApi;
