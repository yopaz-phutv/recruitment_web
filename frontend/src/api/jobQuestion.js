import queryString from "query-string";
import employerAxios from "./employerAxios";
import candidateAxios from "./candidateAxios";
import commonAxios from "./commonAxios";

const prefix = "/job-questions";
const jobQuestionApi = {
  getList: (params) => {
    return candidateAxios.get(
      `${prefix}?${queryString.stringify(params, {
        arrayFormat: "index",
      })}`
    );
  },
  getByJobId: (job_id) => {
    return commonAxios.get(`${prefix}/${job_id}/getByJobId`);
  },
  create: (data) => {
    return candidateAxios.post(`${prefix}`, data);
  },
  update: (data) => {
    return commonAxios.patch(`${prefix}`, data);
  },
  // destroy: (params) => {
  //   return employerAxios.delete(
  //     `${prefix}?${queryString.stringify(params, {
  //       arrayFormat: "index",
  //     })}`
  //   );
  // },
};

export default jobQuestionApi;
