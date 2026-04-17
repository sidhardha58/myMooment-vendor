import axiosInstance from "../../../lib/axios";

export const getVendorDocuments = async () => {
  const res = await axiosInstance.get("/vendor/documents");
  return res.data;
};