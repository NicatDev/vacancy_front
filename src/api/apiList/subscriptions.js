import axiosClient from "../axiosClient";
const SubscriptionApi = {
  createOnetimePurchase: (params = {}) => {
    return axiosClient.post("/subscriptions/purchase", params);
  },
  createSubsscription: (params = {}) => {
    return axiosClient.post("/subscriptions/subscribe", params);
  },
  suspendSubscription: (params = {}) => {
    return axiosClient.patch(`/subscriptions/suspend`, params);
  },
  cancelSubscription: (params = {}) => {
    return axiosClient.put(`/subscriptions/cancel`, params);
  },
  resubscribeSubscription: (params = {}) => {
    return axiosClient.put(`/subscriptions/resubscribe`, params);
  },
};
export default SubscriptionApi;
