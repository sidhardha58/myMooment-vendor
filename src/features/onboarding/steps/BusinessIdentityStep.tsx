import { useFormContext, Controller } from "react-hook-form";
import type { OnboardingFormData } from "../OnboardingPage";
import { useEffect } from "react";
import { FileText, BadgeCheck } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BusinessIdentityStep = () => {
  const {
    register,
    setValue,
    watch,
    unregister,
    control,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const gstRegistered = watch("gstRegistered");
  const businessService = watch("businessService");

  const panFile = watch("panFile");
  const gstFile = watch("gstFile");
  const fssaiDocument = watch("fssaiDocument");

  /* ================= REMOVE GST WHEN NOT REGISTERED ================= */
  useEffect(() => {
    if (gstRegistered !== "Yes") {
      unregister("gstin");
      unregister("gstFile");
      setValue("gstFile", null, { shouldValidate: true });
    }
  }, [gstRegistered, unregister, setValue]);

  /* ================= REMOVE FSSAI WHEN NOT CATERING ================= */
  useEffect(() => {
    if (businessService !== "food") {
      unregister("fssaiNumber");
      unregister("fssaiExpiry");
      unregister("fssaiDocument");
      setValue("gstFile", null, { shouldValidate: true });
    }
  }, [businessService, unregister, setValue]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "panFile" | "gstFile" | "fssaiDocument",
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

  /* ================= FSSAI EXPIRY VALIDATION ================= */
  const validateExpiry = (value: Date | null | undefined): true | string => {
    if (!value) return "Expiry date is required";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const expiry = new Date(value.getTime());
    expiry.setHours(0, 0, 0, 0);

    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return "FSSAI license is expired";
    if (diffDays <= 30) return "License expiring within 30 days";

    return true;
  };

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold text-slate-900">
        Business Identity
      </h1>
      <p className="mt-2 text-slate-500">
        Verify your business identity by providing PAN, GST and regulatory
        details.
      </p>

      <div className="mt-8 space-y-6">
        {/* ================= PAN SECTION ================= */}
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
            <p className="mt-1 text-sm text-red-500">
              {errors.pan.message as string}
            </p>
          )}
        </div>

        {/* ================= PAN DOCUMENT ================= */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            PAN Document (PDF/DOC)
          </label>

          <input
            type="hidden"
            {...register("panFile", {
              required: "PAN document is required",
            })}
          />

          <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 transition">
            <FileText size={16} />
            Upload PAN
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => handleFileChange(e, "panFile")}
              className="hidden"
            />
          </label>

          {panFile instanceof File && (
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mt-2">
              <BadgeCheck size={16} />
              <span className="truncate max-w-xs">{panFile.name}</span>
            </div>
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
        </div>

        {gstRegistered === "Yes" && (
          <>
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

            <input
              type="hidden"
              {...register("gstFile", {
                required: "GST document is required",
              })}
            />

            <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 transition">
              <FileText size={16} />
              Upload GST
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleFileChange(e, "gstFile")}
                className="hidden"
              />
            </label>

            {gstFile instanceof File && (
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mt-2">
                <BadgeCheck size={16} />
                <span className="truncate max-w-xs">{gstFile.name}</span>
              </div>
            )}
          </>
        )}

        {/* ================= FSSAI SECTION ================= */}
        {businessService === "food" && (
          <div className="pt-6 border-t border-slate-200 space-y-6">
            <h3 className="text-lg font-semibold text-slate-900">
              FSSAI License Details
            </h3>

            {/* ================= FSSAI REQUIREMENTS NOTICE ================= */}
            <div className="rounded-xl border border-purple-400 bg-purple-50 p-5">
              <h4 className="text-sm font-semibold text-purple-700 uppercase tracking-wide">
                Requirements
              </h4>

              <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc list-inside">
                <li>
                  The FSSAI certificate must match the name of the restaurant or
                  owner.
                </li>
                <li>
                  The address on the FSSAI certificate must match your business
                  address.
                </li>
                <li>The license must not expire within the next 30 days.</li>
              </ul>
            </div>

            {/* ================= FSSAI NUMBER ================= */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                FSSAI License Number
              </label>

              <input
                {...register("fssaiNumber", {
                  required: "FSSAI number is required",
                  pattern: {
                    value: /^[0-9]{14}$/,
                    message: "FSSAI must be 14 digits",
                  },
                })}
                placeholder="Enter 14-digit FSSAI number"
                className={inputStyle(!!errors.fssaiNumber)}
              />

              {errors.fssaiNumber && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.fssaiNumber.message as string}
                </p>
              )}
            </div>

            {/* ================= FSSAI EXPIRY ================= */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                FSSAI Expiry Date
              </label>

              <Controller
                control={control}
                name="fssaiExpiry"
                rules={{ validate: validateExpiry }}
                render={({ field }) => (
                  <>
                    <DatePicker
                      selected={field.value ?? null}
                      onChange={(date: Date | null) =>
                        field.onChange(date ?? undefined)
                      }
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD/MM/YYYY"
                      minDate={new Date()}
                      className={inputStyle(!!errors.fssaiExpiry)}
                    />

                    {errors.fssaiExpiry && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.fssaiExpiry.message as string}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* ================= FSSAI DOCUMENT ================= */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                FSSAI License Document (PDF/DOC)
              </label>

              <input
                type="hidden"
                {...register("fssaiDocument", {
                  required: "FSSAI document is required",
                })}
              />

              <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 transition">
                <FileText size={16} />
                Upload FSSAI License
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileChange(e, "fssaiDocument")}
                  className="hidden"
                />
              </label>

              {fssaiDocument instanceof File && (
                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium mt-2">
                  <BadgeCheck size={16} />
                  <span className="truncate max-w-xs">
                    {fssaiDocument.name}
                  </span>
                </div>
              )}

              {errors.fssaiDocument && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.fssaiDocument.message as string}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessIdentityStep;
