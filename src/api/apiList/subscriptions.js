import axiosClient from "../axiosClient";
const SubscriptionApi = {
  createOnetimePurchase: (params = {}) => {
    return axiosClient.post("/subscriptions/purchase", params);
  },
  createSubsscription: (params = {}) => {
    return axiosClient.post("/subscriptions/subscribe", params);
  },
};
export default SubscriptionApi;
