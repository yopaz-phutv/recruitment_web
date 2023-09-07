import axiosClient from "./axiosClient";

const prefix = "/jobs";
const jobApi = {
  getAll: () => {
    return axiosClient.get(`${prefix}`);
  },
  getById: (id) => {
    return axiosClient.get(`${prefix}/${id}/getByID`);
  },
  getHotList: () => {
    return axiosClient.get(`${prefix}/getHotList`);
  },
  create: () => {
    return axiosClient.post(`${prefix}/create`);
  },
  update: (id) => {
    return axiosClient.post(`${prefix}/${id}/update`);
  },
  getJobIndustries: (id) => {
    return axiosClient.get(`${prefix}/${id}/getJobIndustries`);
  },
  filter: (data) => {
    return axiosClient.post(`${prefix}/filter`, data);
  },
  apply: (id, formData) => {
    return axiosClient.post(`${prefix}/${id}/apply`, formData);
  },
  checkApplying: (id) => {
    return axiosClient.get(`${prefix}/${id}/checkApplying`);
  },
};

export default jobApi;
