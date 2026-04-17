import axios from "axios";
import type { VendorTicket } from "../types/ticket.types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API = `${BASE_URL}/vendor-tickets`;

// ✅ GET tickets
export const getTickets = async (status?: string): Promise<VendorTicket[]> => {
  const token = localStorage.getItem("vendor_token");

  const res = await axios.get(API, {
    params: status ? { status } : {},
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

// ✅ CREATE ticket
export const createTicket = async (formData: FormData) => {
  const token = localStorage.getItem("vendor_token");

  // ❗ REMOVE EMPTY booking_id
  if (!formData.get("booking_id")) {
    formData.delete("booking_id");
  }

  const res = await axios.post(API, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
