import { useFormContext } from "react-hook-form";
import type { OnboardingFormData } from "../OnboardingPage";
import { AlertTriangle } from "lucide-react";

type Props = {
  submitAttempted: boolean;
};

const PartnershipStep = ({ submitAttempted }: Props) => {
  const { register, watch } = useFormContext<OnboardingFormData>();

  const termsAccepted = watch("termsAccepted");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-900">Partnership</h1>

      <p className="mt-2 text-slate-500">
        Review the partnership terms and agree to proceed.
      </p>

      <div className="mt-8 space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("termsAccepted")}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />

          <span className="text-sm text-slate-700 leading-relaxed">
            I agree to the{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              Partnership Terms & Conditions
            </a>
          </span>
        </label>

        {/* Error Message */}
        {submitAttempted && !termsAccepted && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
            <AlertTriangle size={18} />
            <span>You must agree to continue.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnershipStep;
