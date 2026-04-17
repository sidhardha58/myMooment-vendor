import { useState } from "react";
import ProfileSummary from "../components/profile/ProfileSummary";
import ProfileDocuments from "../components/profile/ProfileDocuments";
import ProfileBankDetails from "../components/profile/ProfileBankDetails";
import ProfilePreview from "../components/profile/ProfilePreview";

import { useProfile } from "../hooks/useProfile";
import { useDocuments } from "../hooks/useDocuments";
import { useBanks } from "../hooks/useBanks";
import { useCategories } from "../hooks/useCategories";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("summary");

  // ✅ separate hooks
  const { profile, loading: profileLoading } = useProfile();
  const { documents, loading: documentsLoading } = useDocuments();
  const { banks, loading: banksLoading } = useBanks();
  const { categories } = useCategories();

  // ✅ combined loading state
  if (profileLoading || documentsLoading || banksLoading) {
    return <div className="p-6 text-gray-500">Loading profile...</div>;
  }

  // ✅ safety check
  if (!profile) {
    return <div className="p-6 text-red-500">Profile not found</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Vendor Profile
          </h1>
        </div>

        <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-50">
          Edit Profile
        </button>
      </div>

      {/* TABS */}
      <div className="flex gap-8 border-b border-gray-200 text-sm font-medium">
        {["summary", "documents", "bank"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab === "bank" ? "Bank Details" : tab}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      {activeTab === "summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <ProfileSummary data={profile} categories={categories} />
          </div>

          <div className="lg:col-span-2">
            <ProfilePreview data={profile} categories={categories} />
          </div>
        </div>
      )}

      {activeTab === "documents" && (
        <ProfileDocuments documents={documents} />
      )}

      {activeTab === "bank" && (
        <ProfileBankDetails banks={banks} />
      )}
    </div>
  );
}