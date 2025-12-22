import { Link } from "react-router-dom";
import { MdOutlineArrowForward } from "../assets/icons/vander";
import { useTranslation } from "react-i18next";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <>
      {/* HERO */}
      <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-emerald-900/90"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-3xl text-2xl font-medium text-white">
              {t("privacy.title")}
            </h3>
          </div>
        </div>

        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
            <li className="inline breadcrumb-item text-[15px] font-semibold text-white/50 hover:text-white">
              <Link to="/index">{t("privacy.breadcrumbHome")}</Link>
            </li>
            <li className="inline breadcrumb-item text-[15px] font-semibold text-white">
              {t("privacy.title")}
            </li>
          </ul>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative lg:py-24 py-16">
        <div className="container">
          <div className="md:flex justify-center">
            <div className="md:w-3/4">
              <div className="p-6 bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">

                <h5 className="text-xl font-medium mb-4">
                  {t("privacy.overviewTitle")} :
                </h5>
                <p className="text-slate-400">{t("privacy.overviewText1")}</p>
                <p className="text-slate-400">{t("privacy.overviewText2")}</p>
                <p className="text-slate-400">{t("privacy.overviewText3")}</p>

                <h5 className="text-xl font-medium mb-4 mt-8">
                  {t("privacy.usageTitle")} :
                </h5>

                {/* 🔥 ARROW ICON SAXLANILIB */}
                <ul className="list-unstyled text-slate-400 mt-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <li key={i} className="flex items-center mt-2">
                      <MdOutlineArrowForward className="text-emerald-600 align-middle me-2" />
                      {t(`privacy.usage${i}`)}
                    </li>
                  ))}
                </ul>

                <h5 className="text-xl font-medium mb-4 mt-8">
                  {t("privacy.voluntaryTitle")} :
                </h5>
                <p className="text-slate-400">
                  {t("privacy.voluntaryText")}
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
