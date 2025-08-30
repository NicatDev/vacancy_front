import React, { useState } from "react";
import { Link } from "react-router-dom";

import ab01 from "../assets/images/about/ab01.jpg";
import ab02 from "../assets/images/about/ab02.jpg";

import { BiCheckCircle, LuMail } from "../assets/icons/vander";

export default function MillionsJob() {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
        <div className="lg:col-span-5 md:col-span-6">
          <div className="relative">
            <div className="relative">
              <img
                src={ab01}
                className="lg:w-[500px] w-[320px] rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 md:col-span-6 mt-14 md:mt-0">
          <div className="lg:ms-5">
            <h3 className="mb-6 md:text-[26px] text-2xl md:leading-normal leading-normal font-semibold">
              Millions of jobs. <br /> Find the one that's right for you.
            </h3>

            <p className="text-slate-400 max-w-xl">
              Search all the open positions on the web. Get your own
              personalized salary estimate. Read reviews on over 30000+
              companies worldwide.
            </p>

            <ul className="list-none text-slate-400 mt-4">
              <li className="mb-1 flex items-center">
                <BiCheckCircle className="text-emerald-600 text-xl me-2" />
                Digital Marketing Solutions for Tomorrow
              </li>
              <li className="mb-1 flex items-center">
                <BiCheckCircle className="text-emerald-600 text-xl me-2" /> Our
                Talented & Experienced Marketing Agency
              </li>
              <li className="mb-1 flex items-center">
                <BiCheckCircle className="text-emerald-600 text-xl me-2" />{" "}
                Create your own skin to match your brand
              </li>
            </ul>

            <div className="mt-6">
              <Link
                to="/contact"
                className="py-1 px-5 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white mt-2 rounded-md"
              >
                <LuMail className="me-2" /> Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
