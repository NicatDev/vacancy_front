import axiosClient from "../axiosClient";

const LanguagesAPI = {
  addCandidatLanguage: (candidateId, params = {}) => {
    return axiosClient.post(`/candidates/${candidateId}/languages`, params);
  },
  deleteCandidateLanguage: (candidateId, languageId) => {
    return axiosClient.delete(
      `/candidates/${candidateId}/languages/${languageId}`
    );
  },

  getAllLevels: () => {
    return axiosClient.get("/levels");
  },

  getAllLanguages: () => {
    return axiosClient.get("/languages");
  },
};

export default LanguagesAPI;
