import axios from "./axiosClient";

const auth = {
  login: (params) => {
    return axios.post("/login", params);
  },
  register: (params) => {
    return axios.post("/register", params);
  },
  logout: () => {
    return axios.get("/logout");
  },
  refresh: () => {
    return axios.get("/refresh");
  },
  getMe: () => {
    return axios.get("/getMe");
  },
};

export default auth;
