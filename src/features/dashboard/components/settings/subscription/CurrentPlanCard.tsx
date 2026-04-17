const CurrentPlanCard = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <div className="rounded-2xl border border-purple-200 bg-linear-to-br from-white via-purple-50 to-purple-100 shadow-sm overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold tracking-wide text-gray-500">
            CURRENT ACTIVE PLAN
          </span>

          <span className="px-3 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded-full">
            ACTIVE
          </span>
        </div>

        {/* Plan Name */}
        <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          Growth Plan
          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-md font-medium">
            Saved ₹1,200/year
          </span>
        </h2>

        {/* Price */}
        <p className="mt-3 text-gray-700 text-base font-medium">
          ₹499 / month{" "}
          <span className="text-gray-400 font-normal">• 6 Months plan</span>
        </p>

        {/* Divider */}
        <div className="border-t border-gray-200 my-5" />

        {/* Billing */}
        <div>
          <p className="text-sm text-gray-500">Next billing date</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            April 01, 2026
          </p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-between items-center px-6 py-4 bg-linear-to-r from-yellow-50 to-yellow-100 border-t border-yellow-200">
        <p className="text-sm font-medium text-yellow-800">
          ✨ Upgrade to 12 Months • Save ₹1,800/year
        </p>

        <button
          onClick={onExplore}
          className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
        >
          Explore Plans
          <span className="text-lg">›</span>
        </button>
      </div>
    </div>
  );
};

export default CurrentPlanCard;
