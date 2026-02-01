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
    salary_expectation_currency,
  }) => {
    const payload = {
      name,
      email,
      password,
      passwordConfirm: password_confirmation, // API tələb edir
      speciality,
      summary,
      salary_expectation: parseInt(salary_expectation, 10),
      salary_expectation_currency,
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
    voen
  }) => {
    const payload = {
      email,
      password,
      passwordConfirm: password_confirmation, // API tələb edir
      website,
      name,
      voen
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

  getCandidateProfile: () => {
    return axiosClient.get("/auth/candidates/me");
  },

  forgotPassword: (params) => {
    return axiosClient.post("/auth/forgot-password", params);
  },
  resetPassword: (params) => {
    return axiosClient.post("/auth/reset-password", params);
  },

  //companyProfileViews
  getCompanyProfile: () => {
    return axiosClient.get("/auth/companies/me");
  },
  updateProfileCompany: (id, data) => {
    return axiosClient.put('/companies/' + id, data)
  },
  createExternalForCompany: (id, data) => {
    return axiosClient.post(`/companies/${id}/external-links`, data);
  },
  getExternalForCompany: (c_id) => {
    return axiosClient.get(`/companies/${c_id}/external-links/`);
  },
  updateExternalForCompany: (c_id, ext_id, data) => {
    return axiosClient.put(`/companies/${c_id}/external-links/${ext_id}`, data);
  },
  deleteExternalForCompany: (c_id, ext_id) => {
    return axiosClient.delete(`/companies/${c_id}/external-links/${ext_id}`);
  },
  getPhoneNumbersForCompany: (companyId, params = {}) => {
    return axiosClient.get(
      `/companies/${companyId}/phone-numbers`,
      { params }
    );
  },

  // Get single phone number
  getPhoneNumberForCompany: (companyId, phoneId) => {
    return axiosClient.get(
      `/companies/${companyId}/phone-numbers/${phoneId}`
    );
  },

  // Create phone number
  createPhoneNumberForCompany: (companyId, data) => {
    return axiosClient.post(
      `/companies/${companyId}/phone-numbers`,
      data
    );
  },

  // Update phone number (PUT / PATCH)
  updatePhoneNumberForCompany: (companyId, phoneId, data) => {
    return axiosClient.put(
      `/companies/${companyId}/phone-numbers/${phoneId}`,
      data
    );
  },

  // Delete (soft delete) phone number
  deletePhoneNumberForCompany: (companyId, phoneId) => {
    return axiosClient.delete(
      `/companies/${companyId}/phone-numbers/${phoneId}`
    );
  },
  getCompanyVacancies: (companyId) => {
    return axiosClient.get(
      `/companies/${companyId}/job-posts`
    );
  },

};

export default AuthAPI;
