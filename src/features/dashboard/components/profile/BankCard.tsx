import { Building2, CheckCircle, Trash2, Star } from "lucide-react";
import type { BankAccount } from "../../types/bank.types";

type Props = {
  bank: BankAccount;
  isPrimary?: boolean;
  onSetPrimary?: (bankId: string) => void;
  onDelete?: (bankId: string) => void;
};

export default function BankCard({
  bank,
  isPrimary,
  onSetPrimary,
  onDelete,
}: Props) {
  const statusBadge = {
    verified: {
      text: "VERIFIED",
      bg: "bg-green-100",
      textColor: "text-green-600",
    },
    pending: {
      text: "PENDING VERIFICATION",
      bg: "bg-yellow-100",
      textColor: "text-yellow-600",
    },
    rejected: { text: "REJECTED", bg: "bg-red-100", textColor: "text-red-600" },
  }[bank.status];

  return (
    <div
      className={`rounded-2xl p-6 bg-white ${
        isPrimary ? "border border-purple-200" : "border border-gray-200"
      }`}
    >
      {/* HEADER */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Building2 className="w-5 h-5 text-purple-600" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-800">{bank.bankName}</h3>

              {isPrimary && (
                <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-600 rounded-md">
                  PRIMARY ACCOUNT
                </span>
              )}

              {statusBadge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-md ${statusBadge.bg} ${statusBadge.textColor}`}
                >
                  {statusBadge.text}
                </span>
              )}
            </div>

            {isPrimary && bank.status === "verified" && (
              <p className="text-sm text-purple-600 mt-1 font-medium">
                Payouts will be sent to this account.
              </p>
            )}

            {!isPrimary && (
              <p className="text-sm text-gray-500 mt-1">Secondary Account</p>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Updated: {bank.updatedAt || "-"}
        </p>
      </div>

      {/* DETAILS */}
      <div className="bg-gray-50 rounded-xl p-5 grid grid-cols-2 gap-6 text-sm">
        <div>
          <p className="text-gray-400 text-xs mb-1">ACCOUNT HOLDER NAME</p>
          <p className="font-semibold text-gray-800">{bank.accountName}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs mb-1">IFSC CODE</p>
          <p className="font-semibold text-gray-800">{bank.ifscCode}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs mb-1">ACCOUNT NUMBER</p>
          <p className="font-semibold text-gray-800 tracking-wide">
            {bank.accountNumber}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-xs mb-1">ACCOUNT TYPE</p>
          <p className="font-semibold text-gray-800">{bank.accountType}</p>
        </div>
      </div>

      {/* PRIMARY STATUS */}
      {isPrimary && bank.status === "verified" && (
        <div className="flex items-center gap-2 mt-5 text-green-600 text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Active for Payouts
        </div>
      )}

      {/* ACTION BUTTONS */}
      {!isPrimary && (
        <div className="flex gap-3 mt-5">
          {onSetPrimary && (
            <button
              onClick={() => onSetPrimary(bank._id!)}
              className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-purple-700 transition"
            >
              <Star className="w-4 h-4" />
              Set as Primary
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(bank._id!)}
              className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-700 transition"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
