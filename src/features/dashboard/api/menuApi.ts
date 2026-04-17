import axiosInstance from "../../../lib/axios";

export const createVendorItem = async (formData: FormData) => {
  const res = await axiosInstance.post("/vendor-items", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const addFoodCategory = async (itemId: string, data: unknown) => {
  const res = await axiosInstance.post(
    `/vendor-items/${itemId}/food-category`,
    data
  );
  return res.data;
};

export const addMenuItem = async (
  itemId: string,
  categoryId: string,
  formData: FormData
) => {
  const res = await axiosInstance.put(
    `/vendor-items/${itemId}/${categoryId}/menu-item`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return res.data;
};