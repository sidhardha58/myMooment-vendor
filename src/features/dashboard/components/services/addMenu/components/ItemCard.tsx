/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useRef } from "react";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
  sectionIndex: number;
  itemIndex: number;
  updateItem: Function;
  removeItem: Function;
  handleImageUpload: Function;
};

export default function ItemCard({
  item,
  sectionIndex,
  itemIndex,
  updateItem,
  removeItem,
  handleImageUpload,
}: Props) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="border border-gray-200 rounded-xl p-4 space-y-4 bg-gray-50">
      {/* TOP */}
      <div className="flex justify-between items-center gap-3">
        <input
          type="text"
          placeholder="Item name"
          value={item.name}
          onChange={(e) =>
            updateItem(sectionIndex, itemIndex, "name", e.target.value)
          }
          className="flex-1 border rounded-lg p-3"
        />

        <button
          onClick={() => removeItem(sectionIndex, itemIndex)}
          className="text-red-500 text-sm"
        >
          Delete
        </button>
      </div>

      {/* DESCRIPTION */}
      <textarea
        placeholder="Short description"
        value={item.description}
        onChange={(e) =>
          updateItem(sectionIndex, itemIndex, "description", e.target.value)
        }
        className="w-full border rounded-lg p-3"
      />

      {/* IMAGE */}
      <div>
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer"
        >
          {item.imagePreview ? (
            <img
              src={item.imagePreview}
              className="mx-auto h-24 rounded-lg object-cover"
            />
          ) : (
            "Click to upload image"
          )}
        </div>

        <input
          type="file"
          ref={fileRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(sectionIndex, itemIndex, file);
          }}
        />
      </div>
    </div>
  );
}
