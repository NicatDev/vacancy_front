import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  List,
  Button,
  Tag,
  Spin,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
} from "antd";
import {
  GlobalOutlined,
  PhoneOutlined,
  LinkOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  TeamOutlined,
  MailOutlined,
  UserOutlined,
  EnvironmentOutlined,
  IdcardOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import AuthAPI from "../api/AuthAPI";
import CompanySVG from "../assets/icons/company.svg";
import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export default function CompanyProfile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [company, setCompany] = useState(null);
  const [links, setLinks] = useState([]);
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [vacancies, setVacancies] = useState([]);
  const [loadingVacancies, setLoadingVacancies] = useState(true);
  const [editingPhone, setEditingPhone] = useState(null);
  const [editingLink, setEditingLink] = useState(null);

  const [phoneForm] = Form.useForm();
  const [linkForm] = Form.useForm();

  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [companyForm] = Form.useForm();
  const [logoBase64, setLogoBase64] = useState(null);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const openEditCompany = () => {
    companyForm.setFieldsValue({
      name: company.name,
      website: company.website,
      voen: company.voen,
      location: company.location,
      summary: company.summary,
      employees_count: company.employees_count,
      founded_at: company.founded_at,
    });
    setLogoBase64(null);
    setCompanyModalOpen(true);
  };

  const submitCompany = async () => {
    const values = await companyForm.validateFields();

    const payload = { ...values };

    // logo yalnız dəyişibsə göndər
    if (logoBase64) {
      payload.logo = logoBase64;
    }

    Object.keys(payload).forEach(
      (k) => payload[k] === undefined && delete payload[k]
    );

    await AuthAPI.updateProfileCompany(company.id, payload);
    message.success("Company updated successfully");
    setCompanyModalOpen(false);
    fetchAll();
  };

  const handleLogoChange = async (file) => {
    const base64 = await toBase64(file);
    setLogoBase64(base64);
    return false; // uploadu bloklayır
  };

  const fetchVacancies = async () => {
    if (!company) return;
    try {
      setLoadingVacancies(true);
      const res = await AuthAPI.getCompanyVacancies(company.id);
      setVacancies(res?.data?.data || []);
    } catch (e) {
      setVacancies([]);
    } finally {
      setLoadingVacancies(false);
    }
  };

  const fetchAll = async () => {
    try {
      setLoading(true);
      const profileRes = await AuthAPI.getCompanyProfile();
      const companyData = profileRes?.data?.data;

      setCompany(companyData);

      const [phonesRes, linksRes] = await Promise.all([
        AuthAPI.getPhoneNumbersForCompany(companyData.id),
        AuthAPI.getExternalForCompany(companyData.id),
      ]);

      setPhones(phonesRes?.data?.data || []);
      setLinks(linksRes?.data?.data || []);
    } catch (e) {
      setCompany(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  useEffect(() => {
    fetchVacancies();
  }, [company]);

  /* ================= PHONE ================= */

  const openAddPhone = () => {
    setEditingPhone(null);
    phoneForm.resetFields();
    setPhoneModalOpen(true);
  };

  const openEditPhone = (phone) => {
    setEditingPhone(phone);
    phoneForm.setFieldsValue(phone);
    setPhoneModalOpen(true);
  };

  const submitPhone = async () => {
    const values = await phoneForm.validateFields();

    if (editingPhone) {
      await AuthAPI.updatePhoneNumberForCompany(
        company.id,
        editingPhone.id,
        values
      ).then(() => {
        fetchAll();
      });
      message.success("Phone updated");
    } else {
      await AuthAPI.createPhoneNumberForCompany(company.id, values).then(() => {
        fetchAll();
      });
      message.success("Phone added");
    }

    setPhoneModalOpen(false);
  };

  const deletePhone = async (id) => {
    await AuthAPI.deletePhoneNumberForCompany(company.id, id).then(() => {
      fetchAll();
    });
    message.success("Phone deleted");
  };

  /* ================= LINKS ================= */

  const openAddLink = () => {
    setEditingLink(null);
    linkForm.resetFields();
    setLinkModalOpen(true);
  };

  const openEditLink = (link) => {
    setEditingLink(link);
    linkForm.setFieldsValue(link);
    setLinkModalOpen(true);
  };

  const submitLink = async () => {
    const values = await linkForm.validateFields();

    if (editingLink) {
      await AuthAPI.updateExternalForCompany(
        company.id,
        editingLink.id,
        values
      ).then(() => {
        fetchAll();
      });
      message.success("Link updated");
    } else {
      await AuthAPI.createExternalForCompany(company.id, values).then(() => {
        fetchAll();
      });
      message.success("Link added");
    }

    setLinkModalOpen(false);
  };

  const deleteLink = async (id) => {
    await AuthAPI.deleteExternalForCompany(company.id, id).then(() => {
      fetchAll();
    });

    message.success("Link deleted");
  };

  useEffect(() => {
    if (!user || localStorage.getItem('email_verified_at') == "false") {
      navigate('/login');
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center py-20" style={{ marginTop: "180px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!company) {
    return <Text type="danger">Company profile not found</Text>;
  }

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "80px auto" }}>
      <Row gutter={[24, 24]}>
        {/* LEFT */}
        <Col xs={24} md={8}>
          <Card bordered>
            <Space
              direction="vertical"
              size="middle"
              style={{ lineHeight: 1.6 }}
            >
              {/* Logo + Company Name + Edit */}
              <Space
                direction="vertical"
                size="small"
                style={{ width: "100%" }}
              >
                <img
                  src={company.logo || CompanySVG}
                  alt="logo"
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: "contain",
                    borderRadius: 8,
                  }}
                />

                <Space align="center" size="middle">
                  <Title level={4} style={{ margin: 0 }}>
                    {company.name}
                  </Title>
                  <EditOutlined
                    style={{ cursor: "pointer", fontSize: 18 }}
                    onClick={openEditCompany}
                  />
                </Space>
              </Space>

              {/* Summary (icon yoxdur) */}
              {company.summary && (
                <Text>
                  <Text strong>{t("companyProfile.summary")}: </Text>
                  {company.summary}
                </Text>
              )}

              {/* VOEN */}
              {company.voen && (
                <Text>
                  <IdcardOutlined style={{ marginRight: 4 }} />
                  {t("companyProfile.voen")}: {company.voen}
                </Text>
              )}

              {/* Location */}
              {company.location && (
                <Text>
                  <EnvironmentOutlined style={{ marginRight: 4 }} />
                  {t("companyProfile.location")}: {company.location}
                </Text>
              )}

              {/* Employees count */}
              {company.employees_count !== null && (
                <Text>
                  <UserOutlined style={{ marginRight: 4 }} />
                  {company.employees_count} {t("companyProfile.employees")}
                </Text>
              )}

              {/* Email */}
              {company.user?.email && (
                <Text>
                  <MailOutlined style={{ marginRight: 4 }} />
                  {t("companyProfile.email")}: {company.user.email}
                </Text>
              )}

              {/* Website */}
              {company.website && (
                <Text>
                  <GlobalOutlined style={{ marginRight: 4 }} />
                  <a href={company.website} target="_blank" rel="noreferrer">
                    {company.website}
                  </a>
                </Text>
              )}

              {/* Vacancies */}
              <Tag color="blue">
                <TeamOutlined style={{ marginRight: 4 }} />
                {t("companyProfile.vacancies")}: {company.job_post_count}
              </Tag>
            </Space>
          </Card>
        </Col>

        {/* RIGHT */}
        <Col xs={24} md={16}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* PHONES */}
            <Card
              title={
                <Space>
                  <PhoneOutlined /> {t("companyProfile.phoneNumbers")}
                </Space>
              }
              extra={
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={openAddPhone}
                >
                  {t("companyProfile.add")}
                </Button>
              }
            >
              <List
                dataSource={phones}
                locale={{ emptyText: t("companyProfile.noPhone") }}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <EditOutlined onClick={() => openEditPhone(item)} />,
                      <Popconfirm
                        title={t("companyProfile.deletePhoneConfirm")}
                        onConfirm={() => deletePhone(item.id)}
                      >
                        <DeleteOutlined style={{ color: "red" }} />
                      </Popconfirm>,
                    ]}
                  >
                    <Space>
                      <Text strong>{item.label}</Text>
                      <Text>{item.number}</Text>
                    </Space>
                  </List.Item>
                )}
              />
            </Card>

            {/* LINKS */}
            <Card
              title={
                <Space>
                  <LinkOutlined /> {t("companyProfile.externalLinks")}
                </Space>
              }
              extra={
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={openAddLink}
                >
                  {t("companyProfile.add")}
                </Button>
              }
            >
              <List
                dataSource={links}
                locale={{ emptyText: t("companyProfile.noLink") }}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <EditOutlined onClick={() => openEditLink(item)} />,
                      <Popconfirm
                        title={t("companyProfile.deleteLinkConfirm")}
                        onConfirm={() => deleteLink(item.id)}
                      >
                        <DeleteOutlined style={{ color: "red" }} />
                      </Popconfirm>,
                    ]}
                  >
                    <a href={item.url} target="_blank" rel="noreferrer">
                      {item.label || item.url}
                    </a>
                  </List.Item>
                )}
              />
            </Card>

            <Card
              title={<Text strong>{t("companyProfile.vacancy")}</Text>}
              style={{ marginTop: 24 }}
            >
              {loadingVacancies ? (
                <Spin size="small" />
              ) : vacancies.length === 0 ? (
                <Text>{t("companyProfile.noVacancies")}</Text>
              ) : (
                <List
                  dataSource={vacancies}
                  grid={{ gutter: 16, column: 1 }}
                  renderItem={(item) => {
                    const isActive = item.status === "active";
                    return (
                      <List.Item>
                        <Card
                          bordered
                          hoverable
                          style={{ width: "100%", borderRadius: 12 }}
                          bodyStyle={{ padding: 16 }}
                        >
                          {/* Title */}
                          <Row
                            align="middle"
                            justify="space-between"
                            style={{ marginBottom: 16 }}
                          >
                            <Col>
                              <Title level={5} style={{ margin: 0 }}>
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    backgroundColor: isActive ? "green" : "red",
                                    marginRight: 8,
                                  }}
                                />
                                {item.title}
                              </Title>
                            </Col>
                            <Col>
                              <Tag color={isActive ? "green" : "red"}>
                                {isActive
                                  ? t("companyProfile.active")
                                  : t("companyProfile.inactive")}
                              </Tag>
                            </Col>
                          </Row>

                          {/* Fields Grid */}
                          <Row gutter={[16, 16]}>
                            {item.location && (
                              <Col xs={24} sm={12} md={8}>
                                <Space direction="vertical">
                                  <Text strong>
                                    <EnvironmentOutlined
                                      style={{ marginRight: 4 }}
                                    />
                                    {t("companyProfile.location")}
                                  </Text>
                                  <Text>{item.location}</Text>
                                </Space>
                              </Col>
                            )}

                            {item.employment_type?.name && (
                              <Col xs={24} sm={12} md={8}>
                                <Space direction="vertical">
                                  <Text strong>
                                    <UserOutlined style={{ marginRight: 4 }} />
                                    {t("companyProfile.employmentType")}
                                  </Text>
                                  <Text>{item.employment_type.name}</Text>
                                </Space>
                              </Col>
                            )}

                            {item.published_at?.as_date && (
                              <Col xs={24} sm={12} md={8}>
                                <Space direction="vertical">
                                  <Text strong>
                                    <CalendarOutlined
                                      style={{ marginRight: 4 }}
                                    />
                                    {t("companyProfile.publishedAt")}
                                  </Text>
                                  <Text>
                                    {new Date(
                                      item.published_at.as_date
                                    ).toLocaleDateString()}
                                  </Text>
                                </Space>
                              </Col>
                            )}

                            {item.expired_at?.as_date && (
                              <Col xs={24} sm={12} md={8}>
                                <Space direction="vertical">
                                  <Text strong>
                                    <ClockCircleOutlined
                                      style={{ marginRight: 4 }}
                                    />
                                    {t("companyProfile.expiresAt")}
                                  </Text>
                                  <Text>
                                    {new Date(
                                      item.expired_at.as_date
                                    ).toLocaleDateString()}
                                  </Text>
                                </Space>
                              </Col>
                            )}

                            <Col xs={24} sm={12} md={8}>
                              <Space direction="vertical">
                                <Text strong>
                                  <InfoCircleOutlined
                                    style={{
                                      color: isActive ? "green" : "red",
                                      marginRight: 4,
                                    }}
                                  />
                                  {t("companyProfile.status")}
                                </Text>
                                <Text>
                                  {isActive
                                    ? t("companyProfile.active")
                                    : t("companyProfile.inactive")}
                                </Text>
                              </Space>
                            </Col>
                          </Row>
                        </Card>
                      </List.Item>
                    );
                  }}
                />
              )}
            </Card>
          </Space>
        </Col>
      </Row>

      {/* PHONE MODAL */}
      <Modal
        open={phoneModalOpen}
        title={
          editingPhone
            ? t("companyProfile.editPhone")
            : t("companyProfile.addPhone")
        }
        onOk={submitPhone}
        onCancel={() => setPhoneModalOpen(false)}
      >
        <Form form={phoneForm} layout="vertical">
          <Form.Item name="label" label={t("companyProfile.label")}>
            <Input />
          </Form.Item>
          <Form.Item
            name="number"
            label={t("companyProfile.phone")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* LINK MODAL */}
      <Modal
        open={linkModalOpen}
        title={
          editingLink
            ? t("companyProfile.editLink")
            : t("companyProfile.addLink")
        }
        onOk={submitLink}
        onCancel={() => setLinkModalOpen(false)}
      >
        <Form form={linkForm} layout="vertical">
          <Form.Item name="label" label={t("companyProfile.label")}>
            <Input />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[{ required: true, type: "url" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={companyModalOpen}
        title={t("companyProfile.editCompany")}
        onOk={submitCompany}
        onCancel={() => setCompanyModalOpen(false)}
        okText="Update"
        style={{ height: "400px", overflowY: "scroll" }}
      >
        <Form form={companyForm} layout="vertical">
          <Form.Item
            name="name"
            label={t("companyProfile.companyName")}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="website" label={t("companyProfile.website")}>
            <Input />
          </Form.Item>

          <Form.Item name="voen" label={t("companyProfile.voen")}>
            <Input />
          </Form.Item>

          <Form.Item name="location" label={t("companyProfile.location")}>
            <Input />
          </Form.Item>

          <Form.Item
            name="employees_count"
            label={t("companyProfile.employeesCount")}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item name="founded_at" label={t("companyProfile.foundedAt")}>
            <Input type="date" />
          </Form.Item>

          <Form.Item name="summary" label={t("companyProfile.summary")}>
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label={t("companyProfile.logo")}>
            <Input
              type="file"
              accept="image/png"
              onChange={(e) => handleLogoChange(e.target.files[0])}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
