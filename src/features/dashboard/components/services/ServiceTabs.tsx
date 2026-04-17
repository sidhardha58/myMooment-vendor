type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function ServiceTabs({ activeTab, setActiveTab }: Props) {
  return (
    <div className="flex gap-6 border-b border-gray-200">
      <button
        onClick={() => setActiveTab("management")}
        className={`pb-3 text-lg font-medium transition-colors ${
          activeTab === "management"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Services
      </button>

      <button
        onClick={() => setActiveTab("availability")}
        className={`pb-3 text-lg font-medium transition-colors ${
          activeTab === "availability"
            ? "text-blue-600 border-b-2 border-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Availability
      </button>
    </div>
  );
}
