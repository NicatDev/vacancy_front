import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IndustryAPI from "../api/apiList/industries";
import { Pagination, Spin } from "antd";
import { useTranslation } from "react-i18next";

import {
  AiOutlineGitlab,
  VscBook,
  AiOutlinePieChart,
  VscFeedback,
  RiPresentationFill
} from "../assets/icons/vander";

const icons = [
  AiOutlineGitlab,
  VscBook,
  AiOutlinePieChart,
  VscFeedback,
  RiPresentationFill
];

export default function JobCategoriesComp() {
  const { t } = useTranslation();
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size] = useState(8);
  const [total, setTotal] = useState(0);

  const fetchIndustries = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await IndustryAPI.getIndustries(pageNumber, size);
      const data = res.data.data || res.data;
      setIndustries(data);

      setTotal(res.data.meta.total || data.length);
    } catch (err) {
      console.error("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries(page);
  }, [page]);

  return (
    <div className="container">
      {loading ? (
        <div className="text-center py-10">
          <Spin size="large" />
        </div>
      ) : industries.length === 0 ? (
        <p className="text-center py-10">{t('categories.noData')}</p>
      ) : (
        <>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
            {industries.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <div
                  key={item.id}
                  className="group px-3 py-10 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 hover:shadow-emerald-600/10 dark:hover:shadow-emerald-600/10 text-center bg-white dark:bg-slate-900 hover:bg-emerald-600/5 dark:hover:bg-emerald-600/5 transition duration-500"
                >
                  <div className="size-16 bg-emerald-600/5 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white rounded-md text-2xl flex align-middle justify-center items-center shadow-xs shadow-gray-200 dark:shadow-gray-700 transition duration-500 mx-auto">
                    <Icon />
                  </div>

                  <div className="content mt-6">
                    <Link
                      to={`/vacancies?industry=${item.id}`}
                      className="title text-lg font-semibold hover:text-emerald-600"
                    >
                      {item.name}
                    </Link>
                    <p className="text-slate-400 mt-3">
                      {item.occupations?.length ?? 0} Jobs
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center">
            <Pagination
              current={page}
              pageSize={size}
              total={total}
              onChange={(p) => setPage(p)}
            />
          </div>
        </>
      )}
    </div>
  );
}
