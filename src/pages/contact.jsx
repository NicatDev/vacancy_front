import { useState } from "react";
import ContactApi from "../api/apiList/contact"; // Sizin axios client wrapper
import contactImg from '../assets/images/DSC09363.jpg';
import { Link } from 'react-router-dom';
import { PiMapPin, BsTelephone, LuMail } from "../assets/icons/vander";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    question: "",
    comment: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const res = await ContactApi.contact(form);
      setSuccessMsg(res.data.message || t("contact.messageSent"));
      setForm({ fullname: "", email: "", question: "", comment: "" });
    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors)
          .flat()
          .join(" ");
        setErrorMsg(errors);
      } else {
        setErrorMsg(t("contact.sendError"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative lg:py-24 py-16">
      <div className="container">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
          <div className="lg:col-span-7 md:col-span-6">
            <img src={contactImg} alt="" />
          </div>

          <div className="lg:col-span-5 md:col-span-6">
            <div className="lg:ms-5">
              <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6">
                <h3 className="mb-6 text-2xl leading-normal font-semibold">
                  {t("contact.getInTouch")}
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="grid lg:grid-cols-12 lg:gap-6">
                    <div className="lg:col-span-6 mb-5">
                      <label htmlFor="fullname" className="font-semibold">
                        {t("contact.yourName")}
                      </label>
                      <input
                        name="fullname"
                        id="fullname"
                        type="text"
                        className="form-input mt-2"
                        placeholder={t("contact.namePlaceholder")}
                        value={form.fullname}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="lg:col-span-6 mb-5">
                      <label htmlFor="email" className="font-semibold">
                        {t("contact.yourEmail")}
                      </label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-input mt-2"
                        placeholder={t("contact.emailPlaceholder")}
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="question" className="font-semibold">
                      {t("contact.yourQuestion")}
                    </label>
                    <input
                      name="question"
                      id="question"
                      className="form-input mt-2"
                      placeholder={t("contact.subjectPlaceholder")}
                      value={form.question}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="comment" className="font-semibold">
                      {t("contact.yourComment")}
                    </label>
                    <textarea
                      name="comment"
                      id="comment"
                      className="form-input mt-2 textarea"
                      placeholder={t("contact.messagePlaceholder")}
                      value={form.comment}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {successMsg && (
                    <p className="text-green-600 font-semibold mb-3">{successMsg}</p>
                  )}
                  {errorMsg && (
                    <p className="text-red-600 font-semibold mb-3">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`py-1 px-5 inline-block font-semibold tracking-wide border text-base rounded-md text-white ${loading ? "bg-gray-400" : "bg-emerald-600 hover:bg-emerald-700"
                      }`}
                  >
                    {loading ? t("contact.sending") : t("contact.sendMessage")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Info Cards */}
        <div className="container lg:mt-24 mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
            {/* Phone */}
            <div className="text-center px-6">
              <a href="tel:+15253468854" className="block hover:opacity-80 transition-opacity">
                <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                  <BsTelephone />
                </div>
                <div className="content mt-7">
                  <h5 className="text-lg font-semibold">{t("contact.phone")}</h5>
                  <p className="text-slate-400 mt-3">{t("contact.phoneDescription")}</p>
                  <div className="mt-5">
                    <span className="btn btn-link text-emerald-600">
                      +15705752535
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Email */}
            <div className="text-center px-6">
              <a href="mailto:info@octopus.com.az" className="block hover:opacity-80 transition-opacity">
                <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                  <LuMail />
                </div>
                <div className="content mt-7">
                  <h5 className="text-lg font-semibold">{t("contact.email")}</h5>
                  <p className="text-slate-400 mt-3">{t("contact.emailDescription")}</p>
                  <div className="mt-5">
                    <span className="btn btn-link text-emerald-600">
                      info@octopus.com.az
                    </span>
                  </div>
                </div>
              </a>
            </div>

            {/* Location */}
            <div className="text-center px-6">
              <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                  <PiMapPin />
                </div>
                <div className="content mt-7">
                  <h5 className="text-lg font-semibold">{t("contact.location")}</h5>
                  <p className="text-slate-400 mt-3">{t("contact.locationAddress")}</p>
                  <div className="mt-5">
                    <span className="btn btn-link text-emerald-600">
                      {t("contact.viewOnMap")}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}