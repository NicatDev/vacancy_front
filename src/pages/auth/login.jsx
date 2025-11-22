import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo_dark from '../../assets/images/logo-dark.png';
import logo_light from '../../assets/images/logo-light.png';
import AuthAPI from "../../api/AuthAPI"; // AuthAPI is imported
import axiosClient from "../../api/axiosClient";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Manages changes in form fields
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // Manages form submission
   // src/pages/auth/login.jsx (handleSubmit fonksiyonu içinde)

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
        const response = await AuthAPI.authenticate(formData.email, formData.password);
        
        const responseData = response.data;
        
        // 🚨 GÜNCELLEME BAŞLANGICI: Dizi yapısından token'ları ayıklama
        const tokenArray = responseData?.new_tokens; 
        
        let accessObj = null;
        let refreshObj = null;

        if (Array.isArray(tokenArray)) {
            // Dizideki Access ve Refresh token'ları bul
            accessObj = tokenArray.find(t => t.claims?.typ === 'access' || t.claims?.type === 'access'); // 'claims.typ' veya sadece 'type' olabilir
            refreshObj = tokenArray.find(t => t.claims?.typ === 'refresh' || t.claims?.type === 'refresh');
        }

        const accessToken = accessObj?.token;

        if (accessToken && accessObj && refreshObj) {
            
            // Yeni beklenen token yapısını oluştur (axiosClient'ın beklediği: objeler)
            const newTokens = {
                access_token: { token: accessToken, ...accessObj },
                refresh_token: { token: refreshObj.token, ...refreshObj }
            };
            
            // ✅ Token'lar Başarıyla Alındı: Kaydet ve Header'ı Ayarla
            
            // 1. Token'ları localStorage'a 'tokens' anahtarıyla kaydet
            localStorage.setItem("tokens", JSON.stringify(newTokens));
            
            // 2. axiosClient'ın default başlığını manuel olarak ayarla.
            axiosClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
            
            // Kullanıcı verisini kaydet
            if (responseData?.data) {
                // Not: Logunuzda user verisi doğrudan responseData içinde değil, 
                // ancak token'larla birlikte gelmiş gibi görünüyor. Kullanıcı bilgisini ayıklayalım.
                const { new_tokens, profile, role, ...userBaseData } = responseData;

                // User bilgisini profile ve role ile birleştirerek kaydetmek daha iyi:
                localStorage.setItem("user", JSON.stringify({
                    ...userBaseData,
                    ...profile,
                    role: role
                }));
            }

            // Yönlendirme
            navigate('/'); 
            
        } else {
             // ❌ Token Bulunamadı (Dizi var ama Access/Refresh eksikse)
             console.warn("Authentication successful but specific access/refresh tokens were not found in the array.", responseData);
             setError("Login successful, but API did not provide necessary access tokens. Please contact support.");
             return; 
        }

    } catch (err) {
        // Hata Yönetimi
        console.error("Login error:", err.response ? err.response.data : err.message);
        
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            setError("Invalid email or password or unauthorized access.");
        } else if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            let errorMessages = [];
            for (const key in errors) {
                errorMessages.push(...errors[key]);
            }
            setError(errorMessages.join(' '));
        } else {
            setError("An unexpected error occurred during login.");
        }

    } finally {
        setLoading(false);
    }
};

    return (
        <section className="h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-no-repeat bg-center bg-cover">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="container">
                <div className="flex justify-center">
                    <div className="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md">
                        <div className="p-6">
                            <Link to="#">
                                <img src={logo_dark} className="mx-auto h-[24px] block dark:hidden" alt="Logo Dark" />
                                <img src={logo_light} className="mx-auto h-[24px] dark:block hidden" alt="Logo Light" />
                            </Link>
                            <h5 className="my-6 text-xl font-semibold">Login</h5>
                            
                            {/* Error Message Display */}
                            {error && (
                                <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                    {error}
                                </div>
                            )}

                            <form className="text-left" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1">
                                    {/* Email Field */}
                                    <div className="mb-4 ltr:text-left rtl:text-right">
                                        <label className="font-semibold" htmlFor="email">Email Address:</label>
                                        <input 
                                            id="email" 
                                            type="email" 
                                            className="form-input mt-3 rounded-md" 
                                            placeholder="name@example.com" 
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Password Field */}
                                    <div className="mb-4 ltr:text-left rtl:text-right">
                                        <label className="font-semibold" htmlFor="password">Password:</label>
                                        <input 
                                            id="password" 
                                            type="password" 
                                            className="form-input mt-3 rounded-md" 
                                            placeholder="Password:" 
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-between mb-4">
                                        <div className="inline-flex items-center mb-0">
                                            <input className="form-checkbox rounded size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-emerald-600 checked:appearance-auto dark:accent-emerald-600 focus:border-emerald-300 focus:ring-0 focus:ring-offset-0 focus:ring-emerald-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="RememberMe"/>
                                            <label className="form-checkbox-label text-slate-400" htmlFor="RememberMe">Remember me</label>
                                        </div>
                                        <p className="text-slate-400 mb-0"><Link to="/reset-password" className="text-slate-400">Forgot password ?</Link></p>
                                    </div>

                                    {/* Login Button */}
                                    <div className="mb-4">
                                        <button 
                                            type="submit" 
                                            className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full disabled:bg-gray-400 disabled:border-gray-400" 
                                            disabled={loading}
                                        >
                                            {loading ? 'Logging In...' : 'Login / Sign in'}
                                        </button>
                                    </div>

                                    <div className="text-center">
                                        <span className="text-slate-400 me-2">Don't have an account ?</span> <Link to="/signup" className="text-black dark:text-white font-bold">Sign Up</Link>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
                            <p className="mb-0 text-gray-400 font-medium">© {(new Date().getFullYear())}{" "} Jobstack</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}