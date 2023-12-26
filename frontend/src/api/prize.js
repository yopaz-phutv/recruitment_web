import candidateAxios from "./candidateAxios";

const prefix = "/prizes";
const prizeApi = {
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
    return candidateAxios.post(`${prefix}/update/${id}`, data);
  },
}

export default prizeApi;