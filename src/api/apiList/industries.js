import axiosClient from "../axiosClient";

const IndustryAPI = {
  getIndustries: (page, size, relationsOccupations = true) => {
    // backend 1/0 istəyir
    const relations = relationsOccupations ? 1 : 0;
    console.log(page,size,'---')
    return axiosClient.get("/industries", {
      params: {
        page: page??'',
        size: size??'',
        order: "desc",
        order_by: "name",
        "relations[occupations]": relations, // ✅ flat param kimi
      },
    });
  },
};

export default IndustryAPI;
