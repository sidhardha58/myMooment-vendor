import type { VendorProfile } from "../../types/profile.types";

interface Category {
  _id: string;
  name: string;
}

export default function ProfilePreview({
  data,
  categories,
}: {
  data: VendorProfile;
  categories: Category[];
}) {
  // ✅ MAP CATEGORY ID → NAME
  const categoryName =
    categories.find((c) => c._id === data.serviceCategory)?.name || "N/A";

  return (
    <div className="bg-gray-100 rounded-2xl p-6 relative">
      <h2 className="text-sm font-semibold text-gray-500 tracking-wide mb-6">
        BUSINESS PREVIEW
      </h2>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="h-44 bg-gray-200 flex items-center justify-center">
          {data.profileImage ? (
            <img
              src={data.profileImage}
              alt="Business"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-xl">📷</span>
          )}
        </div>

        <div className="p-5 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {data.businessName || "N/A"}
          </h3>

          <div className="flex gap-2 text-xs">
            {/* ✅ FIXED CATEGORY */}
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
              {categoryName}
            </span>

            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-medium">
              ⭐ 4.8 (120+)
            </span>
          </div>

          <p className="text-sm text-gray-500">📍 {data.address || "N/A"}</p>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-6">
        This is how your business appears to customers.
      </p>
    </div>
  );
}
