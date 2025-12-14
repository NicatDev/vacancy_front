import axiosClient from "../axiosClient";

const CompaniesAPI = {
  getCompanies: (params) => {
    return axiosClient.get("/companies", {
      params: {
        page: parseInt(params.page, 10),
        size: parseInt(params.size, 10),
        order: params.order,
        order_by: params.orderBy,
        deleted: params.deleted ? 1 : 0,
      },
    });
  },
  getSingle: (id) => {
    return axiosClient.get(`/companies/${id}`);
  },
};

export default CompaniesAPI;
