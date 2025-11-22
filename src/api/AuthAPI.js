import axiosClient from "./axiosClient";

const AuthAPI = {
  authenticate: (email, password) => {
    return axiosClient.post("/auth/authenticate", { email, password });
  },

  register: ({ name, email, password, password_confirmation, role = "candidate", speciality, summary, salary_expectation }) => {
    
    // API'nin beklediği payload yapısını oluştur
    const payload = {
      name, 
      email, 
      password, 
      // Düzeltme: API 'passwordConfirm' alanını bekliyor.
      passwordConfirm: password_confirmation, 
      // Laravel standartı olan 'password_confirmation' artık gerekli değilse silebilirsiniz.
      // password_confirmation: password_confirmation, 
      role, 
      data: {
        name: name,
        speciality: speciality,
        summary: summary,
        salary_expectation: parseInt(salary_expectation, 10),
      }
    };

    return axiosClient.post("/auth/register", payload);
  },

  getCurrentUser: () => {
    return axiosClient.get("/auth/me");
  },

  revokeTokens: () => {
    return axiosClient.delete("/auth/revoke");
  },

  refreshToken: (refresh_token) => {
    return axiosClient.post("/auth/refresh", null, {
        headers: { 'Authorization': `Bearer ${refresh_token}` }
    });
  },

  verifyEmail: (id, hash) => {
    return axiosClient.get(`/email/verify/${id}/${hash}`);
  },

  resendVerificationEmail: () => {
    return axiosClient.post("/email/resend");
  }
};

export default AuthAPI;