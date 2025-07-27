import ab03 from '../assets/images/about/ab03.jpg';
import ab04 from '../assets/images/about/ab04.jpg';
import React, { useState } from 'react'
import { Link } from "react-router-dom";

import { companiesData } from '../data/data';

import {MdOutlineArrowForward} from "../assets/icons/vander"

export default function BestCompanies() {
    const [isOpen, setOpen] = useState(false)

    return (

        <div className="container md:mt-24 md:pb-16 mt-16">
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                <div className="lg:col-span-5 md:col-span-6 md:order-2 order-1">
                    <div className="relative">
                        <div className="relative flex justify-end">
                            <img src={ab03} className="lg:w-[400px] w-[280px] rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700" alt="" />
                            <div className="absolute top-0 translate-y-2/4 start-0 text-center">
                                <Link to="#" onClick={()=>setOpen(!isOpen)} className="lightbox  size-20 rounded-full shadow-lg  shadow-gray-200 dark:shadow-gray-700 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-white">
                                    <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="absolute md:-start-5 start-0 -bottom-16">
                            <img src={ab04} className="lg:w-[280px] w-[200px] border-8 border-white dark:border-slate-900 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700" alt="" />
                        </div>
                    </div>
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


                <div className="lg:col-span-7 md:col-span-6 mt-14 md:mt-0 md:order-1 order-2">
                    <div className="lg:me-5">
                        <h3 className="mb-6 md:text-[26px] text-2xl md:leading-normal leading-normal font-semibold">Find Best Companies.</h3>

                        <p className="text-slate-400 max-w-xl">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-8">
                            {companiesData.slice(0,6).map((item, index) => (
                                <div className="p-3 rounded shadow-sm shadow-gray-200 dark:shadow-gray-700 bg-slate-50 dark:bg-slate-800" key={index}>
                                    <div className="flex items-center">
                                        <div className="size-12 flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                                            <img src={item.image} className="size-8" alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <Link to={`/company/${item.id}`} className="block text-[16px] font-semibold hover:text-emerald-600 transition-all duration-500">{item.title}</Link>
                                            <span className="block text-sm text-emerald-600">{item.vacancy} Vacancy</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid md:grid-cols-12 grid-cols-1 mt-6">
                            <div className="md:col-span-12">
                                <Link to="#" className="inline-flex items-center font-semibold tracking-wide border align-middle transition text-base text-center relative border-none after:content-[''] after:absolute after:h-px after:w-0 after:end-0 after:bottom-0 after:start-0 after:transition-all after:duration-500 hover:after:w-full hover:after:end-auto text-slate-400 hover:text-emerald-600 after:bg-emerald-600 duration-500 ease-in-out">See More Companies <MdOutlineArrowForward className='ms-2'/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
