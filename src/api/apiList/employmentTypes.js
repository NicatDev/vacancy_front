import axiosClient from "../axiosClient";

const EmploymentTypeApi = {
  getEmploymentTypes: (page = 1, size = 15, relationsOccupations = true) => {
    // backend 1/0 istəyir
    
    return axiosClient.get("/employment-types", {
      params: {
        page: page ?? "",
        size: size ?? "",
        order: "desc",
        order_by: "name",
      },
    });
  },
};

export default EmploymentTypeApi;
