import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import type { OnboardingFormData } from "../OnboardingPage";
import { FileText, BadgeCheck, Eye, EyeOff, Loader2 } from "lucide-react";

type FetchedBankDetails = {
  BANK: string;
  BRANCH: string;
  CITY: string;
  STATE: string;
};

const BankDetailsStep = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const bankProof = watch("bankProof");
  const accountNumber = watch("accountNumber");
  const ifscCode = watch("ifscCode");

  const [bankDetails, setBankDetails] = useState<FetchedBankDetails | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showConfirmAccount, setShowConfirmAccount] = useState(false);

  // Fetch IFSC details
  useEffect(() => {
    const fetchBank = async () => {
      if (!ifscCode || ifscCode.length !== 11) {
        setBankDetails(null);
        return;
      }

      const validPattern = /^[A-Z]{4}0[A-Z0-9]{6}$/;

      if (!validPattern.test(ifscCode)) {
        setBankDetails(null);
        return;
      }

      try {
        setLoading(true);
        const res = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
        if (!res.ok) throw new Error("Invalid IFSC");

        const data = await res.json();

        setBankDetails({
          BANK: data.BANK,
          BRANCH: data.BRANCH,
          CITY: data.CITY,
          STATE: data.STATE,
        });

        setValue("bankName", data.BANK);
      } catch {
        setBankDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBank();
  }, [ifscCode, setValue]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    setValue("bankProof", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const inputStyle = (error?: boolean) =>
    `w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
      error
        ? "border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
    }`;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">Bank Details</h1>
      <p className="mt-2 text-slate-500">
        Enter your bank account details for smooth payment processing.
      </p>

      <div className="mt-8 space-y-6">
        {/* Account Type */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Account Type
          </label>

          <select
            {...register("accountType", {
              required: "Account type is required",
            })}
            className={inputStyle(!!errors.accountType)}
          >
            <option value="">Select Account Type</option>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>

          {errors.accountType && (
            <p className="mt-1 text-sm text-red-500">
              {errors.accountType.message}
            </p>
          )}
        </div>

        {/* Account Holder Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Account Holder Name
          </label>

          <input
            {...register("accountHolderName", {
              required: "Account holder name is required",
            })}
            placeholder="Name exactly as on bank account"
            className={inputStyle(!!errors.accountHolderName)}
          />

          {errors.accountHolderName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.accountHolderName.message}
            </p>
          )}
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Account Number
          </label>

          <div className="relative">
            <input
              type={showAccount ? "text" : "password"}
              {...register("accountNumber", {
                required: "Account number is required",
                minLength: {
                  value: 9,
                  message: "Account number seems too short",
                },
              })}
              placeholder="Enter Account Number"
              className={inputStyle(!!errors.accountNumber)}
            />

            <button
              type="button"
              onClick={() => setShowAccount(!showAccount)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showAccount ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {errors.accountNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.accountNumber.message}
            </p>
          )}
        </div>

        {/* Confirm Account Number */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Confirm Account Number
          </label>

          <div className="relative">
            <input
              type={showConfirmAccount ? "text" : "password"}
              {...register("confirmAccountNumber", {
                required: "Please confirm account number",
                validate: (value) =>
                  value === accountNumber || "Account numbers do not match",
              })}
              placeholder="Confirm Account Number"
              className={inputStyle(!!errors.confirmAccountNumber)}
            />

            <button
              type="button"
              onClick={() => setShowConfirmAccount(!showConfirmAccount)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              {showConfirmAccount ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {errors.confirmAccountNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmAccountNumber.message}
            </p>
          )}
        </div>

        {/* IFSC */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            IFSC Code
          </label>

          <input
            {...register("ifscCode", {
              required: "IFSC code is required",
              pattern: {
                value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                message: "Enter valid IFSC (e.g. SBIN0001234)",
              },
            })}
            placeholder="e.g. SBIN0001234"
            className={inputStyle(!!errors.ifscCode)}
            style={{ textTransform: "uppercase" }}
          />

          {errors.ifscCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.ifscCode.message}
            </p>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="animate-spin" size={16} />
            Fetching bank details...
          </div>
        )}

        {/* Bank Details Card */}
        {bankDetails && (
          <div className="mt-4 p-5 rounded-lg border border-slate-200 bg-slate-50 text-sm space-y-1">
            <p>
              <strong>Bank:</strong> {bankDetails.BANK}
            </p>
            <p>
              <strong>Branch:</strong> {bankDetails.BRANCH}
            </p>
            <p>
              <strong>City:</strong> {bankDetails.CITY}
            </p>
            <p>
              <strong>State:</strong> {bankDetails.STATE}
            </p>
          </div>
        )}

        {/* Hidden bankProof field */}
        <input
          type="hidden"
          {...register("bankProof", {
            validate: (value) =>
              value instanceof File || "Bank proof document is required",
          })}
        />

        {/* Upload Proof */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Upload Passbook / Statement / Cheque
          </label>

          <div className="flex items-center gap-4">
            <label className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 transition flex items-center gap-2">
              <FileText size={16} />
              Upload Document
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {bankProof instanceof File ? (
              <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                <BadgeCheck size={16} />
                {bankProof.name}
              </span>
            ) : (
              <span className="text-sm text-slate-400">No file selected</span>
            )}
          </div>

          {errors.bankProof && (
            <p className="mt-2 text-sm text-red-500">
              {errors.bankProof.message as string}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankDetailsStep;
