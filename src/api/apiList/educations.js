import axiosClient from "../axiosClient";

const EducationsApi = {
    getEducationLevels: () => {
        return axiosClient.get("/education-levels");
    },
};

export default EducationsApi;