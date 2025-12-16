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
import {
  MdOutlineArrowForward,
  HiOutlineBuildingOffice,
} from "../../assets/icons/vander";
import { PiMapPin } from "../../assets/icons/vander";
import { jobData } from "../../data/data";
import VacanciesAPI from "../../api/apiList/vacancies";

export default function JobDetailThree() {
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
  }, [id])


  return (
    <>
      <section className="bg-slate-50 dark:bg-slate-800 md:py-24 py-16">
        <div className="container mt-10">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
            {/* Sol tərəf */}
            <div className="lg:col-span-4 md:col-span-6 ">
              <div className="flex flex-col sticky top-20">
                <div className="p-6 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md bg-white dark:bg-slate-900">
                  <img
                    src={data?.image ? data?.image : lenovo_logo}
                    className="rounded-full size-28 p-4 bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700"
                    alt=""
                  />

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
                    Boost the vacancy
                  </button>
                </div>
              </div>
            </div>

            {/* Sağ tərəf */}
            <div className="lg:col-span-8 md:col-span-6">
              <h5 className="text-lg font-semibold">Job Information:</h5>
              <ul className="list-none mt-5">
                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiUserCheck className="size-5"></FiUserCheck>
                  <div className="ms-4">
                    <p className="font-medium">Employee Type:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {vacancy?.employment_type ? vacancy?.employment_type?.name : ""}
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiMapPin className="size-5"></FiMapPin>
                  <div className="ms-4">
                    <p className="font-medium">Location:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {data?.Location ? data?.Location : "Australia"}
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiMonitor className="size-5"></FiMonitor>
                  <div className="ms-4">
                    <p className="font-medium">Job Type:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {data?.heading
                        ? data?.heading
                        : "Web Designer / Developer"}
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiBriefcase className="size-5"></FiBriefcase>
                  <div className="ms-4">
                    <p className="font-medium">Experience:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      2+ years
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiDollarSign className="size-5"></FiDollarSign>
                  <div className="ms-4">
                    <p className="font-medium">Salary:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      {data?.price ? data?.price : "$4000 - $4500"}
                    </span>
                  </div>
                </li>

                <li className="inline-flex items-center py-2 px-4 bg-white dark:bg-slate-900 me-2 my-1 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  <FiClock className="size-5"></FiClock>
                  <div className="ms-4">
                    <p className="font-medium">Date posted:</p>
                    <span className="text-emerald-600 font-medium text-sm">
                      28th Feb, 2025
                    </span>
                  </div>
                </li>
              </ul>

              <h5 className="text-lg font-semibold mt-6">Job Description:</h5>
              <p className="text-slate-400 mt-4">
                One disadvantage of Lorum Ipsum is that in Latin certain letters
                appear more frequently than others - which creates a distinct
                visual impression...
              </p>

              <h5 className="text-lg font-semibold mt-6">
                Responsibilities and Duties:
              </h5>
              <p className="text-slate-400 mt-4">
                It sometimes makes sense to select texts containing the various
                letters and symbols specific to the output language.
              </p>
              <ul className="list-none">
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Participate in requirements analysis
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Write clean, scalable code using C# and .NET frameworks
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Test and deploy applications and systems
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Revise, update, refactor and debug code
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Improve existing software
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Develop documentation throughout the software development life
                  cycle (SDLC)
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Serve as an expert on applications and provide technical
                  support
                </li>
              </ul>

              <h5 className="text-lg font-semibold mt-6">
                Required Experience, Skills and Qualifications:{" "}
              </h5>
              <p className="text-slate-400 mt-4">
                It sometimes makes sense to select texts containing the various
                letters and symbols specific to the output language.
              </p>
              <ul className="list-none">
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Proven experience as a .NET Developer or Application Developer
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  good understanding of SQL and Relational Databases,
                  specifically Microsoft SQL Server.
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Experience designing, developing and creating RESTful web
                  services and APIs
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Basic know how of Agile process and practices
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Good understanding of object-oriented programming.
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Good understanding of concurrent programming.
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Sound knowledge of application architecture and design.
                </li>
                <li className="text-slate-400 mt-2 inline-flex items-center">
                  <MdOutlineArrowForward className="text-emerald-600 me-1" />
                  Excellent problem solving and analytical skills
                </li>
              </ul>

              <div className="mt-5">
                <Link
                  to="#"
                  className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white md:ms-2 w-full md:w-auto"
                >
                  Apply Now
                </Link>
              </div>
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
