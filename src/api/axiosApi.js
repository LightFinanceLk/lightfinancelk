import axios from "axios";
import config from "../config";

const axiosApi = axios.create({
  baseURL: `${config.api.BASE_URL}${config.api.API_PREFIX}`,
  // baseURL: `http://localhost:5000/api`,
  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Request-Headers": "OSDI-API-Token",
    // "Access-Control-Allow-Headers": "OSDI-API-Token",
    // 'OSDI-API-Token':'41fcb72720b62700cc591f288a163814'
  },
});

export default axiosApi;
