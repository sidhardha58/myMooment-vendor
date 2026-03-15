type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function ServiceTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="flex bg-gray-100 rounded-xl w-fit p-1">
      <button
        onClick={() => setActiveTab("management")}
        className={`px-6 py-2 rounded-lg ${
          activeTab === "management" ? "bg-white shadow" : "text-gray-500"
        }`}
      >
        Service Management
      </button>

      <button
        onClick={() => setActiveTab("availability")}
        className={`px-6 py-2 rounded-lg ${
          activeTab === "availability" ? "bg-white shadow" : "text-gray-500"
        }`}
      >
        Availability Settings
      </button>
    </div>
  );
}
