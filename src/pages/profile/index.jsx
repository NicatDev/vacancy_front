import { Link, useNavigate } from "react-router-dom";
import { FiSettings, FiMail, FiFileText } from "react-icons/fi";
import { TbBuildings } from "react-icons/tb";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import userImg from "../../assets/images/user.png";
import CandidatesAPI from "../../api/apiList/candidates";
import { useUser } from "../../context/UserContext";
import axiosClient from "../../api/axiosClient";

export default function CandidateDetail() {
  const { t } = useTranslation();
  const { user } = useUser();
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [applications, setApplications] = useState([]);
  const [avatarUrl, setAvatarUrl] = useState(userImg);


  const handleDownloadCV = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosClient.get(user.data.cv, {
        responseType: 'blob',
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);

      window.open(fileURL, '_blank');

      setTimeout(() => URL.revokeObjectURL(fileURL), 10000);
    } catch (error) {
      console.error("CV yüklənərkən xəta baş verdi:", error);
    }
  };

  const getSkills = async () => {
    try {
      if (!user) return;
      let response = await CandidatesAPI.getSingleCandidateSkills(user?.data?.id);
      setSkills(response.status === 200 ? response.data?.data : []);
    } catch {
      setSkills([]);
    }
  };

  const getServices = async () => {
    try {
      if (!user) return;
      let response = await CandidatesAPI.getSingleCandidateServices(user?.data?.id);
      setServices(response.status === 200 ? response.data?.data : []);
    } catch {
      setServices([]);
    }
  };

  const getLanguages = async () => {
    try {
      if (!user) return;
      let response = await CandidatesAPI.getSingleCandidateLanguages(user?.data?.id);
      setLanguages(response.status === 200 ? response.data?.data : []);
    } catch {
      setLanguages([]);
    }
  };

  const getApplications = async () => {
    try {
      if (!user) return;
      let response = await CandidatesAPI.getCandidateApplications(user?.data?.id);
      setApplications(response.status === 200 ? response.data?.data : []);
    } catch {
      setApplications([]);
    }
  };

  useEffect(() => {
    getSkills();
    getServices();
    getLanguages();
    getApplications();
  }, [user]);

  useEffect(() => {
    if (user?.data?.avatar) {
      axiosClient
        .get(user.data.avatar, { responseType: "blob" })
        .then((res) => setAvatarUrl(URL.createObjectURL(res.data)))
        .catch(() => setAvatarUrl(userImg));
    }
  }, [user?.data?.avatar]);


  useEffect(() => {
    if (!user || localStorage.getItem('email_verified_at') == "false") {
      navigate('/login');
    }
  }, [user])

  return (
    <>
      <section className="relative lg:mt-24 mt-[74px]">
        <div className="container">
          <div className="md:flex ms-4">
            <div className="md:w-full">
              <div className="relative flex items-end justify-between">
                <div className="relative flex items-center">
                  <img
                    src={avatarUrl}
                    className="size-28 rounded-full shadow-sm dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800"
                    alt="user"
                  />
                  <div className="ms-4">
                    <h5 className="text-lg font-semibold">{user?.data?.name}</h5>
                    <p className="text-slate-400">{user?.data?.speciality}</p>
                  </div>
                </div>

                <div className="">
                  <Link
                    to="/candidate-profile-setting"
                    className="btn btn-icon rounded-full bg-emerald-600/5 hover:bg-emerald-600 border-emerald-600/10 hover:border-emerald-600 text-emerald-600 hover:text-white flex justify-center items-center"
                  >
                    <FiSettings className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mt-12">
        <div className="container md:pb-24 pb-16">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
            <div className="lg:col-span-8 md:col-span-7">
              <h5 className="text-xl font-semibold">{user?.data?.name}</h5>
              <p className="text-slate-400 mt-4">{user?.data?.summary}</p>

              <div className="grid lg:grid-cols-3 grid-cols-1">
                <div className="flex flex-col">
                  <h4 className="mt-6 text-xl font-semibold">{t('candidateProfile.skills')}:</h4>
                  <div className="grid lg:grid-cols-2 grid-cols-1 mt-6 gap-2">
                    {skills?.length > 0 ? skills.map(skill => (
                      <div key={skill?.id} className="flex justify-between mb-2">
                        <span className="text-slate-400">{skill?.name}</span>
                      </div>
                    )) : <span>{t('candidateProfile.notFound')}</span>}
                  </div>
                </div>

                <div className="flex flex-col">
                  <h4 className="mt-6 text-xl font-semibold">{t('candidateProfile.services')}:</h4>
                  <div className="grid lg-grid-cols-2 grid-cols-1 mt-6 gap-2">
                    {services?.length > 0 ? services.map(service => (
                      <div key={service?.service?.id} className="flex justify-between mb-2">
                        <span className="text-slate-400">{service?.service?.name}</span>
                      </div>
                    )) : <span>{t('candidateProfile.notFound')}</span>}
                  </div>
                </div>

                <div className="flex flex-col">
                  <h4 className="mt-6 text-xl font-semibold">{t('candidateProfile.languages')}:</h4>
                  <div className="flex w-fit flex-col mt-6 gap-2">
                    {languages?.length > 0 ? languages.map(language => (
                      <div key={language?.language?.id} className="flex items-center gap-2 justify-between mb-2">
                        <span className="text-slate-400">{language?.language?.name}</span>
                        <span className="text-slate-400">-</span>
                        <span className="text-slate-400">{language?.level?.label}</span>
                      </div>
                    )) : <span>{t('candidateProfile.notFound')}</span>}
                  </div>
                </div>
              </div>

              <h4 className="mt-6 text-xl font-semibold">{t('candidateProfile.experience')}:</h4>

              {applications.map((application, index) => (
                <div key={index} className="flex mt-6">
                  <div className="text-slate-400 font-semibold min-w-[80px] text-center">
                    {application.job.company.logo ? (
                      <img
                        src={application.job.company.logo}
                        className="size-16 mx-auto mb-2 block"
                        alt={application.job.company.name}
                      />
                    ) : <TbBuildings fontSize={64} />}
                    {dayjs(application?.job?.applied_at).format('YYYY-MM-DD')}
                  </div>

                  <div className="ms-4">
                    <h5 className="text-lg font-medium mb-0">{application.job.title}</h5>
                    <span className="text-slate-400 company-university">
                      {application.job.company.name} - {application.job.location}
                    </span>
                    <p className="text-slate-400 mt-2 mb-0">{application.job.employment_type.name}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 md:col-span-5">
              <div className="bg-slate-50 dark:bg-slate-800 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700 p-6 sticky top-20">
                <h5 className="text-lg font-semibold">{t('candidateProfile.personalDetail')}</h5>
                <ul className="list-none mt-4">
                  <li className="flex justify-between mt-3 items-center font-medium">
                    <span className="text-slate-400 me-3">{t('candidateProfile.fullName')} :</span>
                    <span>{user?.data?.name}</span>
                  </li>

                  <li className="flex justify-between mt-3 items-center font-medium">
                    <span className="text-slate-400 me-3">{t('candidateProfile.salaryExpectation')} :</span>
                    <span>{user?.data?.salary_expectation}$</span>
                  </li>

                  <li className="flex justify-between mt-3 items-center font-medium">
                    <div className="flex items-center gap-2">
                      <FiMail className="size-4 text-slate-400 inline" />
                      <span className="text-slate-400 me-3">{t('candidateProfile.email')} :</span>
                    </div>
                    <span>{user?.data?.user?.email}</span>
                  </li>

                  {user?.data?.cv && (
                    <li className="mt-3 w-full bg-white dark:bg-slate-900 p-3 rounded-md shadow-sm shadow-gray-200 dark:shadow-gray-700">
                      <div className="flex items-center mb-3">
                        <FiFileText className="size-8 text-slate-400" />
                        <span className="font-medium ms-2">{user.data.cv.split("/").pop()}</span>
                      </div>

                      <button
                        className="py-1 cursor-pointer px-5 inline-flex font-semibold tracking-wide border align-middle transition duration-500 ease-in-out text-base text-center bg-emerald-600 hover:bg-emerald-700 border-emerald-600 dark:border-emerald-600 text-white rounded-md w-full flex items-center justify-center"
                        onClick={handleDownloadCV}
                      >
                        <FiFileText className="me-2" /> {t('candidateProfile.downloadCV')}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}