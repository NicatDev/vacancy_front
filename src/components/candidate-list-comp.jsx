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
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[30px]">
            {candidateList.data.map((item) => (
              <div
                className="group bg-white dark:bg-slate-900 relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 text-center p-6"
                key={item.id}
              >
                <div className="flex justify-center mx-auto w-60px h-60px items-center rounded-full border">
                  <FaRegUser fontSize={40} />
                </div>
                {/* <img
                  src={UserIcon}
                  className="size-20 rounded-full shadow-sm shadow-gray-200 dark:shadow-gray-700 mx-auto"
                  alt={item.name}
                /> */}
                <div className="mt-2">
                  <Link to={`/candidate-profile/${item.id}`} className="hover:text-emerald-600 font-semibold text-lg">
                    {item.name}
                  </Link>
                </div>

                <ul className="mt-2 list-none space-x-0.5">
                  {item.languages?.map((lang, idx) => (
                    <li className="inline" key={idx}>
                      <span className="bg-emerald-600/10 inline-block text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full">
                        {lang.name}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex justify-between mt-2">
                  <div className="block">
                    <span className="text-slate-400">{t("candidates.list.salary")}:</span>
                    <span className="block text-sm font-semibold">{item.salary_expectation || "-"}</span>
                  </div>
                  <div className="block">
                    <span className="text-slate-400">{t("candidates.list.speciality")}:</span>
                    <span className="block text-sm font-semibold">{item.speciality || "-"}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <Link
                    to={`/candidate-profile/${item.id}`}
                    className="py-[5px] px-4 text-sm inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:border-emerald-600 text-white rounded-md"
                  >
                    {t("candidates.list.viewProfile")}
                  </Link>
                </div>
              </div>
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
