import axiosClient from "../axiosClient";

const CompaniesAPI = {
  getCompanies: (params) => {
    const apiParams = {};
    if (params.page) apiParams.page = params.page;
    if (params.size) apiParams.size = params.size;
    if (params.order) apiParams.order = params.order;
    if (params.order_by || params.orderBy) apiParams.order_by = params.order_by || params.orderBy;
    if (params.deleted) apiParams.deleted = 1;
    if (params.include) apiParams.include = params.include;

    return axiosClient.get("/companies", { params: apiParams });
  },
  getSingle: (id) => {
    return axiosClient.get(`/companies/${id}`);
  },

  getCompanyExternalLinks: (id) => {
    return axiosClient.get(`/companies/${id}/external-links`);
  },
};

export default CompaniesAPI;
