import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";

export default function EmailSent() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); // candidate | company

  const isCompany = type === "company";

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

      <div className="container">
        <div className="flex justify-center">
          <div className="relative bg-white dark:bg-slate-900 pb-4 shadow-md rounded-md p-8 text-center max-w-lg w-full">
            <Link to="/">
              <img
                src={logo}
                className="mx-auto !h-[80px]"
                alt="Logo"
              />
            </Link>

            <h5 className="my-6 text-2xl font-semibold text-emerald-600">
              {isCompany
                ? t("emailSent.company_title")
                : t("emailSent.title")}
            </h5>

            <p className="text-slate-500 dark:text-slate-300">
              {isCompany
                ? t("emailSent.company_description")
                : t("emailSent.description")}
            </p>

            {!isCompany && (
              <p className="mt-4 text-sm text-slate-400">
                {t("emailSent.note")}
              </p>
            )}

            <div className="mt-6">
              <Link
                to="/login"
                className="py-2 px-5 inline-block font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-md"
              >
                {t("emailSent.loginButton")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
