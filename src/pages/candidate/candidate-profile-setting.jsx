import { useFormik } from "formik";
import * as Yup from "yup";
import { useUser } from "../../context/UserContext";
import CandidatesAPI from "../../api/apiList/candidates";
import { FiEdit } from "react-icons/fi";
import UserIcon from "../../assets/icons/user.svg";
import { toast } from "react-toastify";

export default function CandidateProfileSetting() {
    const { user } = useUser();

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (err) => reject(err);
        });
    };

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
                .typeError("Salary must be a number")
                .min(0, "Salary must be positive"),
        }),
        onSubmit: async (values) => {
            const payload = {
                candidate: user?.data?.id,
            };

            if (values.name) payload.name = values.name;
            if (values.speciality) payload.speciality = values.speciality;
            if (values.summary) payload.summary = values.summary;
            if (values.salary_expectation) payload.salary_expectation = values.salary_expectation;
            if (values.cv) payload.cv = await fileToBase64(values.cv);
            if (values.avatar) payload.avatar = await fileToBase64(values.avatar);

            try {
                const response = await CandidatesAPI.updateProfile(user?.data?.id, payload);
                if (response.status === 204) {
                    toast.success("Profile updated successfully");
                }
            } catch (err) {
                console.error(err);
            }
        },
    });

    return (
        <section className="relative pb-16" style={{ marginTop: 200 }}>
            <div className="container">
                <div className="flex items-center mb-4">
                    <div style={{ position: "relative", width: "112px", height: "112px" }}>
                        <img
                            src={formik.values.avatar ? URL.createObjectURL(formik.values.avatar) : user?.data?.avatar_url ? user?.data?.avatar_url : UserIcon}
                            alt="avatar"
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                objectFit: "cover",
                                border: "4px solid #e2e8f0", // ring-slate-200
                            }}
                        />

                        {/* Hidden file input */}
                        <input
                            type="file"
                            accept="image/*"
                            id="avatar-upload"
                            style={{ display: "none" }}
                            onChange={(e) => formik.setFieldValue("avatar", e.currentTarget.files[0])}
                        />

                        {/* Pencil icon */}
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
                                opacity: 0, // default gizli
                                transition: "opacity 0.3s",
                                transform: "translate(-50%, -50%)",
                                zIndex: 999
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

                {/* FORM */}
                <div className="p-6 rounded-md shadow bg-white dark:bg-slate-900">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="font-medium">Candidate Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input border mt-2"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Speciality</label>
                                <input
                                    type="text"
                                    name="speciality"
                                    className="form-input border mt-2"
                                    value={formik.values.speciality}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Salary Expectation</label>
                                <input
                                    type="number"
                                    name="salary_expectation"
                                    className="form-input border mt-2"
                                    value={formik.values.salary_expectation}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div>
                                <label className="font-medium">Upload Resume (PDF)</label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="form-input border mt-2"
                                    onChange={(e) =>
                                        formik.setFieldValue("cv", e.currentTarget.files[0])
                                    }
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="font-medium">Summary</label>
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
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
