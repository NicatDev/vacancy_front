import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import lenovo_logo from "../../assets/images/company/lenovo-logo.png";
import {
  FiBook,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiMapPin,
  FiMonitor,
  FiUserCheck,
} from "react-icons/fi";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import 'dayjs/locale/az';

import {
  MdOutlineArrowForward,
  HiOutlineBuildingOffice,
} from "../../assets/icons/vander";
import { PiMapPin } from "../../assets/icons/vander";
import { jobData } from "../../data/data";
import VacanciesAPI from "../../api/apiList/vacancies";

export default function JobDetailThree() {
  const { t } = useTranslation();
  const role = localStorage.getItem('role') ?? null;
  const params = useParams();
  const id = params.id;
  const data = jobData.find((jobs) => jobs.id === parseInt(id));
  const [vacancy, setVacancy] = useState(null);

  // Modal state
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getVacancy = async () => {
      try {

        const response = await VacanciesAPI.getSingleJobPost(id);

        setVacancy(prevState => prevState = response?.data?.data);
      } catch (error) {

      }
    }

    getVacancy();
  }, [id]);
  const responsibilitiesText = vacancy?.responsibilities;
  const requirementsText = vacancy?.requirements;


  const responsibilitiesArray = responsibilitiesText
    ? responsibilitiesText.split('\n').filter(item => item.trim() !== '')
    : [];

  const requirementsArray = requirementsText
    ? requirementsText.split('\n').filter(item => item.trim() !== '')
    : [];


  return (
    <>
      <section className="bg-slate-50 dark:bg-slate-800 md:py-24 py-16">
        <div className="container mt-10">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
            {/* Sol tərəf */}
            <div className="lg:col-span-4 md:col-span-6 ">
              <div className="flex flex-col sticky top-20">
                <div className="p-6 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md bg-white dark:bg-slate-900">
                  {vacancy?.company?.logo && <img
                    src={vacancy?.company?.logo}
                    className="rounded-full size-28 p-4 bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700"
                    alt=""
                  />}

                  <div className="md:ms-4 mt-4">
                    <h5 className="text-xl font-semibold">
                      {vacancy?.title
                        ? vacancy?.title
                        : ""}
                    </h5>
                    <div className="mt-1">

                      <span className="text-slate-400 font-medium me-2 inline-flex items-center">
                        <PiMapPin className="text-[18px] text-emerald-600 me-1" />{" "}
                        {vacancy?.location ? vacancy?.location?.split(" ")[0] : "Norway,Oslo"}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="py-1 px-5 mt-4 cursor-pointer w-fit inline-block rounded-3xl font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white searchbtn submit-btn"
                  >
                    {t('vacancyDetail.boostVacancy')}
                  </button>
                </div>
              </div>
            </div>

            {/* Sağ tərəf */}
            <div className="lg:col-span-8 md:col-span-6">
              <h5 className="text-lg font-semibold">{t('vacancyDetail.jobInformation')}:</h5>
              <ul className="list-none mt-5">
                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiUserCheck className="size-5"></FiUserCheck>
                  <div className="ms-4">
                    <p className="font-medium">{t('vacancyDetail.employeeType')}:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {vacancy?.employment_type ? vacancy?.employment_type?.name : ""}
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiMapPin className="size-5"></FiMapPin>
                  <div className="ms-4">
                    <p className="font-medium">{t('vacancyDetail.location')}:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {vacancy?.location ? vacancy?.location?.split(" ")[0] : ""}
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiMonitor className="size-5"></FiMonitor>
                  <div className="ms-4">
                    <p className="font-medium">{t('vacancyDetail.jobType')}:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {vacancy?.occupation
                        ? vacancy?.occupation?.name
                        : "Web Designer / Developer"}
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiBriefcase className="size-5"></FiBriefcase>
                  <div className="ms-4">
                    <p className="font-medium">{t('vacancyDetail.experience')}:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {vacancy?.experience ?? ''}
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiDollarSign className="size-5"></FiDollarSign>
                  <div className="ms-4">
                    <p className="font-medium">{t('vacancyDetail.salary')}:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {vacancy?.salary ? vacancy?.salary : ""}
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiClock className="size-5"></FiClock>
                  <div className="ms-4">
                    <p className="font-medium">{t('vacancyDetail.datePosted')}:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {/* 28th Feb, 2025 */}
                      {vacancy?.published_at && dayjs(vacancy?.published_at?.as_date).format("Do MMM, YYYY")}
                    </span>
                  </div>
                </li>
              </ul>

              <h5 className="text-lg font-semibold mt-6">{t('vacancyDetail.jobDescription')}:</h5>
              <p className="text-slate-400 mt-4">
                {vacancy?.info ?? ''}
              </p>

              <h5 className="text-lg font-semibold mt-6">
                {t('vacancyDetail.responsibilitiesAndDuties')}:
              </h5>
              {/* <p className="text-slate-400 mt-4">
                It sometimes makes sense to select texts containing the various
                letters and symbols specific to the output language.
              </p> */}
              {responsibilitiesArray.length > 0 && (
                <ul className="list-none flex flex-col">
                  {responsibilitiesArray.map((responsibility, index) => (
                    <li
                      key={index}
                      className="text-slate-400 mt-2 inline-flex items-center"
                    >
                      <MdOutlineArrowForward className="text-emerald-600 me-1" />

                      {responsibility.trim()}
                    </li>
                  ))}
                </ul>
              )}

              <h5 className="text-lg font-semibold mt-6">
                {t('vacancyDetail.requirements')}:
              </h5>
              {/* <p className="text-slate-400 mt-4">
                It sometimes makes sense to select texts containing the various
                letters and symbols specific to the output language.
              </p> */}


              {requirementsArray.length > 0 && (
                <ul className="list-none flex flex-col">
                  {requirementsArray.map((requirement, index) => (
                    <li
                      key={index}
                      className="text-slate-400 mt-2 inline-flex items-center"
                    >
                      <MdOutlineArrowForward className="text-emerald-600 me-1" />

                      {requirement.trim()}
                    </li>
                  ))}
                </ul>
              )}
              {role === "candidate" && <div className="mt-5">
                <Link
                  to="#"
                  className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white md:ms-2 w-full md:w-auto"
                >
                 {t('vacancyDetail.applyNow')}
                </Link>
              </div>}

            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isOpen && (
        <div className="flex bg-slate-900/70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-1 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Header */}
              <div className="flex items-center justify-between p-3 border-b rounded-t border-gray-200 dark:border-gray-600">
                <h2 className="text-lg font-semibold">Boost the vacancy</h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="overflow-hidden rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
                  <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Parametr</th>
                        <th className="px-6 py-3 font-semibold">Dəyər</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <td className="px-6 py-3 font-medium">
                          Deadline tarixi
                        </td>
                        <td className="px-6 py-3">30 gün</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <td className="px-6 py-3 font-medium">Bitmə tarixi</td>
                        <td className="px-6 py-3">15 gün</td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                        <td className="px-6 py-3 font-medium">Boost qiyməti</td>
                        <td className="px-6 py-3">
                          2 × 15 ={" "}
                          <span className="font-bold text-emerald-600">
                            30 manat
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 cursor-pointer py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Close
                </button>
                <button className="px-4 cursor-pointer py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
