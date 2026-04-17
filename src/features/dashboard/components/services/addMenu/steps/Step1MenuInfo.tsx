import { Leaf, Ham } from "lucide-react";
import { useRef } from "react";
import type { MenuData } from "../../../../types/menu.types";

type Props = {
  menuData: MenuData;
  setMenuData: React.Dispatch<React.SetStateAction<MenuData>>;
};

export default function Step1MenuInfo({ menuData, setMenuData }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Remove leading zeros
  const sanitizeNumber = (value: string) => {
    return value.replace(/^0+(?=\d)/, "");
  };

  const handleImageUpload = (file: File) => {
    const previewUrl = URL.createObjectURL(file);
    setMenuData({ ...menuData, image: file, imagePreview: previewUrl });
  };

  return (
    <div className="space-y-6">
      {/* TITLE */}
      <div>
        <h3 className="text-lg font-semibold">Create New Menu</h3>
        <p className="text-sm text-gray-500">
          Create menu basics before adding food sections
        </p>
      </div>

      {/* MENU NAME */}
      <div>
        <label className="text-sm text-gray-500">Menu Name</label>
        <input
          type="text"
          placeholder="e.g. Standard Breakfast"
          value={menuData.name}
          onChange={(e) => setMenuData({ ...menuData, name: e.target.value })}
          className="w-full mt-1 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* FOOD TYPE */}
      <div>
        <label className="text-sm text-gray-500">Food Type</label>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => setMenuData({ ...menuData, type: "veg" })}
            className={`flex items-center gap-1 px-4 py-2 rounded-full border transition-colors ${
              menuData.type === "veg"
                ? "bg-green-600 text-white border-green-600"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            <Leaf className="w-4 h-4" /> Veg
          </button>

          <button
            onClick={() => setMenuData({ ...menuData, type: "nonveg" })}
            className={`flex items-center gap-1 px-4 py-2 rounded-full border transition-colors ${
              menuData.type === "nonveg"
                ? "bg-red-600 text-white border-red-600"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            <Ham className="w-4 h-4" /> Non-Veg
          </button>
        </div>
      </div>

      {/* PRICE */}
      <div>
        <label className="text-sm text-gray-500">Price Per Person</label>
        <div className="relative mt-1">
          <span className="absolute left-3 top-3 text-gray-500">₹</span>
          <input
            type="number"
            placeholder="e.g. 200"
            value={menuData.price === 0 ? "" : menuData.price}
            onChange={(e) =>
              setMenuData({
                ...menuData,
                price:
                  e.target.value === ""
                    ? 0
                    : Number(sanitizeNumber(e.target.value)),
              })
            }
            className="w-full border border-gray-200 rounded-xl p-3 pl-8 focus:outline-none focus:ring-2 focus:ring-blue-500
              appearance-none
              [::-webkit-inner-spin-button]:appearance-none
              [::-webkit-outer-spin-button]:appearance-none
              [moz-appearance]:textfield"
            onWheel={(e) => e.currentTarget.blur()}
          />
        </div>
      </div>

      {/* MEMBERS */}
      <div className="grid grid-cols-2 gap-4">
        {/* MIN */}
        <div>
          <label className="text-sm text-gray-500">Minimum Members</label>
          <input
            type="number"
            placeholder="Min pax"
            value={menuData.minMembers === 0 ? "" : menuData.minMembers}
            onChange={(e) =>
              setMenuData({
                ...menuData,
                minMembers:
                  e.target.value === ""
                    ? 0
                    : Number(sanitizeNumber(e.target.value)),
              })
            }
            className="w-full mt-1 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500
              appearance-none
              [::-webkit-inner-spin-button]:appearance-none
              [::-webkit-outer-spin-button]:appearance-none
              [moz-appearance]:textfield"
            onWheel={(e) => e.currentTarget.blur()}
          />
          <p className="text-xs text-gray-400 mt-1">
            Applicable booking size for this menu
          </p>
        </div>

        {/* MAX */}
        <div>
          <label className="text-sm text-gray-500">Maximum Members</label>
          <input
            type="number"
            placeholder="Max pax"
            value={menuData.maxMembers === 0 ? "" : menuData.maxMembers}
            onChange={(e) =>
              setMenuData({
                ...menuData,
                maxMembers:
                  e.target.value === ""
                    ? 0
                    : Number(sanitizeNumber(e.target.value)),
              })
            }
            className="w-full mt-1 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500
              appearance-none
              [::-webkit-inner-spin-button]:appearance-none
              [::-webkit-outer-spin-button]:appearance-none
              [moz-appearance]:textfield"
            onWheel={(e) => e.currentTarget.blur()}
          />
          <p className="text-xs text-gray-400 mt-1">
            Applicable booking size for this menu
          </p>
        </div>
      </div>

      {/* IMAGE UPLOAD */}
      <div>
        <label className="text-sm text-gray-500">Menu Image</label>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="mt-1 border-2 border-dashed border-gray-200 rounded-xl p-6 text-center text-sm text-gray-400 cursor-pointer hover:bg-gray-50 transition"
        >
          {menuData.image ? (
            <img
              src={menuData.imagePreview}
              alt="Menu Preview"
              className="mx-auto h-32 object-cover rounded-lg"
            />
          ) : (
            "Click to upload image"
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />
      </div>
    </div>
  );
}
