import logo_light from "../assets/images/logo-light.png";
import logo from "../assets/images/logo.png";
import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  LuMail,
  BiLogoDribbble,
  AiOutlineBehance,
  BiLogoLinkedin,
  FaFacebookF,
  FaInstagram,
  IoLogoTwitter,
} from "../assets/icons/vander";
import { useTranslation } from "react-i18next";

export default function Footer() {

  const { t } = useTranslation()
  return (
    <footer className="relative bg-slate-900 dark:bg-slate-800">
      <div className="container">
        <div className="grid grid-cols-1">
          <div className="relative py-12">
            <div className="relative w-full">
              <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                <div className="md:col-span-3">
                  <Link
                    to="/"
                    className="flex justify-center md:justify-start focus:outline-none"
                  >
                    <img src={logo} className="" alt="" style={{ height: 120 }} />
                  </Link>
                </div>

                <div className="md:col-span-9">
                  <ul className="list-disc footer-list ltr:md:text-right rtl:md:text-left text-center space-x-3">
                    <li className="inline-block mt-[10px] md:mt-0">
                      <Link
                        to="/aboutus"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out font-medium"
                      >
                        {t('footer.aboutUs')}
                      </Link>
                    </li>
                    <li className="inline-block mt-[10px] md:mt-0">
                      <Link
                        to="/contact"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out font-medium"
                      >
                        {t('footer.contactUs')}
                      </Link>
                    </li>

                    <li className="inline-block">
                      <Link
                        to="/terms"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out font-medium"
                      >

                        {t('footer.terms')}
                      </Link>
                    </li>
                    <li className="inline-block mt-[10px] md:mt-0">
                      <Link
                        to="/privacy"
                        className="text-gray-300 hover:text-gray-400 duration-500 ease-in-out font-medium"
                      >
                        {t('footer.privacyPolicy')}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-[30px] px-0 border-t border-gray-800 dark:border-gray-700">
        <div className="container text-center">
          <div className="grid md:grid-cols-2 items-center gap-6">
            <div className="ltr:md:text-left rtl:md:text-right text-center">
              <p className="mb-0 text-gray-300 font-medium">
                ©{new Date().getFullYear()} Octopus
              </p>
            </div>

            <ul className="list-none ltr:md:text-right rtl:md:text-left text-center space-x-0.5">

              <li className="inline">
                <Link
                  to="http://linkedin.com/company/"
                  target="_blank"
                  className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-800 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white"
                >
                  <BiLogoLinkedin />
                </Link>
              </li>
              <li className="inline">
                <Link
                  to="https://www.facebook.com/"
                  target="_blank"
                  className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-800 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white"
                >
                  <FaFacebookF />
                </Link>
              </li>
              <li className="inline">
                <Link
                  to="https://www.instagram.com//"
                  target="_blank"
                  className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-800 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white"
                >
                  <FaInstagram />
                </Link>
              </li>
              <li className="inline">
                <Link
                  to="https://twitter.com/"
                  target="_blank"
                  className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-800 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white"
                >
                  <IoLogoTwitter />
                </Link>
              </li>
              <li className="inline">
                <Link
                  to="mailto:support@Octopus.in"
                  className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-800 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white"
                >
                  <LuMail />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
