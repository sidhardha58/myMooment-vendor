import { useState } from "react";
import AddMenuWizard from "./addMenu/AddMenuWizard";

type Service = {
  id: number;
  name: string;
  items: number;
  active: boolean;
};

type Props = {
  selectedService: Service;
};

export default function MenuCatalog({ selectedService }: Props) {
  const [filter, setFilter] = useState<"veg" | "nonveg">("veg");
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-md font-semibold text-gray-800">Menu Items</h3>
          <p className="text-sm text-gray-500">{selectedService.items} items</p>
        </div>

        <button
          onClick={() => setShowWizard(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Item
        </button>
      </div>

      {/* FILTER */}
      <div className="flex gap-4">
        <button
          onClick={() => setFilter("veg")}
          className={`px-4 py-2 rounded-lg ${
            filter === "veg"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Veg
        </button>

        <button
          onClick={() => setFilter("nonveg")}
          className={`px-4 py-2 rounded-lg ${
            filter === "nonveg"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Non-Veg
        </button>
      </div>

      {/* CONTENT */}
      <div className="text-gray-400 text-sm border border-dashed border-gray-200 rounded-xl p-6 text-center">
        Menu items will appear here
      </div>

      {/* MODAL */}
      {showWizard && <AddMenuWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}
