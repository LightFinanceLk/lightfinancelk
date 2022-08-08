import axiosApi from "./axiosApi";

const signUp = async (formData) => {
  console.log("formData", formData);
  return axiosApi.post(`users/signup`, formData);
};

const login = async (formData) => {
  return axiosApi.post(`users/login`, formData);
};

const resetPassword = async (formData) => {
  return axiosApi.post(`users/resetPassword`, formData);
};

const authApi = { signUp, login, resetPassword };

export default authApi;
