import contact from '../assets/images/DSC09363.jpg';
import { Link } from 'react-router-dom';
import { PiMapPin, BsTelephone, LuMail } from "../assets/icons/vander";
import { useTranslation } from "react-i18next";

export default function Contact() {
    const { t } = useTranslation();

    return (
        <>
            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                        <div className="lg:col-span-7 md:col-span-6">
                            <img src={contact} alt="" />
                        </div>

                        <div className="lg:col-span-5 md:col-span-6">
                            <div className="lg:ms-5">
                                <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6">
                                    
                                    <h3 className="mb-6 text-2xl leading-normal font-semibold">
                                        {t("contact.getInTouch")}
                                    </h3>

                                    <form>
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="name" className="font-semibold">
                                                    {t("contact.yourName")}
                                                </label>
                                                <input name="name" id="name" type="text" className="form-input mt-2"
                                                    placeholder={t("contact.namePlaceholder")} />
                                            </div>

                                            <div className="lg:col-span-6 mb-5">
                                                <label htmlFor="email" className="font-semibold">
                                                    {t("contact.yourEmail")}
                                                </label>
                                                <input name="email" id="email" type="email" className="form-input mt-2"
                                                    placeholder={t("contact.emailPlaceholder")} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <div className="mb-5">
                                                <label htmlFor="subject" className="font-semibold">
                                                    {t("contact.yourQuestion")}
                                                </label>
                                                <input name="subject" id="subject" className="form-input mt-2"
                                                    placeholder={t("contact.subjectPlaceholder")} />
                                            </div>

                                            <div className="mb-5">
                                                <label htmlFor="comments" className="font-semibold">
                                                    {t("contact.yourComment")}
                                                </label>
                                                <textarea name="comments" id="comments" className="form-input mt-2 textarea"
                                                    placeholder={t("contact.messagePlaceholder")}></textarea>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            className="py-1 px-5 inline-block font-semibold tracking-wide border text-base bg-emerald-600 hover:bg-emerald-700 text-white rounded-md">
                                            {t("contact.sendMessage")}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 Info Cards */}
                <div className="container lg:mt-24 mt-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[30px]">

                        {/* Phone */}
                        <div className="text-center px-6">
                            <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                                <BsTelephone />
                            </div>
                            <div className="content mt-7">
                                <h5 className="text-lg font-semibold">{t("contact.phone")}</h5>
                                <p className="text-slate-400 mt-3">{t("contact.phoneDescription")}</p>
                                <div className="mt-5">
                                    <Link to="tel:+152534-468-854" className="btn btn-link">
                                        +152 534-468-854
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="text-center px-6">
                            <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                                <LuMail />
                            </div>
                            <div className="content mt-7">
                                <h5 className="text-lg font-semibold">{t("contact.email")}</h5>
                                <p className="text-slate-400 mt-3">{t("contact.emailDescription")}</p>
                                <div className="mt-5">
                                    <Link to="mailto:contact@example.com" className="btn btn-link">
                                        contact@example.com
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="text-center px-6">
                            <div className="size-14 bg-emerald-600/5 text-emerald-600 rounded-xl flex items-center justify-center mx-auto">
                                <PiMapPin />
                            </div>
                            <div className="content mt-7">
                                <h5 className="text-lg font-semibold">{t("contact.location")}</h5>
                                <p className="text-slate-400 mt-3">{t("contact.locationAddress")}</p>

                                <div className="mt-5">
                                    <Link to="https://www.google.com/maps" className="btn btn-link">
                                        {t("contact.viewOnMap")}
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
