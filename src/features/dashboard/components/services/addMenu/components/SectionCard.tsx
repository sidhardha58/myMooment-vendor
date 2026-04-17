/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import ItemCard from "./ItemCard";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  section: any;
  sectionIndex: number;
  addItem: Function;
  updateItem: Function;
  removeItem: Function;
  handleImageUpload: Function;
};

export default function SectionCard({
  section,
  sectionIndex,
  addItem,
  updateItem,
  removeItem,
  handleImageUpload,
}: Props) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5 space-y-4 bg-white">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">
          {section.name || "Untitled Section"}
        </h4>

        <button
          onClick={() => addItem(sectionIndex)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          + Add Item
        </button>
      </div>

      {/* EMPTY */}
      {section.items.length === 0 && (
        <p className="text-sm text-gray-400">No items added yet</p>
      )}

      {/* ITEMS */}
      <div className="space-y-4">
        {section.items.map((item: unknown, itemIndex: number) => (
          <ItemCard
            key={itemIndex}
            item={item}
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
            updateItem={updateItem}
            removeItem={removeItem}
            handleImageUpload={handleImageUpload}
          />
        ))}
      </div>
    </div>
  );
}