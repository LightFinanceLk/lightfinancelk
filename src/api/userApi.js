import axios from "axios";
import config from "../config";

const getDataByUserId = async (userId) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/${userId}`,
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

const getAccountsByUserId = async (userId) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/${userId}/accounts`,
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

const updateDataByUserId = async (userId, data) => {
  return axios.patch(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/${userId}`,
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

const deleteProfile = async (userId) => {
  return axios.delete(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/${userId}`,
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

const updatePassword = async (userId, data) => {
  return axios.patch(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/updatePassword/${userId}`,
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

const resetPassword = async (data) => {
  // recheck this?????
  return axios.post(`users/resetPassword`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("userData")).token
      }`,
    },
  });
};

const userApi = {
  getDataByUserId,
  getAccountsByUserId,
  updateDataByUserId,
  updatePassword,
  deleteProfile,
  resetPassword,
};

export default userApi;
