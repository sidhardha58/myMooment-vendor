import SettingsLayout from "../components/settings/SettingsLayout";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <p className="text-sm text-gray-500">
          Manage your account preferences, subscription, and security.
        </p>
      </div>

      {/* Main Content */}
      <SettingsLayout />
    </div>
  );
};

export default SettingsPage;