import queryString from "query-string";
import adminAxios from "./adminAxios";

const prefix = "/admin";
const adminApi = {
  getEmployerList: () => {
    return adminAxios.get(`${prefix}/getEmployerList`);
  },
  getEmployerRequests: (params) => {
    return adminAxios.get(
      `${prefix}/getEmployerRequests?${queryString.stringify(params, {
        arrayFormat: "index",
      })}`
    );
  },
  handleRequest: (params) => {
    return adminAxios.patch(`${prefix}/handleRequest`, params);
  },
};

export default adminApi;
