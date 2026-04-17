import { useState } from "react";
import LoginActivity from "./LoginActivity";
import ChangePasswordModal from "./ChangePasswordModal";

const SecuritySettings = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* PASSWORD CARD */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
        {/* LEFT */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Password</h3>
          <p className="text-sm text-gray-500 mt-1">
            Last changed 3 months ago
          </p>
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg 
          hover:bg-blue-100 active:scale-[0.98] transition"
        >
          Change Password
        </button>
      </div>

      {/* LOGIN ACTIVITY */}
      <LoginActivity />

      {/* MODAL */}
      <ChangePasswordModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default SecuritySettings;
