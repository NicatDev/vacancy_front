import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import AuthAPI from "../../api/AuthAPI";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ResetPasswordPage() {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailFromUrl = searchParams.get("email");
  const token = searchParams.get("token");

  if (token && emailFromUrl) {
    const formik = useFormik({
      initialValues: {
        password: "",
        password_confirmation: "",
      },
      validationSchema: Yup.object({
        password: Yup.string()
          .min(6, t("common.passwordMin"))
          .required(t("common.passwordRequired")),
        password_confirmation: Yup.string()
          .oneOf([Yup.ref("password")], t("common.passwordsMustMatch"))
          .required(t("common.passwordRequired")),
      }),
      onSubmit: async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        try {
          const params = {
            email: emailFromUrl,
            token,
            password: values.password,
            password_confirmation: values.password_confirmation,
          };
          const response = await AuthAPI.resetPassword(params);
          if (response.status === 200) {
            toast.success(response?.data?.message);
            resetForm();
            navigate("/login");
          }
        } catch (error) {
          const errorMessage = error.response?.data?.message || t('toastMessages.errorOccurred');
          toast.error(errorMessage);
        } finally {
          setSubmitting(false);
        }
      },
    });

    return (
      <section className="h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-no-repeat bg-left-bottom bg-cover">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        <div className="max-w-500px w-full px-3 flex justify-center">
          <div className="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md w-full max-w-md p-6">
            <Link to="/">
              <img src={logo} className="mx-auto !h-[80px]" alt="Logo" />
            </Link>
            <h5 className="my-6 text-xl font-semibold">
              {t("common.resetPassword")}
            </h5>
            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-1 gap-4"
            >
              <div>
                <label className="font-semibold">
                  {t("common.newPassword")}
                </label>

                <div className="relative mt-2">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-input rounded-md w-full pr-10"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("common.newPassword")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-emerald-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>

                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-600 text-sm mt-1">
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div>
                <label className="font-semibold">
                  {t("common.passwordConfirmation")}
                </label>

                <div className="relative mt-2">
                  <input
                    name="password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    className="form-input rounded-md w-full pr-10"
                    value={formik.values.password_confirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={t("common.passwordConfirmation")}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-emerald-600"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <FiEyeOff size={18} />
                    ) : (
                      <FiEye size={18} />
                    )}
                  </button>
                </div>

                {formik.touched.password_confirmation &&
                  formik.errors.password_confirmation && (
                    <div className="text-red-600 text-sm mt-1">
                      {formik.errors.password_confirmation}
                    </div>
                  )}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="py-2 px-5 w-full bg-emerald-600 cursor-pointer hover:bg-emerald-700 text-white font-semibold rounded-md transition duration-300"
              >
                {t("vacancyDetail.submit")}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // 2️⃣ Əgər token yoxdursa → email form (sənin ilk kod)
  const handleSendMail = async () => {
    try {
      const params = { email: input };
      const response = await AuthAPI.forgotPassword(params);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        setInput("");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t("common.errorOccurred"));
    }
  };

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-no-repeat bg-left-bottom bg-cover">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
      <div className="max-w-500px w-full px-3 flex justify-center">
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md w-full max-w-md p-6">
          <Link to="/">
            <img src={logo} className="mx-auto !h-[80px]" alt="Logo" />
          </Link>
          <h5 className="my-6 text-xl font-semibold">
            {t("common.resetPassword")}
          </h5>
          <p className="text-slate-400 mb-6">
            {t("common.resetPasswordInfoText")}
          </p>
          <div className="grid grid-cols-1 gap-4">
            <label className="font-semibold" htmlFor="LoginEmail">
              {t("register.email")}:
            </label>
            <input
              id="LoginEmail"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="email"
              className="form-input mt-2 rounded-md w-full"
              placeholder="name@example.com"
            />
            <button
              onClick={handleSendMail}
              className="py-2 px-5 w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md transition duration-300"
            >
              {t("vacancyDetail.submit")}
            </button>
            <div className="text-center mt-4">
              <span className="text-slate-400 me-2">
                {t("common.rememberPassword")}{" "}
              </span>
              <Link
                to="/login"
                className="text-black dark:text-white font-bold"
              >
                {t("register.sign_in")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
