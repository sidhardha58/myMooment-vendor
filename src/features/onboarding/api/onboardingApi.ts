import api from "../../../lib/axios";
import type { OnboardingFormData } from "../OnboardingPage";

/* ================= OWNER / PERSONAL ================= */
export const registerPersonal = (data: Partial<OnboardingFormData>) => {
  return api.put("/vendor/register/personal", data);
};

/* ================= BUSINESS ================= */
export const registerBusiness = (data: FormData) => {
  return api.put("/vendor/register/business", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ================= IDENTITY ================= */
export const registerIdentity = (data: FormData) => {
  return api.put("/vendor/register/identity", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ================= BANK ================= */
export const registerBank = (data: FormData) => {
  return api.put("/vendor/register/bank", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ================= TERMS ================= */
export const registerTerms = (data: {
  terms_agreed: boolean;
  tds_authorized: boolean;
}) => {
  return api.put("/vendor/register/terms-tds", data);
};
