import ab05 from "../assets/images/about/ab05.jpg";
import MillionsJob from "../components/Millions-job";
import Feature from "../components/Feature";
import JobCounter from "../components/Job-counter";
import QuesAnswer from "../components/Question-Answer";
import { Link } from "react-router-dom";
import ab01 from "../assets/images/about/ab01.jpg";
import ab02 from "../assets/images/about/ab02.jpg";

import { BiCheckCircle, LuMail } from "../assets/icons/vander";
import { useTranslation } from "react-i18next";

export default function Aboutus() {
  const { t } = useTranslation();

  return (
    <>
      <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-emerald-900/90"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">
              {t("about.title")}
            </h3>
          </div>
        </div>

        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
            <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link to="/">{t("about.breadcrumbHome")}</Link>
            </li>
            <li
              className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white"
              aria-current="page"
            >
              {t("about.title")}
            </li>
          </ul>
        </div>
      </section>

      <section className="container md:py-24 py-16">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
          <div className="lg:col-span-5 md:col-span-6">
            <div className="relative">
              <div className="relative">
                <img
                  src={ab01}
                  className="lg:w-[400px] w-[280px] rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 md:col-span-6 mt-14 md:mt-0">
            <div className="lg:ms-5">
              <h3 className="mb-6 md:text-[26px] text-2xl md:leading-normal leading-normal font-semibold">
                {t("about.heading")}
              </h3>

              <p className="text-slate-400 about_us_description max-w-xl">
                {t("about.description")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
