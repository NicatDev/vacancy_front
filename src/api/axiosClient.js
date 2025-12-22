import axios from "axios";
import { toast } from "react-toastify";
import i18n from "i18next"; // i18n obyekti tərcümə üçün əlavə edildi (düzgün i18n obyektinizin olduğundan əmin olun)

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

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
    delete axiosClient.defaults.headers.common["Authorization"];
    window.location.href = "/login";
  }
};

axiosClient.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
    const language = localStorage.getItem("language") || "az"; // Refresh Token Yapısından Okuma: tokens.access_token.token

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

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      // ... (Mövcud Token Yeniləmə Məntiqi) ...

      if (isRefreshing) {
        // Yenileme zaten sürüyorsa sıraya ekle
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // 🚨 KRİTİK KONTROL: Refresh token yoksa, temizle ve YÖNLENDİR
        if (!tokens?.refresh_token?.token) {
          redirectToLogin();
          throw new Error("No refresh token available. Logging out.");
        } // Refresh Token ile API çağrısı

        const refreshResponse = await axios.post(
          `${axiosClient.defaults.baseURL}/auth/refresh`,
          null,
          {
            headers: {
              Authorization: `Bearer ${tokens.refresh_token.token}`,
              "Content-Type": "application/json",
            },
          }
        ); // ... Token çıkarma mantığı

        const tokenArray = refreshResponse.data?.new_tokens;

        let accessObj = null;
        let refreshObj = null;

        if (Array.isArray(tokenArray)) {
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

        if (!newAccess) {
          throw new Error(
            "Token refresh successful, but new access token is missing or invalid."
          );
        }

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

        if (!originalRequest.url?.includes("/me")) {
          redirectToLogin();
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // --- ⭐️ GLOBAL XƏTA BİLDİRİM MƏNTİQİ BURADAN BAŞLAYIR ---

    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;
      const translate = i18n.t; // Tərcümə funksiyasını qısa adla təyin edirik

      // 401 (Unauthorized) və 403 (Forbidden) xətaları yuxarıda (token yeniləmə) blokunda idarə olunur.
      // Burada yalnız əlavə xətaları idarə edirik.

      if (status === 400) {
        // 400 Bad Request
        if (responseData?.errors && Array.isArray(responseData.errors)) {
          // Xəta obyektləri massivini dövrə salıb hər birini bildiririk
          responseData.errors.forEach(function (err) {
            const message =
              (err.field_name ? err.field_name + ": " : "") +
              (err.message || translate("commonContent.400"));
            toast.error(message);
          });
        } else {
          // Massiv yoxdursa, ümumi mesajı bildiririk
          const message =
            responseData?.message || translate("commonContent.400");
          toast.error(message);
        }
      } else if (status === 404) {
        // 404 Not Found
        const message = responseData?.message || translate("commonContent.404");
        toast.error(message);
      } else if (status === 500) {
        // 500 Internal Server Error
        const message = responseData?.message || translate("commonContent.500");
        toast.error(message);
      } else if (status !== 401 && status !== 403) {
        const message =
          responseData?.message || translate("commonContent.genericError");
        toast.error(message);
      }
    } else {
      console.error("Şəbəkə xətası:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
