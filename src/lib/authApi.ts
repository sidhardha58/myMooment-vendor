import api from "./axios";

/* ---------------- OTP REGISTRATION ---------------- */

export const sendPhoneOTP = async (phone: string) => {
  const res = await api.post("/vendor-auth/send-phone-otp", {
    phone_number: phone,
    purpose: "signup",
  });

  return res.data;
};

export const verifyPhoneOTP = async (
  phone: string,
  code: string,
  sessionId: string,
) => {
  const res = await api.post("/vendor-auth/verify-phone-otp", {
    phone_number: phone,
    code: code,
    session_id: sessionId,
    purpose: "signup",
  });
  console.log(res.data);
  return res.data;
};

/* ---------------- PASSWORD LOGIN ---------------- */

export const loginUser = async (identifier: string, password: string) => {
  const res = await api.post(
    "/auth/login-with-session",
    {
      phone_number: identifier,
      password: password,
    },

    {
      withCredentials: true, // 🔥 VERY IMPORTANT
    },
  );

  return res.data;
};
