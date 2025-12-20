import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { useTranslation } from "react-i18next";
import CompaniesAPI from "../api/apiList/companies";
import { TbBuildings } from "react-icons/tb";
import { LuMapPin, MdOutlineArrowForward } from "../assets/icons/vander";

export default function FindBestCompanies() {
  const { t } = useTranslation();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8); // 8 company per page
  const [total, setTotal] = useState(0);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        size: pageSize,
        include: "user",
        order: "desc",
        order_by: "id",
      };
      const res = await CompaniesAPI.getCompanies(params);

      const data = res.data.data || res.data;
      setCompanies(data.items || data?.slice(0, 4));
      setTotal(data.total || 0);
    } catch (err) {
      console.error("COMPANIES API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [page]);

  return (
    <div className="container pt-4">
      {/* Title */}
      <div className="grid grid-cols-1 pb-8 text-center">
        <h3 className="mb-4 md:text-[26px] text-2xl font-semibold">
          {t("bestCompanies.title")}
        </h3>
        <p className="text-slate-400 max-w-xl mx-auto">
          {t("bestCompanies.subtitle")}
        </p>
      </div>

      {/* Loading */}
      {loading && <p className='text-center text-slate-500'>{t("loading")}</p>}

      {/* Empty state */}
      {!loading && companies.length === 0 && (
        <p className='text-center text-slate-500'>{t("common.noData")}</p>
      )}

      {/* Companies Grid */}
      {!loading && companies.length > 0 && (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            {companies.map((item) => (
              <div
                className="group relative p-6 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 mt-6"
                key={item.id}
              >
                <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-700 rounded-md relative -mt-12">

                  {item?.logo ? <img src={item.logo} className="size-8" alt="" /> : <TbBuildings fontSize={25} />}
                </div>

                <div className="mt-4">
                  <Link
                    to={`/company/${item.id}`}
                    className="text-lg hover:text-emerald-600 font-semibold h-[150px]"
                  >
                    {item.name}
                  </Link>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                  <span className="text-slate-400 flex items-center">
                    <LuMapPin className="me-1" /> {item.country}
                  </span>
                  <span className="block font-semibold text-emerald-600">
                    {item.job_post_count} {t("bestCompanies.jobs")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination
          <div className="flex justify-center mt-8">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              onChange={(p) => setPage(p)}
              showSizeChanger={false}
            />
          </div> */}
        </>
      )}

      {/* See More */}
      <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
        <div className="md:col-span-12 text-center">
          <Link
            to="/companies"
            className="inline-flex items-center font-semibold tracking-wide border align-middle transition text-base text-center relative border-none after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out"
          >
            {t("bestCompanies.seeMore")} <MdOutlineArrowForward className="ms-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
