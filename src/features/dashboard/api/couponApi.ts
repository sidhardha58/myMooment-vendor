/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "../../../lib/axios";

// My coupons
export const getMyCoupons = async () => {
  const res = await axios.get("/vendor-coupons/mine");
  return res.data;
};

// Available (platform + default)
export const getAvailableCoupons = async () => {
  const res = await axios.get("/vendor-coupons/available");
  return res.data;
};

// Create
export const createCoupon = async (data: any) => {
  const res = await axios.post("/vendor-coupons", data);
  return res.data;
};

// Update
export const updateCoupon = async (id: string, data: any) => {
  const res = await axios.put(`/vendor-coupons/${id}`, data);
  return res.data;
};

// Activate / Pause
export const toggleCoupon = async (id: string, isActive: boolean) => {
  const res = await axios.put(`/vendor-coupons/${id}/activate`, {
    isActive,
  });
  return res.data;
};

// Delete
export const deleteCoupon = async (id: string) => {
  const res = await axios.delete(`/vendor-coupons/${id}`);
  return res.data;
};

