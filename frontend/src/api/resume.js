import candidateAxios from "./candidateAxios";

const prefix = "/resumes";
const resumeApi = {
  getByCurrentCandidate: () => {
    return candidateAxios.get(`${prefix}/getByCurrentCandidate`);
  },
  getById: (id) => {
    return candidateAxios.get(`${prefix}/${id}/getById`);
  },
  getAvatar: (id) => {
    return candidateAxios.get(`${prefix}/${id}/getAvatar`);
  },
  create: (data) => {
    return candidateAxios.post(`${prefix}`, data);
  },
  update: (data) => {
    return candidateAxios.post(`${prefix}/update`, data);
  },
  destroy: (id) => {
    return candidateAxios.delete(`${prefix}/${id}`);
  },
};

export default resumeApi;
