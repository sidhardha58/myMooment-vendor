export interface BankAccount {
  updatedAt: string;
  _id?: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifscCode: string;
  accountType: string;
  status: "verified" | "pending" | "rejected"; 
  url?: string;
  is_primary?: boolean; 
}
