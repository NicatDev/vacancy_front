import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import logo_icon_40 from "../assets/images/logo-icon-40.png";
import logo_icon_40_white from "../assets/images/logo-icon-40-white.png";
import logo_dark from "../assets/images/logo-dark.png";
import logo_white from "../assets/images/logo-white.png";
import logo from "../assets/images/logo.png";
import image from "../assets/images/team/05.jpg";
import userImg from "../assets/images/user.png";
import { LuSearch, FiUser, FiSettings, FiLogOut } from "../assets/icons/vander";
import Languages from "../config/Languages";
import Select from "react-select";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import AuthAPI from "../api/AuthAPI";
import { useUser } from "../context/UserContext";

const Navbar = (props) => {
  const { refreshUser } = useUser();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { languages, changeLanguage } = Languages;

  const [currentLang, setCurrentLang] = useState(localStorage.getItem("language") ?? "en");
  const [isDropdown, openDropdown] = useState(true);
  const { navClass, topnavClass, isContainerFluid } = props;
  const [isOpen, setMenu] = useState(true);
  const role = localStorage.getItem('role') ?? null;

  const options = languages.map((lang) => ({
    value: lang.code,
    label: lang.code.toUpperCase(),
  }));

  const handleChange = (selectedOption) => {
    changeLanguage(selectedOption.value);
    setCurrentLang(selectedOption)
  };

  window.addEventListener("scroll", windowScroll);

  useEffect(() => {
    activateMenu();
  }, []);

  function windowScroll() {
    const navbar = document.getElementById("topnav");
    if (
      document.body.scrollTop >= 50 ||
      document.documentElement.scrollTop >= 50
    ) {
      if (navbar !== null) {
        navbar?.classList.add("nav-sticky");
      }
    } else {
      if (navbar !== null) {
        navbar?.classList.remove("nav-sticky");
      }
    }

    const mybutton = document.getElementById("back-to-top");
    if (mybutton != null) {
      if (
        document.body.scrollTop > 500 ||
        document.documentElement.scrollTop > 500
      ) {
        mybutton.classList.add("flex");
        mybutton.classList.remove("hidden");
      } else {
        mybutton.classList.add("hidden");
        mybutton.classList.remove("flex");
      }
    }
  }

  const toggleMenu = () => {
    setMenu(!isOpen);
    if (document.getElementById("navigation")) {
      const anchorArray = Array.from(
        document.getElementById("navigation").getElementsByTagName("a")
      );
      anchorArray.forEach((element) => {
        element.addEventListener("click", (elem) => {
          const target = elem.target.getAttribute("href");
          if (target !== "") {
            if (elem.target.nextElementSibling) {
              var submenu = elem.target.nextElementSibling.nextElementSibling;
              submenu.classList.toggle("open");
            }
          }
        });
      });
    }
  };

  const getClosest = (elem, selector) => {
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector ||
        Element.prototype.oMatchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        function (s) {
          var matches = (this.document || this.ownerDocument).querySelectorAll(
            s
          ),
            i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) { }
          return i > -1;
        };
    }
    for (; elem && elem !== document; elem = elem.parentNode) {
      if (elem.matches(selector)) return elem;
    }
    return null;
  };

  const activateMenu = () => {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {
      var matchingMenuItem = null;
      for (var idx = 0; idx < menuItems.length; idx++) {
        if (menuItems[idx].href === window.location.href) {
          matchingMenuItem = menuItems[idx];
        }
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add("active");
        var immediateParent = getClosest(matchingMenuItem, "li");
        if (immediateParent) immediateParent.classList.add("active");
        var parent = getClosest(immediateParent, ".child-menu-item");
        if (parent) parent.classList.add("active");
        var parent = getClosest(parent || immediateParent, ".parent-menu-item");
        if (parent) {
          parent.classList.add("active");
          var parentMenuitem = parent.querySelector(".menu-item");
          if (parentMenuitem) parentMenuitem.classList.add("active");
          var parentOfParent = getClosest(parent, ".parent-parent-menu-item");
          if (parentOfParent) parentOfParent.classList.add("active");
        } else {
          var parentOfParent = getClosest(
            matchingMenuItem,
            ".parent-parent-menu-item"
          );
          if (parentOfParent) parentOfParent.classList.add("active");
        }
      }
    }
  };

  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderRadius: "9999px",
      borderColor: "#3b82f6",
      minHeight: "36px",
      cursor: "pointer",
      boxShadow: "none",
      backgroundColor: "white",
      width: 75,
      minWidth: 75,
      "&:hover": { borderColor: "#2563eb" },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#2563eb",
      fontWeight: "500",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: 12,
    }),
    dropdownIndicator: (styles) => ({ ...styles, color: "#2563eb" }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (styles) => ({
      ...styles,
      borderRadius: "0.5rem",
      overflow: "hidden",
      zIndex: 9999,
    }),
  };

  useEffect(() => {
    if (!pathname?.includes('login') && !pathname?.includes('signup')) {
      refreshUser();
    }
  }, [pathname])

  return (
    <nav id="topnav" className={`defaultscroll is-sticky ${topnavClass}`}>
      <div
        className={`${isContainerFluid === true
          ? "container-fluid md:px-8 px-3"
          : "container"
          }`}
      >
        <Link className="logo" to="/">
          <div className="block sm:hidden">
            <img src={logo} className="h-10 inline-block dark:hidden" alt="" />
            <img src={logo} className="h-10 hidden dark:inline-block" alt="" />
          </div>

          {navClass && navClass.includes("nav-light") ? (
            <div className="sm:block hidden">
              <span className="inline-block dark:hidden">
                <img
                  src={logo}
                  className="!h-[80px] l-dark"
                  alt=""
                  style={{ height: 80 }}
                />
                <img
                  src={logo}
                  className="!h-[80px] l-light"
                  alt=""
                  style={{ height: 80 }}
                />
              </span>
              <img
                src={logo}
                className="!h-[80px] hidden dark:inline-block"
                alt=""
                style={{ height: 80 }}
              />
            </div>
          ) : (
            <div className="sm:block hidden">
              <img
                src={logo}
                className="!h-[80px] inline-block dark:hidden"
                alt=""
                style={{ height: 80 }}
              />
              <img
                src={logo}
                className="!h-[80px] hidden dark:inline-block"
                alt=""
                style={{ height: 80 }}
              />
            </div>
          )}
        </Link>

        <div className="menu-extras">
          <div className="menu-item">
            <Link
              to="#"
              className="navbar-toggle"
              id="isToggle"
              onClick={toggleMenu}
            >
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
          </div>
        </div>

        <ul className="buy-button list-none mb-0">
          {(role === "company" || !role) && <li className="hidden lg:inline-block mb-0 me-2">
            <div className="relative top-[3px]">
              <Link
                to="/job-post"
                className="rounded-3xl"
                style={{
                  backgroundColor: "oklch(45% 0.18 260.67)",
                  color: "white",
                  padding: "8px 16px",
                  textDecoration: "none",
                }}
              >
                {t("navbar.newVacancy")}
              </Link>
            </div>
          </li>}

          <li className="inline-block mb-0">
            <div className="relative top-[3px]">
              <LuSearch className="text-lg absolute top-[8px] end-3" />
              <input
                type="text"
                className="py-2 px-3 text-[14px] w-110 border border-gray-100 dark:border-gray-800 dark:text-slate-200 outline-none h-9 !pe-10 rounded-3xl bg-white dark:bg-slate-900 placeholder-gray-400 w-fit dark:placeholder-gray-500"
                name="s"
                id="searchItem"
                placeholder={t("navbar.search")}
              />
            </div>
          </li>

          {role && <li className="dropdown inline-block relative ps-1">
            <button
              onClick={() => openDropdown(!isDropdown)}
              data-dropdown-toggle="dropdown"
              className="dropdown-toggle items-center"
              type="button"
            >
              <span className="size-9 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide border align-middle transition duration-500 ease-in-out rounded-full bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white">
                <img src={userImg} className="rounded-full" alt="" />
              </span>
            </button>

            <div
              className={`dropdown-menu absolute end-0 m-0 mt-4 z-10 w-44 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ${isDropdown ? "hidden" : "block"
                }`}
            >
              <ul className="py-2 text-start">
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-emerald-600 dark:hover:text-white"
                  >
                    <FiUser className="size-4 me-2" />
                    {t("navbar.profile")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/candidate-profile-setting"
                    className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-emerald-600 dark:hover:text-white"
                  >
                    <FiSettings className="size-4 me-2" />
                    {t("navbar.settings")}
                  </Link>
                </li>
                <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                <li>
                  <Link
                    to="/login"
                    className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-emerald-600 dark:hover:text-white"
                  >
                    <FiLogOut className="size-4 me-2" />
                    {t("navbar.logout")}
                  </Link>
                </li>
              </ul>
            </div>
          </li>}

          <li className="dropdown inline-block relative ps-1">
            <Select
              value={options.find((opt) => opt.value === currentLang)}
              onChange={handleChange}
              options={options}
              isSearchable={false}
              styles={customSelectStyles}
            />
          </li>
        </ul>

        <div
          id="navigation"
          className={`${isOpen === true ? "!hidden-md" : "!block"}`}
        >
          <ul className={`navigation-menu ${navClass}`}>
            <li>
              <Link to="/companies">{t("navbar.companies")}</Link>
            </li>

            <li>
              <Link to="/vacancies">{t("navbar.vacancies")}</Link>
            </li>

            <li>
              <Link to="/candidates">{t("navbar.candidates")}</Link>
            </li>

            <li>
              <Link to="/aboutus">{t("navbar.aboutUs")}</Link>
            </li>

            <li>
              <Link to="/contact">{t("navbar.contactUs")}</Link>
            </li>

            <li className="block lg:hidden pb-4 px-4 custom_new_vacancy_btn">
              <Link
                to="/job-post"
                className="rounded-3xl w-fit"
                style={{
                  backgroundColor: "oklch(45% 0.18 260.67)",
                  color: "white",
                  padding: "8px 16px",
                  textDecoration: "none",
                }}
              >
                {t("navbar.newVacancy")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
