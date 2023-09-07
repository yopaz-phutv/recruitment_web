import axiosClient from "./axiosClient";

const prefix = "/jtypes";
const jtypeApi = {
  getAll: () => {
    return axiosClient.get(`${prefix}`);
  },
}

export default jtypeApi;
