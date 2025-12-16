import axiosClient from "../axiosClient";

const CandidatesAPI = {
  getCandidates: (params = {}) => {
    return axiosClient.get("/candidates", { params });
  },

  jobApply: (params = {}, id) => {
    return axiosClient.post(`/candidates/${id}/applications`, params);
  },
};

export default CandidatesAPI;
