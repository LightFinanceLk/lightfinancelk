import axiosApi from "./axiosApi";

const requestAccounts = () => {
  return axiosApi.get(`/accounts/62d1f65ab38f73cde822ab12`);
};

const accountsApi = { requestAccounts };

export default accountsApi;
