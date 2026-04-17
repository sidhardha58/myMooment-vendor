import axiosInstance from "../../../lib/axios";

export const getVendorProfile = async () => {
  const res = await axiosInstance.get("/vendor/profile");
  console.log("RAW DOCS:", res);
  return res.data;
};