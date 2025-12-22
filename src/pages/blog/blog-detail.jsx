import React from 'react'
import { Link, useParams } from 'react-router-dom';
import image from '../../assets/images/blog/09.jpg';
import image1 from '../../assets/images/team/05.jpg';
import Navbar from '../../components/Navbar'
import BlogComp from '../../components/blog-comp';
import Footer from '../../components/Footer';
import { FiFacebook,  FiGitlab, FiInstagram, FiLinkedin, FiMail, FiMessageCircle, FiTwitter, FiUser, FiYoutube } from 'react-icons/fi';
import ExploreJob from '../../components/Explore-job';
import { blogData } from '../../data/data';

export default function BlogDetail() {
    const params = useParams();
    const id = params.id
    const data = blogData.find((blog) => blog.id === parseInt (id));
    return (
        <>
            <Navbar navClass='!justify-end nav-light' />
            <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
                <div className="absolute inset-0 bg-emerald-900/90"></div>
                <div className="container" >
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white mb-3">{data?.headline ? data?.headline : "Introducing new tools for your design." }</h3>

                        <ul className="list-none mt-6">
                            <li className="inline-block text-white/50 mx-5"> <span className="text-white block">Author :</span> <span className="block">Google</span></li>
                            <li className="inline-block text-white/50 mx-5"> <span className="text-white block">Date :</span> <span className="block">21st Feb, 2025</span></li>
                            <li className="inline-block text-white/50 mx-5"> <span className="text-white block">Time :</span> <span className="block">8 Min Read</span></li>
                        </ul>
                    </div>
                </div>
                <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                    <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/index">Octopus</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white"><Link to="/blogs">Blogs</Link></li>
                        <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white" aria-current="page">Single</li>
                    </ul>
                </div>

            </section>
            <div className="relative">
                <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg className="w-full h-auto" viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <section className="relative md:mt-24 mt-16">
                <div className="container">
                    <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                        <div className="lg:col-span-8 md:col-span-6">
                            <div className="relative overflow-hidden rounded-md shadow-sm dark:shadow-gray-800">

                                <img src={data?.image ? data?.image : image} alt="" />

                                <div className="p-6">
                                    <p className="text-slate-400">The most well-known dummy text is the 'Lorem Ipsum', which is said to have originated in the 16th century. Lorem Ipsum is composed in a pseudo-Latin language which more or less corresponds to 'proper' Latin. It contains a series of real Latin words. This ancient dummy text is also incomprehensible, but it imitates the rhythm of most European languages in Latin script.</p>
                                    <p className="text-slate-400 italic border-x-4 border-emerald-600 rounded-ss-xl rounded-ee-xl mt-3 p-3">" There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. "</p>
                                    <p className="text-slate-400 mt-3">The advantage of its Latin origin and the relative meaninglessness of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer's attention from the layout.</p>
                                </div>
                            </div>

                            <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800 mt-8">
                                <h5 className="text-lg font-semibold">Leave A Comment:</h5>

                                <form className="mt-8">
                                    <div className="grid lg:grid-cols-12 lg:gap-6">
                                        <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="name" className="font-semibold">Your Name:</label>
                                                <div className="form-icon relative mt-2">
                                                    <FiUser className="size-4 absolute top-3 start-4"></FiUser>
                                                    <input name="name" id="name" type="text" className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent !ps-11" placeholder="Name :" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-6 mb-5">
                                            <div className="text-left">
                                                <label htmlFor="email" className="font-semibold">Your Email:</label>
                                                <div className="form-icon relative mt-2">
                                                    <FiMail className="size-4 absolute top-3 start-4"></FiMail>
                                                    <input name="email" id="email" type="email" className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent !ps-11" placeholder="Email :" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1">
                                        <div className="mb-5">
                                            <div className="text-left">
                                                <label htmlFor="comments" className="font-semibold">Your Comment:</label>
                                                <div className="form-icon relative mt-2">
                                                    <FiMessageCircle className="size-4 absolute top-3 start-4"></FiMessageCircle>
                                                    <textarea name="comments" id="comments" className="w-full py-2 px-3 text-[14px] border border-gray-200 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none bg-transparent !ps-11 h-28" placeholder="Message :"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" id="submit" name="send" className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full">Send Message</button>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-4 md:col-span-6">
                            <div className="sticky top-20">
                                <h5 className="text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center">Author</h5>
                                <div className="text-center mt-8">
                                    <img src={image1} className=" size-20 mx-auto rounded-full shadow-sm mb-4" alt="" />

                                    <Link to="#" className="text-lg font-medium hover:text-emerald-600 transition-all duration-500 ease-in-out h5">Cristina Romsey</Link>
                                    <p className="text-slate-400">Content Writer</p>
                                </div>

                                <h5 className="text-lg font-medium bg-gray-50 dark:bg-slate-800 shadow-sm dark:shadow-gray-800 rounded-md p-2 text-center mt-8">Social sites</h5>
                                <ul className="list-none text-center mt-8 space-x-0.5">
                                    <li className="inline"><Link to="#" className="size-8 font-semibold tracking-wide align-middle transition duration-500 ease-in-out inline-flex items-center text-center justify-center text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-emerald-600 hover:text-white hover:bg-emerald-600 mx-0.5"><FiFacebook className="size-4"></FiFacebook></Link></li>
                                    <li className="inline"><Link to="#" className="size-8 font-semibold tracking-wide align-middle transition duration-500 ease-in-out inline-flex items-center text-center justify-center text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-emerald-600 hover:text-white hover:bg-emerald-600 mx-0.5"><FiInstagram className="size-4"></FiInstagram></Link></li>
                                    <li className="inline"><Link to="#" className="size-8 font-semibold tracking-wide align-middle transition duration-500 ease-in-out inline-flex items-center text-center justify-center text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-emerald-600 hover:text-white hover:bg-emerald-600 mx-0.5"><FiTwitter className="size-4"></FiTwitter></Link></li>
                                    <li className="inline"><Link to="#" className="size-8 font-semibold tracking-wide align-middle transition duration-500 ease-in-out inline-flex items-center text-center justify-center text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-emerald-600 hover:text-white hover:bg-emerald-600 mx-0.5"><FiLinkedin className="size-4"></FiLinkedin></Link></li>
                                    {/* <li className="inline"><Link to="#" className="size-8 font-semibold tracking-wide align-middle transition duration-500 ease-in-out inline-flex items-center text-center justify-center text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-emerald-600 hover:text-white hover:bg-emerald-600 mx-0.5"><FiGitHub className="size-4"></FiGitHub></Link></li> */}
                                    <li className="inline"><Link to="#" className="size-8 font-semibold tracking-wide align-middle transition duration-500 ease-in-out inline-flex items-center text-center justify-center text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-emerald-600 hover:text-white hover:bg-emerald-600 mx-0.5"><FiYoutube className="size-4"></FiYoutube></Link></li>
                                    <li className="inline"><Link to="#" className="size-8 font-semibold tracking-wide align-middle transition duration-500 ease-in-out inline-flex items-center text-center justify-center text-base border border-gray-100 dark:border-gray-800 rounded-md text-slate-400 hover:border-emerald-600 hover:text-white hover:bg-emerald-600 mx-0.5"><FiGitlab className="size-4"></FiGitlab></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <BlogComp />
            <ExploreJob/>
            <br />
            <br />
            <Footer />

        </>
    )
}
