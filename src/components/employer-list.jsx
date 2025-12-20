import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LuMapPin, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "../assets/icons/vander";
import CompaniesAPI from '../api/apiList/companies';
import { useTranslation } from "react-i18next";
import { TbBuildings } from "react-icons/tb";
const initialCompanyData = {
    data: [],
    meta: {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
    }
};

export default function EmployerList() {
    const { t } = useTranslation();

    const [companyList, setCompanyList] = useState(initialCompanyData);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(15);

    const fetchCompanies = useCallback(async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page,
                size: perPage,
                include: "user",
                order: "desc",
                order_by: "id",
            };

            const response = await CompaniesAPI.getCompanies(params);

            setCompanyList(response.data);
            setCurrentPage(response.data.meta.current_page || 1);

        } catch (error) {
            console.error("Error loading companies:", error);
            setCompanyList(initialCompanyData);
        } finally {
            setLoading(false);
        }
    }, [perPage]);

    useEffect(() => {
        fetchCompanies(currentPage);
    }, [currentPage, fetchCompanies]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= companyList.meta.last_page) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderPagination = () => {
        const { current_page, last_page } = companyList.meta;
        const pageNumbers = [];

        // Previous
        pageNumbers.push(
            <li key="prev">
                <Link
                    to="#"
                    aria-label={t("companies.employerList.pagination.prev")}
                    onClick={(e) => { e.preventDefault(); if (current_page > 1) handlePageChange(current_page - 1); }}
                    className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl border border-gray-100 dark:border-gray-800
                        ${current_page === 1 ? "cursor-not-allowed opacity-50" : "hover:text-white hover:border-emerald-600 hover:bg-emerald-600"}`}
                >
                    <MdKeyboardArrowLeft className="text-[20px]" />
                </Link>
            </li>
        );

        // Page numbers
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
                        onClick={(e) => { e.preventDefault(); handlePageChange(i); }}
                        className={`size-[40px] inline-flex justify-center items-center border 
                            ${i === current_page
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : "text-slate-400 bg-white dark:bg-slate-900 border-gray-100 hover:text-white hover:border-emerald-600 hover:bg-emerald-600"
                            }`}
                    >
                        {i}
                    </Link>
                </li>
            );
        }

        // Next
        pageNumbers.push(
            <li key="next">
                <Link
                    to="#"
                    aria-label={t("companies.employerList.pagination.next")}
                    onClick={(e) => { e.preventDefault(); if (current_page < last_page) handlePageChange(current_page + 1); }}
                    className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl border border-gray-100 dark:border-gray-800
                        ${current_page === last_page ? "cursor-not-allowed opacity-50" : "hover:text-white hover:border-emerald-600 hover:bg-emerald-600"}`}
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
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        {t("companies.employerList.loading")}
                    </p>
                </div>
            ) : companyList.data.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl text-red-500">
                        {t("companies.employerList.noCompanies")}
                    </p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[30px]">
                    {companyList.data.map((item) => (
                        <div
                            className="group relative p-6 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 mt-6"
                            key={item.id}
                        >
                            <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow-md rounded-md -mt-12">
                                {item?.logo ? <img
                                    src={CompanyIcon}
                                    className="size-8"
                                    alt="Company Logo"
                                /> : <TbBuildings fontSize={35} />}

                            </div>

                            <div className="mt-4">
                                <Link
                                    to={`/company/${item.id}`}
                                    className="text-lg hover:text-emerald-600 font-semibold"
                                >
                                    {item?.name}
                                </Link>

                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                                <span className="text-slate-400 flex items-center">
                                    <LuMapPin className="me-1" />
                                    {t("companies.employerList.noLocation")}
                                </span>

                                <span className="font-semibold text-emerald-600">
                                    {item?.job_post_count}Jobs
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {companyList.meta.last_page > 1 && (
                <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                    <div className="md:col-span-12 text-center">
                        <nav>
                            <ul className="inline-flex items-center -space-x-px">
                                {renderPagination()}
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
}
