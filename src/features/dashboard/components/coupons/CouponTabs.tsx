/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import MyCouponsTable from "./MyCouponsTable";
import PlatformCouponsTable from "./PlatformCouponsTable";
import { Plus } from "lucide-react";
import CreateCouponModal from "./CreateCouponModal";
import { useCoupons } from "../../hooks/useCoupons";

const CouponTabs = () => {
  const [activeTab, setActiveTab] = useState<"my" | "platform">("my");
  const [showModal, setShowModal] = useState(false);

  // ✅ NEW: selected coupon for edit
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);

  // ✅ backend data
  const { myCoupons, platformCoupons, loading, refetch } = useCoupons();

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b flex gap-6">
        <button
          onClick={() => setActiveTab("my")}
          className={`pb-2 ${
            activeTab === "my"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          My Coupons
        </button>

        <button
          onClick={() => setActiveTab("platform")}
          className={`pb-2 ${
            activeTab === "platform"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}
        >
          Platform Coupons
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            {activeTab === "my" ? "My Coupons" : "Platform Coupons"}
          </h2>
          <p className="text-sm text-gray-500">
            {activeTab === "my"
              ? "Manage your store coupons"
              : "Platform provided coupons"}
          </p>
        </div>

        {activeTab === "my" && (
          <button
            onClick={() => {
              setSelectedCoupon(null); // ✅ clear old edit data
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus size={16} />
            Create Coupon
          </button>
        )}
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading coupons...
        </div>
      ) : activeTab === "my" ? (
        myCoupons.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            No coupons found. Create your first coupon 🚀
          </div>
        ) : (
          <MyCouponsTable
            coupons={myCoupons}
            refetch={refetch}
            onEdit={(coupon) => {
              setSelectedCoupon(coupon); // ✅ set edit data
              setShowModal(true);
            }}
          />
        )
      ) : platformCoupons.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          No platform coupons available
        </div>
      ) : (
        <PlatformCouponsTable coupons={platformCoupons} />
      )}

      {/* Modal */}
      <CreateCouponModal
        isOpen={showModal}
        initialData={selectedCoupon} // ✅ KEY FOR EDIT
        onClose={() => {
          setShowModal(false);
          setSelectedCoupon(null); // ✅ reset
        }}
        onSuccess={() => {
          setShowModal(false);
          setSelectedCoupon(null); // ✅ reset
          refetch(); // ✅ refresh data
        }}
      />
    </div>
  );
};

export default CouponTabs;
