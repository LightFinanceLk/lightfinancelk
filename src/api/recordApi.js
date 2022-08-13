import axios from "axios";
import config from "../config";

const createRecord = async (data) => {
  return axios.post(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/records/`,
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

const recordApi = { createRecord };

export default recordApi;
