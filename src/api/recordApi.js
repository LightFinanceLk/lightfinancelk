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
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    }
  );
};

const createBulkRecords = async (uid, records) => {
  console.log(records, "axon data");
  return axios.post(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/bulk-records/`,
    records,
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

const recordApi = { createRecord, createBulkRecords };

export default recordApi;
