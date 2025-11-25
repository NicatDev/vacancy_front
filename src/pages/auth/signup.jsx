import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
  import logo from "../../assets/images/logo.png";
import AuthAPI from "../../api/AuthAPI";

export default function Signup() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [userType, setUserType] = useState('candidate'); // candidate | company
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'candidate',
        speciality: '',
        summary: '',
        salary_expectation: '',
        website: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (userType === 'candidate' && formData.password !== formData.password_confirmation) {
            setError(t('register.confirm_password') + " does not match.");
            setLoading(false);
            return;
        }

        if (!e.target.elements['AcceptT&C']?.checked) {
            setError(t('register.accept_tnc'));
            setLoading(false);
            return;
        }

        try {
            if (userType === 'candidate') {
                await AuthAPI.registerAsCandidate(formData);
            } else {
                await AuthAPI.registerAsCompany(formData);
            }
            navigate('/login');
        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const errorMessages = [];
                for (const key in errors) errorMessages.push(...errors[key]);
                setError(errorMessages.join(' '));
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex items-center justify-center py-24 relative bg-[url('../../assets/images/hero/bg3.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
            <div className="container flex justify-center">
                <div className="relative bg-white dark:bg-slate-900 shadow-md dark:shadow-gray-800 rounded-md w-full max-w-xl">
                    <div className="p-6">
                        <Link to="#">
                            <img style={{width:'100px'}} src={logo} className="mx-auto h-6 block dark:hidden w-[100px]" alt="Logo Dark" />
                            <img style={{width:'100px'}}  src={logo} className="mx-auto h-6 hidden dark:block w-[100px]" alt="Logo Light" />
                        </Link>

                        {/* Tabs */}
                        <div className="flex justify-center mt-4 mb-6 border-b border-gray-200 dark:border-gray-700">
                            <button
                                className={`px-4 py-2 border-b-2 ${userType==='candidate' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500'} hover:text-emerald-600 hover:cursor-pointer transition cursor-pointer hover:text-emerald-600`}
                                onClick={() => setUserType('candidate')}
                            >
                                {t('register.candidate')}
                            </button>
                            <button
                                className={`px-4 py-2 border-b-2 ${userType==='company' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-gray-500'} hover:text-emerald-600 hover:cursor-pointer transition cursor-pointer hover:text-emerald-600`}
                                onClick={() => setUserType('company')}
                            >
                                {t('register.company')}
                            </button>
                        </div>

                        <h5 className="text-xl font-semibold mb-6 text-center">
                            {userType === 'candidate' ? t('register.signup') + " " + t('register.candidate') : t('register.signup') + " " + t('register.company')}
                        </h5>

                        {error && (
                            <div className="p-3 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Candidate Fields */}
                            {userType === 'candidate' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold">{t('register.name')}</label>
                                        <input id="name" type="text" value={formData.name} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold">{t('register.email')}</label>
                                        <input id="email" type="email" value={formData.email} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold">{t('register.speciality')}</label>
                                        <input id="speciality" type="text" value={formData.speciality} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold">{t('register.salary_expectation')}</label>
                                        <input id="salary_expectation" type="number" value={formData.salary_expectation} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold">{t('register.password')}</label>
                                        <input id="password" type="password" value={formData.password} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold">{t('register.confirm_password')}</label>
                                        <input id="password_confirmation" type="password" value={formData.password_confirmation} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block font-semibold">{t('register.summary')}</label>
                                        <textarea id="summary" value={formData.summary} onChange={handleChange} rows={3} required className="form-input mt-2 w-full rounded-md"></textarea>
                                    </div>
                                </div>
                            )}

                            {/* Company Fields */}
                            {userType === 'company' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block font-semibold">{t('register.name')}</label>
                                        <input id="name" type="text" value={formData.name} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold">{t('register.email')}</label>
                                        <input id="email" type="email" value={formData.email} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold">{t('register.password')}</label>
                                        <input id="password" type="password" value={formData.password} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block font-semibold">{t('register.confirm_password')}</label>
                                        <input id="password_confirmation" type="password" value={formData.password_confirmation} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block font-semibold">{t('register.website')}</label>
                                        <input id="website" type="url" value={formData.website} onChange={handleChange} required className="form-input mt-2 w-full rounded-md" />
                                    </div>
                                </div>
                            )}

                            {/* Terms */}
                            <div className="flex items-center mt-4">
                                <input type="checkbox" id="AcceptT&C" className="form-checkbox me-2" />
                                <label htmlFor="AcceptT&C" className="text-sm">{t('register.accept_tnc')}</label>
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={loading} className="w-full py-2 mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md">
                                {loading ? 'Registering...' : t('register.register')}
                            </button>

                            <div className="text-center mt-2 text-sm">
                                {t('register.already_account')} <Link to="/login" className="font-bold">{t('register.sign_in')}</Link>
                            </div>
                        </form>
                    </div>

                    <div className="px-6 py-2 bg-slate-50 dark:bg-slate-800 text-center">
                        <p className="mb-0 text-gray-400 font-medium">© {new Date().getFullYear()} Jobstack</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
