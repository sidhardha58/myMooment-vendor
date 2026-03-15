import { useState } from "react";

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

  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            Menu Catalog — {selectedService.name}
          </h2>

          <p className="text-sm text-gray-500">{selectedService.items} items</p>
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Item
        </button>
      </div>

      {/* VEG / NON VEG FILTER */}

      <div className="flex gap-4 mb-4">
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

      {/* MENU ITEMS PLACEHOLDER */}

      <div className="text-gray-400 text-sm">Menu items will appear here</div>
    </div>
  );
}
