import axios from "axios";
import config from "../config";

const createAccount = async (userId, data) => {
  return axios.post(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/accounts/${userId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userData")).token
        }`,
      },
    }
  );
};

const accountApi = { createAccount };

export default accountApi;
