import logo_light from "../assets/images/logo-light.png";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo_icon_40 from "../assets/images/logo-icon-40.png";
import logo_icon_40_white from "../assets/images/logo-icon-40-white.png";
import logo_dark from "../assets/images/logo-dark.png";
import logo_white from "../assets/images/logo-white.png";
import logo from "../assets/images/logo.jpg";
import image from "../assets/images/team/05.jpg";
import userImg from "../assets/images/user.png";
import { LuSearch, FiUser, FiSettings, FiLogOut } from "../assets/icons/vander";
import Languages from "../config/Languages";
import Select from "react-select";
import { memo } from "react";
const Navbar = (props) => {
  const { languages, changeLanguage } = Languages;

  const currentLang = localStorage.getItem("language") ?? "en";
  const [isDropdown, openDropdown] = useState(true);
  const { navClass, topnavClass, isContainerFluid } = props;
  const [isOpen, setMenu] = useState(true);

  const options = languages.map((lang) => ({
    value: lang.code,
    label: lang.code.toUpperCase(),
  }));

  const handleChange = (selectedOption) => {
    changeLanguage(selectedOption.value);
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
    // Element.matches() polyfill
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
          while (--i >= 0 && matches.item(i) !== this) {}
          return i > -1;
        };
    }

    // Get the closest matching element
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

        if (immediateParent) {
          immediateParent.classList.add("active");
        }

        var parent = getClosest(immediateParent, ".child-menu-item");
        if (parent) {
          parent.classList.add("active");
        }

        var parent = getClosest(parent || immediateParent, ".parent-menu-item");

        if (parent) {
          parent.classList.add("active");

          var parentMenuitem = parent.querySelector(".menu-item");
          if (parentMenuitem) {
            parentMenuitem.classList.add("active");
          }

          var parentOfParent = getClosest(parent, ".parent-parent-menu-item");
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        } else {
          var parentOfParent = getClosest(
            matchingMenuItem,
            ".parent-parent-menu-item"
          );
          if (parentOfParent) {
            parentOfParent.classList.add("active");
          }
        }
      }
    }
  };

  const customSelectStyles = {
    control: (styles) => ({
      ...styles,
      borderRadius: "9999px",
      borderColor: "#10b981",
      minHeight: "36px",
      cursor: "pointer",
      boxShadow: "none",
      backgroundColor: "white",
      width: 75,
      minWidth: 75,
      "&:hover": { borderColor: "#059669" },
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "#059669",
      fontWeight: "500",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: 12,
    }),
    dropdownIndicator: (styles) => ({ ...styles, color: "#059669" }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (styles) => ({
      ...styles,
      borderRadius: "0.5rem",
      overflow: "hidden",
      zIndex: 9999,
    }),
  };

  return (
    <nav id="topnav" className={`defaultscroll is-sticky ${topnavClass}`}>
      <div
        className={`${
          isContainerFluid === true
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
        {/* <!-- End Mobile Toggle --> */}

        {/* <!--Login button Start--> */}
        <ul className="buy-button list-none mb-0">
          <li className="inline-block mb-0">
            <div className="relative top-[3px]">
              <LuSearch className="text-lg absolute top-[8px] end-3" />
              <input
                type="text"
                className="py-2 px-3 text-[14px] border border-gray-100 dark:border-gray-800 dark:text-slate-200 outline-none h-9 !pe-10 rounded-3xl sm:w-44 w-36 bg-white dark:bg-slate-900 placeholder-gray-400 dark:placeholder-gray-500"
                name="s"
                id="searchItem"
                placeholder="Search..."
              />
            </div>
          </li>

          <li className="dropdown inline-block relative ps-1">
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
              className={`dropdown-menu absolute end-0 m-0 mt-4 z-10 w-44 rounded-md overflow-hidden bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 ${
                isDropdown ? "hidden" : "block"
              }`}
            >
              <ul className="py-2 text-start">
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-emerald-600 dark:hover:text-white"
                  >
                    <FiUser className="size-4 me-2" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/candidate-profile-setting"
                    className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-emerald-600 dark:hover:text-white"
                  >
                    <FiSettings className="size-4 me-2" />
                    Settings
                  </Link>
                </li>
                <li className="border-t border-gray-100 dark:border-gray-800 my-2"></li>
                {/* <li>
                  <Link
                    to="/lock-screen"
                    className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-emerald-600 dark:hover:text-white"
                  >
                    <FiLock className="size-4 me-2" />
                    Lockscreen
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/login"
                    className="flex items-center font-medium py-2 px-4 dark:text-white/70 hover:text-emerald-600 dark:hover:text-white"
                  >
                    <FiLogOut className="size-4 me-2" />
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className="dropdown inline-block relative ps-1">
            <Select
              defaultValue={options.find((opt) => opt.value === currentLang)}
              onChange={handleChange}
              options={options.filter((opt) => opt.value !== currentLang)}
              isSearchable={false}
              styles={customSelectStyles}
              className="dark:border-gray-800 border-gray-100"
            />
          </li>
        </ul>

        <div
          id="navigation"
          className={`${isOpen === true ? "!hidden-md" : ""}`}
        >
          <ul className={`navigation-menu ${navClass}`}>
            <li>
              <Link to="/companies"> Companies </Link>
            </li>

            <li>
              <Link to="/vacancies">Vacancies</Link>
            </li>

            <li>
              <Link to="/candidates">Candidates</Link>
            </li>

            <li>
              <Link to="/aboutus">About us</Link>
            </li>
            <li>
              <Link to="/pricing">Create vacancy</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
