import CouponTabs from "../components/coupons/CouponTabs";

const CouponsPage = () => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Coupons Hub</h1>
        </div>
      </div>

      {/* Tabs Section */}
      <CouponTabs />
    </div>
  );
};

export default CouponsPage;
