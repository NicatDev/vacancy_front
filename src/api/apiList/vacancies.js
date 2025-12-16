import axiosClient from "../axiosClient";

const VacanciesAPI = {
  searchJobPosts: ({
    page = 1,
    size = 15,
    text = "",
    industry = null,
    occupation = null,
    employment_type = null,
  } = {}) => {
    const params = {
      page: Number(page),
      size: Number(size),
    };

    // yalnız dolu olanlar əlavə olunur (pipeline logic)
    if (text) params.text = text;
    if (occupation) {
      params.occupation = occupation; // occupation industry-ni override edir
    } else if (industry) {
      params.industry = industry;
    }
    if (employment_type) params.employment_type = employment_type;

    return axiosClient.get("/job-posts/search", { params });
  },

  createJobPost: (params) => {
    return axiosClient.post("/job-posts", params);
  }
};

export default VacanciesAPI;