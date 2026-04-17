import axiosInstance from "../../../lib/axios";

export const getLeaves = async () => {
  const res = await axiosInstance.get("/vendor/leaves");
  return res.data;
};

export const addLeave = async (date: string) => {
  const res = await axiosInstance.post("/vendor/leaves", { date });
  return res.data;
};

export const deleteLeave = async (date: string) => {
  const res = await axiosInstance.delete("/vendor/leaves", {
    data: { date },
  });
  return res.data;
};