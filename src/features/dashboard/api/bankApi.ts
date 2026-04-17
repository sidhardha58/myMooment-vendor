import axiosInstance from "../../../lib/axios";

export const getVendorBankDetails = async () => {
  const res = await axiosInstance.get("/vendor/bank-details");
  return res.data.data;
};