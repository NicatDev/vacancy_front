import axiosClient from "../axiosClient";

const IndustryAPI = {
  getIndustries: (page = 1, size = 15, search = "", relationsOccupations = true) => {
    // backend 1/0 istəyir
    const relations = relationsOccupations ? 1 : 0;

    return axiosClient.get("/industries", {
      params: {
        page: parseInt(page, 10),
        size: parseInt(size, 10),
        order: "desc",
        order_by: "name",
        search,
        "relations[occupations]": relations, // ✅ flat param kimi
      },
    });
  },
};

export default IndustryAPI;
