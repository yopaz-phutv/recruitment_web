import queryString from "query-string";
import employerAxios from "./employerAxios";

const prefix = "/candidate-bookmarks";
const candidateBookmarkApi = {
  getList: (params) => {
    return employerAxios.get(
      `${prefix}?${queryString.stringify(params, {
        arrayFormat: "index",
      })}`
    );
  },
  create: (data) => {
    return employerAxios.post(`${prefix}`, data);
  },
  update: (id, data) => {
    return employerAxios.patch(`${prefix}/${id}`, data);
  },
  destroy: (params) => {
    return employerAxios.delete(
      `${prefix}?${queryString.stringify(params, {
        arrayFormat: "index",
      })}`
    );
  },
  sendRecommend: (id, data) => {
    return employerAxios.post(`${prefix}/${id}/send-recommend`, data);
  }
};

export default candidateBookmarkApi;
