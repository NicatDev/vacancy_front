import { useState } from "react";
import { Link } from "react-router-dom";
import JobGridsTwoComp from "../../components/job-grids-two-comp";
import { LuSearch } from "../../assets/icons/vander";
import RangeSlider from "react-range-slider-input";
import MultiSelect from "../../components/MultiSelect";
import "react-range-slider-input/dist/style.css";

export default function JobGridsTwo() {
  const [categories, setCategories] = useState([
    { label: "Web Designer", value: 1 },
    { label: "Web Developer", value: 2 },
    { label: "UI / UX Designer", value: 3 },
    { label: "Backend Developer", value: 4 },
  ]);

  const [locations, setLocations] = useState([
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "MC" },
    { label: "South Carolina", value: "SC" },
  ]);

  const [range, setRange] = useState([0, 5000]);

  const [selectedOption, setSelectedOption] = useState("1");

  const formatCurrency = (value) => `$${value.toLocaleString()}`;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-emerald-900/90"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">
              Job Vacancies
            </h3>
          </div>
        </div>

        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
            <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link to="/index">Jobstack</Link>
            </li>
            <li
              className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white"
              aria-current="page"
            >
              Vacancies
            </li>
          </ul>
        </div>
      </section>
      <div className="relative">
        <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-white dark:text-slate-900">
          <svg
            className="w-full h-auto"
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>
      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-4 md:col-span-6">
              <div className="shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900 sticky top-20">
                <form>
                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label htmlFor="searchname" className="font-semibold">
                        Search Company
                      </label>
                      <div className="relative mt-2">
                        <LuSearch className="text-lg absolute top-[10px] start-3" />
                        <input
                          name="search"
                          id="searchname"
                          type="text"
                          className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent ps-10"
                          placeholder="Search"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold">Categories</label>
                      <MultiSelect
                        options={categories}
                        maxTagCount={1}
                        placeholder="Select"
                      />
                    </div>

                    <div>
                      <label className="font-semibold">Location</label>
                      <MultiSelect
                        options={locations}
                        maxTagCount={1}
                        placeholder="Select"
                      />
                    </div>

                    <div>
                      <label className="font-semibold">Job Types</label>
                      <div className="block mt-2">
                        <div className="flex justify-between">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox rounded size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-emerald-600 checked:appearance-auto dark:accent-emerald-600 focus:border-emerald-300 focus:ring-0 focus:ring-offset-0 focus:ring-emerald-200 focus:ring-opacity-50 me-2"
                              defaultChecked
                            />
                            <span className="ms-2 text-slate-400">
                              Full Time
                            </span>
                          </label>

                          <span className="bg-emerald-600/10 text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full h-5">
                            3
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox rounded size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-emerald-600 checked:appearance-auto dark:accent-emerald-600 focus:border-emerald-300 focus:ring-0 focus:ring-offset-0 focus:ring-emerald-200 focus:ring-opacity-50 me-2"
                            />
                            <span className="ms-2 text-slate-400">
                              Part Time
                            </span>
                          </label>

                          <span className="bg-emerald-600/10 text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full h-5">
                            7
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox rounded size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-emerald-600 checked:appearance-auto dark:accent-emerald-600 focus:border-emerald-300 focus:ring-0 focus:ring-offset-0 focus:ring-emerald-200 focus:ring-opacity-50 me-2"
                            />
                            <span className="ms-2 text-slate-400">
                              Freelancing
                            </span>
                          </label>

                          <span className="bg-emerald-600/10 text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full h-5">
                            4
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox rounded size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-emerald-600 checked:appearance-auto dark:accent-emerald-600 focus:border-emerald-300 focus:ring-0 focus:ring-offset-0 focus:ring-emerald-200 focus:ring-opacity-50 me-2"
                            />
                            <span className="ms-2 text-slate-400">
                              Fixed Price
                            </span>
                          </label>

                          <span className="bg-emerald-600/10 text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full h-5">
                            6
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox rounded size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-emerald-600 checked:appearance-auto dark:accent-emerald-600 focus:border-emerald-300 focus:ring-0 focus:ring-offset-0 focus:ring-emerald-200 focus:ring-opacity-50 me-2"
                            />
                            <span className="ms-2 text-slate-400">Remote</span>
                          </label>

                          <span className="bg-emerald-600/10 text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full h-5">
                            7
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <label className="inline-flex items-center">
                            <input
                              type="checkbox"
                              className="form-checkbox rounded size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-emerald-600 checked:appearance-auto dark:accent-emerald-600 focus:border-emerald-300 focus:ring-0 focus:ring-offset-0 focus:ring-emerald-200 focus:ring-opacity-50 me-2"
                            />
                            <span className="ms-2 text-slate-400">
                              Hourly Basis
                            </span>
                          </label>

                          <span className="bg-emerald-600/10 text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full h-5">
                            44
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-2">
                        Salary
                        <span className="text-emerald-600 ml-2">
                          {formatCurrency(range[0])} -{" "}
                          {formatCurrency(range[1])}
                        </span>
                      </label>

                      <RangeSlider
                        min={0}
                        max={5000}
                        step={100}
                        value={range}
                        onInput={setRange}
                        className="custom-slider"
                      />

                      <div className="flex justify-between text-sm text-slate-400 mt-2">
                        <span>$0</span>
                        <span>$5000</span>
                      </div>
                    </div>

                    <div>
                      <input
                        type="submit"
                        className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full"
                        value="Apply Filter"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <JobGridsTwoComp />
          </div>
        </div>
      </section>
    </>
  );
}
