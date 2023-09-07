import axiosClient from "./axiosClient";

const prefix = "/jlevels";
const jlevelApi = {
  getAll: () => {
    return axiosClient.get(`${prefix}`);
  },
}

export default jlevelApi;
