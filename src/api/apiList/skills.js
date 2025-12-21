import axiosClient from "../axiosClient";

const SkillsAPI = {
  addCandidateSkill: (candidateId, params = {}) => {
    return axiosClient.post(`/candidates/${candidateId}/skills`, params); 
  },
  deleteCandidateSkill: (candidateId, skillId) => {
    return axiosClient.delete(`/candidates/${candidateId}/skills/${skillId}`); 
  },
};

export default SkillsAPI;
