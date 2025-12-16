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
import EmploymentTypeApi from "../../api/apiList/employmentTypes";
import ab01 from "../../assets/images/b8b57763-111c-4efb-88fb-ea4261150657.jpg";
import ab02 from "../../assets/images/DSC03777.jpg";
import ab03 from "../../assets/images/DSC03251.jpg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { t } = useTranslation();
  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (selectedWorkType) {
      params.append("type", selectedWorkType.value);
    }

    if (searchText) {
      params.append("search", searchText);
    }

    navigate(`/vacancies?${params.toString()}`);
  };

  const getAllEmploymentTypes = async () => {
    try {
      const response = await EmploymentTypeApi.getEmploymentTypes();
      if (response.status === 200) {
        const modified_data = [...response?.data?.data]?.map((d) => {
          return {
            value: d?.id,
            label: d?.name,
          };
        });
        setEmploymentTypes((prevState) => [...modified_data]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllEmploymentTypes();
  }, []);

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
                    <form onSubmit={handleSubmit}>
                      <div className="registration-form text-dark text-start">
                        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 lg:gap-0 gap-6">
                          <div className="filter-search-form relative filter-border">
                            <BiBriefcaseAlt2 className="icons" />
                            <input
                              name="name"
                              type="text"
                              className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
                              placeholder={t("search.keywords")}
                              value={searchText}
                              onChange={(e) => setSearchText(e.target.value)}
                            />
                          </div>

                          <div className="filter-search-form relative filter-border">
                            <BiBriefcaseAlt2 className="icons" />
                            <Select
                              className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0"
                              options={employmentTypes}
                              placeholder={t("search.worktype")}
                              onChange={(value) => setSelectedWorkType(value)}
                            />
                          </div>

                          <input
                            type="submit"
                            className="cursor-pointer py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white searchbtn submit-btn w-full"
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
