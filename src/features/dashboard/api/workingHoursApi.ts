import axiosInstance from "../../../lib/axios";

export const updateWorkingDay = async (day: string, data: unknown) => {
  const res = await axiosInstance.put(
    `/vendor/working-hours/day/${day}`,
    data
  );
  return res.data;
};

export const updateEmergencyStop = async (data: {
  enabled: boolean;
  reason: string;
}) => {
  const res = await axiosInstance.put(
    "/vendor/working-hours/close-temporarily",
    data
  );
  return res.data;
};