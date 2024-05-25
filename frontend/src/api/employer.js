import commonAxios from "./commonAxios";
import employerAxios from "./employerAxios";
import queryString from "query-string";

const prefix = "/companies";
const employerApi = {
  getList: (params) => {
    return commonAxios.get(
      `${prefix}?${queryString.stringify(params, { arrayFormat: "index" })}`
    );
  },
  getById: (id) => {
    return commonAxios.get(`${prefix}/${id}/getByID`);
  },
  update: (params) => {
    return employerAxios.post(`${prefix}/update`, params);
  },
  getDetail: () => {
    return employerAxios.get(`${prefix}/getDetail`);
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
  getJobList: (keyword = "") => {
    return employerAxios.get(`${prefix}/getJobList?keyword=${keyword}`);
  },
  getCandidateList: (params) => {
    let url = `${prefix}/getCandidateList?${queryString.stringify(params, {
      arrayFormat: "index",
    })}`;
    return employerAxios.get(url);
  },
  processApplying: (data) => {
    return employerAxios.post(`${prefix}/processApplying`, data);
  },
  changeJobStatus: (job_id, data) => {
    return employerAxios.post(`${prefix}/${job_id}/changeJobStatus`, data);
  },
  findCandidates: (params) => {
    return employerAxios.get(
      `${prefix}/findCandidates?${queryString.stringify(params, {
        arrayFormat: "index",
      })}`
    );
  },
};
export default employerApi;
