import axiosClient from "../axiosClient";

const OccupationsApi = {
  getOccupations: (page = 1, size = 15, search = "") => {
    // backend 1/0 istəyir

    return axiosClient.get("/occupations", {
      params: {
        page: parseInt(page, 10),
        size: parseInt(size, 10),
        order: "desc",
        order_by: "name",
        search,
      },
    });
  },
};

export default OccupationsApi;
