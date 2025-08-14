import { useState } from "react";
import { Link } from "react-router-dom";
import { BiCheckCircle } from "../assets/icons/vander";

export default function Pricing() {
  const [selected, setSelected] = useState(null);

  const plans = [
    { name: "Free", price: 0, btn: "Get Started" },
    { name: "Business", price: 39, btn: "Get Started" },
    { name: "Professional", price: 59, btn: "Get Started" },
  ];

  return (
    <>
      {/* Background Section */}
      <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-emerald-900/90"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">
              Pricing Plans
            </h3>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative lg:py-24 py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-[30px]">
            {plans.map((plan, index) => (
              <div
                key={index}
                onClick={() => setSelected(index)}
                className={`
                  group relative shadow-sm hover:shadow-md dark:shadow-gray-800 rounded-md transition-all duration-500 cursor-pointer
                  bg-white dark:bg-slate-900
                  border 
                  ${selected === index ? "border-emerald-600" : "border-transparent"} 
                  hover:border-emerald-600
                `}
              >
                <div className="p-6 py-8">
                  <h6 className="text-lg font-bold uppercase mb-5 text-emerald-600">
                    {plan.name}
                  </h6>

                  <div className="flex mb-5">
                    <span className="text-xl font-semibold">$</span>
                    <span className="price text-4xl font-semibold mb-0">
                      {plan.price}
                    </span>
                    <span className="text-xl font-semibold self-end mb-1">
                      /mo
                    </span>
                  </div>

                  <ul className="list-none text-slate-400 border-t border-gray-100 dark:border-gray-700 pt-5">
                    <li className="my-2 flex items-center">
                      <BiCheckCircle className="text-emerald-600 text-xl me-2" /> Full Access
                    </li>
                    <li className="my-2 flex items-center">
                      <BiCheckCircle className="text-emerald-600 text-xl me-2" /> Source Files
                    </li>
                    <li className="my-2 flex items-center">
                      <BiCheckCircle className="text-emerald-600 text-xl me-2" /> Free Appointments
                    </li>
                    <li className="my-2 flex items-center">
                      <BiCheckCircle className="text-emerald-600 text-xl me-2" /> Enhanced Security
                    </li>
                  </ul>

                  <Link
                    to="/job-post"
                    className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md mt-5"
                  >
                    {plan.btn}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
