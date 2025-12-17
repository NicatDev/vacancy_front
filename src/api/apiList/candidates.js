import axiosClient from "../axiosClient";

const CandidatesAPI = {
  getCandidates: (params = {}) => {
    return axiosClient.get("/candidates", { params });
  },

  getSingleCandidate: (id) => {
    return axiosClient.get(`/candidates/${id}`);
  },

  getSingleCandidateSkills: (id) => {
    return axiosClient.get(`/candidates/${id}/skills`);
  },

  getSingleCandidateLanguages: (id) => {
    return axiosClient.get(`/candidates/${id}/languages`);
  },

  getSingleCandidateServices: (id) => {
    return axiosClient.get(`/candidates/${id}/services`);
  },

  jobApply: (params = {}, id) => {
    return axiosClient.post(`/candidates/${id}/applications`, params);
  },
};

export default CandidatesAPI;
