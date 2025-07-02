import React, { useState } from 'react'
import { Link } from "react-router-dom";

import ab01 from '../assets/images/about/ab01.jpg';
import ab02 from '../assets/images/about/ab02.jpg';

import {BiCheckCircle, LuMail} from "../assets/icons/vander"

export default function MillionsJob() {
    const [isOpen, setOpen] = useState(false)
    return (
        <>
            <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-[30px]">
                <div className="lg:col-span-5 md:col-span-6">
                    <div className="relative">
                        <div className="relative">
                            <img src={ab01} className="lg:w-[400px] w-[280px] rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700" alt="" />
                            <div className="absolute top-0 translate-y-2/4 end-0 text-center">
                                <Link to="#" onClick={()=>setOpen(!isOpen)} data-type="youtube" data-id="S_CGed6E610" className="lightbox  size-20 rounded-full shadow-lg shadow-gray-200 dark:shadow-gray-700 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-emerald-600 dark:text-white">
                                    <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                                </Link>
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
                        <div className="absolute md:-end-5 end-0 -bottom-16">
                            <img src={ab02} className="lg:w-[280px] w-[200px] border-8 border-white dark:border-slate-900 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700" alt="" />
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-7 md:col-span-6 mt-14 md:mt-0">
                    <div className="lg:ms-5">
                        <h3 className="mb-6 md:text-[26px] text-2xl md:leading-normal leading-normal font-semibold">Millions of jobs. <br /> Find the one that's right for you.</h3>

                        <p className="text-slate-400 max-w-xl">Search all the open positions on the web. Get your own personalized salary estimate. Read reviews on over 30000+ companies worldwide.</p>

                        <ul className="list-none text-slate-400 mt-4">
                            <li className="mb-1 flex items-center"><BiCheckCircle className="text-emerald-600 text-xl me-2"/>Digital Marketing Solutions for Tomorrow</li>
                            <li className="mb-1 flex items-center"><BiCheckCircle className="text-emerald-600 text-xl me-2"/> Our Talented & Experienced Marketing Agency</li>
                            <li className="mb-1 flex items-center"><BiCheckCircle className="text-emerald-600 text-xl me-2"/> Create your own skin to match your brand</li>
                        </ul>

                        <div className="mt-6">
                            <Link to="/contact" className="py-1 px-5 inline-flex items-center font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white mt-2 rounded-md"><LuMail className='me-2'/> Contact us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
