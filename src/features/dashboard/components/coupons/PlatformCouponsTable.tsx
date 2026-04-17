import CouponStatusBadge from "./CouponStatusBadge";

type Coupon = {
  _id: string;
  code: string;
  type: "percentage" | "flat";
  value: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
};

type Props = {
  coupons: Coupon[];
};

const PlatformCouponsTable = ({ coupons }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full text-sm">
        {/* Header */}
        <thead className="bg-gray-50 text-gray-400 text-xs tracking-wide">
          <tr>
            <th className="px-6 py-4 text-left font-medium">COUPON CODE</th>
            <th className="px-6 py-4 text-left font-medium">TYPE</th>
            <th className="px-6 py-4 text-left font-medium">VALUE</th>
            <th className="px-6 py-4 text-left font-medium">VALIDITY</th>
            <th className="px-6 py-4 text-left font-medium">STATUS</th>
          </tr>
        </thead>

        <tbody>
          {coupons.map((coupon) => {
            const status = getStatus(coupon);

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

                {/* Type */}
                <td className="px-6 py-5 text-gray-600 capitalize">
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
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PlatformCouponsTable;

/* Helpers */
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

const getStatus = (coupon: Coupon) => {
  const now = new Date();
  const end = new Date(coupon.end_date);

  if (!coupon.is_active) return "paused";
  if (now > end) return "expired";
  return "active";
};
