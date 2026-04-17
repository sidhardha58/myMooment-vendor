export type VendorProfile = {
  joinedDate: string;
  gstType: string;
  vendorId: string;
  ownerName: string;
  phone: string;
  email: string;
  businessName: string;
  serviceCategory: string;
  address: string;

  vendorCode?: string;
  createdAt?: string;
  isVerified?: boolean;
  profileImage?: string;

  vendor_operational_status?: string;
};
