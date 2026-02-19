import axiosClient from "../axiosClient";

const VacanciesAPI = {
  searchJobPosts: ({
    page = 1,
    size = 15,
    text = "",
    industry = [],
    occupation = [],
    employment_type = [],
  } = {}) => {
    const params = new URLSearchParams();
    params.append("page", Number(page));
    params.append("size", Number(size));

    if (text) params.append("text", text);
    if (Array.isArray(industry)) {
      industry.forEach((id) => params.append("industry[]", id));
    }
    if (Array.isArray(occupation)) {
      occupation.forEach((id) => params.append("occupation[]", id));
    }
    if (Array.isArray(employment_type)) {
      employment_type.forEach((id) => params.append("employment_type[]", id));
    }

    return axiosClient.get(`/job-posts/search?${params.toString()}`);
  },

  createJobPost: (params) => {
    return axiosClient.post("/job-posts", params);
  },

  getSingleJobPost: (id) => {
    return axiosClient.get(`/job-posts/${id}`);
  },

  boostJob: (id) => {
    return axiosClient.post(`/job-posts/${id}/boost`);
  },

  updateJobPost: (id, data) => {
    return axiosClient.put(`/job-posts/${id}`, data);
  },
};

export default VacanciesAPI;
