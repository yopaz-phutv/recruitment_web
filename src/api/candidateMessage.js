import axiosClient from "./axiosClient";

const prefix = '/cand-msgs'
const candMsgApi = {
  getMsgs: (candidateId) => {
    return axiosClient.get(`${prefix}/${candidateId}/getByCandidateID`);
  },
  markAsRead: (msgId) => {
    return axiosClient.get(`${prefix}/${msgId}/updateReadMsg`);
  },
};

export default candMsgApi;
