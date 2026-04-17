import type { MenuData, Section } from "../../../../types/menu.types";

type Props = {
  menuData: MenuData;
  setMenuData: React.Dispatch<React.SetStateAction<MenuData>>;
};

export default function Step2Sections({ menuData, setMenuData }: Props) {
  // Remove leading zeros
  const sanitizeNumber = (value: string) => {
    return value.replace(/^0+(?=\d)/, "");
  };

  // ➕ Add section
  const addSection = () => {
    const newSection: Section = {
      name: "",
      selectionType: "all",
      items: [],
    };

    setMenuData({
      ...menuData,
      sections: [...menuData.sections, newSection],
    });
  };

  // ❌ Remove section
  const removeSection = (index: number) => {
    const updated = [...menuData.sections];
    updated.splice(index, 1);

    setMenuData({
      ...menuData,
      sections: updated,
    });
  };

  // ✏️ Update section
  const updateSection = (
    index: number,
    field: keyof Section,
    value: unknown,
  ) => {
    const updated = [...menuData.sections];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setMenuData({
      ...menuData,
      sections: updated,
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Sections</h3>
          <p className="text-sm text-gray-500">
            Build food groups inside this menu
          </p>
        </div>

        <button
          onClick={addSection}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Section
        </button>
      </div>

      {/* EMPTY STATE */}
      {menuData.sections.length === 0 && (
        <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center text-sm text-gray-400">
          No sections added yet
        </div>
      )}

      {/* SECTIONS */}
      <div className="space-y-4">
        {menuData.sections.map((section, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-2xl p-5 space-y-4 bg-white"
          >
            {/* TOP ROW */}
            <div className="flex justify-between items-center gap-3">
              <input
                type="text"
                placeholder="Section Name (e.g. Starters)"
                value={section.name}
                onChange={(e) => updateSection(index, "name", e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={() => removeSection(index)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>

            {/* SELECTION TYPE */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">Selection Type</label>

                <select
                  value={section.selectionType}
                  onChange={(e) =>
                    updateSection(index, "selectionType", e.target.value)
                  }
                  className="w-full mt-1 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Included</option>
                  <option value="limited">Limited Selection</option>
                </select>
              </div>

              {/* MAX SELECTABLE */}
              {section.selectionType === "limited" && (
                <div>
                  <label className="text-sm text-gray-500">
                    Max Selectable
                  </label>

                  <input
                    type="number"
                    placeholder="e.g. 2"
                    value={
                      section.maxSelectable === 0 ||
                      section.maxSelectable === undefined
                        ? ""
                        : section.maxSelectable
                    }
                    onChange={(e) =>
                      updateSection(
                        index,
                        "maxSelectable",
                        e.target.value === ""
                          ? 0
                          : Number(sanitizeNumber(e.target.value)),
                      )
                    }
                    className="w-full mt-1 border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500
                      appearance-none
                      [::-webkit-inner-spin-button]:appearance-none
                      [::-webkit-outer-spin-button]:appearance-none
                      [moz-appearance]:textfield"
                    onWheel={(e) => e.currentTarget.blur()}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
