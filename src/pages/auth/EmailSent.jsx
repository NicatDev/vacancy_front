// src/pages/auth/EmailSent.jsx (Yeni Dosya)

import React from 'react';
import { Link } from 'react-router-dom';
import logo_dark from '../../assets/images/logo-dark.png';
import logo_light from '../../assets/images/logo-light.png';

export default function EmailSent() {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-no-repeat bg-center bg-cover">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="container">
                <div className="flex justify-center">
                    <div className="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md p-8 text-center max-w-lg w-full">
                        <Link to="/">
                            <img src={logo_dark} className="mx-auto h-[24px] block dark:hidden" alt="Logo Dark" />
                            <img src={logo_light} className="mx-auto h-[24px] dark:block hidden" alt="Logo Light" />
                        </Link>
                        
                        <h5 className="my-6 text-2xl font-semibold text-emerald-600">
                            Check Your Email! 📧
                        </h5>
                        
                        <p className="text-slate-500 dark:text-slate-300">
                            We have sent a verification link to your email address. Please check your inbox (and spam folder) to complete your registration.
                        </p>
                        
                        <p className="mt-4 text-sm text-slate-400">
                            You must verify your email before you can log in.
                        </p>

                        <div className="mt-6">
                            <Link 
                                to="/login" 
                                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md"
                            >
                                Go to Login Page
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}