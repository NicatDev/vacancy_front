import axiosClient from "../axiosClient";

const CompaniesAPI = {
  getCompanies: (
    params
  ) => {
    console.log(params,'000')
    return axiosClient.get("/companies", {
      params: {
        page: parseInt(params.page, 10),
        size: parseInt(params.size, 10),
        order:params.order,
        order_by: params.orderBy,
        deleted: params.deleted ? 1 : 0,
      },
    });
  },
};

export default CompaniesAPI;