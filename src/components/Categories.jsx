import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IndustryAPI from "../api/apiList/industries";
import { useTranslation } from "react-i18next";

import {
  AiOutlineGitlab,
  VscBook,
  AiOutlinePieChart,
  VscFeedback,
  RiPresentationFill,
  MdOutlineArrowForward
} from "../assets/icons/vander";

const icons = [
  <AiOutlineGitlab />,
  <VscBook />,
  <AiOutlinePieChart />,
  <VscFeedback />,
  <RiPresentationFill />
];

export default function Categories() {
  const { t } = useTranslation();
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);


  // ✅ Fetch funksiyası
  const fetchIndustries = async () => {
    try {
      
      const res = await IndustryAPI.getIndustries(1, 15);
      setIndustries(res.data.data || res.data);
    } catch (err) {
      console.error("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);


  return (
    <>
      <div className="container">
        <div className="grid grid-cols-1 pb-8 text-center">
          <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">
            {t("categories.title")}
          </h3>
          <p className="text-slate-400 max-w-xl mx-auto">
            {t("categories.subtitle")}
          </p>
        </div>

        {loading ? (
          <p className="text-center text-slate-500">{t("categories.loading")}</p>
        ) : industries.length === 0 ? (
          <p className="text-center text-slate-500">{t("categories.noData")}</p>
        ) : (
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {industries.slice(0, 5).map((item, index) => (
              <div
                key={item.id}
                className="group px-3 py-10 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 hover:shadow-emerald-600/10 dark:hover:shadow-emerald-600/10 text-center bg-white dark:bg-slate-900 hover:bg-emerald-600/5 dark:hover:bg-emerald-600/5 transition duration-500"
              >
                <div className="size-16 bg-emerald-600/5 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white rounded-md text-2xl flex align-middle justify-center items-center shadow-xs shadow-gray-200 dark:shadow-gray-700 transition duration-500 mx-auto">
                  {icons[index % icons.length]}
                </div>

                <div className="content mt-6">
                  <Link
                    to={`/vacancies?industry=${item.id}`}
                    className="title text-lg font-semibold hover:text-emerald-600"
                  >
                    {item.name}
                  </Link>
                  <p className="text-slate-400 mt-3">
                    {item.occupations?.length ?? 0} {t("categories.jobs")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
        <div className="md:col-span-12 text-center">
          <Link
            to="/categories"
            className="inline-flex items-center font-semibold tracking-wide border align-middle transition text-base text-center relative border-none after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out"
          >
            {t("categories.seeMore")} <MdOutlineArrowForward className="m-1" />
          </Link>
        </div>
      </div>
    </>
  );
}
