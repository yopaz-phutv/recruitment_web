import adminAxios from "./adminAxios";

const prefix = '/admin';
const adminApi = {
  getEmployerList: () => {
    return adminAxios.get(`${prefix}/getEmployerList`);
  },
  getEmployerRequests: () => {
    return adminAxios.get(`${prefix}/getEmployerRequest`);
  },
}

export default adminApi;