import axiosApi from "./axiosApi";
import axios from "axios";

const signUp = (formData) => {
  console.log("formData", formData);
  return axiosApi.post(`users/signup`, formData);
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

const authApi = { signUp, login };

export default authApi;
