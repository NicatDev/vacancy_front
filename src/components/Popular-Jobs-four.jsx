import { Link } from "react-router-dom";
import VacanciesAPI from "../api/apiList/vacancies";
import {
  PiMapPin,
  MdOutlineArrowForward,
  FiBookmark,
} from "../assets/icons/vander";
import { jobData } from "../data/data";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import CompanyIcon from "../assets/icons/company.svg";
export default function PopularJobsfour() {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async (page = 1) => {
    try {
      const res = await VacanciesAPI.searchJobPosts({
        page: 1,
        size: 6,
      });

      setJobs(res.data.data);

    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section className="relative bg-slate-50 dark:bg-slate-800 md:py-24 py-16">
      <div className="container">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
            {t("popularJobs.title")}
          </h3>

          <p className="text-slate-400 max-w-xl mx-auto">
            {t("popularJobs.subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
          {jobs.map((item, index) => (
            <div
              className="group relative overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 hover:-mt-2 rounded-md transition-all duration-500 h-fit"
              key={index}
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="size-14 min-w-[56px] flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                    <img src={item?.company?.logo||CompanyIcon} className="size-8" alt="" />
                  </div>

                  <div className="ms-3 flex flex-col">
                    <Link
                      to={`/vacancy/${item.id}`}
                      className="inline-block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500 me-1"
                    >
                      {item.title}
                    </Link>
                    <span className="inline-block text-sm text-slate-400">
                      {item?.published_at?.as_days} {t("popularJobs.daysago")}
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 py-3">{item.headline}</p>

                <div>
                  <span className="bg-slate-100 dark:bg-slate-800 inline-block text-slate-900 dark:text-slate-300 text-xs px-2.5 py-0.5 font-semibold rounded-full me-1">
                    {item?.employment_type?.name}
                  </span>
                 
                </div>
              </div>

              <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 lg:flex justify-between items-center">
                <div className="lg:inline-block flex justify-between items-center">
                  <span className="inline-flex items-center me-1 text-slate-400">
                    <PiMapPin className="text-[18px] text-slate-900 dark:text-white me-1" />
                    {item?.location}
                  </span>
                </div>

                <Link
                  to="/job-apply"
                  className="py-[5px] px-4 text-sm inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-center rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white md:ms-2 w-full lg:w-auto lg:mt-0 mt-4"
                >
                  {t("popularJobs.applyButton")}
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
          <div className="md:col-span-12 text-center">
            <Link
              to="/vacancies"
              className="inline-flex items-center font-semibold tracking-wide border align-middle transition text-base text-center relative border-none after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out"
            >
              {t("popularJobs.seeMore")}{" "}
              <MdOutlineArrowForward className="m-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
