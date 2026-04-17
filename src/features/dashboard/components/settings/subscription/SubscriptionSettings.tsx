import { useState } from "react";
import CurrentPlanCard from "./CurrentPlanCard";
import BillingHistoryTable from "./BillingHistoryTable";
import PlansModal from "./PlansModal";

const SubscriptionSettings = () => {
  const [showPlans, setShowPlans] = useState(false);

  return (
    <div className="space-y-6">
      <CurrentPlanCard onExplore={() => setShowPlans(true)} />

      <BillingHistoryTable />

      {showPlans && <PlansModal onClose={() => setShowPlans(false)} />}
    </div>
  );
};

export default SubscriptionSettings;
