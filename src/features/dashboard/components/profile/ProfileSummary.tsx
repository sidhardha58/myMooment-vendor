import type { VendorProfile } from "../../types/profile.types";

interface Category {
  _id: string;
  name: string;
}

export default function ProfileSummary({
  data,
  categories,
}: {
  data: VendorProfile;
  categories: Category[];
}) {
  const formatPhone = (phone: string) => {
    if (!phone) return "N/A";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  };
  const categoryName =
  categories.find((c) => c._id === data.serviceCategory)?.name || "N/A";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-10 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* PERSONAL */}
        <div className="space-y-8 pr-8 md:border-r md:border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">
            Personal Details
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                Owner Name
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {data.ownerName}
              </p>
              <p className="text-xs text-green-600 mt-1">Verified from PAN</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">
                Mobile Number
              </p>
              <p className="text-lg font-medium text-gray-900 mt-1">
                {formatPhone(data.phone)}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">
                Mail ID
              </p>
              <p className="text-lg font-medium text-gray-900 mt-1 lowercase">
                {data.email}
              </p>
            </div>
          </div>
        </div>

        {/* BUSINESS */}
        <div className="space-y-8 pl-2">
          <h2 className="text-2xl font-semibold text-gray-900">
            Business Details
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">
                Business Name
              </p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {data.businessName}
              </p>
              <p className="text-xs text-green-600 mt-1">Verified from FSSAI</p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">
                Service Category
              </p>
              <p className="text-lg font-medium text-gray-900 mt-1">
                {categoryName}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase">
                Address
              </p>
              <p className="text-lg font-medium text-gray-900 mt-1 leading-relaxed">
                {data.address}
              </p>
              <p className="text-xs text-green-600 mt-1">Verified from FSSAI</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-12">
        Details verified by GST, FSSAI, and PAN cannot be edited.
      </p>
    </div>
  );
}
