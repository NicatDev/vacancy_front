import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useTranslation } from "react-i18next";
import AuthAPI from "../../api/AuthAPI";
import { useState } from "react";
import { toast } from "react-toastify";

export default function ResetPassword() {
    const { t } = useTranslation();
    const [input, setInput] = useState('')

    const handleSendMail = async () => {
        try {
            const params = {
                email: input
            }
            const response = await AuthAPI.forgotPassword(params);
            if (response.status === 200) {
                toast.success(response?.data?.message);
                setTimeout(() => {
                    setInput('')
                }, 500)
            }
        } catch (error) {

        } finally {
            setTimeout(() => {
                setInput('')
            }, 500)
        }
    }

    return (
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-no-repeat bg-left-bottom bg-cover">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="container">
                <div className="flex justify-center">
                    <div className="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                        <div className="p-6">
                            <Link to="/">
                                <img src={logo} className="mx-auto !h-[80px] block dark:hidden" alt="" />
                            </Link>
                            <h5 className="my-6 text-xl font-semibold">{t('common.resetPassword')}</h5>
                            <div className="grid grid-cols-1">
                                <p className="text-slate-400 mb-6">{t('common.resetPasswordInfoText')}</p>
                                <div className="text-left">
                                    <div className="grid grid-cols-1">
                                        <div className="mb-4 ltr:text-left rtl:text-right">
                                            <label className="font-semibold" htmlFor="LoginEmail">{t('register.email')}:</label>
                                            <input id="LoginEmail" value={input} onChange={(e) => setInput(e?.target?.value)} type="email" className="form-input mt-3 rounded-md" placeholder="name@example.com" />
                                        </div>

                                        <div className="mb-4">
                                            <button onClick={handleSendMail} className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 cursor-pointer text-white rounded-md w-full" >{t('vacancyDetail.submit')}</button>
                                        </div>

                                        <div className="text-center">
                                            <span className="text-slate-400 me-2">{t('common.rememberPassword')} </span><Link to="/login" className="text-black dark:text-white font-bold">{t('register.sign_in')}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
