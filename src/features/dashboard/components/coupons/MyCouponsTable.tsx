import CouponStatusBadge from "./CouponStatusBadge";
import { Pencil, Pause, Play } from "lucide-react";
import * as api from "../../api/couponApi";

type Coupon = {
  _id: string;
  code: string;
  type: "percentage" | "flat";
  value: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  applicable_service_ids?: string[];
};

type Props = {
  coupons: Coupon[];
  refetch: () => void;
  onEdit: (coupon: Coupon) => void; // ✅ ADDED
};

const MyCouponsTable = ({ coupons, refetch, onEdit }: Props) => {
  // ✅ STATUS LOGIC
  const getCouponStatus = (coupon: Coupon): "active" | "paused" | "expired" => {
    const now = new Date();
    const end = new Date(coupon.end_date);

    if (!coupon.is_active) return "paused";
    if (end < now) return "expired";

    return "active";
  };

  // ✅ PAUSE / RESUME HANDLER
  const handleToggle = async (coupon: Coupon) => {
    try {
      await api.toggleCoupon(coupon._id, !coupon.is_active);
      refetch();
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        {/* Header */}
        <thead className="bg-gray-50 text-gray-400 text-xs tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left font-medium">COUPON CODE</th>
            <th className="px-6 py-4 text-left font-medium">APPLIED FOR</th>
            <th className="px-6 py-4 text-left font-medium">TYPE</th>
            <th className="px-6 py-4 text-left font-medium">VALUE</th>
            <th className="px-6 py-4 text-left font-medium">VALIDITY</th>
            <th className="px-6 py-4 text-left font-medium">STATUS</th>
            <th className="px-6 py-4 text-left font-medium">ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((coupon) => {
            const status = getCouponStatus(coupon);

            return (
              <tr
                key={coupon._id}
                className="group hover:bg-gray-50/70 transition"
              >
                {/* Coupon Code */}
                <td className="px-6 py-5">
                  <span className="inline-block px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 font-semibold text-xs">
                    {coupon.code}
                  </span>
                </td>

                {/* Applied For */}
                <td className="px-6 py-5">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                    {coupon.applicable_service_ids?.length
                      ? "SERVICES"
                      : "ORDERS"}
                  </span>
                </td>

                {/* Type */}
                <td className="px-6 py-5 text-gray-600">
                  {coupon.type === "percentage" ? "Percentage" : "Flat Amount"}
                </td>

                {/* Value */}
                <td className="px-6 py-5 text-gray-900 font-medium">
                  {coupon.type === "percentage"
                    ? `${coupon.value}%`
                    : `₹${coupon.value}`}
                </td>

                {/* Validity */}
                <td className="px-6 py-5 text-gray-700">
                  {formatDate(coupon.start_date)} →{" "}
                  {formatDate(coupon.end_date)}
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <CouponStatusBadge status={status} />
                </td>

                {/* Actions */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition">
                    {/* ✅ EDIT */}
                    <button
                      onClick={() => onEdit(coupon)} // ✅ FIXED
                      className="p-2 rounded-md hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition"
                      title="Edit Coupon"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* PAUSE / RESUME */}
                    <button
                      onClick={() => handleToggle(coupon)}
                      title={
                        coupon.is_active ? "Pause Coupon" : "Resume Coupon"
                      }
                      className={`p-2 rounded-md hover:bg-gray-100 transition ${
                        coupon.is_active
                          ? "text-gray-500 hover:text-orange-500"
                          : "text-gray-400 hover:text-green-600"
                      }`}
                    >
                      {coupon.is_active ? (
                        <Pause size={16} />
                      ) : (
                        <Play size={16} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyCouponsTable;

/* Helper */
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });
