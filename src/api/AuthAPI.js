import axiosClient from "./axiosClient";

const AuthAPI = {
  authenticateAsCandidate: (email, password) => {
    return axiosClient.post("/auth/candidates/login", { email, password });
  },
  authenticateAsCompany: (email, password) => {
    return axiosClient.post("/auth/companies/login", { email, password });
  },

  registerAsCandidate: ({
    name,
    email,
    password,
    password_confirmation,
    speciality,
    summary,
    salary_expectation,
  }) => {
    const payload = {
      name,
      email,
      password,
      passwordConfirm: password_confirmation, // API tələb edir
      speciality,
      summary,
      salary_expectation: parseInt(salary_expectation, 10),
    };

    return axiosClient.post("/candidates/register", payload);
  },

  // Company registration
  registerAsCompany: ({
    email,
    password,
    password_confirmation,
    website,
    name,
  }) => {
    const payload = {
      email,
      password,
      passwordConfirm: password_confirmation, // API tələb edir
      website,
      name,
    };

    return axiosClient.post("/companies/register", payload);
  },

  getCurrentUser: () => {
    return axiosClient.get("/auth/me");
  },

  revokeTokens: () => {
    return axiosClient.delete("/auth/revoke");
  },

  refreshToken: (refresh_token) => {
    return axiosClient.post("/auth/refresh", null, {
      headers: { Authorization: `Bearer ${refresh_token}` },
    });
  },

  verifyEmail: (id, hash) => {
    return axiosClient.get(`/email/verify/${id}/${hash}`);
  },

  resendVerificationEmail: () => {
    return axiosClient.post("/email/resend");
  },

  getCompanyProfile: () => {
    return axiosClient.get("/auth/companies/me");
  },

  getCandidateProfile: () => {
    return axiosClient.get("/auth/candidates/me");
  },

  forgotPassword: (params) => {
    return axiosClient.post("/auth/forgot-password", params);
  },
  resetPassword: (params) => {
    return axiosClient.post("/auth/reset-password", params);
  },
};

export default AuthAPI;
