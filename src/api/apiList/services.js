import axiosClient from "../axiosClient";

const ServicesAPI = {
  addCandidateService: (candidateId, params = {}) => {
    return axiosClient.post(`/candidates/${candidateId}/services`, params);
  },
  deleteCandidateService: (candidateId, serviceId) => {
    return axiosClient.delete(
      `/candidates/${candidateId}/services/${serviceId}`
    );
  },
};

export default ServicesAPI;
