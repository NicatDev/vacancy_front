import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "../assets/icons/vander";
import CandidatesAPI from "../api/apiList/candidates";
import { useTranslation } from "react-i18next";
import userImg from "../assets/images/user.png";
import { FaRegUser, FaUserLarge } from "react-icons/fa6";

const initialCandidateData = {
  data: [],
  meta: {
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  },
};

export default function CandidateListComp() {
  const { t } = useTranslation();
  const [candidateList, setCandidateList] = useState(initialCandidateData);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);

  const fetchCandidates = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = {
          page,
          size: perPage,
          order: "desc",
          order_by: "id",
          include: ["user", "languages"],
        };

        const response = await CandidatesAPI.getCandidates(params);
        setCandidateList(response.data);
        setCurrentPage(response.data.meta.current_page || 1);
      } catch (error) {
        console.error("Error loading candidates:", error);
        setCandidateList(initialCandidateData);
      } finally {
        setLoading(false);
      }
    },
    [perPage]
  );

  useEffect(() => {
    fetchCandidates(currentPage);
  }, [currentPage, fetchCandidates]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= candidateList.meta.last_page) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderPagination = () => {
    const { current_page, last_page } = candidateList.meta;
    const pageNumbers = [];

    pageNumbers.push(
      <li key="prev">
        <Link
          to="#"
          aria-label={t("candidates.pagination.prev")}
          onClick={(e) => {
            e.preventDefault();
            if (current_page > 1) handlePageChange(current_page - 1);
          }}
          className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl border border-gray-100 dark:border-gray-800 ${current_page === 1 ? "cursor-not-allowed opacity-50" : "hover:text-white hover:border-emerald-600 hover:bg-emerald-600"
            }`}
        >
          <MdKeyboardArrowLeft className="text-[20px]" />
        </Link>
      </li>
    );

    const maxPagesToShow = 5;
    let startPage = Math.max(1, current_page - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(last_page, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i}>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(i);
            }}
            className={`size-[40px] inline-flex justify-center items-center border ${i === current_page
              ? "bg-emerald-600 text-white border-emerald-600"
              : "text-slate-400 bg-white dark:bg-slate-900 border-gray-100 hover:text-white hover:border-emerald-600 hover:bg-emerald-600"
              }`}
          >
            {i}
          </Link>
        </li>
      );
    }

    pageNumbers.push(
      <li key="next">
        <Link
          to="#"
          aria-label={t("candidates.pagination.next")}
          onClick={(e) => {
            e.preventDefault();
            if (current_page < last_page) handlePageChange(current_page + 1);
          }}
          className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl border border-gray-100 dark:border-gray-800 ${current_page === last_page ? "cursor-not-allowed opacity-50" : "hover:text-white hover:border-emerald-600 hover:bg-emerald-600"
            }`}
        >
          <MdKeyboardArrowRight className="text-[20px]" />
        </Link>
      </li>
    );

    return pageNumbers;
  };

  return (
    <div className="container">
      {loading ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-500 dark:text-gray-400">{t("candidates.list.loading")}</p>
        </div>
      ) : candidateList.data.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-red-500">{t("candidates.list.empty")}</p>
        </div>
      ) : (
        <>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[30px]">
            {candidateList.data.map((item) => (
              <Link
                to={`/candidate-profile/${item.id}`}
                key={item.id}
                className="group shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900 hover:shadow-md transition-all duration-500"
              >
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                      <FaRegUser className="text-emerald-600" fontSize={22} />
                    </div>
                    <div className="ms-3">
                      <h4 className="block text-[16px] font-semibold group-hover:text-emerald-600 transition-all duration-500">
                        {item.speciality || "-"}
                      </h4>
                      <span className="block text-sm text-slate-400">
                        {t("candidates.list.salary")}: {item.salary_expectation || "-"} {item?.salary_expectation_currency}
                      </span>
                    </div>
                  </div>

                  <span className="bg-emerald-600/10 h-fit group-hover:bg-emerald-600 inline-block text-emerald-600 group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                    #{item.id}
                  </span>
                </div>

                {item.languages?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.languages.map((lang, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-600/10 inline-block text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full"
                      >
                        {lang.name}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>

          {candidateList.meta.last_page > 1 && (
            <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
              <div className="md:col-span-12 text-center">
                <nav aria-label="Page navigation example">
                  <ul className="inline-flex items-center -space-x-px">{renderPagination()}</ul>
                </nav>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
