import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useSettings } from "../../../hooks/useSettings";
import toast from "react-hot-toast"; // ✅ added

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const { changePassword, loading } = useSettings();

  const [step, setStep] = useState<"verify" | "change">("verify");

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const resetState = () => {
    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setStep("verify");
  };

  if (!isOpen) return null;

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ STEP 1 → VERIFY
  const handleVerify = () => {
    if (!form.currentPassword.trim()) {
      toast.error("Please enter your current password"); // ✅ replaced
      return;
    }

    setStep("change");
  };

  // ✅ FINAL SUBMIT
  const handleSubmit = async () => {
    if (!form.newPassword || !form.confirmPassword) {
      toast.error("Please fill all fields"); // ✅ replaced
      return;
    }

    if (form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters"); // ✅ replaced
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match"); // ✅ replaced
      return;
    }

    try {
      const res = await changePassword(form.currentPassword, form.newPassword);

      toast.success(res?.message || "Password updated successfully"); // ✅ replaced

      resetState();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);

      if (err?.error_code === "INCORRECT_OLD_PASSWORD") {
        toast.error("Incorrect current password"); // ✅ replaced
      } else if (err?.error_code === "PASSWORD_NOT_SET") {
        toast.error("Password not set. Please reset first."); // ✅ replaced
      } else if (err?.error_code === "VENDOR_NOT_FOUND") {
        toast.error("Vendor not found"); // ✅ replaced
      } else {
        toast.error(err?.error || "Something went wrong"); // ✅ replaced
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={() => {
          resetState();
          onClose();
        }}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Change Password
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {step === "verify"
                ? "Verify your current password to continue."
                : "Enter your new password below."}
            </p>
          </div>

          <button
            onClick={() => {
              resetState();
              onClose();
            }}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* STEP 1 */}
        {step === "verify" && (
          <div className="space-y-5">
            <p className="text-sm text-gray-500">
              For your security, please verify your identity by entering your
              current password.
            </p>

            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                CURRENT PASSWORD
              </p>

              <div className="relative">
                <input
                  type={show.current ? "text" : "password"}
                  value={form.currentPassword}
                  onChange={(e) =>
                    handleChange("currentPassword", e.target.value)
                  }
                  placeholder="Enter current password"
                  className="w-full rounded-xl bg-gray-100/70 px-4 py-2.5 text-sm
                  focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {show.current ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  resetState();
                  onClose();
                }}
                className="px-4 py-2 text-sm text-gray-600"
              >
                Cancel
              </button>

              <button
                onClick={handleVerify}
                className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === "change" && (
          <div className="space-y-5">
            {/* NEW PASSWORD */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                NEW PASSWORD
              </p>

              <div className="relative">
                <input
                  type={show.new ? "text" : "password"}
                  value={form.newPassword}
                  onChange={(e) => handleChange("newPassword", e.target.value)}
                  placeholder="Enter new password"
                  className="w-full rounded-xl bg-gray-100/70 px-4 py-2.5 text-sm
                  focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      new: !prev.new,
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {show.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">
                CONFIRM PASSWORD
              </p>

              <div className="relative">
                <input
                  type={show.confirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  placeholder="Confirm new password"
                  className="w-full rounded-xl bg-gray-100/70 px-4 py-2.5 text-sm
                  focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShow((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setStep("verify")}
                className="px-4 py-2 text-sm text-gray-600"
              >
                Back
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-5 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;
