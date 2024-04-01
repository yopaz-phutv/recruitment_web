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
  getImage: (id) => {
    return candidateAxios.get(`${prefix}/${id}/getImage`);
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
  // update: (id, data) => {
  //   return candidateAxios.patch(`${prefix}/${id}`, data);
  // },
};

export default resumeApi;
