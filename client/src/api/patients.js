import axiosInstance from "@/utils/axiosInstance";
import { headers } from "@/utils/constants";

export const registerPatient = async ({ formData, accessToken }) => {
  return await axiosInstance.post(
    "/patients/register",
    formData,
    headers(accessToken)
  );
};

export const getPatient = async (accessToken) => {
  return await axiosInstance.get("/patients/me", headers(accessToken));
};

export const updatePatient = async ({ patientId, formData, accessToken }) => {
  return await axiosInstance.patch(
    `/patients/${patientId}/update`,
    formData,
    headers(accessToken)
  );
};