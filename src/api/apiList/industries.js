import axiosClient from "../axiosClient";

const IndustryAPI = {
  getAllIndustries: () => {
    return axiosClient.get("/industries");
  },
  getIndustries: (page, size, relationsOccupations = true) => {
    const relations = relationsOccupations ? 1 : 0;
    return axiosClient.get("/industries", {
      params: {
        page: page ?? '',
        size: size ?? '',
        order: "desc",
        order_by: "name",
        "relations[occupations]": relations, // ✅ flat param kimi
      },
    });
  },
};

export default IndustryAPI;
