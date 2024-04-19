import adminAxios from "./adminAxios";

const prefix = '/admin';
const adminApi = {
  getEmployerList: () => {
    return adminAxios.get(`${prefix}/getEmployerList`);
  },
  getEmployerRequests: () => {
    return adminAxios.get(`${prefix}/getEmployerRequests`);
  },
  handleRequest: (params) => {
    return adminAxios.patch(`${prefix}/handleRequest`, params);
  },
}

export default adminApi;