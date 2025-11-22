import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo_dark from '../../assets/images/logo-dark.png';
import logo_light from '../../assets/images/logo-light.png';
import AuthAPI from "../../api/AuthAPI"; 

export default function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'candidate', 
        // Candidate profile required fields
        speciality: '',
        summary: '',
        salary_expectation: '', 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        let id = e.target.id;
        
        // Map form IDs to the keys expected by the API
        if (id === 'RegisterName') id = 'name';
        if (id === 'LoginEmail') id = 'email';
        if (id === 'LoginPassword') id = 'password';
        if (id === 'ConfirmPassword') id = 'password_confirmation';
        if (id === 'Speciality') id = 'speciality';
        if (id === 'Summary') id = 'summary';
        if (id === 'SalaryExpectation') id = 'salary_expectation';

        setFormData({
            ...formData,
            [id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }
        
        if (!e.target.elements['AcceptT&C'].checked) {
             setError("You must accept the Terms and Conditions to register.");
             setLoading(false);
             return;
         }

        try {
            // AuthAPI must be updated to send the data
            await AuthAPI.register(formData); 
            
            navigate('/email-sent');

        } catch (err) {
            console.error("Registration error:", err.response ? err.response.data : err.message);
            
            if (err.response && err.response.data && err.response.data.errors) {
                const errors = err.response.data.errors;
                let errorMessages = [];
                // Show all errors to the user
                for (const key in errors) {
                    errorMessages.push(...errors[key]);
                }
                setError(errorMessages.join(' '));
            } else {
                setError("An unexpected error occurred during registration.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[url('../../assets/images/hero/bg3.jpg')] bg-no-repeat bg-center bg-cover py-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="container">
                <div className="flex justify-center items-center content-center">
                    <div className="relative overflow-hidden bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md w-full max-w-2xl">
                        <div className="p-6 max-h-[80vh] overflow-y-auto"> 
                            <Link to="#">
                                <img src={logo_dark} className="mx-auto h-[24px] block dark:hidden" alt="Logo Dark" />
                                <img src={logo_light} className="mx-auto h-[24px] dark:block hidden" alt="Logo Light" />
                            </Link>
                            <h5 className="my-6 text-xl font-semibold">Candidate Signup Form</h5>
                            
                            {/* Hata Mesajı Gösterimi - Tam genişlik */}
                            {error && (
                                <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 col-span-2" role="alert">
                                    {error}
                                </div>
                            )}
                            
                            <form className="text-left" onSubmit={handleSubmit}>
                                {/* Ana Grid 2 sütunlu, bu tüm elemanları etkiler */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                                    
                                    {/* 1. Your Name (2 Sütun) */}
                                    <div className="mb-4 ltr:text-left rtl:text-right">
                                        <label className="font-semibold" htmlFor="RegisterName">Your Name:</label>
                                        <input id="RegisterName" type="text" className="form-input mt-3 rounded-md" placeholder="Harry" value={formData.name} onChange={handleChange} required/>
                                    </div>

                                    {/* 2. Email Address (2 Sütun) */}
                                    <div className="mb-4 ltr:text-left rtl:text-right">
                                        <label className="font-semibold" htmlFor="LoginEmail">Email Address:</label>
                                        <input id="LoginEmail" type="email" className="form-input mt-3 rounded-md" placeholder="name@example.com" value={formData.email} onChange={handleChange} required/>
                                    </div>

                                    {/* 3. Speciality (2 Sütun) */}
                                    <div className="mb-4 ltr:text-left rtl:text-right">
                                        <label className="font-semibold" htmlFor="Speciality">Speciality:</label>
                                        <input id="Speciality" type="text" className="form-input mt-3 rounded-md" placeholder="Ex: Software Engineer" value={formData.speciality} onChange={handleChange} required/>
                                    </div>
                                    
                                    {/* 4. Salary Expectation (2 Sütun) */}
                                    <div className="mb-4 ltr:text-left rtl:text-right">
                                        <label className="font-semibold" htmlFor="SalaryExpectation">Salary Expectation (Number):</label>
                                        <input id="SalaryExpectation" type="number" className="form-input mt-3 rounded-md" placeholder="Ex: 50000" value={formData.salary_expectation} onChange={handleChange} required/>
                                    </div>

                                    {/* 5. Password (2 Sütun) */}
                                    <div className="mb-4 ltr:text-left rtl:text-right">
                                        <label className="font-semibold" htmlFor="LoginPassword">Password:</label>
                                        <input id="LoginPassword" type="password" className="form-input mt-3 rounded-md" placeholder="Password:" value={formData.password} onChange={handleChange} required/>
                                    </div>
                                    
                                    {/* 6. Confirm Password (2 Sütun) */}
                                    <div className="mb-4 ltr:text-left rtl:text-right">
                                        <label className="font-semibold" htmlFor="ConfirmPassword">Confirm Password:</label>
                                        <input id="ConfirmPassword" type="password" className="form-input mt-3 rounded-md" placeholder="Re-enter Password:" value={formData.password_confirmation} onChange={handleChange} required/>
                                    </div>
                                    
                                    {/* Brief Summary - Tam genişlik (col-span-2) */}
                                    <div className="mb-4 ltr:text-left rtl:text-right col-span-1 md:col-span-2">
                                        <label className="font-semibold" htmlFor="Summary">Brief Summary:</label>
                                        <textarea id="Summary" rows="3" className="form-input mt-3 rounded-md" placeholder="Talk about your career goals..." value={formData.summary} onChange={handleChange} required></textarea>
                                    </div>

                                    {/* Terms and Conditions - Tam genişlik (col-span-2) */}
                                    
                                    
                                </div>
                                <div className="mb-4 col-span-1 md:col-span-2">
                                        <div className="flex items-center w-full mb-0">
                                            <input className="form-checkbox rounded size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-emerald-600 checked:appearance-auto dark:accent-emerald-600 focus:border-emerald-300 focus:ring-0 focus:ring-offset-0 focus:ring-emerald-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="AcceptT&C" name="AcceptT&C" required/>
                                            <label className="form-check-label text-slate-400" htmlFor="AcceptT&C">
                                                I Accept <Link to="#" className="text-emerald-600">Terms And Condition</Link>
                                            </label>
                                        </div>
                                    </div>

                                {/* Register Button - Tam genişlik (col-span-2) */}
                                    <div className="mb-4 col-span-1 md:col-span-2">
                                        <button type="submit" className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white rounded-md w-full disabled:bg-gray-400 disabled:border-gray-400" disabled={loading}>
                                            {loading ? 'Registering...' : 'Register'}
                                        </button>
                                    </div>

                                    {/* Sign In Link - Tam genişlik (col-span-2) ve sağa yaslı (text-right) */}
                                    <div className="text-right col-span-1 md:col-span-2">
                                        <span className="text-slate-400 me-2">Already have an account ? </span> <Link to="/login" className="text-black dark:text-white font-bold">Sign in</Link>
                                    </div>
                            </form>
                        </div>

                        {/* Footer kısmı kaydırılabilir alanın dışında tutuldu. */}
                        <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
                            <p className="mb-0 text-gray-400 font-medium">© {(new Date().getFullYear())}{" "} Jobstack</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}