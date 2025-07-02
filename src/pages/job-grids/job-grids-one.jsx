import React from 'react'
import Select from 'react-select'
import Navbar from '../../components/Navbar'
import Jobs from '../../components/Jobs'
import Feature from '../../components/Feature'
import Footer from '../../components/Footer'

import {BiBriefcaseAlt2, LuMapPin, MdKeyboardArrowLeft, MdKeyboardArrowRight, PiMapPin } from "../../assets/icons/vander"
import ExploreJob from '../../components/Explore-job';
import { jobData } from '../../data/data'
import { Link } from 'react-router-dom'

const optionsOne = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AZ', label: ' Azerbaijan' },
    { value: 'BS', label: 'Bahamas' },
    { value: 'BH', label: 'Bahrain' },
    { value: 'CA', label: 'Canada' },
    { value: 'CV', label: 'Cape Verde' },
    { value: 'DK', label: 'Denmark' },
    { value: 'DJ', label: 'Djibouti' },
    { value: 'ER', label: 'Eritrea' },
    { value: 'EE', label: 'Estonia' },
    { value: 'GM', label: 'Gambia' },
]

const optionsTwo = [
    { value: '1', label: 'Full Time' },
    { value: '2', label: 'Part Time' },
    { value: '3', label: 'Freelancer' },
    { value: '4', label: 'Remote Work' },
    { value: '5', label: 'Office Work' },

]
export default function JobGridsOne() {
    return (
        <>
            <Navbar navClass='!justify-end nav-light' />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
                <div className="absolute inset-0 bg-emerald-900/90"></div>
                <div className="container">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">Job Vacancies</h3>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>

            <section className="relative -mt-[42px] md:pb-24 pb-16">

                <div className="container z-1">
                    <div className="d-flex" id="reserve-form">
                        <div className="md:w-5/6 mx-auto">
                            <div className="lg:col-span-10">
                                <div className="bg-white dark:bg-slate-900 border-0 shadow-sm rounded-md p-3">
                                    <form action="#">
                                        <div className="registration-form text-dark text-start">
                                            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-0 gap-6">
                                                <div className="filter-search-form relative filter-border">
                                                    <BiBriefcaseAlt2 className="icons"/>
                                                    <input name="name" type="text" id="job-keyword" className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" placeholder="Search your Keywords" />
                                                </div>

                                                <div className="filter-search-form relative filter-border">
                                                    <PiMapPin className="icons"/>
                                                    <Select className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" options={optionsOne} />

                                                </div>

                                                <div className="filter-search-form relative filter-border">
                                                    <BiBriefcaseAlt2 className="icons"/>
                                                    <Select className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" options={optionsTwo} />

                                                </div>

                                                <input type="submit" id="search" name="search" style={{ height: '60px' }} className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white searchbtn submit-btn w-full" value="Search" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container md:pt-24 pt-16">
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-[30px]">
                        {jobData.map((item, index) => (
                            <div className="group shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 rounded-md bg-white dark:bg-slate-900" key={index}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="size-14 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                                            <img src={item.image} className="size-8" alt="" />
                                        </div>
    
                                        <div className="ms-3">
                                            <Link to={`/employer-detail/${item.id}`} className="block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500">{item.title}</Link>
                                            <span className="block text-sm text-slate-400">{item.day}</span>
                                        </div>
                                    </div>
    
                                    <span className="bg-emerald-600/10 group-hover:bg-emerald-600 inline-block text-emerald-600 group-hover:text-white text-xs px-2.5 py-0.5 font-semibold rounded-full transition-all duration-500">{item.jobtype}</span>
                                </div>
    
                                <div className="mt-6">
                                    <Link to={`/job-detail-two/${item.id}`} className="text-lg hover:text-emerald-600 font-semibold transition-all duration-500">{item.heading}</Link>
                                    <h6 className="text-base font-medium flex items-center"><LuMapPin className='me-1'/>{item.Location}</h6>
                                </div>
    
                                <div className="mt-6">
                                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                                        <div className="bg-emerald-600 h-[6px] rounded-full" style={{ width: '55%' }}></div>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-slate-400 text-sm"><span className="text-slate-900 dark:text-white font-semibold inline-block">21 applied</span> of 40 vacancy</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
                                    <div className="md:col-span-12 text-center">
                                        <nav aria-label="Page navigation example">
                                            <ul className="inline-flex items-center -space-x-px">
                                                <li>
                                                    <Link to="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-s-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600">
                                                        <MdKeyboardArrowLeft className="text-[20px] rtl:rotate-180 rtl:-mt-1"/>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600">1</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600">2</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" aria-current="page" className="z-10 size-[40px] inline-flex justify-center items-center text-white bg-emerald-600 border border-emerald-600">3</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600">4</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 hover:text-white bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600">5</Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="size-[40px] inline-flex justify-center items-center text-slate-400 bg-white dark:bg-slate-900 rounded-e-3xl hover:text-white border border-gray-100 dark:border-gray-800 hover:border-emerald-600 dark:hover:border-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-600">
                                                        <MdKeyboardArrowRight className="text-[20px] rtl:rotate-180 rtl:-mt-1"/>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                <Feature />
                <ExploreJob/>
            </section>

            <Footer />
        </>
    )
}
