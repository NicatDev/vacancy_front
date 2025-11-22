import apiService from './apiService';

const COMPANIES_ENDPOINT = 'companies'; 

const companiesService = {
  listCompanies: (params = {}) => {
    return apiService.get(COMPANIES_ENDPOINT, params);
  },
  getCompany: (id, params = {}) => {
    return apiService.get(`${COMPANIES_ENDPOINT}/${id}`, params);
  },
};

export default companiesService;