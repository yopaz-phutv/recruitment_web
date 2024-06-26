import queryString from "query-string";
import adminAxios from "./adminAxios";

const prefix = "/admin";
const adminApi = {
  getEmployerList: (params) => {
    return adminAxios.get(
      `${prefix}/getEmployerList?${queryString.stringify(params, {
        arrayFormat: "index",
      })}`
    );
  },
  handleRequest: (params) => {
    return adminAxios.patch(`${prefix}/handleRequest`, params);
  },
  changeAccActiveStatus: (params) => {
    return adminAxios.patch(`${prefix}/changeAccActiveStatus`, params);
  },
  getCandidateList: (params) => {
    return adminAxios.get(
      `${prefix}/getCandidateList?${queryString.stringify(params, {
        arrayFormat: "index",
      })}`
    );
  },
};

export default adminApi;
