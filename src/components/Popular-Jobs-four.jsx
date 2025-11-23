import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { PiMapPin, MdOutlineArrowForward } from "../assets/icons/vander";
import OccupationsApi from "../api/apiList/occupations";
import { Spin } from "antd";

export default function PopularJobsfour() {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [total, setTotal] = useState(0);

  // Statik data qalan sahələr üçün
  const staticJobData = {
    headline: "Exciting opportunity with great benefits",
    day: "2 days ago",
    Location: "Baku, Azerbaijan",
    skills: ["React", "Node.js", "REST API"],
    applied: 21,
    vacancy: 40,
    image: "https://via.placeholder.com/56",
  };

  const fetchJobs = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await OccupationsApi.getOccupations(pageNumber, pageSize);
      const occupations = res.data.data.map((item) => ({
        id: item.id,
        title: item.name,
        ...staticJobData,
      }));
      setJobs(occupations);
      setTotal(res.data.meta?.total || 0);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  const totalPages = Math.ceil(total / pageSize);

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

        {loading ? (
          <div className="text-center py-10"><Spin size="large" /></div>
        ) : jobs.length === 0 ? (
          <p className="text-center py-10">No jobs found.</p>
        ) : (
          <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {jobs.map((item) => (
              <div
                className="group relative overflow-hidden bg-white dark:bg-slate-900 shadow-sm hover:shadow-md shadow-gray-200 dark:shadow-gray-700 dark:hover:shadow-gray-700 hover:-mt-2 rounded-md transition-all duration-500 h-fit"
                key={item.id}
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="size-14 min-w-[56px] flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                      <img src={item.image} className="size-8" alt="" />
                    </div>

                    <div className="ms-3">
                      <Link
                        to={`/vacancy/${item.id}`}
                        className="inline-block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500 me-1"
                      >
                        {item.title}
                      </Link>
                      <span className="inline-block text-sm text-slate-400">{item.day}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 py-3">{item.headline}</p>

                  <div>
                    {item.skills?.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-slate-100 dark:bg-slate-800 inline-block text-slate-900 dark:text-slate-300 text-xs px-2.5 py-0.5 font-semibold rounded-full me-1"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 lg:flex justify-between items-center">
                  <div className="lg:inline-block flex justify-between items-center">
                    <span className="inline-flex items-center me-1 text-slate-400">
                      <PiMapPin className="text-[18px] text-slate-900 dark:text-white me-1" />
                      {item.Location}
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
            <div className="md:col-span-12 text-center">
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-3 py-2 text-slate-400 bg-white dark:bg-slate-900 rounded-l-md border border-gray-100 dark:border-gray-800 hover:bg-emerald-600 hover:text-white"
                  >
                    &lt;
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setPage(i + 1)}
                      className={`px-3 py-2 border border-gray-100 dark:border-gray-800 ${
                        page === i + 1
                          ? "bg-emerald-600 text-white"
                          : "bg-white dark:bg-slate-900 text-slate-400 hover:bg-emerald-600 hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="px-3 py-2 text-slate-400 bg-white dark:bg-slate-900 rounded-r-md border border-gray-100 dark:border-gray-800 hover:bg-emerald-600 hover:text-white"
                  >
                    &gt;
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
          <div className="md:col-span-12 text-center">
            <Link
              to="/vacancies"
              className="inline-flex items-center font-semibold tracking-wide border align-middle transition text-base text-center relative border-none after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out"
            >
              {t("popularJobs.seeMore")} <MdOutlineArrowForward className="m-1"/>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
