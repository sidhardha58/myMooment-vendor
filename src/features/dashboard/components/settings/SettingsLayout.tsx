import { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";

// Sections
import AccountSettings from "./account/AccountSettings";
import DocumentsSettings from "./documents/DocumentsSettings";
import SecuritySettings from "./security/SecuritySettings";
import SubscriptionSettings from "./subscription/SubscriptionSettings";
import DangerZone from "./danger/DangerZone";

const SettingsLayout = () => {
  const [active, setActive] = useState<
    "account" | "documents" | "subscription" | "security" | "danger"
  >("account");

  const renderContent = () => {
    switch (active) {
      case "account":
        return <AccountSettings />;
      case "documents":
        return <DocumentsSettings />;
      case "security":
        return <SecuritySettings />;
      case "subscription":
        return <SubscriptionSettings />;
      case "danger":
        return <DangerZone />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md flex h-[75vh] overflow-hidden">
      {/* SIDEBAR */}
      <div className="w-64 bg-gray-50/60 overflow-y-auto">
        <SettingsSidebar active={active} setActive={setActive} />
      </div>

      {/* CONTENT (scrollable) */}
      <div className="flex-1 p-8 bg-white overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default SettingsLayout;
