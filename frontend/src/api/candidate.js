import candidateAxios from "./candidateAxios";

const prefix = '/candidates';
const candidateApi = {
  getById: (id) => {
    return candidateAxios.get(`${prefix}/${id}`);
  },
  update: (data) => {
    return candidateAxios.post(`${prefix}/update`, data);
  },
  getCurrent: () => {
    return candidateAxios.get(`${prefix}/getCurrent`);
  },
  getCurrentAvatar: () => {
    return candidateAxios.get(`${prefix}/getCurrentAvatar`);
  },
  getAppliedJobs: (id) => {
    return candidateAxios.get(`${prefix}/${id}/getAppliedJobs`);
  },
  getSavedJobs: (id) => {
    return candidateAxios.get(`${prefix}/${id}/getSavedJobs`);
  },
  processJobSaving: (job_id, data) => {
    return candidateAxios.post(`${prefix}/${job_id}/processJobSaving`, data);
  },
  checkJobSaved: (job_id) => {
    return candidateAxios.get(`${prefix}/${job_id}/checkJobSaved`);
  },
  updatePublicResume: (data) => {
    return candidateAxios.post(`${prefix}/updatePublicResume`, data);
  },
  getCurJobRecommendData: (job_id) => {
    return candidateAxios.get(`${prefix}/getCurJobRecommendData/${job_id}`);
  }
};

export default candidateApi;
