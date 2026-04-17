import { useEffect, useState } from "react";
import { getVendorBankDetails } from "../api/bankApi";
import type { BankAccount } from "../types/bank.types";

export const useBanks = () => {
  const [banks, setBanks] = useState<BankAccount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const data = await getVendorBankDetails();
        setBanks(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  return { banks, loading };
};
