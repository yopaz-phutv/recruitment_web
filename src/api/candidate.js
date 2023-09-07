import axiosClient from "./axiosClient";

const prefix = '/candidates';
const candidateApi = {
  getById: (id) => {
    return axiosClient.get(`${prefix}/${id}`);
  },
  getAppliedJobs: (id) => {
    return axiosClient.get(`${prefix}/${id}/getAppliedJobs`);
  },
  getSavedJobs: (id) => {
    return axiosClient.get(`${prefix}/${id}/getSavedJobs`);
  },
  processJobSaving: (job_id, data) => {
    return axiosClient.post(`${prefix}/${job_id}/processJobSaving`, data);
  },
  checkJobSaved: (job_id) => {
    return axiosClient.get(`${prefix}/${job_id}/checkJobSaved`);
  },
};

export default candidateApi;
