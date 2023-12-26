import candidateAxios from "./candidateAxios";

const prefix = "/projects";
const projectApi = {
  getByCurrentCandidate: () => {
    return candidateAxios.get(`${prefix}/getByCurrentCandidate`);
  },
  create: (data) => {
    return candidateAxios.post(`${prefix}`, data);
  },
  destroy: (id) => {
    return candidateAxios.delete(`${prefix}/${id}`);
  },  
  update: (id, data) => {
    return candidateAxios.patch(`${prefix}/${id}`, data);
  },
}

export default projectApi;