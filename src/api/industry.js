import axiosClient from "./axiosClient";

const prefix = "/industries";
const industryApi = {
  getAll: () => {
    return axiosClient.get(`${prefix}`);
  },
}

export default industryApi;
export const getAllIndustries = industryApi.getAll();