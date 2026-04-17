import type { MenuData } from "../../../../types/menu.types";

export default function Step3Summary({ menuData }: { menuData: MenuData }) {
  // 🧠 VALIDATION
  const validate = () => {
    if (!menuData.name) return "Menu name is required";
    if (menuData.sections.length === 0) return "Add at least one section";

    for (const section of menuData.sections) {
      if (!section.name) return "All sections must have names";
      if (section.items.length === 0)
        return `Section "${section.name}" has no items`;

      for (const item of section.items) {
        if (!item.name) return `Item missing name in section "${section.name}"`;
      }
    }

    return null;
  };

  const error = validate();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Summary</h3>

      {/* ❌ ERROR */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* ✅ MENU INFO */}
      <div className="border rounded-xl p-4">
        <h4 className="font-semibold mb-2">Menu Info</h4>

        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <b>Name:</b> {menuData.name}
          </p>
          <p>
            <b>Type:</b> {menuData.type}
          </p>
          <p>
            <b>Price:</b> ₹{menuData.price}
          </p>
          <p>
            <b>Members:</b> {menuData.minMembers} - {menuData.maxMembers}
          </p>
        </div>
      </div>

      {/* ✅ SECTIONS */}
      <div className="space-y-4">
        {menuData.sections.map((section, sIndex) => (
          <div key={sIndex} className="border rounded-xl p-4 space-y-3">
            <div>
              <h4 className="font-semibold">{section.name}</h4>

              <p className="text-sm text-gray-500">
                {section.selectionType === "all"
                  ? "All Included"
                  : `Select up to ${section.maxSelectable}`}
              </p>
            </div>

            {/* ITEMS */}
            <div className="grid grid-cols-2 gap-3">
              {section.items.map((item, iIndex) => (
                <div key={iIndex} className="border rounded-lg p-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.description || "No description"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ⚠️ FINAL NOTE */}
      {!error && (
        <div className="bg-green-100 text-green-700 p-3 rounded-lg text-sm">
          Ready to save menu 🚀
        </div>
      )}
    </div>
  );
}
