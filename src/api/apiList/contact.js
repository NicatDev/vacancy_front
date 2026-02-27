import axiosClient from "../axiosClient";

const ContactApi = {
  contact: (
    data
  ) => {
    return axiosClient.post("/contact", data);
  },
  getContactSections: () => {
    return axiosClient.get("/contact-sections");
  },
};

export default ContactApi;