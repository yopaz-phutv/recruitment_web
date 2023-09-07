import axiosClient from "./axiosClient";

const prefix = "/locations";
const locationApi = {
  getAll: () => {
    return axiosClient.get(`${prefix}`);
  },
}

export default locationApi;