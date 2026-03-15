import axiosInstance from "./axios";

export const getVendorProfile = async (token: string) => {
  const res = await axiosInstance.get("/vendor/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
