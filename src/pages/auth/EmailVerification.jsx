import { useEffect, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import EmailsAPI from "../../api/apiList/email";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";

export default function EmailVerification() {
  const { t } = useTranslation();
  const { id, hash } = useParams();
  const [searchParams] = useSearchParams();

  const expires = searchParams.get("expires");
  const signature = searchParams.get("signature");

  const [status, setStatus] = useState(t("common.verifying"));
  const [message, setMessage] = useState(t("common.plsWait"));
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!id || !hash || !expires || !signature) {
        setStatus(t("common.error"));
        setMessage(t("common.verifyCompleted"));
        return;
      }

      try {
        const response = await EmailsAPI.getEmailVerify(id, hash, {
          expires,
          signature,
        });

        setStatus(t("common.successfully"));
        setMessage(response?.data?.message || t("common.emailVerified"));
        setIsSuccess(true);
      } catch (error) {
        setStatus(t("common.error"));

        if (error?.response?.status === 403) {
          setMessage(
            error.response.data?.message | t("common.invalidOrExpired")
          );
          return;
        } else {
          setMessage(t("common.unexpectedVerify"));
        }
      }
    };

    verifyEmail();
  }, [id, hash, expires, signature]);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

      <div className="container">
        <div className="flex justify-center">
          <div className="relative bg-white dark:bg-slate-900 shadow-md rounded-md p-6 text-center max-w-lg w-full">
            <Link to="/">
              <img src={logo} className="mx-auto !h-[80px] block" alt="Logo" />
            </Link>

            <h5
              className={`my-6 text-2xl font-semibold ${
                isSuccess ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {status}
            </h5>

            <p className="text-slate-500 dark:text-slate-300">{message}</p>

            <div className="mt-6">
              <Link
                to={isSuccess ? "/login" : "/"}
                className="py-2 px-5 inline-block font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition"
              >
                {isSuccess ? t("common.goLogin") : t("common.goHome")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
