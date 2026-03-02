import { useFormContext } from "react-hook-form";
import type { OnboardingFormData } from "../OnboardingPage";
import { useEffect } from "react";
import { FileText, BadgeCheck } from "lucide-react";

const BusinessIdentityStep = () => {
  const {
    register,
    setValue,
    watch,
    unregister,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const gstRegistered = watch("gstRegistered");
  const panFile = watch("panFile");
  const gstFile = watch("gstFile");

  // Remove GST validation when "No"
  useEffect(() => {
    if (gstRegistered !== "Yes") {
      unregister("gstin");
      unregister("gstFile");
    }
  }, [gstRegistered, unregister]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "panFile" | "gstFile",
  ) => {
    const file = e.target.files?.[0] ?? null;

    setValue(field, file, {
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
      <h1 className="text-2xl font-semibold text-slate-900">
        Business Identity
      </h1>
      <p className="mt-2 text-slate-500">
        Verify your business identity by providing PAN and GST details.
      </p>

      <div className="mt-8 space-y-6">
        {/* ================= PAN SECTION ================= */}

        {/* PAN Number */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Business / Owner PAN
          </label>

          <input
            {...register("pan", {
              required: "PAN is required",
              pattern: {
                value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                message: "Enter valid PAN (ABCDE1234F)",
              },
            })}
            placeholder="ABCDE1234F"
            className={inputStyle(!!errors.pan)}
            style={{ textTransform: "uppercase" }}
          />

          {errors.pan && (
            <p className="mt-1 text-sm text-red-500">{errors.pan.message}</p>
          )}
        </div>

        {/* PAN Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Full Name on PAN
          </label>

          <input
            {...register("panName", {
              required: "Name as per PAN is required",
            })}
            placeholder="Name exactly as on PAN"
            className={inputStyle(!!errors.panName)}
          />

          {errors.panName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.panName.message}
            </p>
          )}
        </div>

        {/* PAN Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            PAN Document (PDF/DOC)
          </label>

          {/* Hidden field for validation */}
          <input
            type="hidden"
            {...register("panFile", {
              required: "PAN document is required",
            })}
          />

          <div className="flex items-center gap-4">
            <label className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 transition flex items-center gap-2">
              <FileText size={16} />
              Upload PAN
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, "panFile")}
                className="hidden"
              />
            </label>

            {panFile ? (
              <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                <BadgeCheck size={16} />
                Document uploaded
              </span>
            ) : (
              <span className="text-sm text-slate-400">No file selected</span>
            )}
          </div>

          {errors.panFile && (
            <p className="mt-2 text-sm text-red-500">
              {errors.panFile.message as string}
            </p>
          )}
        </div>

        {/* ================= GST SECTION ================= */}

        <div className="pt-6 border-t border-slate-200">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            GST Registered
          </label>

          <select
            {...register("gstRegistered", {
              required: "Please select GST status",
            })}
            className={inputStyle(!!errors.gstRegistered)}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {errors.gstRegistered && (
            <p className="mt-1 text-sm text-red-500">
              {errors.gstRegistered.message as string}
            </p>
          )}
        </div>

        {gstRegistered === "Yes" && (
          <>
            {/* GSTIN */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                GSTIN
              </label>

              <input
                {...register("gstin", {
                  required: "GSTIN is required",
                  pattern: {
                    value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/,
                    message: "Enter valid GSTIN",
                  },
                })}
                placeholder="GST Number"
                className={inputStyle(!!errors.gstin)}
                style={{ textTransform: "uppercase" }}
              />

              {errors.gstin && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.gstin.message}
                </p>
              )}
            </div>

            {/* GST Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                GST Document (PDF/DOC)
              </label>

              <input
                type="hidden"
                {...register("gstFile", {
                  required: "GST document is required",
                })}
              />

              <div className="flex items-center gap-4">
                <label className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 transition flex items-center gap-2">
                  <FileText size={16} />
                  Upload GST
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange(e, "gstFile")}
                    className="hidden"
                  />
                </label>

                {gstFile ? (
                  <span className="text-sm text-emerald-600 font-medium flex items-center gap-1">
                    <BadgeCheck size={16} />
                    Document uploaded
                  </span>
                ) : (
                  <span className="text-sm text-slate-400">
                    No file selected
                  </span>
                )}
              </div>

              {errors.gstFile && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.gstFile.message as string}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BusinessIdentityStep;
