import axiosApi from "./axiosApi";

const getDataByUserId = async (userId) => {
  return axiosApi.get(`users/${userId}`);
};

const updateDataByUserId = async (userId, data) => {
  return axiosApi.patch(`users/${userId}`, data);
};

const deleteProfile = async (userId, data) => {
  return axiosApi.delete(`users/${userId}`);
};

const updatePassword = async (userId, data) => {
  return axiosApi.patch(`users/updatePassword/${userId}`, data);
};

const userApi = {
  getDataByUserId,
  updateDataByUserId,
  updatePassword,
  deleteProfile,
};

export default userApi;
