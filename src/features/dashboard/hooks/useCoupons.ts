import { useEffect, useState } from "react";
import * as api from "../api/couponApi";

export const useCoupons = () => {
  const [myCoupons, setMyCoupons] = useState([]);
  const [platformCoupons, setPlatformCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const mine = await api.getMyCoupons();

      console.log("API RESPONSE:", mine);

      // ✅ FIX HERE
      setMyCoupons(mine?.data || []);

      setPlatformCoupons([]); // keep for now
    } catch (err) {
      console.error("Error fetching coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return {
    myCoupons,
    platformCoupons,
    loading,
    refetch: fetchCoupons,
  };
};
