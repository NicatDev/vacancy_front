import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import heroImg from '../../assets/images/hero.png'
import team1 from '../../assets/images/DSC03269.jpg'
import team2 from '../../assets/images/team/02.jpg'
import team3 from '../../assets/images/team/03.jpg'
import team4 from '../../assets/images/team/04.jpg'
import team5 from '../../assets/images/team/05.jpg'

import {FiBriefcase, FiPlus, LuBellRing} from '../../assets/icons/vander'

import Navbar from '../../components/Navbar'
import MillionsJob from '../../components/Millions-job'
import PopularJobssix from '../../components/Popular-Jobs-six'
import JobCounter from '../../components/Job-counter'
import FindBestCompanies from '../../components/FindBestCompanies'
import News from '../../components/News'
import Footer from '../../components/Footer'




export default function IndexNine() {
    const [isOpen, setOpen] = useState(false)
  return (
    <>
    <Navbar/>
    <section className="relative table w-full py-36 pb-0 lg:py-44 lg:pb-0 bg-orange-600/5 dark:bg-orange-600/10">
    <div className="container relative">
        <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
            <div className="lg:col-span-7">
                <div className="md:me-6 md:mb-20">
                    <h4 className="lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 font-bold">Start Building <br/> Your <span className="text-emerald-600">Dream Career</span><br/> with Jobstack</h4>
                    <p className="text-lg max-w-xl">Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.</p>
                
                    <div className="grid lg:grid-cols-12 grid-cols-1" id="reserve-form">
                        <div className="lg:col-span-10 mt-8">
                            <div className="bg-white dark:bg-slate-900 border-0 shadow-sm rounded p-3">
                                <form action="#">
                                    <div className="registration-form text-dark text-start">
                                        <div className="grid md:grid-cols-12 grid-cols-1 md:gap-0 gap-6">
                                            <div className="lg:col-span-8 md:col-span-7">
                                                <div className="filter-search-form relative filter-border">
                                                    <FiBriefcase className="icons"/>
                                                    <input name="name" type="text" id="job-keyword" className="form-input filter-input-box !bg-gray-50 dark:!bg-slate-800 border-0" placeholder="Search your Keywords"/>
                                                </div>
                                            </div>

                                            <div className="lg:col-span-4 md:col-span-5">
                                                <input type="submit" id="search" name="search" style={{height:'60px'}} className="btn bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white searchbtn submit-btn w-full" value="Search"/>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <span className="text-slate-400"><span className="text-slate-900 dark:text-white">Popular Searches :</span> Designer, Developer, Web, IOS, PHP Senior Engineer</span>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-5">
                <div className="relative">
                    <img src={heroImg} alt=""/>

                    <div className="absolute lg:top-48 top-56 xl:-start-20 lg:-start-10 md:-start-4 start-2 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-60 z-2">
                        <h5 className="text-lg font-semibold mb-3">5k+ candidates get job</h5>
                        
                        <ul className="list-none relative">
                            <li className="inline-block relative"><Link to=""><img src={team1} className="size-10 rounded-full shadow-md shadow-gray-200 dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                            <li className="inline-block relative -ms-3"><Link to=""><img src={team2} className="size-10 rounded-full shadow-md shadow-gray-200 dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                            <li className="inline-block relative -ms-3"><Link to=""><img src={team3} className="size-10 rounded-full shadow-md shadow-gray-200 dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                            <li className="inline-block relative -ms-3"><Link to=""><img src={team4} className="size-10 rounded-full shadow-md shadow-gray-200 dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                            <li className="inline-block relative -ms-3"><Link to=""><img src={team5} className="size-10 rounded-full shadow-md shadow-gray-200 dark:shadow-gray-700 border-4 border-white dark:border-slate-900 relative hover:z-1 hover:scale-105 transition-all duration-500" alt=""/></Link></li>
                            <li className="inline-block relative -ms-3"><Link to="" className="size-9 items-center text-center justify-center text-base font-semibold tracking-wide border align-middle transition duration-500 ease-in-out table-cell rounded-full bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white hover:z-1 hover:scale-105"><FiPlus className="icons ms-2"/></Link></li>
                        </ul>
                    </div>

                    <div className="absolute flex justify-between items-center bottom-6 lg:-end-10 end-2 p-4 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 w-max">
                        <LuBellRing className="text-[24px] text-amber-500"/>
                        <p className="text-lg font-semibold mb-0 ms-2">Job Alert Subscribe</p>
                    </div>

                    <div className="overflow-hidden after:content-[''] after:absolute after:size-16 after:bg-emerald-600/30 after:top-20 after:start-20 after:-z-1 after:rounded-lg after:animate-[spin_10s_linear_infinite]"></div>
                </div>
            </div>
        </div>
    </div>
    </section>

    <section className="relative md:py-24 py-16">
        <div className="container md:pb-16">
            <MillionsJob/>
        </div>

        <PopularJobssix/>
        
        <div className="md:mt-24 mt-16">
            <JobCounter/>
        </div>
    </section>
    <section className="py-20 w-full table relative bg-[url('../../assets/images/hero/bg2.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-slate-900/70"></div>
        <div className="container relative">
            <div className="grid grid-cols-1 text-center">
                <h3 className="mb-4 md:text-[26px] text-2xl text-white font-medium">Get the job that's right for you</h3>

                <p className="text-white/80 max-w-xl mx-auto">Search all the open positions on the web. Get your own
                    personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>

                <Link to="#" onClick={()=>setOpen(!isOpen)} className="lightbox  size-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-emerald-600 mx-auto mt-10">
                    <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                </Link>
            </div>
            {isOpen && 
                <div className="flex bg-slate-900/70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative p-1 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                            <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <button type="button" onClick={()=>setOpen(!isOpen)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-1 md:p-1 space-y-4">
                                <iframe width="100%" height="400" src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    </section>

    <section className="relative md:py-24 py-16">
        <FindBestCompanies/>

        <News/>
    </section>
    <Footer/>
    </>
  )
}
