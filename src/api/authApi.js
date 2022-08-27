import axios from "axios";
import config from "../config";

const signUp = async (data) => {
  return axios.post(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/auth/signup`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const login = async (data) => {
  return axios.post(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/auth/login`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const authApi = { signUp, login };

export default authApi;
