import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

// CSS faylını import edirik
import "./VisitWidget.css";

const MainLayout = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  const renderVisitCircle = () => {
    if (!isVisible) return null;

    return (
      <div className="visit-container">
        {/* Silmək düyməsi */}
        <button
          onClick={() => setIsVisible(false)}
          className="visit-close-btn"
        >
          <IoCloseCircleOutline />
        </button>

        {/* Link və Dairə */}
        <a
          href="https://psychology.octopus.com.az/"
          target="_blank"
          rel="noopener noreferrer"
          className="visit-link"
        >
          {/* Fırlanan border */}
          <div className="visit-border-rotate"></div>

          {/* Sabit daxili dairə */}
          <div className="visit-circle-inner">
            {t("commonContent.visit")}
          </div>
        </a>
      </div>
    );
  };

  return (
    <>
      <Navbar
        navClass={
          [
            "vacancies", "aboutus", "terms", "privacy", "categories",
            "companies", "company", "candidates", "job-apply", "job-post", "pricing"
          ].some(path => pathname?.includes(path)) ? "nav-light" : null
        }
      />

      {renderVisitCircle()}

      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;