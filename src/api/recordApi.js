import axios from "axios";
import config from "../config";

const getRecordsById = async (rid) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/records/${rid}`,
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

const getRecordsByAccountId = async (aid) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/accounts/${aid}/records`,
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

const deleteRecord = async (rId) => {
  return axios.delete(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/records/${rId}`,
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

const createBulkRecords = async (accountId, records) => {
  console.log(records, "axon data");
  return axios.post(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/bulk-records/${accountId}`,
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

const getBulkRecordsByAccountId = async (accountId) => {
  return axios.get(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/bulk-records/${accountId}`,
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

const deleteBulkRecordsById = async (bulkRecordId) => {
  console.log(bulkRecordId);
  return axios.delete(
    `${config.api.BASE_URL}${config.api.API_PREFIX}/bulk-records/${bulkRecordId}`,
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

const recordApi = {
  getRecordsById,
  createRecord,
  createBulkRecords,
  getBulkRecordsByAccountId,
  deleteBulkRecordsById,
  getRecordsByAccountId,
  deleteRecord,
};

export default recordApi;
