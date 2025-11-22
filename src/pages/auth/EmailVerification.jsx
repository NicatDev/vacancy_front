// src/pages/auth/EmailVerification.jsx (Yeni Bileşen)

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AuthAPI from "../../api/AuthAPI"; 
import logo_dark from '../../assets/images/logo-dark.png';
import logo_light from '../../assets/images/logo-light.png';

export default function EmailVerification() {
    // URL'den ID ve hash parametrelerini alıyoruz
    const { id, hash } = useParams(); 
    
    const [status, setStatus] = useState('Verifying...');
    const [message, setMessage] = useState('Your email address is being verified. Please wait.');
    const [isSuccess, setIsSuccess] = useState(false);
    
    // API çağrısı, bileşen yüklendiğinde bir kere çalışır
    useEffect(() => {
        const verify = async () => {
            if (!id || !hash) {
                setStatus('Error');
                setMessage('Verification link is incomplete.');
                return;
            }

            try {
                // API'ye doğrulama isteği gönder
                const response = await AuthAPI.verifyEmail(id, hash); 
                
                setStatus('Success');
                setMessage(response.data.message || "Email verified successfully!");
                setIsSuccess(true);
                
            } catch (err) {
                // Hata Yönetimi
                console.error("Email verification failed:", err.response ? err.response.data : err.message);
                
                setStatus('Error');
                
                if (err.response && err.response.status === 403) {
                    setMessage(err.response.data.message || "Invalid or expired verification link.");
                } else if (err.response && err.response.status === 401) {
                    // API yetkilendirme istiyorsa ve token yoksa.
                    setMessage("You need to be logged in to verify your email. Please login first.");
                } else {
                    setMessage("An unexpected error occurred during verification.");
                }

            }
        };

        verify();
    }, [id, hash]); // id ve hash değiştiğinde tekrar çalışır

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
                        
                        <h5 className={`my-6 text-2xl font-semibold ${isSuccess ? 'text-emerald-600' : 'text-red-600'}`}>
                            {status}
                        </h5>
                        
                        <p className="text-slate-500 dark:text-slate-300">{message}</p>

                        <div className="mt-6">
                            <Link 
                                to={isSuccess ? "/login" : "/"} 
                                className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md"
                            >
                                {isSuccess ? 'Go to Login' : 'Go Home'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}