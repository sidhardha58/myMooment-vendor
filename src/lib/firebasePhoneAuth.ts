import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let confirmationResult: any = null;
let recaptchaVerifier: RecaptchaVerifier | null = null;

export const setupRecaptcha = () => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear(); // ✅ prevent duplicate
  }

  recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "invisible",
  });

  return recaptchaVerifier;
};

export const sendOTP = async (phone: string) => {
  const recaptcha = setupRecaptcha();
  confirmationResult = await signInWithPhoneNumber(auth, phone, recaptcha);
};

export const verifyOTP = async (otp: string) => {
  if (!confirmationResult) throw new Error("OTP not sent");

  const result = await confirmationResult.confirm(otp);
  const token = await result.user.getIdToken();

  return token; // 🔥 THIS goes to backend
};