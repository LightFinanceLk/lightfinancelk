import axios from "axios";
import config from "../config";

const createMeeting = async (data) => {
  return axios.post(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/meetings/`,
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

const updateMeeting = async (meetingId, data) => {
  return axios.patch(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/meetings/${meetingId}`,
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

const deleteMeeting = async (meetingId) => {
  return axios.delete(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/meetings/${meetingId}`,
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

const meetingApi = { createMeeting, updateMeeting, deleteMeeting };

export default meetingApi;
