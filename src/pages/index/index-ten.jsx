import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import TinySlider from "tiny-slider-react";

import ab03 from '../../assets/images/about/ab03.jpg';
import ab02 from '../../assets/images/about/ab02.jpg';
import ab01 from '../../assets/images/about/ab01.jpg';

import { categories } from '../../data/data';

import {  BiCheckCircle,LuMail } from "../../assets/icons/vander"

import Navbar from '../../components/Navbar'
import PopularJobsfour from '../../components/Popular-Jobs-four';
import JobCounter from '../../components/Job-counter';
import News from '../../components/News';
import FindBestCompanies from '../../components/FindBestCompanies';
import Footer from '../../components/Footer';

export default function IndexTen() {
    const [isOpen, setOpen] = useState(false)
    const settings = {
        container: '.tiny-one-item',
        items: 1,
        controls: true,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 5000,
        navPosition: "bottom",
        controlsText: ['<i class="mdi mdi-chevron-left "></i>', '<i class="mdi mdi-chevron-right"></i>'],
        nav: false,
        speed: 2000,
        gutter: 0,
    }
  return (
    <>
      <Navbar navClass="!justify-start" topnavClass="bg-white dark:bg-slate-900"/>
      <section className="relative mt-20">
        <div className="container-fluid relative xl:px-24">
            <div className="grid grid-cols-1 relative">
                <div className="tiny-one-item">
                    <TinySlider settings={settings}>
                        <div className="tiny-slide">
                            <div className="relative overflow-hidden md:py-28 py-16 rounded-3xl shadow-sm shadow-gray-200 dark:shadow-gray-700 m-3 bg-[url('../../assets/images/hero/bg3.jpg')] bg-center bg-no-repeat bg-cover">
                                <div className="absolute inset-0 bg-slate-950/70"></div>
                                <div className="container relative">
                                    <div className="md:flex">
                                        <div className="lg:w-2/3 md:w-1/2">
                                            <h4 className="text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 font-bold">Find a new job and <br/> build career</h4>
                                            <p className="text-white/70 text-lg max-w-xl">Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.</p>
                                        
                                            <div className="grid grid-cols-1" id="reserve-form">
                                                <div className="mt-8">
                                                    <div className="bg-white dark:bg-slate-900 border-0 shadow-sm rounded p-3">
                                                        <form action="#">
                                                            <div className="registration-form text-dark text-start">
                                                                <div className="grid md:grid-cols-12 grid-cols-1 md:gap-0 gap-6">
                                                                    <div className="lg:col-span-8 md:col-span-7">
                                                                        <div className="filter-search-form relative filter-border">
                                                                            <i className="uil uil-briefcase-alt icons"></i>
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
                                                <span className="text-white/70"><span className="text-white">Popular Searches :</span> Designer, Developer, Web, IOS, PHP Senior Engineer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tiny-slide">
                            <div className="relative overflow-hidden md:py-28 py-16 rounded-3xl shadow-sm shadow-gray-200 dark:shadow-gray-700 m-3 bg-[url('../../assets/images/hero/bg.jpg')] bg-center bg-no-repeat bg-cover">
                                <div className="absolute inset-0 bg-slate-950/70"></div>
                                <div className="container relative">
                                    <div className="md:flex">
                                        <div className="lg:w-2/3 md:w-1/2">
                                            <h4 className="text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 font-bold">Join us & Explore <br/> Thousands of Jobs</h4>
                                            <p className="text-white/70 text-lg max-w-xl">Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.</p>
                                        
                                            <div className="grid grid-cols-1" id="reserve-form">
                                                <div className="mt-8">
                                                    <div className="bg-white dark:bg-slate-900 border-0 shadow-sm rounded p-3">
                                                        <form action="#">
                                                            <div className="registration-form text-dark text-start">
                                                                <div className="grid md:grid-cols-12 grid-cols-1 md:gap-0 gap-6">
                                                                    <div className="lg:col-span-8 md:col-span-7">
                                                                        <div className="filter-search-form relative filter-border">
                                                                            <i className="uil uil-briefcase-alt icons"></i>
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
                                                <span className="text-white/70"><span className="text-white">Popular Searches :</span> Designer, Developer, Web, IOS, PHP Senior Engineer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tiny-slide">
                            <div className="relative overflow-hidden md:py-28 py-16 rounded-3xl shadow-sm shadow-gray-200 dark:shadow-gray-700 m-3 bg-[url('../../assets/images/hero/bg2.jpg')] bg-top bg-no-repeat bg-cover">
                                <div className="absolute inset-0 bg-slate-950/70"></div>
                                <div className="container relative">
                                    <div className="md:flex">
                                        <div className="lg:w-2/3 md:w-1/2">
                                            <h4 className="text-white lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 font-bold">Find & Hire Experts <br/> for any Job</h4>
                                            <p className="text-white/70 text-lg max-w-xl">Find Jobs, Employment & Career Opportunities. Some of the companies we've helped recruit excellent applicants over the years.</p>
                                        
                                            <div className="grid grid-cols-1" id="reserve-form">
                                                <div className="mt-8">
                                                    <div className="bg-white dark:bg-slate-900 border-0 shadow-sm rounded p-3">
                                                        <form action="#">
                                                            <div className="registration-form text-dark text-start">
                                                                <div className="grid md:grid-cols-12 grid-cols-1 md:gap-0 gap-6">
                                                                    <div className="lg:col-span-8 md:col-span-7">
                                                                        <div className="filter-search-form relative filter-border">
                                                                            <i className="uil uil-briefcase-alt icons"></i>
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
                                                <span className="text-white/70"><span className="text-white">Popular Searches :</span> Designer, Developer, Web, IOS, PHP Senior Engineer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TinySlider>
                </div>
            </div>
        </div>
      </section>

    <section className="relative md:py-24 py-16">
        <div className="container">
            <div className="grid grid-cols-1 pb-8 text-center">
                <h3 className="mb-4 md:text-[26px] md:leading-normal text-2xl leading-normal font-semibold">Popular Categories</h3>

                <p className="text-slate-400 max-w-xl mx-auto">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>
            </div>

            <div className="grid lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 mt-8 gap-4">
                {categories.map((item,index)=>{
                    return(
                        <div className="group relative overflow-hidden rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 transition duration-500" key={index}>
                            <img src={item.image} alt=""/>
                            <div className="absolute inset-0 bg-slate-900/50"></div>

                            <div className="absolute bottom-0 p-4">
                                <Link to="" className="text-lg font-semibold text-white hover:text-emerald-600 transition-all duration-500">{item.title}</Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

        <div className="container md:mt-24 mt-16">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                <div className="lg:col-span-5 md:col-span-6">
                    <div className="relative">
                        <div className="grid grid-cols-12 gap-6 items-center">
                            <div className="col-span-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <img src={ab03} className="shadow-sm rounded-md" alt="" />
                                    <img src={ab02} className="shadow-sm rounded-md" alt="" />
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <img src={ab01} className="shadow-sm rounded-md" alt="" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                            <Link to="#" onClick={()=>setOpen(!isOpen)} className="lightbox  size-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-white">
                                <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 md:col-span-6">
                    <div className="lg:ms-8">
                        <h3 className="mb-6 md:text-4xl text-3xl md:leading-normal leading-normal font-bold">Get the job of you dreams <br /> quick & easy.</h3>

                        <p className="text-slate-400 max-w-xl">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>

                        <ul className="list-none text-slate-400 mt-4">
                            <li className="mb-1 flex items-center"><BiCheckCircle className="text-emerald-600 text-xl me-2"/> Digital Marketing Solutions for Tomorrow</li>
                            <li className="mb-1 flex items-center"><BiCheckCircle className="text-emerald-600 text-xl me-2"/> Our Talented & Experienced Marketing Agency</li>
                            <li className="mb-1 flex items-center"><BiCheckCircle className="text-emerald-600 text-xl me-2"/> Create your own skin to match your brand</li>
                        </ul>

                        <div className="mt-6">
                            <Link to="/contact" className="py-1 px-5 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white mt-2 rounded-md"><LuMail className="me-1"/> Contact us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <PopularJobsfour/>

    <section className="py-20 w-full table relative bg-[url('../../assets/images/hero/bg2.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-slate-900/70"></div>
        <div className="container relative">
            <div className="grid grid-cols-1 text-center">
                <h3 className="mb-4 md:text-[26px] text-2xl text-white font-medium">Get the job that's right for you</h3>

                <p className="text-white/80 max-w-xl mx-auto">Search all the open positions on the web. Get your own
                    personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>

                <Link to="#" onClick={()=>setOpen(!isOpen)} data-type="youtube" data-id="S_CGed6E610"
                    className="lightbox  size-20 rounded-full shadow-lg dark:shadow-gray-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-emerald-600 mx-auto mt-10">
                    <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                </Link>
            </div>
        </div>
    </section>

    <section className="relative md:py-24 py-16">
        <JobCounter/>
        <div className='md:mt-24 mt-16"'>
            <FindBestCompanies/>
        </div>

        <News/>
    </section>
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
    <Footer/>
    </>
  )
}
