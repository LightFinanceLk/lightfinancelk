import axiosApi from "./axiosApi";
import axios from "axios";

const signUp = async (formData) => {
  console.log("formData", formData);
  return axiosApi.post(`users/signup`, formData);
  // const res = await axios.post(
  //   `http://localhost:5000/api/users/signup`,
  //   formData,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // console.log(res); // '{"answer":42}'
};

const login = async (formData) => {
  // console.log("apiformData", formData);
  return axiosApi.post(`users/login`, formData);
  // const res = await axios.post(
  //   `http://localhost:5000/api/users/login`,
  //   formData,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // console.log(res); // '{"answer":42}'
};

const resetPassword = async (formData) => {
  // console.log("apiformData", formData);
  return axiosApi.post(`users/resetPassword`, formData);
  // const res = await axios.post(
  //   `http://localhost:5000/api/users/login`,
  //   formData,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
  // console.log(res); // '{"answer":42}'
};

const authApi = { signUp, login, resetPassword };

export default authApi;
