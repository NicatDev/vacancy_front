import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { LuMapPin, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "../assets/icons/vander";
// Removed mock data: import { companiesData } from '../data/data';
import companiesService from '../api/companiesService'; 

// Default structure for the company list (based on API response structure)
const initialCompanyData = {
    data: [], // List of companies
    meta: {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 0,
    }
};

export default function EmployerList() {
    const [companyList, setCompanyList] = useState(initialCompanyData);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(15); // Items per page

    // Function to fetch the company list from the API
    const fetchCompanies = useCallback(async (page) => {
        setLoading(true);
        try {
            const params = {
                page: page,
                size: perPage,
                include: 'user', // To include user information
                order: 'desc',
                order_by: 'id',
            };
            
            const response = await companiesService.listCompanies(params);

            // Update the state based on the data structure returned by the API
            setCompanyList(response.data);
            
            // It's safer to use meta.current_page from the API:
            setCurrentPage(response.data.meta.current_page); 

        } catch (error) {
            console.error("Error loading companies:", error);
            // Show an empty list on error
            setCompanyList(initialCompanyData);
        } finally {
            setLoading(false);
        }
    }, [perPage]); // Ensure the function is recreated if perPage changes

    // Fetch data when the page loads and when currentPage changes
    useEffect(() => {
        fetchCompanies(currentPage);
    }, [currentPage, fetchCompanies]);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= companyList.meta.last_page) {
            setCurrentPage(newPage);
            // Scroll to top of the list for better UX
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Function to generate pagination buttons
    const renderPagination = () => {
        const { current_page, last_page } = companyList.meta;
        const pageNumbers = [];

        // Previous button
        pageNumbers.push(
            <li key="prev">
                <Link 
                    to="#" 
                    onClick={(e) => { e.preventDefault(); if (current_page > 1) handlePageChange(current_page - 1); }}
                    className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 ${current_page === 1 ? 'cursor-not-allowed opacity-50' : 'hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600'}`}
                >
                    <MdKeyboardArrowLeft className="text-[20px] rtl:rotate-180 rtl:-mt-1" />
                </Link>
            </li>
        );

        // Let's show a maximum of 5 page numbers (example logic)
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
                        className={`size-[40px] inline-flex justify-center items-center ${
                            i === current_page 
                            ? 'z-10 text-white bg-emerald-600 border border-emerald-600' 
                            : 'text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600'
                        }`}
                        aria-current={i === current_page ? "page" : undefined}
                    >
                        {i}
                    </Link>
                </li>
            );
        }

        // Next button
        pageNumbers.push(
            <li key="next">
                <Link
                    to="#"
                    onClick={(e) => { e.preventDefault(); if (current_page < last_page) handlePageChange(current_page + 1); }}
                    className={`size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 ${current_page === last_page ? 'cursor-not-allowed opacity-50' : 'hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600'}`}
                >
                    <MdKeyboardArrowRight className="text-[20px] rtl:rotate-180 rtl:-mt-1" />
                </Link>
            </li>
        );

        return pageNumbers;
    };


    return (
        <>
            <div className="container">
                {loading ? (
                    <div className="text-center py-10">
                        {/* Loading or spinner can be displayed */}
                        <p className="text-xl text-gray-500 dark:text-gray-400">Loading companies...</p>
                        {/* 

[Image of loading spinner]
 */} 
                    </div>
                ) : companyList.data.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-xl text-red-500">No registered companies found.</p>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[30px]">
                        {companyList.data.map((item) => (
                            // Fields adjusted based on data returned from the API
                            <div className="group relative p-6 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 mt-6" key={item.id}>
                                <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow-md shadow-gray-200 dark:shadow-gray-700 rounded-md relative -mt-12">
                                    {/* No API field for company image, using a default/mock image */}
                                    <img src={`/images/company-logo-${item.id % 5 || 1}.png`} className="size-8" alt="Company Logo" />
                                </div>

                                <div className="mt-4">
                                    {/* Used the 'website' field, you can add a 'name' field if available */}
                                    <Link to={`/company/${item.id}`} className="text-lg hover:text-emerald-600 font-semibold">{item.website || 'No Website Information'}</Link>
                                    <p className="text-slate-400 mt-2">User ID: {item.user_id}</p>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between">
                                    {/* 'country' and 'vacancy' fields are not in the API, they were in mock data. Leaving empty or using static text. */}
                                    <span className="text-slate-400 flex items-center"><LuMapPin className="me-1"/>No Location Information</span>
                                    <span className="block font-semibold text-emerald-600">No Job Vacancies</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {/* Pagination */}
                {companyList.meta.last_page > 1 && (
                    <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                        <div className="md:col-span-12 text-center">
                            <nav aria-label="Page navigation example">
                                <ul className="inline-flex items-center -space-x-px">
                                    {renderPagination()}
                                </ul>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}