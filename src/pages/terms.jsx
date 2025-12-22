import { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineArrowForward } from "../assets/icons/vander";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation();

  const accordionData = [
    {
      title: t("terms.faq.q1"),
      content: t("terms.faq.a1")
    },
    {
      title: t("terms.faq.q2"),
      content: t("terms.faq.a2")
    },
    {
      title: t("terms.faq.q3"),
      content: t("terms.faq.a3")
    },
    {
      title: t("terms.faq.q4"),
      content: t("terms.faq.a4")
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      {/* HERO */}
      <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-emerald-900/90"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-3xl text-2xl font-medium text-white">
              {t("terms.title")}
            </h3>
          </div>
        </div>

        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
            <li className="inline breadcrumb-item text-[15px] font-semibold text-white/50 hover:text-white">
              <Link to="/index">{t("terms.breadcrumbHome")}</Link>
            </li>
            <li className="inline breadcrumb-item text-[15px] font-semibold text-white">
              {t("terms.title")}
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
                  {t("terms.introTitle")} :
                </h5>
                <p className="text-slate-400">
                  {t("terms.introText")}
                </p>

                <h5 className="text-xl font-medium mb-4 mt-8">
                  {t("terms.agreementTitle")} :
                </h5>
                <p className="text-slate-400">{t("terms.agreementText1")}</p>
                <p className="text-slate-400 mt-3">{t("terms.agreementText2")}</p>
                <p className="text-slate-400 mt-3">{t("terms.agreementText3")}</p>

                <h5 className="text-xl font-medium mb-4 mt-8">
                  {t("terms.restrictionTitle")} :
                </h5>
                <p className="text-slate-400">
                  {t("terms.restrictionIntro")}
                </p>

                {/* 🔥 ARROW ICON QALIR */}
                <ul className="list-none text-slate-400 mt-3">
                  {[1, 2, 3, 4].map((i) => (
                    <li key={i} className="flex items-center mt-2">
                      <MdOutlineArrowForward className="text-emerald-600 align-middle me-2" />
                      {t(`terms.restriction${i}`)}
                    </li>
                  ))}
                </ul>

                <h5 className="text-xl font-medium mt-8">
                  {t("terms.faqTitle")} :
                </h5>

                {/* ACCORDION */}
                <div className="mt-6">
                  {accordionData.map((item, index) => (
                    <div
                      key={index}
                      className="relative shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md overflow-hidden mt-4"
                    >
                      <h2 className="text-base font-medium">
                        <button
                          onClick={() => toggleAccordion(index)}
                          className={`flex justify-between items-center p-5 w-full text-left ${
                            activeIndex === index
                              ? "text-emerald-500 bg-gray-50 dark:bg-slate-800"
                              : ""
                          }`}
                        >
                          <span>{item.title}</span>
                          <svg
                            className={`size-4 shrink-0 ${
                              activeIndex === index ? "rotate-180" : ""
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </h2>

                      {activeIndex === index && (
                        <div className="p-5">
                          <p className="text-slate-400">
                            {item.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
