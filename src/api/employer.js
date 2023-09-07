import axiosClient from "./axiosClient";

const prefix = "/companies";
const employerApi = {
  getAll: () => {
    return axiosClient.get(`${prefix}`);
  },
  getById: (id) => {
    return axiosClient.get(`${prefix}/${id}/getByID`);
  },
  getHotList: () => {
    return axiosClient.get(`${prefix}/getHotList`);
  },
  destroy: (id) => {
    return axiosClient.delete(`${prefix}/${id}/destroy`);
  },
  search: (keyword) => {
    return axiosClient.get(`${prefix}?keyword=${keyword}`);
  },
  getComJobs: (id) => {
    return axiosClient.get(`${prefix}/${id}/getComJobs`);
  },
  getJobList: (id) => {
    return axiosClient.get(`${prefix}/${id}/getJobList`);
  },
  getCandidateList: () => {
    return axiosClient.post(`${prefix}/getCandidateList`);
  },
  processApplying: () => {
    return axiosClient.post(`${prefix}/processApplying`);
  },
  changeJobStatus: (job_id) => {
    return axiosClient.post(`${prefix}/${job_id}/changeJobStatus`);
  },
};
export default employerApi;
