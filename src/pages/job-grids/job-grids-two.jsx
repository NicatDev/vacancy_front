import { useEffect, useState, useRef } from "react";
import { LuSearch } from "../../assets/icons/vander";
import VacanciesAPI from "../../api/apiList/vacancies";
import IndustryAPI from "../../api/apiList/industries";
import EmploymentTypeApi from "../../api/apiList/employmentTypes";
import JobGridsTwoComp from "../../components/job-grids-two-comp";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
export default function JobGridsTwo() {
  const [industries, setIndustries] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [expandedIndustry, setExpandedIndustry] = useState(null);
const [searchParams,setSearchParams] = useSearchParams();
const typeFromUrl = searchParams.get("type");     
const searchFromUrl = searchParams.get("search");
  const dropdownRef = useRef(null);

  const [filters, setFilters] = useState({
    text: searchFromUrl??"",
    industry: null,
    occupation: null,
    employment_type: typeFromUrl??null,
    page: 1,
    size: 15,
  });

  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  /* =======================
     FETCH INDUSTRIES & TYPES
  ======================= */
  useEffect(() => {
    IndustryAPI.getIndustries(1, 10000, { relationsOccupations: true }).then(
      (res) => setIndustries(res.data.data)
    );

    EmploymentTypeApi.getEmploymentTypes(1, 10000).then((res) =>
      setEmploymentTypes(res.data.data)
    );
  }, []);

  /* =======================
     FETCH JOBS
  ======================= */
  const fetchJobs = async (page = 1) => {
    try {
      const res = await VacanciesAPI.searchJobPosts({
        text: filters.text,
        industry: filters.industry,
        occupation: filters.occupation,
        employment_type: filters.employment_type,
        page,
        size: filters.size,
      });

      setJobs(res.data.data);
      setPagination({
        current_page: res.data.meta.current_page,
        last_page: res.data.meta.last_page,
        total: res.data.meta.total,
      });
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    fetchJobs(filters.page);
      setSearchParams({});
  }, [filters]);

  /* =======================
     HANDLERS
  ======================= */
  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, text: e.target.value, page: 1 }));
  };

  const handleIndustrySelect = (industryId) => {
    setExpandedIndustry((prev) => (prev === industryId ? null : industryId));

    setFilters((prev) => ({
      ...prev,
      industry: prev.industry === industryId ? null : industryId,
      occupation: null,
      page: 1,
    }));
  };

  const handleOccupationSelect = (occupationId) => {
    setFilters((prev) => ({
      ...prev,
      occupation: prev.occupation === occupationId ? null : occupationId,
      page: 1,
    }));
  };

  const handleEmploymentTypeSelect = (id) => {
    setFilters((prev) => ({
      ...prev,
      employment_type: prev.employment_type === id ? null : id,
      page: 1,
    }));
  };

  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  /* =======================
     CLOSE DROPDOWN ON CLICK OUTSIDE
  ======================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setExpandedIndustry(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-emerald-900/90"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-3xl text-2xl font-medium text-white">
              Job Vacancies
            </h3>
          </div>
        </div>
        <div className="absolute bottom-5 start-0 end-0 text-center z-10">
          <ul className="breadcrumb breadcrumb-light inline-block">
            <li className="inline text-white/50">
              <Link to="/index">Jobstack</Link>
            </li>
            <li className="inline text-white ms-2">Vacancies</li>
          </ul>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16">
        <div className="container grid md:grid-cols-12 gap-8">
          {/* FILTER SIDEBAR */}
          <div className="md:col-span-4">
            <div className="bg-white p-6 rounded shadow sticky top-20">
              {/* SEARCH */}
              <div className="mb-6">
                <label className="font-semibold">Search</label>
                <div className="relative mt-2">
                  <LuSearch className="absolute top-3 left-3" style={{marginLeft:'10px'}} />
                  <input
                    type="text"
                    value={filters.text}
                    onChange={handleSearchChange}
                    className="w-full h-10 ps-10 border rounded"
                    placeholder="Search jobs..."
                  />
                </div>
              </div>

              {/* CATEGORIES */}
              {/* CATEGORIES */}
              <div className="mb-6">
                <label className="font-semibold block mb-3 text-slate-800">
                  Categories
                </label>

                <div ref={dropdownRef} className="flex flex-col gap-3">
                  {industries.map((industry) => {
                    const isOpen = expandedIndustry === industry.id;
                    const isSelected = filters.industry === industry.id;

                    return (
                      <div
                        key={industry.id}
                        className={`shadow-class rounded-lg transition-all ${isOpen ? "border-emerald-500 shadow-sm" : "border-slate-200"
                          }`}
                      >
                        {/* INDUSTRY HEADER */}
                        <div
                          className=" rounded-cart flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-slate-50"
                          onClick={() =>
                            setExpandedIndustry(isOpen ? null : industry.id)
                          }
                        >
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleIndustrySelect(industry.id)}
                              className="accent-emerald-600 w-4 h-4"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <span className="font-medium text-slate-800">
                              {industry.name}
                            </span>
                          </label>

                          {industry.occupations?.length > 0 && (
                            <IoIosArrowDown
                              className={`rounded-cart text-slate-500 transition-transform duration-300 rounded-lg ${isOpen ? "rotate-180" : ""
                                }`}
                            />
                          )}
                        </div>

                        {/* OCCUPATIONS DROPDOWN */}
                        {isOpen && industry.occupations && (
                          <div className="rounded-cart px-4 pb-3 pt-2 border-top">
                            {industry.occupations.map((occ) => {
                              const occSelected = filters.occupation === occ.id;

                              return (
                                <label
                                  key={occ.id}
                                  className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition ${occSelected
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "hover:bg-slate-200/60 text-slate-700"
                                    }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={occSelected}
                                    onChange={() =>
                                      handleOccupationSelect(occ.id)
                                    }
                                    className="accent-emerald-600 w-4 h-4"
                                  />
                                  <span className="text-sm">{occ.name}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>


              {/* EMPLOYMENT TYPE */}
              <div>
                <label className="font-semibold block mb-3">
                  Employment Type
                </label>
                {employmentTypes.map((type) => (
                  <label
                    key={type.id}
                    className="flex items-center mb-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.employment_type == type.id}
                      onChange={() =>
                        handleEmploymentTypeSelect(type.id)
                      }
                    />
                    <span className="ms-2">{type.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* JOB LIST */}
          <div className="md:col-span-8">
            <JobGridsTwoComp
              jobs={jobs}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}
