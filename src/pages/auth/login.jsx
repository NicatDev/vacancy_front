import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";
import AuthAPI from "../../api/AuthAPI";
import { FiEye, FiEyeOff } from "react-icons/fi";
import axiosClient from "../../api/axiosClient";
import { toast } from "react-toastify";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("candidate");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;

      if (userType === "candidate") {
        response = await AuthAPI.authenticateAsCandidate(
          formData.email,
          formData.password
        );
      } else {
        response = await AuthAPI.authenticateAsCompany(
          formData.email,
          formData.password
        );
      }

      if (response.status === 401 || response.status === 403) {
        throw new Error(response?.data);
      }

      if (response.status === 200) {
        const responseData = response.data?.data;
        const tokenArray = responseData?.user?.new_tokens;

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

        const accessToken = accessObj?.token;

        if (!accessToken || !refreshObj) {
          throw new Error(response?.data);
        }

        const newTokens = {
          access_token: { token: accessObj.token, ...accessObj },
          refresh_token: { token: refreshObj.token, ...refreshObj },
        };
        localStorage.removeItem("role");
        localStorage.removeItem("tokens");
        localStorage.removeItem("email_verified_at");
        localStorage.setItem(
          "email_verified_at",
          responseData?.user?.email_verified_at ? true : false
        );
        localStorage.setItem(
          "role",
          responseData?.user?.role === "company" ? "company" : "candidate"
        );
        localStorage.setItem("tokens", JSON.stringify(newTokens));

        axiosClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        navigate("/");
        location.reload();
      }
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message) {
        toast.error(message);
      } else {
        toast.error("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-[600px]  h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      <div className="container flex items-center justify-center h-screen">
        <div className="max-w-[600px] w-[400px] relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md ">
          <div className="p-6">
            <Link to="#">
              <img
                style={{ width: "100px" }}
                src={logo}
                className="mx-auto  block dark:hidden"
                alt="Logo Dark"
              />
              <img
                style={{ width: "100px" }}
                src={logo}
                className="mx-auto  dark:block hidden"
                alt="Logo Light"
              />
            </Link>

            <div className="mt-4 mb-6">
              <div className="switch-tabs relative mx-auto flex w-full max-w-[320px] rounded-full p-1">
                <span
                  className={`switch-pill absolute inset-y-1 w-1/2 rounded-full shadow transition-transform duration-200 ease-out ${
                    userType === "candidate" ? "translate-x-0" : "translate-x-full"
                  }`}
                />
                <button
                  type="button"
                  className={`relative z-10 flex-1 px-4 py-2 rounded-3xl text-sm font-semibold transition ${
                    userType === "candidate"
                      ? "switch-active-text"
                      : "switch-inactive-text"
                  }`}
                  onClick={() => setUserType("candidate")}
                >
                  {t("login.candidate")}
                </button>
                <button
                  type="button"
                  className={`relative z-10 flex-1 px-4 py-2 rounded-3xl text-sm font-semibold transition ${
                    userType === "company"
                      ? "switch-active-text"
                      : "switch-inactive-text"
                  }`}
                  onClick={() => setUserType("company")}
                >
                  {t("login.company")}
                </button>
              </div>
            </div>

            <h5 className="text-xl font-semibold mb-4 text-center">
              {userType === "candidate"
                ? t("login.candidateLogin")
                : t("login.companyLogin")}
            </h5>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="font-semibold">
                  {t("login.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder={t("login.email")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input mt-2 w-full rounded-md"
                />
              </div>
              <div>
                <label htmlFor="password" className="font-semibold">
                  {t("login.password")}
                </label>

                <div className="relative mt-2">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.password")}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input w-full rounded-md pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-emerald-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <FiEyeOff size={20} />
                    ) : (
                      <FiEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition disabled:bg-gray-400"
              >
                {loading ? t("login.loggingIn") : t("login.loginButton")}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-slate-400 me-2">
                {t("login.noAccount")}
              </span>
              <Link
                to="/signup"
                className="text-black dark:text-white font-bold"
              >
                {t("login.signUp")}
              </Link>
            </div>

            <div className="text-center mt-4">
              <Link
                to="/reset-password"
                style={{ textDecoration: "underline" }}
                className="text-slate-400"
              >
                {t("common.forgotPassword")}
              </Link>
            </div>
          </div>

          <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
            <p className="mb-0 text-gray-400 font-medium">
              © {new Date().getFullYear()} Octopus
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
