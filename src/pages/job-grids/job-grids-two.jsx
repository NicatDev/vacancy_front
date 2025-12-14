import { useEffect, useState } from "react";
import { LuSearch } from "../../assets/icons/vander";
import VacanciesAPI from "../../api/apiList/vacancies";
import IndustryAPI from "../../api/apiList/industries";
import EmploymentTypeApi from "../../api/apiList/employmentTypes";
import JobGridsTwoComp from "../../components/job-grids-two-comp";
import { Link } from "react-router-dom";
export default function JobGridsTwo() {
  const [industries, setIndustries] = useState([]);
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [expandedIndustry, setExpandedIndustry] = useState(null);

  const [filters, setFilters] = useState({
    text: "",
    industry: null,
    occupation: null,
    employment_type: null,
    page: 1,
    size: 15,
  });

  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  // FETCH INDUSTRIES & EMPLOYMENT TYPES
  useEffect(() => {
    IndustryAPI.getIndustries(1, 10000, { relationsOccupations: true }).then(
      (res) => setIndustries(res.data.data)
    );

    EmploymentTypeApi.getEmploymentTypes(1, 10000).then((res) =>
      setEmploymentTypes(res.data.data)
    );
  }, []);

  // FETCH JOBS
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

  // INITIAL LOAD OR FILTER CHANGE
  useEffect(() => {
    fetchJobs(1);
  }, [filters]);

  /* =======================
     HANDLERS
  ======================= */
  const handleSearchChange = (e) => {
    setFilters((prev) => ({ ...prev, text: e.target.value, page: 1 }));
  };

  const handleIndustrySelect = (industryId) => {
    setExpandedIndustry((prev) => (prev === industryId ? null : industryId));

    setFilters((prev) => {
      if (prev.industry === industryId) {
        return { ...prev, industry: null, occupation: null, page: 1 };
      }
      return { ...prev, industry: industryId, occupation: null, page: 1 };
    });
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

  return (
    <>
    <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover"> <div className="absolute inset-0 bg-emerald-900/90"></div> <div className="container"> <div className="grid grid-cols-1 text-center mt-10"> <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white"> Job Vacancies </h3> </div> </div> <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3"> <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block"> <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"> <Link to="/index">Jobstack</Link> </li> <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page" > Vacancies </li> </ul> </div> </section>
   <section className="py-16">
      <div className="container grid md:grid-cols-12 gap-8" style={{gap:'30px'}}>
        {/* FILTER SIDEBAR */}
        <div className="md:col-span-4">
          <div className="bg-white p-6 rounded shadow sticky top-20">
            {/* SEARCH */}
            <div className="mb-6" >
              <label className="font-semibold">Search</label>
              <div className="relative mt-2">
                <LuSearch className="absolute top-3 left-3 ml-2.5" style={{marginLeft:'10px'}}  />
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
            <div className="mb-6">
              <label className="font-semibold block mb-3">Categories</label>

              {(filters.industry || filters.occupation) && (
                <button
                  type="button"
                  onClick={() => {
                    setExpandedIndustry(null);
                    setFilters((prev) => ({
                      ...prev,
                      industry: null,
                      occupation: null,
                      page: 1,
                    }));
                  }}
                  className="text-xs text-emerald-600 mb-2 underline"
                  style={{cursor:'pointer'}}
                >
                  Clear category selection
                </button>
              )}

              {industries.map((industry) => (
                <div key={industry.id} className="mb-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.industry === industry.id}
                      onChange={() => handleIndustrySelect(industry.id)}
                    />
                    <span className="ms-2 font-medium text-slate-800">
                      {industry.name}
                    </span>
                  </label>

                  {expandedIndustry === industry.id && (
                    <div style={{marginLeft:'20px'}} className="ml-14 mt-2 pl-4 border-l-2 border-slate-200 bg-slate-50 rounded-sm space-y-1">
                      {industry.occupations.map((occ) => (
                        <label
                          key={occ.id}
                          className="flex items-center text-xs text-slate-500 cursor-pointer py-0.5"
                        >
                          <input
                            type="checkbox"
                            className="scale-90"
                            checked={filters.occupation === occ.id}
                            onChange={() => handleOccupationSelect(occ.id)}
                          />
                          <span className="ms-2">{occ.name}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* EMPLOYMENT TYPES */}
            <div className="mb-6">
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
                    checked={filters.employment_type === type.id}
                    onChange={() => handleEmploymentTypeSelect(type.id)}
                  />
                  <span className="ms-2 text-slate-600">{type.name}</span>
                </label>
              ))}
            </div>
          </div>
          
      </div>
         <div className="md:col-span-7">
          <JobGridsTwoComp
            jobs={jobs}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
        </div>

        {/* JOB LIST */}
     
    </section>
    </>
    
  );
}
