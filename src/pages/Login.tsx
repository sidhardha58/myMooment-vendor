import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UseAuth";
import { sendPhoneOTP, verifyPhoneOTP, loginUser } from "../lib/authApi";
import api from "../lib/axios";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [mode, setMode] = useState<"login" | "register">("login");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");

  /* ---------------- LOGIN FLOW ---------------- */

  const handleLogin = async () => {
    try {
      const res = await loginUser(identifier, password);

      if (!res.success) {
        alert(res.message || "Login failed");
        return;
      }

      const token = res.data?.token;
      const userData = res.data?.user;

      if (!token || !userData) {
        alert("Invalid login response");
        return;
      }

      // ✅ Save token first (for interceptor)
      localStorage.setItem("vendor_token", token);
      localStorage.setItem("vendor_user", JSON.stringify(userData));

      // ✅ Fetch profile
      const profileRes = await api.get("/vendor/profile");

      console.log("FULL PROFILE RESPONSE:", profileRes.data);

      const vendorProfile = profileRes.data?.data?.vendor;

      if (!vendorProfile) {
        alert("Failed to fetch profile");
        return;
      }

      // ✅ Store ONLY vendor (clean structure)
      login(token, userData, vendorProfile);

      const vendorStatus = vendorProfile.vendor_operational_status;

      console.log("Vendor Status:", vendorStatus);

      switch (vendorStatus) {
        case "active":
        case "completed":
          navigate("/dashboard");
          break;

        case "onboarding_incomplete":
          navigate("/onboarding");
          break;

        case "verification_pending":
        case "pending":
          navigate("/submission-success");
          break;

        default:
          console.warn("Unknown vendor status:", vendorStatus);
          navigate("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  /* ---------------- OTP REGISTER FLOW ---------------- */

  const handleSendOTP = async () => {
    try {
      const res = await sendPhoneOTP(phone);

      if (!res.success) {
        alert(res.error);
        return;
      }

      setSessionId(res.data.sessionId);
      setStep("otp");

      console.log("OTP session:", res.data.sessionId);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const res = await verifyPhoneOTP(phone, otp, sessionId);

      if (!res.success) {
        alert("OTP verification failed");
        return;
      }

      const token = res.data.registerResult?.data?.token;
      const userData = res.data.registerResult?.data?.user;
      const isOldUser = res.data.registerResult?.data?.isOldUser;

      if (!token || !userData) {
        alert("Invalid response");
        return;
      }

      // ❌ NO PROFILE FROM BACKEND → CREATE TEMP PROFILE
      const tempProfile = {
        id: userData.id,
        user_id: userData.id,
        vendor_operational_status: isOldUser
          ? "active"
          : "onboarding_incomplete",
        display_name: "",
        full_name: "",
      };

      login(token, userData, tempProfile);

      // ✅ NAVIGATION FIX
      if (!isOldUser) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    }
  };

  return (
    <div>
      <h1>Vendor Auth</h1>

      {/* MODE SWITCH */}
      <div>
        <button onClick={() => setMode("login")}>Login</button>
        <button onClick={() => setMode("register")}>Register</button>
      </div>

      {/* LOGIN UI */}
      {mode === "login" && (
        <>
          <input
            placeholder="Phone or Email"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
        </>
      )}

      {/* REGISTER UI */}
      {mode === "register" && step === "phone" && (
        <>
          <input
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button onClick={handleSendOTP}>Send OTP</button>
        </>
      )}

      {mode === "register" && step === "otp" && (
        <>
          <input
            inputMode="numeric"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button onClick={handleVerifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default Login;
