import { Link } from "react-router-dom";
import { LuMapPin, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "../assets/icons/vander";
import { TbBuildings } from "react-icons/tb";
import { useTranslation } from "react-i18next";

export default function JobGridsTwoComp({ jobs, pagination, onPageChange }) {
  const { t } = useTranslation();
  if (!jobs || jobs.length === 0) return <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}><p style={{ fontSize: '25px', color: 'gray' }}>{t('common.noJobFound')}</p></div>;

  const pages = [];
  for (let i = 1; i <= pagination.last_page; i++) pages.push(i);

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-[30px]">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="group shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                  {job.company?.logo ? <img src={job.company.logo} className="size-8" alt={job.company.name} /> : <TbBuildings fontSize={25} />}
                </div>
                <div className="ms-3">
                  <Link
                    to={`/company/${job.company.id}`}
                    className="block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500"
                  >
                    {job.title}
                  </Link>
                  <span className="block text-sm text-slate-400">
                    {job.published_at.as_days} {t('popularJobs.daysago')}
                  </span>
                </div>
              </div>

              <span className="bg-emerald-600/10 group-hover:bg-emerald-600 inline-block text-emerald-600 group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">
                {job.employment_type.name}
              </span>
            </div>

            <div className="mt-6">
              <Link
                to={`/vacancies/${job.id}`}
                className="text-lg hover:text-emerald-600 font-semibold transition-all duration-500"
              >
                {job.title}
              </Link>
              <h6 className="text-base font-medium flex items-center">
                <LuMapPin className="me-1" />
                {job.location}
              </h6>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {pagination.last_page > 1 && (
        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
          <div className="md:col-span-12 text-center">
            <nav aria-label="Page navigation">
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <button
                    disabled={pagination.current_page === 1}
                    onClick={() => onPageChange(pagination.current_page - 1)}
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 hover:bg-emerald-600"
                  >
                    <MdKeyboardArrowLeft className="text-[20px]" />
                  </button>
                </li>
                {pages.map((page) => (
                  <li key={page}>
                    <button
                      onClick={() => onPageChange(page)}
                      className={`size-[40px] inline-flex justify-center items-center border ${page === pagination.current_page
                        ? "bg-emerald-600 text-white border-emerald-600"
                        : "bg-white dark:bg-slate-900 text-slate-400 border-gray-100 dark:border-gray-800 hover:bg-emerald-600 hover:text-white"
                        }`}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    disabled={pagination.current_page === pagination.last_page}
                    onClick={() => onPageChange(pagination.current_page + 1)}
                    className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 hover:bg-emerald-600"
                  >
                    <MdKeyboardArrowRight className="text-[20px]" />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
