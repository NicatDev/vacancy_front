import { Link, useParams } from 'react-router-dom';
import image from '../../assets/images/DSC03269.jpg';
import shree_logo from '../../assets/images/company/shree-logo.png';
import circle_logo from '../../assets/images/company/circle-logo.png';
import { FiSettings, FiGift, FiGlobe, FiHome, FiMail, FiMapPin, FiPhone, FiServer } from 'react-icons/fi';
import { LuMail, BiLogoDribbble, AiOutlineBehance, BiLogoLinkedin, FaFacebookF, IoLogoTwitter, FaInstagram, FiFileText } from "../../assets/icons/vander"
import { CandidateList } from '../../data/data';
import CandidatesAPI from '../../api/apiList/candidates';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import userImg from "../../assets/images/user.png";
import { TfiEmail } from "react-icons/tfi";
import { MdOutlinePhone } from "react-icons/md";

export default function CandidateDetail() {
    const { t } = useTranslation();
    const params = useParams();
    const id = params.id
    const [candidate, setCandidate] = useState(null);
    const [skills, setSkills] = useState([]);
    const [languages, setLanguages] = useState([]);

    const getCandidate = async () => {
        try {
            const response = await CandidatesAPI.getSingleCandidate(id);

            if (response?.status === 200) {
                setCandidate(response?.data?.data)
            }
        } catch (error) {

        }
    }

    const getCandidateSkills = async () => {
        try {
            const response = await CandidatesAPI.getSingleCandidateSkills(id);
            if (response.status === 200) {
                setSkills(prevState => [...response?.data?.data])
            }
        } catch (error) {

        }
    }

    const getCandidateLanguages = async () => {
        try {
            const response = await CandidatesAPI.getSingleCandidateLanguages(id);
            if (response.status === 200) {
                setLanguages(prevState => [...response?.data?.data]?.map(d => {
                    return {
                        language: d?.language?.name,
                        level: d?.level?.label
                    }
                }))
            }
        } catch (error) {

        }
    }

    const getCandidateServices = async () => {
        try {
            const response = await CandidatesAPI.getSingleCandidateServices(id);
            if (response.status === 200) {
                setCandidate(prevState => {
                    return {
                        ...prevState,
                        services: [...response?.data?.data]?.map(d => {
                            return d?.service?.name
                        })
                    }
                })
            }
        } catch (error) {

        }
    }

    useEffect(() => {
        getCandidate();
        getCandidateSkills();
        getCandidateLanguages();
        getCandidateServices();
    }, [id]);


    return (
        <>
            {/* Profile Header */}
            <section className="relative lg:mt-24 mt-[74px]">
                <div className="container">
                    <div className="bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md p-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                            <img src={userImg} className="size-24 rounded-full shadow-sm dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800 flex-shrink-0" alt="" />
                            <div className="flex-1 text-center sm:text-left">
                                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white">{candidate?.speciality ?? ''}</h4>
                                    <span className="bg-emerald-600/10 text-emerald-600 text-xs px-2.5 py-0.5 font-semibold rounded-full">
                                        #{id}
                                    </span>
                                </div>
                                {candidate?.salary_expectation && (
                                    <p className="text-sm text-slate-400 mt-1">
                                        {t("candidates.list.salary")}: <span className="font-semibold text-emerald-600">{candidate.salary_expectation} {candidate?.salary_expectation_currency}</span>
                                    </p>
                                )}
                                {candidate?.summary && (
                                    <p className="text-slate-400 mt-3 text-sm leading-relaxed">{candidate.summary}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <section className="relative mt-8">
                <div className="container md:pb-24 pb-16">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">

                        {/* Skills Card */}
                        <div className="bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md p-6">
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-emerald-600 rounded-full inline-block"></span>
                                {t('jobPost.skillsLabel')}
                            </h4>
                            {skills?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill) => (
                                        <span
                                            key={skill.name}
                                            className="bg-emerald-600/10 text-emerald-600 text-sm px-3 py-1 font-medium rounded-full"
                                        >
                                            {skill.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">{t('companies.notFound')}</p>
                            )}
                        </div>

                        {/* Languages Card */}
                        <div className="bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md p-6">
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-emerald-600 rounded-full inline-block"></span>
                                {t('jobPost.languages')}
                            </h4>
                            {languages?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {languages.map((lang) => (
                                        <div
                                            key={lang.language}
                                            className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-1.5 rounded-full"
                                        >
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{lang.language}</span>
                                            <span className="text-xs text-slate-400">• {lang.level}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">{t('companies.notFound')}</p>
                            )}
                        </div>

                        {/* Services Card */}
                        <div className="bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md p-6">
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-emerald-600 rounded-full inline-block"></span>
                                {t('jobPost.services')}
                            </h4>
                            {candidate?.services?.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {candidate.services.map((service) => (
                                        <span
                                            key={service}
                                            className="bg-emerald-600/10 text-emerald-600 text-sm px-3 py-1 font-medium rounded-full"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-sm">{t('companies.notFound')}</p>
                            )}
                        </div>

                        {/* Contact Card */}
                        <div className="bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md p-6">
                            <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 bg-emerald-600 rounded-full inline-block"></span>
                                {t('common.contactFor')}
                            </h4>
                            <div className="flex flex-col gap-3">
                                <a href='mailto:octopustalentscareers@gmail.com' className="flex items-center gap-3 px-4 py-3 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-emerald-600/30 hover:bg-emerald-600/5 transition-all duration-300 group">
                                    <span className="size-9 flex items-center justify-center bg-emerald-600/10 rounded-md text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <TfiEmail />
                                    </span>
                                    <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                                        octopustalentscareers@gmail.com
                                    </span>
                                </a>

                                <a href='tel:+994 50 123 45 67' className="flex items-center gap-3 px-4 py-3 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-emerald-600/30 hover:bg-emerald-600/5 transition-all duration-300 group">
                                    <span className="size-9 flex items-center justify-center bg-emerald-600/10 rounded-md text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                        <MdOutlinePhone />
                                    </span>
                                    <span className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                                        +994 50 123 45 67
                                    </span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
