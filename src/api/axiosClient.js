import axios from "axios";

const BASE_URL = "https://api.octopus.com.az/api/v1";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

axiosClient.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
    const language = localStorage.getItem("language") || "az";

    // Refresh Token Yapısından Okuma: tokens.access_token.token
    if (tokens?.access_token?.token) {
      config.headers.Authorization = `Bearer ${tokens.access_token.token}`;
    }
    config.headers["Accept-Language"] = language;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isLoginRequest =
      originalRequest.url?.includes("login") ||
      originalRequest.url?.includes("register");

    const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");

    if (isLoginRequest) {
      return Promise.reject(error);
    }
    // 401/403 hatası alındığında ve retry yapılmamışsa
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Yenileme zaten sürüyorsa sıraya ekle
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        if (!tokens?.refresh_token?.token) {
          throw new Error("No refresh token available. Logging out.");
        }

        // Refresh Token ile API çağrısı
        const refreshResponse = await axios.post(
          `${axiosClient.defaults.baseURL}/auth/refresh`,
          null,
          {
            headers: {
              Authorization: `Bearer ${tokens.refresh_token.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // 🚨 GÜNCELLEME: Refresh yanıtından token dizisini ayıklama
        const tokenArray = refreshResponse.data?.new_tokens;

        let accessObj = null;
        let refreshObj = null;

        if (Array.isArray(tokenArray)) {
          // Dizideki Access ve Refresh token'ları bul
          accessObj = tokenArray.find(
            (t) => t.claims?.typ === "access" || t.claims?.type === "access"
          );
          refreshObj = tokenArray.find(
            (t) => t.claims?.typ === "refresh" || t.claims?.type === "refresh"
          );
        }

        const newAccess = accessObj?.token;
        const newRefreshTokenValue =
          refreshObj?.token || tokens.refresh_token.token;

        if (!newAccess || !newRefreshTokenValue) {
          throw new Error(
            "Token refresh successful, but new tokens are missing or invalid."
          );
        }

        // axiosClient'ın beklediği yapıyı oluştur
        const newTokens = {
          access_token: { token: newAccess, ...accessObj },
          refresh_token: { token: newRefreshTokenValue, ...refreshObj },
        };

        localStorage.setItem("tokens", JSON.stringify(newTokens));
        axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccess}`;

        processQueue(null, newAccess);

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error(
          "Token yenileme başarısız oldu veya refresh token geçersiz:",
          refreshError
        );

        processQueue(refreshError, null);

        localStorage.removeItem("user");
        delete axiosClient.defaults.headers.common["Authorization"];
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
