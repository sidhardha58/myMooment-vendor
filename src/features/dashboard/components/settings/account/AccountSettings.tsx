import { useState } from "react";
import { Pencil } from "lucide-react";
import { useProfile } from "../../../hooks/useProfile";
import EditPhoneModal from "./EditPhoneModal";

const AccountSettings = () => {
  const { profile, loading } = useProfile();

  const [openPhoneModal, setOpenPhoneModal] = useState(false);

  if (loading) {
    return (
      <div className="text-gray-400 text-sm py-10 text-center">
        Loading account details...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-red-400 text-sm py-10 text-center">
        Failed to load profile
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 px-4 py-6 h-full overflow-auto">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Account Settings
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage your personal contact details.
          </p>
        </div>

        {/* Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PHONE CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Phone Number
                </p>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  {profile.phone || "Not Available"}
                </p>
              </div>

              <button
                onClick={() => setOpenPhoneModal(true)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition"
              >
                <Pencil size={16} />
              </button>
            </div>
          </div>

          {/* EMAIL CARD */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-400">
                  Email Address
                </p>
                <p className="text-lg font-semibold text-gray-800 mt-2">
                  {profile.email || "Not Available"}
                </p>
              </div>

              <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition">
                <Pencil size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 PHONE MODAL */}
      <EditPhoneModal
        isOpen={openPhoneModal}
        onClose={() => setOpenPhoneModal(false)}
      />
    </>
  );
};

export default AccountSettings;
