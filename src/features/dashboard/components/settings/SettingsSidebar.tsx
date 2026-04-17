type Props = {
  active: string;
  setActive: (
    val: "account" | "documents" | "subscription" | "security",
  ) => void;
};

const SettingsSidebar = ({ active, setActive }: Props) => {
  const menu = [
    { key: "account", label: "Account" },
    { key: "documents", label: "Documents" },
    { key: "subscription", label: "Subscription" },
    { key: "security", label: "Security" },
    { key: "danger", label: "Danger Zone" },
  ];

  return (
    <div className="w-64 bg-gray-50 p-4 rounded-l-2xl">
      <div className="space-y-2">
        {menu.map((item) => (
          <button
            key={item.key}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onClick={() => setActive(item.key as any)}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition
              ${
                active === item.key
                  ? "bg-white text-blue-600 shadow-sm border-l-4 border-blue-600"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SettingsSidebar;
