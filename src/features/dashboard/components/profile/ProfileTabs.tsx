import { useState } from "react";
import ProfileSummary from "./ProfileSummary";
import ProfileDocuments from "./ProfileDocuments";
import ProfileBankDetails from "./ProfileBankDetails";

// import types (adjust paths if needed)
import type { VendorProfile } from "../../types/profile.types";
import type { VendorDocument } from "../../types/document.types";
import type { BankAccount } from "../../types/bank.types";

type Props = {
  profile: VendorProfile;
  documents: VendorDocument[];
  banks: BankAccount[];
};

const tabs = ["Summary", "Documents", "Bank Details"];

export default function ProfileTabs({ profile, documents, banks }: Props) {
  const [activeTab, setActiveTab] = useState("Summary");

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {profile.businessName}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
            <span className="font-medium text-gray-700">
              {profile.vendorId || "—"}
            </span>
            <span className="flex items-center gap-1 text-green-600">
              ● Active
            </span>
            <span>Joined: {profile.joinedDate || "—"}</span>
            <span>
              GST Type:{" "}
              <span className="text-green-600">
                {profile.gstType || "Regular"}
              </span>
            </span>
            <span>
              Service:{" "}
              <span className="font-medium text-gray-700">
                {profile.serviceCategory}
              </span>
            </span>
          </div>
        </div>

        <button className="border px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition">
          ✏️ Edit Profile
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-8 border-b text-sm font-medium">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-all ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div>
        {activeTab === "Summary" && <ProfileSummary data={profile} />}

        {activeTab === "Documents" && (
          <ProfileDocuments documents={documents} />
        )}

        {activeTab === "Bank Details" && <ProfileBankDetails banks={banks} />}
      </div>
    </div>
  );
}
