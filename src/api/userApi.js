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

const resetPassword = async (formData) => {
  // recheck this?????
  return axiosApi.post(`users/resetPassword`, formData);
};

const userApi = {
  getDataByUserId,
  updateDataByUserId,
  updatePassword,
  deleteProfile,
  resetPassword,
};

export default userApi;
