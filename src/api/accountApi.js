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
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }
  );
};

const updateAccount = async (accountId, data) => {
  return axios.patch(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/accounts/${accountId}`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }
  );
};

const getAccountById = async (accountId) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/accounts/${accountId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }
  );
};

const accountApi = { createAccount, getAccountById, updateAccount };

export default accountApi;
