import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import type { VendorProfile } from "../types/profile.types";

export const useProfile = () => {
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/vendor/profile");

        const vendor = res.data?.data?.vendor;
        const user = res.data?.data?.user;

        if (!vendor || !user) {
          setProfile(null);
          return;
        }
        

        // ✅ MAP BACKEND → FRONTEND TYPE
        const mappedProfile: VendorProfile = {
          joinedDate: vendor.createdAt || "",
          gstType: vendor.business_identity?.gstin_details?.gstin_registered
            ? "Registered"
            : "Unregistered",
          vendorId: vendor.id || "",

          ownerName: vendor.full_name || "",
          phone: user.phone_number || "",
          email: user.email || "",

          businessName: vendor.business_details?.display_name || "",
          serviceCategory: vendor.business_details?.category_id || "",

          address: `${vendor.business_details?.address?.full_address || ""}, ${
            vendor.business_details?.address?.city || ""
          }, ${vendor.business_details?.address?.state || ""}`,

          vendor_operational_status: vendor.vendor_operational_status || "",
          profileImage: user.profile_url?.url || "",

          // optional fields
          createdAt: vendor.createdAt,
          isVerified: vendor.vendor_status === "completed",
        };

        setProfile(mappedProfile);
      } catch (error) {
        console.error("Profile fetch failed:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading };
};
