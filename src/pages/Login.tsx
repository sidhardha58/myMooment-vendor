import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/UseAuth";
import { sendPhoneOTP, verifyPhoneOTP, loginUser } from "../lib/authApi";
import { getVendorProfile } from "../lib/vendorApi";

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

      const vendorRes = await getVendorProfile(token);
      const vendorStatus = vendorRes?.data?.vendor?.vendor_operational_status;

      login(token, {
        ...userData,
        vendor_operational_status: vendorStatus,
      });

      if (vendorStatus === "onboarding_incomplete") {
        navigate("/onboarding");
      } else if (vendorStatus === "verification_pending") {
        navigate("/submission-success");
      } else if (vendorStatus === "active") {
        navigate("/dashboard");
      } else {
        alert("Vendor account inactive or blocked");
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

      if (!token || !userData) {
        alert("Invalid login response");
        return;
      }

      const vendorRes = await getVendorProfile(token);
      const vendorStatus = vendorRes?.data?.vendor?.vendor_operational_status;

      login(token, {
        ...userData,
        vendor_operational_status: vendorStatus,
      });

      if (vendorStatus === "onboarding_incomplete") {
        navigate("/onboarding");
      } else if (vendorStatus === "verification_pending") {
        navigate("/submission-success");
      } else if (vendorStatus === "active") {
        navigate("/dashboard");
      } else {
        alert("Vendor account inactive or blocked");
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

      {/* ---------------- LOGIN UI ---------------- */}

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

      {/* ---------------- REGISTER UI ---------------- */}

      {mode === "register" && step === "phone" && (
        <>
          <input
            placeholder="Enter phone number (+919876543210)"
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
