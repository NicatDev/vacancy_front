import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { FiDollarSign } from "react-icons/fi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik"; // 1. Formik import edildi
import * as Yup from "yup"; // 2. Yup import edildi
import EmploymentTypeApi from "../api/apiList/employmentTypes";
import IndustryAPI from "../api/apiList/industries.js";
import EducationsApi from "../api/apiList/educations.js";
import Select from 'react-select';
import { useUser } from "../context/UserContext.jsx";
import VacanciesAPI from "../api/apiList/vacancies.js";


export default function JobPost() {
  const navigate = useNavigate();
  // const company_id = localStorage.getItem('companyId') ?? null;
  const { isDarkMode, user } = useUser();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get("payment");

  const [employmentTypes, setEmploymentTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [occupations, setOccupations] = useState([]);
  const [educations, setEducations] = useState([]);

  const jobStatuses = [
    { value: 'draft', label: t('commonContent.draft') },
    { value: 'active', label: t('commonContent.active') },
  ];


  const getAllEmploymentTypes = async () => {
    try {
      const response = await EmploymentTypeApi.getEmploymentTypes();
      if (response.status === 200) {
        const modified_data = [...response?.data?.data]?.map(d => {
          return {
            value: d?.id,
            label: d?.name
          }
        })
        setEmploymentTypes(prevState => [...modified_data])
      }
    } catch (error) {

    }
  }

  const getAllEducations = async () => {
    try {
      const response = await EducationsApi.getEducationLevels();
      if (response.status === 200) {
        const modified_data = [...response?.data?.data]?.map(d => {
          return {
            value: d?.id,
            label: d?.name
          }
        })
        setEducations(prevState => [...modified_data])
      }
    } catch (error) {

    }
  }

  const getAllCategoriesAndOccupations = async () => {
    try {
      const response = await IndustryAPI.getIndustries(1, 10000, { relationsOccupations: true });
      if (response.status === 200) {
        const modified_data = [...response?.data?.data]?.map(d => {
          return {
            value: d?.id,
            label: d?.name
          }
        });
        const modfied_occupations = [...response?.data?.data]?.map(d => d?.occupations)?.flat(Infinity)?.map(d => {
          return {
            value: d?.id,
            label: d?.name
          }
        })


        setCategories(prevState => [...modified_data]);
        setOccupations(prevState => [...modfied_occupations]);
      }
    } catch (error) {

    }
  }

  const validationSchema = Yup.object().shape({
    status: Yup.string()
      .oneOf(['draft', 'active'], t('formErrors.invalidStatus'))
      .required(t('formErrors.statusRequired')),
    title: Yup.string()
      .min(3, t('formErrors.min3Chars'))
      .max(100, t('formErrors.max100Chars'))
      .required(t('formErrors.jobTitleRequired')),
    info: Yup.string()
      .min(10, t('formErrors.min10Chars'))
      .required(t('formErrors.jobDescriptionRequired')),
    category: Yup.object().nullable().required(t('formErrors.categoryRequired')),
    employment_type_id: Yup.object().nullable().required(t('formErrors.jobTypeRequired')),
    salaryType: Yup.string().required(t('formErrors.salaryTypeRequired')),
    minSalary: Yup.number()
      .nullable()
      .typeError(t('formErrors.mustBeNumber')),

    maxSalary: Yup.number()
      .nullable()
      .typeError(t('formErrors.mustBeNumber'))
      .when('minSalary', (minSalary, schema) => {
        const minVal = minSalary && minSalary[0];

        if (minVal !== null && minVal !== undefined && minVal !== "") {
          return schema.min(minVal, t('formErrors.maxSalaryMin'));
        }
        return schema;
      }),
    responsibilities: Yup.string().required(t('formErrors.skillsRequired')),
    requirements: Yup.string().required(t('formErrors.requiremntsRequired')),

    education_level_id: Yup.object().nullable().required(t('formErrors.educationRequired')),
    experience: Yup.string().required(t('formErrors.experienceRequired')),
    occupation_id: Yup.object().nullable().required(t('formErrors.industryRequired')),
    location: Yup.string().required(t('formErrors.addressRequired')),
    country: Yup.string().required(t('formErrors.countryRequired')),
    state: Yup.string().required(t('formErrors.stateRequired')),
  });


  const formik = useFormik({
    initialValues: {
      status: jobStatuses[0].value,
      title: "",
      info: "",
      category: null,
      employment_type_id: null,
      salaryType: "M",
      minSalary: "",
      maxSalary: "",
      responsibilities: "",
      requirements: "",
      education_level_id: null,
      experience: "",
      occupation_id: null,
      location: "",
      country: "",
      state: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
        const response = await VacanciesAPI.createJobPost({
          ...values,
          company_id: user?.data?.id,
          salary: `$${values?.minSalary}-$${values?.maxSalary}`,
          category: values?.category?.value,
          education_level_id: values?.education_level_id?.value,
          employment_type_id: values?.employment_type_id?.value,
          occupation_id: values?.occupation_id?.value,
          location: `${values?.location} ${values?.country} ${values?.state}`
        });

        if (response.status === 201) {
          setSubmitting(false);
          toast.success(t('jobPost.formSubmittedSuccess'));
        }
      } catch (error) {
        setSubmitting(false);
      }

    },
  });

  const handleSelectChange = (name) => (selectedOption) => {
    formik.setFieldValue(name, selectedOption);
  };

  const customSelectStyles = {
    control: (styles, { isFocused }) => ({
      ...styles,
      borderColor: isDarkMode ? "#374151" : "#ebe6e7",
      minHeight: "36px",
      cursor: "pointer",
      boxShadow: isFocused ? '0 0 0 1px #0a4cb7' : 'none',
      backgroundColor: "transparent",
      "&:hover": {
        borderColor: isDarkMode ? "#4b5563" : "#d1d5db",
      },
    }),

    singleValue: (styles) => ({
      ...styles,
      color: isDarkMode ? "white" : "black",
      fontWeight: "500",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontSize: 12,
    }),

    dropdownIndicator: (styles) => ({
      ...styles,
      color: isDarkMode ? "#d1d5db" : "#9ca3af",
    }),

    indicatorSeparator: () => ({ display: "none" }),

    menu: (styles) => ({
      ...styles,
      overflow: "hidden",
      zIndex: 9999,
      backgroundColor: isDarkMode ? "#1f2937" : "white",
      border: `1px solid ${isDarkMode ? "#374151" : "#e5e7eb"}`,
      borderRadius: "0.375rem",
    }),

    menuList: (styles) => ({
      ...styles,
      backgroundColor: "transparent",
      padding: 0,
    }),

    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      cursor: "pointer",
      fontSize: 12,
      backgroundColor: isSelected
        ? isDarkMode ? "#0a4cb7" : "#0a4cb7"
        : isFocused
          ? isDarkMode ? "#374151" : "#f3f4f6"
          : isDarkMode ? "#1f2937" : "white",

      color: isSelected
        ? "white"
        : isDarkMode
          ? "#f9fafb"
          : "#1f2937",

      "&:active": {
        backgroundColor: '#0a4cb7'
      },
    }),
  };

  useEffect(() => {
    if (paymentStatus === "success") {
      toast.success(t('jobPost.paymentSuccessToast'));
      // Parametri URL-dən silmək
      searchParams.delete("payment");
      navigate({ search: searchParams.toString() }, { replace: true });
    } else if (paymentStatus === "fail") {
      toast.error(t('jobPost.paymentErrorToast'));
      // Parametri URL-dən silmək
      searchParams.delete("payment");
      navigate({ search: searchParams.toString() }, { replace: true });
    }
  }, [paymentStatus, navigate, searchParams]);


  useEffect(() => {
    getAllEmploymentTypes();
    getAllCategoriesAndOccupations();
    getAllEducations();
  }, []);

  return (
    <>
      <section className="relative table w-full py-36 bg-[url('../../assets/images/hero/bg.jpg')] bg-top bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-emerald-900/90"></div>
        <div className="container">
          <div className="grid grid-cols-1 text-center mt-10">
            <h3 className="md:text-3xl text-2xl md:leading-snug tracking-wide leading-snug font-medium text-white">
              {t('jobPost.pageTitle')}
            </h3>
          </div>
        </div>

        <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
          <ul className="breadcrumb tracking-[0.5px] breadcrumb-light mb-0 inline-block">
            <li className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white/50 hover:text-white">
              <Link to="/index">{t('jobPost.breadcrumbHome')}</Link>
            </li>
            <li
              className="inline breadcrumb-item text-[15px] font-semibold duration-500 ease-in-out text-white"
              aria-current="page"
            >
              {t('jobPost.breadcrumbCurrent')}
            </li>
          </ul>
        </div>
      </section>
      <div className="relative">
        <div className="shape absolute start-0 end-0 sm:-bottom-px -bottom-[2px] overflow-hidden z-1 text-slate-50 dark:text-slate-800">
          <svg
            className="w-full h-auto"
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </div>

      <section className="relative bg-slate-50 dark:bg-slate-800 lg:py-24 py-16">
        <div className="container">
          <div className="lg:flex justify-center">
            <div className="lg:w-1/3">
              <div className="p-6 bg-white dark:bg-slate-900 shadow-sm shadow-gray-200 dark:shadow-gray-700 rounded-md">
                <form className="text-left" onSubmit={formik.handleSubmit}>
                  <div className="grid grid-cols-2">
                    <h5 className="text-lg font-semibold">{t('jobPost.jobDetailsTitle')}</h5>
                    <div className="flex items-center justify-end gap-4 space-x-4 mt-2">
                      {jobStatuses.map((status) => (
                        <label
                          key={status.value}
                          className="flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="status"
                            value={status.value}
                            className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.status === status.value}
                          />
                          <span className="ml-2 text-sm text-gray-700">{status.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  {/* Validation Error Message for jobStatus */}
                  {formik.touched.jobStatus && formik.errors.jobStatus ? (
                    <p className="text-red-600 text-sm mt-1">{formik.errors.jobStatus}</p>
                  ) : null}

                  <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold" htmlFor="title">
                        {t('jobPost.jobTitleLabel')}
                      </label>
                      <input
                        id="title"
                        type="text"
                        className={`form-input border ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} mt-1`}
                        placeholder={t('commonContent.insertData')}
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.title && formik.errors.title ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.title}</p>
                      ) : null}
                    </div>

                    <div className="col-span-12 ltr:text-left rtl:text-right">
                      <label htmlFor="info" className="font-semibold">
                        {t('jobPost.jobDescriptionLabel')}
                      </label>
                      <textarea
                        name="info"
                        id="info"
                        className={`form-input border ${formik.touched.info && formik.errors.info ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} mt-1 textarea`}
                        placeholder={t('commonContent.insertData')}
                        value={formik.values.info}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.touched.info && formik.errors.info ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.info}</p>
                      ) : null}
                    </div>

                    <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold">{t('jobPost.categoriesLabel')}</label>
                      <Select
                        options={categories}
                        styles={customSelectStyles}
                        name="category"
                        value={formik.values.category}
                        onChange={handleSelectChange('category')}
                        onBlur={() => formik.setFieldTouched('category', true)}
                        placeholder={t('commonContent.select')}
                      />
                      {formik.touched.category && formik.errors.category ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.category.label || formik.errors.category}</p>
                      ) : null}
                    </div>

                    <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold">{t('jobPost.jobTypeLabel')}</label>
                      <Select
                        options={employmentTypes}
                        styles={customSelectStyles}
                        name="employment_type_id"
                        value={formik.values.employment_type_id}
                        onChange={handleSelectChange('employment_type_id')}
                        onBlur={() => formik.setFieldTouched('employment_type_id', true)}
                        placeholder={t('commonContent.select')}
                      />
                      {formik.touched.employment_type_id && formik.errors.employment_type_id ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.employment_type_id.label || formik.errors.employment_type_id}</p>
                      ) : null}
                    </div>

                    <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold">{t('jobPost.salaryLabel')}</label>
                      <select
                        className={`form-select form-input border ${formik.touched.salaryType && formik.errors.salaryType ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} block w-full mt-1`}
                        name="salaryType"
                        value={formik.values.salaryType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder={t('commonContent.select')}

                      >
                        <option value="M">{t('jobPost.salaryMonthly')}</option>
                        {/* Əlavə tiplər bura gələ bilər */}
                      </select>
                      {formik.touched.salaryType && formik.errors.salaryType ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.salaryType}</p>
                      ) : null}
                    </div>

                    {/* Min Salary */}
                    <div className="md:col-span-3 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold md:invisible md:block hidden">
                        {t('jobPost.salaryMinLabel')}
                      </label>
                      <div className="relative mt-1">
                        <span className="size-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 absolute top-0 start-0 overflow-hidden rounded">
                          <FiDollarSign className="size-4 absolute top-3 start-3"></FiDollarSign>
                        </span>
                        <input
                          type="number"
                          className={`form-input border ${formik.touched.minSalary && formik.errors.minSalary ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} ps-12 pl-12`}
                          placeholder={t('commonContent.insertData')}
                          name="minSalary"
                          value={formik.values.minSalary}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.touched.minSalary && formik.errors.minSalary ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.minSalary}</p>
                      ) : null}
                    </div>

                    {/* Max Salary */}
                    <div className="md:col-span-3 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold md:invisible md:block hidden">
                        {t('jobPost.salaryMaxLabel')}
                      </label>
                      <div className="relative mt-1">
                        <span className="size-10 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 absolute top-0 start-0 overflow-hidden rounded">
                          <FiDollarSign className="size-4 absolute top-3 start-3"></FiDollarSign>
                        </span>
                        <input
                          type="number"
                          className={`form-input border ${formik.touched.maxSalary && formik.errors.maxSalary ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} ps-12 pl-12`}
                          placeholder={t('commonContent.insertData')}
                          name="maxSalary"
                          value={formik.values.maxSalary}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      {formik.touched.maxSalary && formik.errors.maxSalary ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.maxSalary}</p>
                      ) : null}
                    </div>
                  </div>

                  {/* Skill & Experience Section */}
                  <div className="grid grid-cols-1 mt-8">
                    <h5 className="text-lg font-semibold">
                      {t('jobPost.skillExperienceTitle')}
                    </h5>
                  </div>

                  <div className="grid grid-cols-12 gap-4 mt-4">
                    <div className="col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold" htmlFor="requirements">
                        {t('jobPost.requirementsLabel')}
                      </label>
                      <textarea
                        id="requirements"
                        type="text"
                        className={`form-input border ${formik.touched.requirements && formik.errors.requirements ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} mt-1 textarea`}
                        placeholder={t('commonContent.insertData')}
                        name="requirements"
                        value={formik.values.requirements}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.touched.requirements && formik.errors.requirements ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.requirements}</p>
                      ) : null}
                    </div>

                    <div className="col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold" htmlFor="responsibilities">
                        {t('jobPost.skillsLabel')}
                      </label>
                      <textarea
                        id="responsibilities"
                        type="text"
                        className={`form-input border ${formik.touched.responsibilities && formik.errors.responsibilities ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} mt-1 textarea`}
                        placeholder={t('commonContent.insertData')}
                        name="responsibilities"
                        value={formik.values.responsibilities}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.touched.responsibilities && formik.errors.responsibilities ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.responsibilities}</p>
                      ) : null}
                    </div>

                    <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold">{t('jobPost.education')}</label>
                      <Select
                        options={educations}
                        styles={customSelectStyles}
                        name="education_level_id"
                        value={formik.values.education_level_id}
                        onChange={handleSelectChange('education_level_id')}
                        onBlur={() => formik.setFieldTouched('education_level_id', true)}
                        placeholder={t('commonContent.select')}

                      />
                      {formik.touched.education_level_id && formik.errors.education_level_id ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.education_level_id.label || formik.errors.education_level_id}</p>
                      ) : null}
                    </div>

                    <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold" htmlFor="experience">
                        {t('jobPost.experienceLabel')}
                      </label>
                      <input
                        id="experience"
                        type="text"
                        className={`form-input border ${formik.touched.experience && formik.errors.experience ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} mt-1`}
                        placeholder={t('commonContent.insertData')}
                        name="experience"
                        value={formik.values.experience}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.experience && formik.errors.experience ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.experience}</p>
                      ) : null}
                    </div>

                    {/* Industry (Select) */}
                    <div className="md:col-span-6 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold">{t('jobPost.industryLabel')}</label>
                      <Select
                        options={occupations}
                        styles={customSelectStyles}
                        name="occupation_id"
                        value={formik.values.occupation_id}
                        onChange={handleSelectChange('occupation_id')}
                        onBlur={() => formik.setFieldTouched('occupation_id', true)}
                        placeholder={t('commonContent.select')}

                      />
                      {formik.touched.occupation_id && formik.errors.occupation_id ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.occupation_id.label || formik.errors.occupation_id}</p>
                      ) : null}
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="grid grid-cols-1 mt-8">
                    <h5 className="text-lg font-semibold">{t('jobPost.addressTitle')}</h5>
                  </div>

                  <div className="grid grid-cols-12 gap-4 mt-4">
                    {/* Address */}
                    <div className="col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold" htmlFor="location">
                        {t('jobPost.addressLabel')}
                      </label>
                      <input
                        id="location"
                        type="text"
                        className={`form-input border ${formik.touched.location && formik.errors.location ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} mt-1`}
                        placeholder={t('commonContent.insertData')}
                        name="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.location && formik.errors.location ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.location}</p>
                      ) : null}
                    </div>

                    {/* Country */}
                    <div className="md:col-span-4 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold">{t('jobPost.countryLabel')}</label>
                      <input
                        type="text"
                        className={`form-input border ${formik.touched.country && formik.errors.country ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} block w-full mt-1`}
                        name="country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.country && formik.errors.country ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.country}</p>
                      ) : null}
                    </div>

                    {/* State */}
                    <div className="md:col-span-4 col-span-12 ltr:text-left rtl:text-right">
                      <label className="font-semibold">{t('jobPost.stateLabel')}</label>
                      <input
                        type="text"
                        className={`form-input border ${formik.touched.state && formik.errors.state ? 'border-red-500' : 'border-slate-100 dark:border-slate-800'} block w-full mt-1`}
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.state && formik.errors.state ? (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.state}</p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mt-4">
                    <div>
                      <button
                        type="submit"
                        id="submit"
                        name="send"
                        className="py-1 px-5 inline-block font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center rounded-md bg-emerald-600 hover:bg-emerald-700 border-emerald-600 hover:border-emerald-700 text-white"
                        disabled={formik.isSubmitting}
                      >
                        {formik.isSubmitting ? t('jobPost.submittingButton') : t('jobPost.postNowButton')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}