import axios from "axios";
import config from "../config";

const axiosApi = axios.create({
  baseURL: `${config.api.BASE_URL}${config.api.API_PREFIX}`,
  headers:
    JSON.parse(localStorage.getItem("userData")) &&
    JSON.parse(localStorage.getItem("userData")).token
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("userData")).token
          }`,
        }
      : {
          "Content-Type": "application/json",
        },
});

export default axiosApi;
