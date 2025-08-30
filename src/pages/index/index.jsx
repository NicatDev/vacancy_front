import Select from "react-select";
import facebook_logo from "../../assets/images/company/facebook-logo.png";
import google_logo from "../../assets/images/company/google-logo.png";
import android from "../../assets/images/company/android.png";
import bg6 from "../../assets/images/hero/bg6.png";
import Categories from "../../components/Categories";
import MillionsJob from "../../components/Millions-job";
import PopularJobsfour from "../../components/Popular-Jobs-four";
import FindBestCompanies from "../../components/FindBestCompanies";
import { BiBriefcaseAlt2, PiMapPin } from "../../assets/icons/vander";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ab01 from "../../assets/images/hero/bg.jpg";
import ab02 from "../../assets/images/hero/bg4.jpg";
import ab03 from "../../assets/images/hero/bg2.jpg";

const optionsOne = [
  { value: "AF", label: "Afghanistan" },
  { value: "AZ", label: " Azerbaijan" },
  { value: "BS", label: "Bahamas" },
  { value: "BH", label: "Bahrain" },
  { value: "CA", label: "Canada" },
  { value: "CV", label: "Cape Verde" },
  { value: "DK", label: "Denmark" },
  { value: "DJ", label: "Djibouti" },
  { value: "ER", label: "Eritrea" },
  { value: "EE", label: "Estonia" },
  { value: "GM", label: "Gambia" },
];
const optionsTwo = [
  { value: "1", label: "Full Time" },
  { value: "2", label: "Part Time" },
  { value: "3", label: "Freelancer" },
  { value: "4", label: "Remote Work" },
  { value: "5", label: "Office Work" },
];

export default function Index() {
  return (
    <div>
      <section className="relative table md:pt-36 pt-36 w-full bg-gradient-to-b from-emerald-600/20 dark:from-emerald-600/40 via-emerald-600/10 dark:via-emerald-600/20 to-transparent">
        <div className="container z-1">
          <div className="grid grid-cols-1 text-center overflow-hidden relative">
            <Swiper
              modules={[Navigation]}
              navigation={true}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              speed={1000}
              className="w-full h-[400px] rounded-2xl"
            >
              <SwiperSlide>
                <img src={ab01} className="w-full h-full object-cover" alt="" />
              </SwiperSlide>

              <SwiperSlide>
                <img src={ab02} className="w-full h-full object-cover" alt="" />
              </SwiperSlide>

              <SwiperSlide>
                <img src={ab03} className="w-full h-full object-cover" alt="" />
              </SwiperSlide>
            </Swiper>

            <div className="d-flex" id="reserve-form">
              <div className="md:w-5/6 mx-auto">
                <div className="lg:col-span-10 mt-8">
                  <div className="bg-white dark:bg-slate-900 border-0 shadow-sm rounded-md p-3">
                    <form action="#">
                      <div className="registration-form text-dark text-start">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                          <div className="filter-search-form relative filter-border">
                            <BiBriefcaseAlt2 className="icons" />
                            <input
                              name="name"
                              type="text"
                              id="job-keyword"
                              className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
                              placeholder="Search your Keywords"
                            />
                          </div>

                          <div className="filter-search-form relative filter-border">
                            <PiMapPin className="icons" />
                            <Select
                              className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
                              options={optionsOne}
                            />
                          </div>

                          <div className="filter-search-form relative filter-border">
                            <BiBriefcaseAlt2 className="icons" />
                            <Select
                              className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
                              options={optionsTwo}
                            />
                          </div>

                          <input
                            type="submit"
                            id="search"
                            name="search"
                            style={{ height: "60px" }}
                            className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white searchbtn submit-btn w-full"
                            value="Search"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-slate-400">
                <span className="text-slate-900 dark:text-white">
                  Popular Searches :
                </span>{" "}
                Designer, Developer, Web, IOS, PHP Senior Engineer
              </span>
            </div>

            <div className="absolute -top-20 start-1/2 -translate-x-1/2">
              <div className="size-10 animate-[bounce_2s_infinite] bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                <img src={facebook_logo} className="size-6" alt="" />
              </div>
            </div>

            <div className="absolute top-[40%] start-10">
              <div className="size-10 animate-[spin_5s_linear_infinite] bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                <img src={google_logo} className="size-6" alt="" />
              </div>
            </div>

            <div className="absolute top-[40%] end-1">
              <div className="size-10 bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                <img src={android} className="size-6" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative md:py-24 py-16">
        <Categories />
        <div className="container md:mt-24 md:pb-16 mt-16">
          <MillionsJob />
        </div>
      </section>
      <PopularJobsfour />
      <section className="relative md:pb-24 pb-16 overflow-hidden">
        <FindBestCompanies />
      </section>
    </div>
  );
}
