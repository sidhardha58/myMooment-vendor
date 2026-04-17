import BankCard from "./BankCard";
import type { BankAccount } from "../../types/bank.types";
import { useState } from "react";

type Props = {
  banks: BankAccount[];
};

export default function ProfileBankDetails({ banks: initialBanks }: Props) {
  const [banks, setBanks] = useState(initialBanks);

  // Handler to set a bank as primary
  function handleSetPrimary(bankId: string) {
    // You'd usually call your backend API here to update
    // For demo, just reorder locally

    const updatedBanks = banks.map((bank) => ({
      ...bank,
      is_primary: bank._id === bankId,
      status: bank.status, // keep status as is
    }));

    // Reorder so primary comes first
    updatedBanks.sort((a) => (a.is_primary ? -1 : 1));

    setBanks(updatedBanks);

    // TODO: call backend API to persist this change
  }

  // Handler to delete a bank
  function handleDelete(bankId: string) {
    // Confirm before delete
    if (!confirm("Are you sure you want to delete this bank account?")) return;

    // You'd call backend API here to delete
    const updatedBanks = banks.filter((bank) => bank._id !== bankId);
    setBanks(updatedBanks);

    // TODO: call backend API to delete the bank account from server
  }

  if (!banks || banks.length === 0) {
    return (
      <div className="p-6">
        <p className="text-gray-400">No bank accounts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Bank Accounts</h2>
          <p className="text-sm text-gray-500">
            Manage your bank accounts and payout destinations.
          </p>
        </div>

        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-purple-700 transition">
          + Add Bank Account
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banks.map((bank, i) => (
          <BankCard
            key={bank?._id || bank?.accountNumber || i}
            bank={bank}
            isPrimary={bank.is_primary || i === 0}
            onSetPrimary={handleSetPrimary}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}