import logo from '../assets/images/logo.png';
import error from '../assets/images/error.png';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export default function Error() {
    const { t } = useTranslation();

    return (
        <section className="relative bg-emerald-600/5">
            <div className="container-fluid relative">
                <div className="grid grid-cols-1">
                    <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">

                        <div className="text-center">
                            <Link to="/">
                                <img src={logo} className="mx-auto !h-[80px]" alt="Logo" />
                            </Link>
                        </div>

                        <div className="title-heading text-center my-auto">
                            <img src={error} className="mx-auto" alt="Error" />

                            <h1 className="mt-3 mb-6 md:text-4xl text-3xl font-bold">
                                {t("errorPage.title")}
                            </h1>

                            <p className="text-slate-400">
                                {t("errorPage.descriptionLine1")} <br />
                                {t("errorPage.descriptionLine2")}
                            </p>

                            <div className="mt-4">
                                <Link
                                    to="/"
                                    className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md"
                                >
                                    {t("errorPage.backToHome")}
                                </Link>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="mb-0 text-slate-400 font-medium">
                                © {new Date().getFullYear()} {t("errorPage.copyright")}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
