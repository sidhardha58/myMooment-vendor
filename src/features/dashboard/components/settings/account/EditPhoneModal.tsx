import { useState } from "react";
import { X } from "lucide-react";
import { sendOTP, verifyOTP } from "../../../../../lib/firebasePhoneAuth";
import { useSettings } from "../../../hooks/useSettings";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const EditPhoneModal = ({ isOpen, onClose }: Props) => {
  const { updatePhone, loading } = useSettings();

  const [step, setStep] = useState<"phone" | "otp">("phone");

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  if (!isOpen) return null;

  /* ================= SEND OTP ================= */
  const handleSendOTP = async () => {
    if (!phone) {
      toast.error("Enter phone number");
      return;
    }

    try {
      setSending(true);

      await sendOTP(`+91${phone}`);

      toast.success("OTP sent successfully");

      setStep("otp");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  /* ================= VERIFY OTP ================= */
  const handleVerifyOTP = async () => {
    if (!otp) {
      toast.error("Enter OTP");
      return;
    }

    try {
      setVerifying(true);

      const token = await verifyOTP(otp);

      await updatePhone(token);

      toast.success("Phone number updated successfully");

      // reset
      setPhone("");
      setOtp("");
      setStep("phone");

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Invalid OTP or update failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Edit Phone Number
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {step === "phone"
                ? "Enter your new phone number"
                : "Enter OTP sent to your phone"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* STEP 1: PHONE INPUT */}
        {step === "phone" && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                PHONE NUMBER
              </p>

              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full rounded-xl bg-gray-100/70 px-4 py-2.5 text-sm
                focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleSendOTP}
                disabled={sending}
                className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: OTP */}
        {step === "otp" && (
          <div className="space-y-5">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                ENTER OTP
              </p>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full rounded-xl bg-gray-100/70 px-4 py-2.5 text-sm
                focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep("phone")}
                className="text-sm text-gray-500 hover:underline"
              >
                Change number
              </button>

              <button
                onClick={handleSendOTP}
                className="text-sm text-blue-600 hover:underline"
              >
                Resend OTP
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setStep("phone")}
                className="px-4 py-2 text-sm text-gray-600"
              >
                Back
              </button>

              <button
                onClick={handleVerifyOTP}
                disabled={verifying || loading}
                className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {verifying || loading ? "Verifying..." : "Verify & Update"}
              </button>
            </div>
          </div>
        )}

        {/* 🔥 REQUIRED for Firebase */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default EditPhoneModal;
