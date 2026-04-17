import { useEffect, useState } from "react";
import { getSubscriptionPlans } from "../api/settingsApi";

export const useSubscription = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPlans = async () => {
    try {
      setLoading(true);

      const data = await getSubscriptionPlans();

      console.log("Fetched Plans:", data);

      setPlans(data || []);
    } catch (err) {
      console.error("Failed to fetch plans", err);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return { plans, loading };
};
