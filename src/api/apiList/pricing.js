import axiosClient from "../axiosClient";

const PricingPlansApi = {
  getPricingPlans: (params = {}) => {
    return axiosClient.get("/pricing-plans", { params });
  },
};

export default PricingPlansApi;