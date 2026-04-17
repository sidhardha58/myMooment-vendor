import SectionCard from "../components/SectionCard";
import type { MenuData } from "../../../../types/menu.types";

type Props = {
  menuData: MenuData;
  setMenuData: React.Dispatch<React.SetStateAction<MenuData>>;
};

export default function Step2Items({ menuData, setMenuData }: Props) {
  const addItem = (sectionIndex: number) => {
    const updated = [...menuData.sections];

    updated[sectionIndex].items.push({
      name: "",
      description: "",
      image: null,
      imagePreview: "",
    });

    setMenuData({ ...menuData, sections: updated });
  };

  const removeItem = (sectionIndex: number, itemIndex: number) => {
    const updated = [...menuData.sections];
    updated[sectionIndex].items.splice(itemIndex, 1);

    setMenuData({ ...menuData, sections: updated });
  };

  const updateItem = (
    sectionIndex: number,
    itemIndex: number,
    field: string,
    value: unknown,
  ) => {
    const updated = [...menuData.sections];

    updated[sectionIndex].items[itemIndex] = {
      ...updated[sectionIndex].items[itemIndex],
      [field]: value,
    };

    setMenuData({ ...menuData, sections: updated });
  };

  const handleImageUpload = (
    sectionIndex: number,
    itemIndex: number,
    file: File,
  ) => {
    const previewUrl = URL.createObjectURL(file);

    const updated = [...menuData.sections];

    updated[sectionIndex].items[itemIndex] = {
      ...updated[sectionIndex].items[itemIndex],
      image: file, // ✅ real file
      imagePreview: previewUrl, // ✅ UI preview
    };

    setMenuData({ ...menuData, sections: updated });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Add Items to Sections</h3>

      {menuData.sections.length === 0 && (
        <div className="text-sm text-gray-400 border border-dashed rounded-xl p-6 text-center">
          Please add sections first
        </div>
      )}

      {menuData.sections.map((section, sectionIndex) => (
        <SectionCard
          key={sectionIndex}
          section={section}
          sectionIndex={sectionIndex}
          addItem={addItem}
          updateItem={updateItem}
          removeItem={removeItem}
          handleImageUpload={handleImageUpload}
        />
      ))}
    </div>
  );
}
