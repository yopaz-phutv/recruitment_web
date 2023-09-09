import commonAxios from "./commonAxios";
import employerAxios from "./employerAxios";

const prefix = "/companies";
const employerApi = {
  getAll: () => {
    return commonAxios.get(`${prefix}`);
  },
  getById: (id) => {
    return commonAxios.get(`${prefix}/${id}/getByID`);
  },
  getHotList: () => {
    return commonAxios.get(`${prefix}/getHotList`);
  },
  // destroy: (id) => {
  //   return commonAxios.delete(`${prefix}/${id}/destroy`);
  // },
  search: (keyword) => {
    return commonAxios.get(`${prefix}?keyword=${keyword}`);
  },
  getComJobs: (id) => {
    return commonAxios.get(`${prefix}/${id}/getComJobs`);
  },
  getJobList: (id, keyword) => {
    return commonAxios.get(`${prefix}/${id}/getJobList?keyword=${keyword}`);
  },
  getCandidateList: (keyword, data) => {
    return employerAxios.post(`${prefix}/getCandidateList?keyword=${keyword}`, data);
  },
  processApplying: (data) => {
    return employerAxios.post(`${prefix}/processApplying`, data);
  },
  changeJobStatus: (job_id, data) => {
    return employerAxios.post(`${prefix}/${job_id}/changeJobStatus`, data);
  },
};
export default employerApi;
