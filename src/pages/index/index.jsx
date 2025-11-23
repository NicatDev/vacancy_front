import Select from "react-select";
import Categories from "../../components/Categories";
import MillionsJob from "../../components/Millions-job";
import PopularJobsfour from "../../components/Popular-Jobs-four";
import FindBestCompanies from "../../components/FindBestCompanies";
import { BiBriefcaseAlt2, PiMapPin } from "../../assets/icons/vander";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useTranslation } from "react-i18next";

import ab01 from "../../assets/images/b8b57763-111c-4efb-88fb-ea4261150657.jpg";
import ab02 from "../../assets/images/DSC03777.jpg";
import ab03 from "../../assets/images/DSC03251.jpg";

const optionsOne = [
  { value: "AF", label: "Afghanistan" },
  { value: "AZ", label: "Azerbaijan" },
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
  const { t } = useTranslation();

  return (
    <div>
      <section className="relative slider_section table pt-87 w-full bg-gradient-to-b from-emerald-600/20 dark:from-emerald-600/40 via-emerald-600/10 dark:via-emerald-600/20 to-transparent">
        <div className="z-1">
          <div className="grid grid-cols-1 text-center relative">
            <Swiper
              modules={[Autoplay]}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              speed={1000}
              className="w-full swiper_custom relative cursor-grab"
            >
              <SwiperSlide className="relative swiper_slide">
                <img src={ab01} className="w-full h-full object-cover" alt="" />
                <div className="slide-overlay"></div>
                <div className="slide-overlay">
                  <div className="slide-text">
                    <h1 className="slide-title">{t("hero.title1")}</h1>
                    <p className="slide-subtitle">{t("hero.desc1")}</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="relative swiper_slide">
                <img src={ab02} className="w-full h-full object-cover" alt="" />
                <div className="slide-overlay"></div>
                <div className="slide-overlay">
                  <div className="slide-text">
                    <h1 className="slide-title">{t("hero.title2")}</h1>
                    <p className="slide-subtitle">{t("hero.desc2")}</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="relative swiper_slide">
                <img src={ab03} className="w-full h-full object-cover" alt="" />
                <div className="slide-overlay"></div>
                <div className="slide-overlay">
                  <div className="slide-text">
                    <h1 className="slide-title">{t("hero.title3")}</h1>
                    <p className="slide-subtitle">{t("hero.desc3")}</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>

            <div className="d-flex" id="reserve-form">
              <div className="md:w-5/6 mx-auto">
                <div className="lg:col-span-10 mt-8">
                  <div className="bg-white dark:bg-slate-900 border-0 shadow-sm rounded-md p-3">
                    <form>
                      <div className="registration-form text-dark text-start">
                        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                          
                          <div className="filter-search-form relative filter-border">
                            <BiBriefcaseAlt2 className="icons" />
                            <input
                              name="name"
                              type="text"
                              id="job-keyword"
                              className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
                              placeholder={t("search.keywords")}
                            />
                          </div>

                          <div className="filter-search-form relative filter-border">
                            <PiMapPin className="icons" />
                            <Select
                              className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
                              options={optionsOne}
                              placeholder={t("search.country")}
                            />
                          </div>

                          <div className="filter-search-form relative filter-border">
                            <BiBriefcaseAlt2 className="icons" />
                            <Select
                              className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
                              options={optionsTwo}
                              placeholder={t("search.worktype")}
                            />
                          </div>

                          <input
                            type="submit"
                            id="search"
                            name="search"
                            style={{ height: "60px" }}
                            className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white searchbtn submit-btn w-full"
                            value={t("search.button")}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-slate-400">
                  <span className="text-slate-900 dark:text-white">
                    {t("search.popular")}
                  </span>{" "}
                  {t("search.items")}
                </span>
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
