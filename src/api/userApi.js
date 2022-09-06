import axios from "axios";
import config from "../config";

const getDataByUserId = async (userId) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/${userId}`,
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

const getMeetingsByAdvisorId = async (advisorId) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/advisors/${advisorId}/meetings`,
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

const getMeetingsByUserId = async (userId) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/${userId}/meetings`,
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

const getUsersByUserRole = async (userRole) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/role/${userRole}`,
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

const getAccountsByUserId = async (userId) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/${userId}/accounts`,
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

const updateDataByUserId = async (userId, data) => {
  return axios.patch(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/${userId}`,
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

const deleteProfile = async (userId) => {
  return axios.delete(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/${userId}`,
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

const updatePassword = async (userId, data) => {
  return axios.patch(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/users/updatePassword/${userId}`,
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

const userApi = {
  getDataByUserId,
  getMeetingsByAdvisorId,
  getMeetingsByUserId,
  getUsersByUserRole,
  getAccountsByUserId,
  updateDataByUserId,
  updatePassword,
  deleteProfile,
};

export default userApi;
