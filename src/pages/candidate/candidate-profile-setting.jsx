import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../context/UserContext";
import CandidatesAPI from "../../api/apiList/candidates";
import SkillsAPI from "../../api/apiList/skills";
import ServicesAPI from "../../api/apiList/services";
import LanguagesAPI from "../../api/apiList/languages";
import { FiEdit, FiFileText } from "react-icons/fi";
import userImg from "../../assets/images/user.png";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
    Button, Form, List, Popconfirm, Space, Typography,
    Modal, Input, ConfigProvider, theme, Select, Upload
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import axiosClient from "../../api/axiosClient";

const { Text } = Typography;

export default function CandidateProfileSetting() {
    const navigate = useNavigate();
    const { user, refreshUser, isDarkMode } = useUser();
    const { t } = useTranslation();

    const [avatarUrl, setAvatarUrl] = useState(userImg);
    const [skills, setSkills] = useState([]);
    const [services, setServices] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [allLanguages, setAllLanguages] = useState([]);
    const [allLevels, setAllLevels] = useState([]);

    // Modal States
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

    // AntD Forms
    const [skillForm] = Form.useForm();
    const [serviceForm] = Form.useForm();
    const [languageForm] = Form.useForm();

    // CV Upload State
    const [fileList, setFileList] = useState([]);

    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: user?.data?.name || "",
            speciality: user?.data?.speciality || "",
            summary: user?.data?.summary || "",
            salary_expectation: user?.data?.salary_expectation || "",
            cv: null,
            avatar: null,
        },
        validationSchema: Yup.object({
            name: Yup.string(),
            speciality: Yup.string(),
            summary: Yup.string(),
            salary_expectation: Yup.number()
                .typeError(t("profileSettings.salaryNumberError"))
                .min(0, t("profileSettings.salaryPositiveError")),
        }),
        onSubmit: async (values) => {
            const payload = { candidate: user?.data?.id };
            if (values.name) payload.name = values.name;
            if (values.speciality) payload.speciality = values.speciality;
            if (values.summary) payload.summary = values.summary;
            if (values.salary_expectation) payload.salary_expectation = values.salary_expectation;

            if (values.cv instanceof File) {
                payload.cv = await fileToBase64(values.cv);
            } else if (values.cv === "deleted") {
                payload.cv = null;
            }

            if (values.avatar) payload.avatar = await fileToBase64(values.avatar);

            try {
                const response = await CandidatesAPI.updateProfile(user?.data?.id, payload);
                if (response.status === 200) {
                    toast.success(t("profileSettings.successMessage"));
                    refreshUser();
                }
            } catch (err) {
                console.error(err);
            }
        },
    });

    // CV-ni Blob formatında açmaq funksiyası
    const handlePreview = async (file) => {
        let url = file.url;

        if (!url && file.originFileObj) {
            url = URL.createObjectURL(file.originFileObj);
        } else if (url && !url.startsWith('blob:')) {
            try {
                const res = await axiosClient.get(url, { responseType: 'blob' });
                url = URL.createObjectURL(res.data);
            } catch (e) {
                console.error("Blob error:", e);
            }
        }

        if (url) {
            window.open(url, '_blank');
        }
    };

    // API Calls
    const getSkills = async () => {
        try {
            if (!user) return;
            const response = await CandidatesAPI.getSingleCandidateSkills(user?.data?.id);
            setSkills(response.status === 200 ? response.data?.data : []);
        } catch { setSkills([]); }
    };

    const getServices = async () => {
        try {
            if (!user) return;
            let response = await CandidatesAPI.getSingleCandidateServices(user?.data?.id);
            setServices(response.status === 200 ? response.data?.data : []);
        } catch { setServices([]); }
    };

    const getLanguages = async () => {
        try {
            if (!user) return;
            let response = await CandidatesAPI.getSingleCandidateLanguages(user?.data?.id);
            setLanguages(response.status === 200 ? response.data?.data : []);
        } catch { setLanguages([]); }
    };

    useEffect(() => {
        if (user?.data?.avatar) {
            axiosClient
                .get(user.data.avatar, { responseType: "blob" })
                .then((res) => setAvatarUrl(URL.createObjectURL(res.data)))
                .catch(() => setAvatarUrl(userImg));
        }

        if (user?.data?.cv) {
            setFileList([{
                uid: '-1',
                name: user.data.cv.split("/").pop() || "resume.pdf",
                status: 'done',
                url: user.data.cv
            }]);
        }
    }, [user?.data?.avatar, user?.data?.cv]);

    useEffect(() => {
        getSkills();
        getServices();
        getLanguages();
    }, [user]);

    // Handlers (Skills, Services, Languages)
    const handleAddSkill = async (values) => {
        try {
            await SkillsAPI.addCandidateSkill(user?.data?.id, { name: values.name });
            toast.success(t("toastMessages.skillAdded"));
            setIsSkillModalOpen(false);
            skillForm.resetFields();
            getSkills();
        } catch (err) { console.error(err); }
    };

    const handleDeleteSkill = async (skillId) => {
        try {
            await SkillsAPI.deleteCandidateSkill(user?.data?.id, skillId);
            toast.success(t("toastMessages.skillDeleted"));
            getSkills();
        } catch (err) { console.error(err); }
    };

    const handleAddService = async (values) => {
        try {
            await ServicesAPI.addCandidateService(user?.data?.id, { service_name: values.name });
            toast.success(t("toastMessages.serviceAdded"));
            setIsServiceModalOpen(false);
            serviceForm.resetFields();
            getServices();
        } catch (err) { console.error(err); }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            await ServicesAPI.deleteCandidateService(user?.data?.id, serviceId);
            toast.success(t("toastMessages.serviceDeleted"));
            getServices();
        } catch (err) { console.error(err); }
    };

    const openLanguageModal = async () => {
        try {
            const [langRes, levelRes] = await Promise.all([
                LanguagesAPI.getAllLanguages(),
                LanguagesAPI.getAllLevels()
            ]);
            setAllLanguages(langRes.data?.data || []);
            setAllLevels(levelRes.data?.data || []);
            setIsLanguageModalOpen(true);
        } catch (err) { console.error(err); }
    };

    const handleAddLanguage = async (values) => {
        try {
            await LanguagesAPI.addCandidatLanguage(user?.data?.id, {
                language_name: allLanguages.find(lang => lang.id == values.languageId)?.name,
                level_id: values.levelId
            });
            toast.success(t("toastMessages.languageAdded"));
            setIsLanguageModalOpen(false);
            languageForm.resetFields();
            getLanguages();
        } catch (err) { console.error(err); }
    };

    const handleDeleteLanguage = async (langId) => {
        try {
            await LanguagesAPI.deleteCandidateLanguage(user?.data?.id, langId);
            toast.success(t("toastMessages.languageDeleted"));
            getLanguages();
        } catch (err) { console.error(err); }
    };


    useEffect(() => {
        if (!user || localStorage.getItem('email_verified_at') == "false") {
            navigate('/login');
        }
    }, [user])

    return (
        <ConfigProvider theme={{
            algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}>
            <section className="relative pb-16" style={{ marginTop: 200 }}>
                <div className="container">
                    <div className="flex items-center mb-4">
                        <div style={{ position: "relative", width: "112px", height: "112px" }}>
                            <img
                                src={formik.values.avatar ? URL.createObjectURL(formik.values.avatar) : avatarUrl}
                                alt="avatar"
                                style={{
                                    width: "100%", height: "100%", borderRadius: "50%",
                                    objectFit: "cover", border: "4px solid #e2e8f0",
                                }}
                            />
                            <input
                                type="file" accept="image/*" id="avatar-upload" style={{ display: "none" }}
                                onChange={(e) => formik.setFieldValue("avatar", e.currentTarget.files[0])}
                            />
                            <label
                                htmlFor="avatar-upload"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    backgroundColor: "white",
                                    padding: "0.5rem", // Tailwind p-2
                                    borderRadius: "9999px", // Tailwind rounded-full
                                    cursor: "pointer",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)", // Tailwind shadow-md
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                    zIndex: 10,
                                    transform: "translate(-50%, -50%)" // top-1/2 left-1/2 + translate
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                                onMouseLeave={e => e.currentTarget.style.opacity = 0}
                            >
                                <FiEdit style={{ width: "16px", height: "16px", color: "#374151" }} />
                            </label>

                        </div>
                        <div className="ms-4">
                            <h5 className="text-lg font-semibold">{formik.values.name}</h5>
                            <p className="text-slate-400">{formik.values.speciality}</p>
                        </div>
                    </div>

                    <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="font-medium">{t("profileSettings.candidateName")}</label>
                                    <input
                                        type="text" name="name" className="form-input border mt-2 w-full"
                                        value={formik.values.name} onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">{t("profileSettings.speciality")}</label>
                                    <input
                                        type="text" name="speciality" className="form-input border mt-2 w-full"
                                        value={formik.values.speciality} onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">{t("profileSettings.salaryExpectation")}</label>
                                    <input
                                        type="number" name="salary_expectation" className="form-input border mt-2 w-full"
                                        value={formik.values.salary_expectation} onChange={formik.handleChange}
                                    />
                                </div>

                                <div>
                                    <label className="font-medium block mb-2">{t("profileSettings.uploadResume")}</label>
                                    <Upload
                                        accept=".pdf"
                                        listType="text"
                                        maxCount={1}
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        iconRender={() => <FiFileText className="text-red-500 mr-2" style={{ fontSize: '18px' }} />}
                                        beforeUpload={(file) => {
                                            formik.setFieldValue("cv", file);
                                            setFileList([{
                                                uid: file.uid,
                                                name: file.name,
                                                status: 'done',
                                                originFileObj: file
                                            }]);
                                            return false;
                                        }}
                                        onRemove={() => {
                                            formik.setFieldValue("cv", "deleted");
                                            setFileList([]);
                                        }}
                                    >
                                        {fileList.length < 1 && (
                                            <Button icon={<PlusOutlined />} className="w-full flex items-center justify-center py-5 border-dashed">
                                                {t("profileSettings.uploadResume")}
                                            </Button>
                                        )}
                                    </Upload>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="font-medium">{t("profileSettings.summary")}</label>
                                <textarea
                                    name="summary" className="form-input border mt-2 textarea w-full h-28"
                                    value={formik.values.summary} onChange={formik.handleChange}
                                />
                            </div>

                            <button type="submit" className="mt-5 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700">
                                {t("profileSettings.saveChanges")}
                            </button>
                        </form>
                    </div>

                    {/* Additional Sections */}
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        {/* Skills */}
                        <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-semibold">{t('candidateProfile.skills')}:</h4>
                                <Button size="small" icon={<PlusOutlined />} onClick={() => setIsSkillModalOpen(true)}>
                                    {t("companyProfile.add")}
                                </Button>
                            </div>
                            <List
                                dataSource={skills}
                                renderItem={(skill) => (
                                    <List.Item actions={[
                                        <Popconfirm title={t("companyProfile.deleteSkillConfirm")} onConfirm={() => handleDeleteSkill(skill.id)}>
                                            <DeleteOutlined style={{ color: "red" }} />
                                        </Popconfirm>
                                    ]}>
                                        <Text strong>{skill?.name}</Text>
                                    </List.Item>
                                )}
                            />
                        </div>

                        {/* Services */}
                        <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-semibold">{t('candidateProfile.services')}:</h4>
                                <Button size="small" icon={<PlusOutlined />} onClick={() => setIsServiceModalOpen(true)}>
                                    {t("companyProfile.add")}
                                </Button>
                            </div>
                            <List
                                dataSource={services}
                                renderItem={(item) => (
                                    <List.Item actions={[
                                        <Popconfirm title={t("companyProfile.deleteServiceConfirm")} onConfirm={() => handleDeleteService(item?.service.id)}>
                                            <DeleteOutlined style={{ color: "red" }} />
                                        </Popconfirm>
                                    ]}>
                                        <Text strong>{item?.service?.name}</Text>
                                    </List.Item>
                                )}
                            />
                        </div>

                        {/* Languages */}
                        <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-xl font-semibold">{t('candidateProfile.languages')}:</h4>
                                <Button size="small" icon={<PlusOutlined />} onClick={openLanguageModal}>
                                    {t("companyProfile.add")}
                                </Button>
                            </div>
                            <List
                                dataSource={languages}
                                renderItem={(item) => (
                                    <List.Item actions={[
                                        <Popconfirm title={t("companyProfile.deleteLanguageConfirm")} onConfirm={() => handleDeleteLanguage(item.id)}>
                                            <DeleteOutlined style={{ color: "red" }} />
                                        </Popconfirm>
                                    ]}>
                                        <Space>
                                            <Text strong>{item?.language?.name}</Text>
                                            <Text type="secondary">({item?.level?.label})</Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>

                    {/* Modals */}
                    <Modal title={t('companyProfile.addSkill')} open={isSkillModalOpen} onCancel={() => setIsSkillModalOpen(false)} onOk={() => skillForm.submit()}>
                        <Form form={skillForm} layout="vertical" onFinish={handleAddSkill}>
                            <Form.Item name="name" label={t('companyProfile.skillName')} rules={[{ required: true }]}>
                                <Input placeholder={t('commonContent.insertData')} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal title={t('companyProfile.addService')} open={isServiceModalOpen} onCancel={() => setIsServiceModalOpen(false)} onOk={() => serviceForm.submit()}>
                        <Form form={serviceForm} layout="vertical" onFinish={handleAddService}>
                            <Form.Item name="name" label={t('companyProfile.serviceName')} rules={[{ required: true }]}>
                                <Input placeholder={t('commonContent.insertData')} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal title={t('companyProfile.addLanguage')} open={isLanguageModalOpen} onCancel={() => setIsLanguageModalOpen(false)} onOk={() => languageForm.submit()}>
                        <Form form={languageForm} layout="vertical" onFinish={handleAddLanguage}>
                            <Form.Item name="languageId" label={t('companyProfile.languageName')} rules={[{ required: true }]}>
                                <Select placeholder={t('commonContent.selectLanguage')}>
                                    {allLanguages.map(lang => <Select.Option key={lang.id} value={lang.id}>{lang.name}</Select.Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="levelId" label={t('companyProfile.levelName')} rules={[{ required: true }]}>
                                <Select placeholder={t('commonContent.selectLevel')}>
                                    {allLevels.map(lvl => <Select.Option key={lvl.id} value={lvl.id}>{lvl.label}</Select.Option>)}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </section>
        </ConfigProvider>
    );
}