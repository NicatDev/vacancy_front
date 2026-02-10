import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

import "./VisitWidget.css";

const MainLayout = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  const renderVisitButton = () => {
    if (!isVisible) return null;

    return (
      <div className="visit-button-container">
        <a
          href="https://psychology.octopus.com.az/"
          target="_blank"
          rel="noopener noreferrer"
          className="visit-button-link"
        >
          <span className="visit-button-text">Test Your Personality</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsVisible(false);
            }}
            className="visit-close-btn"
          >
            <IoCloseCircleOutline />
          </button>
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
          ].some(path => pathname?.includes(path) && !pathname?.includes("company-profile")) ? "nav-light" : null
        }
      />

      {renderVisitButton()}
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;