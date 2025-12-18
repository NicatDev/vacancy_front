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

  getCandidateLang: (candidateId,params = {}) => {
    return axiosClient.get(`/candidates/${candidateId}/languages`, { params });
  },
  getCandidateLangLevels: (candidateId,params = {}) => {
    return axiosClient.get(`/candidates/${candidateId}/languages`, { params });
  },
  removeCandidateLang: (candidateId,languageId) => {
    return axiosClient.delete(`/candidates/${candidateId}/languages/${languageId}`);
  },
  addCandidateLang: (candidateId,data) => {
    return axiosClient.post(`/candidates/${candidateId}/languages`, data);
  },
};

export default CandidatesAPI;
