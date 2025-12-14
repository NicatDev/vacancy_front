import axiosClient from "../axiosClient";

const ContactApi = {
  contact: (
    data
  ) => {
    return axiosClient.post("/contact", data);
  },
};

export default ContactApi;