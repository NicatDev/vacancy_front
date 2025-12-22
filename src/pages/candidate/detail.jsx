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

            <section className="relative lg:mt-24 mt-[74px]">
                <div className="container">
                    <div className="md:flex ms-4">
                        <div className="md:w-full">
                            <div className="relative flex items-end justify-between">
                                <div className="relative flex items-center">

                                    <img src={userImg} className="size-28 rounded-full shadow-sm dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800" alt="" />
                                    <div className="ms-4">
                                        {/* <h5 className="text-lg font-semibold">{data?.name ? data?.name : "Steven Townsend"}</h5> */}
                                        <h5 className="text-lg font-semibold">{candidate?.speciality ?? ''}</h5>
                                    </div>
                                </div>

                                {/* <div className="">
                                    <Link to="/candidate-profile-setting" className="btn btn-icon rounded-full bg-emerald-600/5 hover:bg-emerald-600 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white flex justify-center items-center"><FiSettings className="size-4" /></Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className="relative mt-12">
                <div className="container md:pb-24 pb-16 ">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                        <div className="col-span-12">
                            <p className="text-slate-400 mt-4">{candidate?.summary}</p>
                            <h4 className="mt-6 text-xl font-semibold">{t('jobPost.skillsLabel')}</h4>
                            <div className="mt-4 flex flex-col gap-2">
                                {skills?.length > 0 ? (
                                    skills.map((skill) => (
                                        <div key={skill.name} className='flex items-center gap-2'>
                                            <span>-</span>
                                            <span className="flex items-center py-2">
                                                {skill.name}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">{t('companies.notFound')}</p>
                                )}
                            </div>
                            <div style={{ height: 1, backgroundColor: "#ccc" }} className='w-full mt-4'></div>

                            <h4 className="mt-6 text-xl font-semibold">{t('jobPost.languages')}:</h4>
                            <div className="mt-4 flex flex-col gap-2">
                                {languages?.length > 0 ? (
                                    languages.map((lang) => (
                                        <div key={lang.language} className='flex items-center'>
                                            <span>-</span>
                                            <div className="flex items-center gap-2 px-2.5 py-2">
                                                <span className="text-gray-700 font-medium">{lang.language}</span>
                                                <span className="text-gray-500 text-sm">({lang.level})</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">{t('companies.notFound')}</p>
                                )}
                            </div>
                            <div style={{ height: 1, backgroundColor: "#ccc" }} className='w-full mt-4'></div>
                            <h4 className="mt-6 text-xl font-semibold">{t('jobPost.services')}:</h4>
                            <div className="mt-4 flex flex-col gap-2">
                                {candidate?.services?.length > 0 ? (
                                    candidate.services.map((service) => (
                                        <div key={service} className='flex items-center gap-2'>
                                            <span>-</span>
                                            <div className="flex items-center py-2 ">
                                                {service}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-400">{t('companies.notFound')}</p>
                                )}
                            </div>


                            <div className="mt-4 flex items-center gap-4">
                                <h4 className="text-lg font-semibold">{t('common.contactFor')}:</h4>

                                <div className="flex gap-4 ">
                                    <a href='mailto:octopustalentscareers@gmail.com' className="flex items-center gap-3 px-4 py-3 rounded-cart border border-slate-100">
                                        <span className="text-slate-900 dark:text-white">
                                            <TfiEmail />
                                        </span>
                                        <span className="text-slate-900 dark:text-white text-sm">
                                            octopustalentscareers@gmail.com
                                        </span>
                                    </a>

                                    <a href='tel:+994 50 123 45 67' className="flex items-center gap-3 px-4 py-3 rounded-cart border border-slate-100">
                                        <span className="text-slate-900 dark:text-white">
                                            <MdOutlinePhone />
                                        </span>
                                        <span className="text-slate-900 dark:text-white text-sm">
                                            +994 50 123 45 67
                                        </span>
                                    </a>
                                </div>
                            </div>



                            {/* <h4 className="mt-6 text-xl font-semibold">Experience :</h4>

                            <div className="flex mt-6">
                                <div className="text-slate-400 font-semibold min-w-[80px] text-center">
                                    <img src={shree_logo} className="size-16 mx-auto mb-2 block" alt="" /> 2019-22
                                </div>

                                <div className="ms-4">
                                    <h5 className="text-lg font-medium mb-0">Full Stack Developer</h5>
                                    <span className="text-slate-400 company-university">Shreethemes - India</span>
                                    <p className="text-slate-400 mt-2 mb-0">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text. </p>
                                </div>
                            </div> */}

                            {/* <div className="flex mt-6">
                                <div className="text-slate-400 font-semibold min-w-[80px] text-center">
                                    <img src={circle_logo} className="size-16 mx-auto mb-2 block" alt="" /> 2017-19
                                </div>

                                <div className="ms-4">
                                    <h5 className="text-lg font-medium mb-0">Back-end Developer</h5>
                                    <span className="text-slate-400 company-university">CircleCI - U.S.A.</span>
                                    <p className="text-slate-400 mt-2 mb-0">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text. </p>
                                </div>
                            </div> */}


                        </div>

                        {/* <div className="lg:col-span-4 md:col-span-5">
                            <div className="bg-slate-50 dark:bg-slate-800 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 sticky top-20">
                                <h5 className="text-lg font-semibold">Personal Detail:</h5>
                                <ul className="list-none mt-4">
                                    <li className="flex justify-between mt-3 items-center font-medium">
                                        <span><FiMail className="size-4 text-slate-400 me-3 inline"></FiMail><span className="text-slate-400 me-3">Email  :</span></span>

                                        <span>thomas@mail.com</span>
                                    </li>
                                    <li className="flex justify-between mt-3 items-center font-medium">
                                        <span><FiGift className="size-4 text-slate-400 me-3 inline"></FiGift><span className="text-slate-400 me-3">D.O.B. :</span></span>

                                        <span>31st Dec, 1996</span>
                                    </li>
                                    <li className="flex justify-between mt-3 items-center font-medium">
                                        <span><FiHome className="size-4 text-slate-400 me-3 inline"></FiHome><span className="text-slate-400 me-3">Address :</span></span>

                                        <span>15 Razy street</span>
                                    </li>
                                    <li className="flex justify-between mt-3 items-center font-medium">
                                        <span><FiMapPin className="size-4 text-slate-400 me-3 inline"></FiMapPin><span className="text-slate-400 me-3">City :</span></span>

                                        <span>London</span>
                                    </li>
                                    <li className="flex justify-between mt-3 items-center font-medium">
                                        <span><FiGlobe className="size-4 text-slate-400 me-3 inline"></FiGlobe><span className="text-slate-400 me-3">Country :</span></span>

                                        <span>UK</span>
                                    </li>
                                    <li className="flex justify-between mt-3 items-center font-medium">
                                        <span><FiServer className="size-4 text-slate-400 me-3 inline"></FiServer><span className="text-slate-400 me-3">Postal Code :</span></span>

                                        <span>521452</span>
                                    </li>
                                    <li className="flex justify-between mt-3 items-center font-medium">
                                        <span><FiPhone className="size-4 text-slate-400 me-3 inline"></FiPhone><span className="text-slate-400 me-3">Mobile :</span></span>

                                        <span>(+125) 1542-8452</span>
                                    </li>

                                    <li className="flex justify-between mt-3">
                                        <span className="text-slate-400 font-medium">Social:</span>

                                        <ul className="list-none ltr:text-right rtl:text-left space-x-0.5">
                                            <li className="inline"><Link to="http://linkedin.com/company/" target="_blank" className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-200 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:text-white text-slate-400 mx-0.5 mt-1"><BiLogoLinkedin/></Link></li>
                                            <li className="inline"><Link to="https://www.facebook.com/" target="_blank" className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-200 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:text-white text-slate-400 mx-0.5 mt-1"><FaFacebookF/></Link></li>
                                            <li className="inline"><Link to="https://www.instagram.com/" target="_blank" className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-200 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:text-white text-slate-400 mx-0.5 mt-1"><FaInstagram/></Link></li>
                                            <li className="inline"><Link to="https://twitter.com/" target="_blank" className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-200 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:text-white text-slate-400 mx-0.5 mt-1"><IoLogoTwitter/></Link></li>
                                            <li className="inline"><Link to="mailto:support@jobstack.in" className="size-8 inline-flex items-center text-center justify-center text-base font-semibold tracking-wide align-middle transition duration-500 ease-in-out border-2 border-gray-200 dark:border-gray-700 rounded-md hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600 hover:text-white dark:text-white text-slate-400 mx-0.5 mt-1"><LuMail/></Link></li>
                                        </ul>
                                    </li>

                                    <li className="mt-3 w-full bg-white dark:bg-slate-900 p-3 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700">
                                        <div className="flex items-center mb-3">
                                            <FiFileText className="size-8 text-slate-400"></FiFileText>
                                            <span className="font-medium ms-2">calvin-carlo-resume.pdf</span>
                                        </div>

                                        <Link to="assets/images/calvin-carlo-resume.pdf" className="py-1 px-5 inline-flex font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:border-emerald-600 text-white rounded-md w-full flex items-center justify-center" download><FiFileText className='me-2'/> Download CV</Link>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </div>
            </section>
        </>
    )
}
