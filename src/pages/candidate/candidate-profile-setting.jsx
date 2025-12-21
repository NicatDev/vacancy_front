import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../context/UserContext";
import CandidatesAPI from "../../api/apiList/candidates";
import SkillsAPI from "../../api/apiList/skills";
import ServicesAPI from "../../api/apiList/services";
import LanguagesAPI from "../../api/apiList/languages";
import { FiEdit } from "react-icons/fi";
import UserIcon from "../../assets/icons/user.svg";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Button, Form, List, Popconfirm, Space, Typography, Modal, Input, ConfigProvider, theme, Select } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

const { Text } = Typography;

export default function CandidateProfileSetting() {
    const { user, refreshUser, isDarkMode } = useUser();
    const { t } = useTranslation();

    const [avatarUrl, setAvatarUrl] = useState(UserIcon);
    const [skills, setSkills] = useState([]);
    const [services, setServices] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    const [allLanguages, setAllLanguages] = useState([]);
    const [allLevels, setAllLevels] = useState([]);
    const [skillForm] = Form.useForm();
    const [serviceForm] = Form.useForm();
    const [languageForm] = Form.useForm();

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
            if (values.cv) payload.cv = await fileToBase64(values.cv);
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

    // Skills API
    const getSkills = async () => {
        try {
            if (!user) return;
            const response = await CandidatesAPI.getSingleCandidateSkills(user?.data?.id);
            setSkills(response.status === 200 ? response.data?.data : []);
        } catch {
            setSkills([]);
        }
    };

    const handleAddSkill = async (values) => {
        try {
            await SkillsAPI.addCandidateSkill(user?.data?.id, { name: values.name });
            toast.success(t("toastMessages.skillAdded"));
            setIsSkillModalOpen(false);
            skillForm.resetFields();
            getSkills();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteSkill = async (skillId) => {
        try {
            await SkillsAPI.deleteCandidateSkill(user?.data?.id, skillId);
            toast.success(t("toastMessages.skillDeleted"));
            getSkills();
        } catch (err) {
            console.error(err);
        }
    };
    const handleAddService = async (values) => {
        try {
            await ServicesAPI.addCandidateService(user?.data?.id, { service_name: values.name });
            toast.success(t("toastMessages.serviceAdded"));
            setIsServiceModalOpen(false);
            serviceForm.resetFields();
            getServices();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteService = async (serviceId) => {
        try {
            await ServicesAPI.deleteCandidateService(user?.data?.id, serviceId);
            toast.success(t("toastMessages.serviceDeleted"));
            getServices();
        } catch (err) {
            console.error(err);
        }
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
        } catch (err) {
        }
    };

    const handleAddLanguage = async (values) => {
        try {
            await LanguagesAPI.addCandidatLanguage(user?.data?.id, {
                language_name: [...allLanguages]?.find(lang => lang?.id == values.languageId)?.name,
                level_id: values.levelId
            });
            toast.success(t("toastMessages.languageAdded"));
            setIsLanguageModalOpen(false);
            languageForm.resetFields();
            getLanguages();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteLanguage = async (langId) => {
        try {
            await LanguagesAPI.deleteCandidateLanguage(user?.data?.id, langId);
            toast.success(t("toastMessages.languageDeleted"));
            getLanguages();
        } catch (err) {
            console.error(err);
        }
    };

    // Services & Languages
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

    useEffect(() => {
        if (user?.data?.avatar) {
            axios
                .get(user.data.avatar, { responseType: "blob", withCredentials: true })
                .then((res) => setAvatarUrl(URL.createObjectURL(res.data)))
                .catch(() => setAvatarUrl(UserIcon));
        }
    }, [user?.data?.avatar]);

    useEffect(() => {
        getSkills();
        getServices();
        getLanguages();
    }, [user]);

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
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    objectFit: "cover",
                                    border: "4px solid #e2e8f0",
                                }}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                id="avatar-upload"
                                style={{ display: "none" }}
                                onChange={(e) => formik.setFieldValue("avatar", e.currentTarget.files[0])}
                            />
                            <label
                                htmlFor="avatar-upload"
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    backgroundColor: "#fff",
                                    padding: "4px",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 999,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                            >
                                <FiEdit style={{ width: "16px", height: "16px", color: "#374151" }} />
                            </label>
                        </div>
                        <div className="ms-4">
                            <h5 className="text-lg font-semibold">{formik.values.name}</h5>
                            <p className="text-slate-400">{formik.values.speciality}</p>
                        </div>
                    </div>

                    {/* Profile form */}
                    <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="font-medium">{t("profileSettings.candidateName")}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-input border mt-2"
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">{t("profileSettings.speciality")}</label>
                                    <input
                                        type="text"
                                        name="speciality"
                                        className="form-input border mt-2"
                                        value={formik.values.speciality}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">{t("profileSettings.salaryExpectation")}</label>
                                    <input
                                        type="number"
                                        name="salary_expectation"
                                        className="form-input border mt-2"
                                        value={formik.values.salary_expectation}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                                <div>
                                    <label className="font-medium">{t("profileSettings.uploadResume")}</label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        className="form-input border mt-2"
                                        onChange={(e) => formik.setFieldValue("cv", e.currentTarget.files[0])}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="font-medium">{t("profileSettings.summary")}</label>
                                <textarea
                                    name="summary"
                                    className="form-input border mt-2 textarea"
                                    value={formik.values.summary}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            <button
                                type="submit"
                                className="mt-5 px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                            >
                                {t("profileSettings.saveChanges")}
                            </button>
                        </form>
                    </div>

                    {/* Skills section */}
                    <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900 mt-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold">{t('candidateProfile.skills')}:</h4>
                            <Button size="small" icon={<PlusOutlined />} onClick={() => setIsSkillModalOpen(true)}>
                                {t("companyProfile.add")}
                            </Button>
                        </div>

                        <List
                            dataSource={skills}
                            locale={{ emptyText: t("companyProfile.noSkill") }}
                            renderItem={(skill) => (
                                <List.Item
                                    actions={[
                                        <Popconfirm
                                            title={t("companyProfile.deleteSkillConfirm")}
                                            onConfirm={() => handleDeleteSkill(skill.id)}
                                            okText={t('companyProfile.add')}
                                            cancelText={t('companyProfile.cancel')}
                                        >
                                            <DeleteOutlined style={{ color: "red" }} />
                                        </Popconfirm>,
                                    ]}
                                >
                                    <Space>
                                        <Text strong>{skill?.name}</Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                    </div>


                    {/* Services section */}
                    <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900 mt-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold">{t('candidateProfile.services')}:</h4>
                            <Button size="small" icon={<PlusOutlined />} onClick={() => setIsServiceModalOpen(true)}>
                                {t("companyProfile.add")}
                            </Button>
                        </div>

                        <List
                            dataSource={services}
                            locale={{ emptyText: t("companyProfile.noService") || "No services found" }}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Popconfirm
                                            title={t("companyProfile.deleteServiceConfirm") || "Are you sure?"}
                                            onConfirm={() => handleDeleteService(item?.service.id)}
                                            okText={t('companyProfile.add')}
                                            cancelText={t('companyProfile.cancel')}
                                        >
                                            <DeleteOutlined style={{ color: "red" }} />
                                        </Popconfirm>,
                                    ]}
                                >
                                    <Space>
                                        {/* API-dən gələn formata uyğun olaraq item.name və ya item.service.name */}
                                        <Text strong>{item?.service?.name}</Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                    </div>


                    <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900 mt-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-xl font-semibold">{t('candidateProfile.languages')}:</h4>
                            <Button size="small" icon={<PlusOutlined />} onClick={openLanguageModal}>
                                {t("companyProfile.add")}
                            </Button>
                        </div>

                        <List
                            dataSource={languages}
                            locale={{ emptyText: t("companyProfile.noLanguage") || "No languages found" }}
                            renderItem={(item) => (
                                <List.Item
                                    actions={[
                                        <Popconfirm
                                            title={t("companyProfile.deleteLanguageConfirm")}
                                            onConfirm={() => handleDeleteLanguage(item.id)}
                                            okText={t('companyProfile.add')}
                                            cancelText={t('companyProfile.cancel')}
                                        >
                                            <DeleteOutlined style={{ color: "red" }} />
                                        </Popconfirm>,
                                    ]}
                                >
                                    <Space>
                                        <Text strong>{item?.language?.name}</Text>
                                        <Text type="secondary">({item?.level?.label})</Text>
                                    </Space>
                                </List.Item>
                            )}
                        />
                    </div>

                    <Modal
                        title={t('companyProfile.addSkill')}
                        open={isSkillModalOpen}
                        onCancel={() => setIsSkillModalOpen(false)}
                        okText={t('companyProfile.add')}
                        cancelText={t('companyProfile.cancel')}
                        onOk={() => skillForm.submit()}
                    >
                        <Form form={skillForm} layout="vertical" onFinish={handleAddSkill}>
                            <Form.Item
                                name="name"
                                label={t('companyProfile.skillName')}
                                rules={[{ required: true, message: t('errorSkillField') }]}
                            >
                                <Input placeholder={t('commonContent.insertData')} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        title={t('companyProfile.addService') || "Add Service"}
                        open={isServiceModalOpen}
                        onCancel={() => setIsServiceModalOpen(false)}
                        okText={t('companyProfile.add')}
                        cancelText={t('companyProfile.cancel')}
                        onOk={() => serviceForm.submit()}
                    >
                        <Form form={serviceForm} layout="vertical" onFinish={handleAddService}>
                            <Form.Item
                                name="name"
                                label={t('companyProfile.serviceName') || "Service Name"}
                                rules={[{ required: true, message: t('errorServiceField') || "Please input service name" }]}
                            >
                                <Input placeholder={t('commonContent.insertData')} />
                            </Form.Item>
                        </Form>
                    </Modal>

                    <Modal
                        title={t('companyProfile.addLanguage')}
                        open={isLanguageModalOpen}
                        onCancel={() => setIsLanguageModalOpen(false)}
                        onOk={() => languageForm.submit()}
                    >
                        <Form form={languageForm} layout="vertical" onFinish={handleAddLanguage}>
                            <Form.Item
                                name="languageId"
                                label={t('companyProfile.languageName')}
                                rules={[{ required: true, message: t('errorField') }]}
                            >
                                <Select placeholder={t('commonContent.selectLanguage')}>
                                    {allLanguages.map(lang => (
                                        <Select.Option key={lang.id} value={lang.id}>{lang.name}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="levelId"
                                label={t('companyProfile.levelName')}
                                rules={[{ required: true, message: t('errorField') }]}
                            >
                                <Select placeholder={t('commonContent.selectLevel')}>
                                    {allLevels.map(lvl => (
                                        <Select.Option key={lvl.id} value={lvl.id}>{lvl.label}</Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </section>
        </ConfigProvider>
    );
}