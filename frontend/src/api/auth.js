import adminAxios from "./adminAxios";
import candidateAxios from "./candidateAxios";
import commonAxios from "./commonAxios";
import employerAxios from "./employerAxios";

const authApi = {
  login: (params) => {
    return commonAxios.post("/login", params);
  },
  register: (params) => {
    return commonAxios.post("/register", params);
  },
  logout: (role) => {
    if (role === 1) return candidateAxios.get("/logout");
    if (role === 2) return employerAxios.get("/logout");
    if (role === 0) return adminAxios.get("/logout");
  },

  refresh: (role) => {
    if (role === 1) return candidateAxios.get("/refresh");
    if (role === 2) return employerAxios.get("/refresh");
    if (role === 0) return adminAxios.get("/refresh");
  },
  getMe: (role) => {
    if (role === 1) return candidateAxios.get("/getMe");
    if (role === 2) return employerAxios.get("/getMe");
    if (role === 0) return adminAxios.get("/getMe");
  },
  updateNewPassword: (data) => {
    return commonAxios.patch("/updateNewPassword", data);
  }
};

export default authApi;
