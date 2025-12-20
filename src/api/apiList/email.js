import axiosClient from "../axiosClient";

const EmailsAPI = {
  getEmailVerify: (id, hash, queryParams) => {
    return axiosClient.get(`/email/verify/${id}/${hash}`, {
      params: queryParams,
    });
  },
};

export default EmailsAPI;
