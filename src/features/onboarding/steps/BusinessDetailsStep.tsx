import { useFormContext } from "react-hook-form";
import type { OnboardingFormData } from "../OnboardingPage";
import { useEffect, useState } from "react";
import { Store } from "lucide-react";

const BusinessDetailsStep = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  const businessService = watch("businessService");
  const displayName = watch("displayName");
  const houseNo = watch("houseNo");
  const area = watch("area");
  const city = watch("city");
  const displayImage = watch("displayImage");

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (displayImage instanceof File) {
      const url = URL.createObjectURL(displayImage);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreview(null);
    }
  }, [displayImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setValue("displayImage", file as File, {
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
    <div className="flex flex-col lg:flex-row gap-10">
      {/* LEFT SIDE */}
      <div className="flex-1 max-w-2xl">
        <h1 className="text-2xl font-semibold text-slate-900">
          Business Details
        </h1>
        <p className="mt-2 text-slate-500">
          Tell us more about your business services and location.
        </p>

        <div className="mt-8 space-y-6">
          {/* Business Service */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Business Service
            </label>

            <div className="relative">
              <Store
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                {...register("businessService", {
                  required: "Business service is required",
                })}
                className={`pl-11 ${inputStyle(!!errors.businessService)}`}
              >
                <option value="">Select service</option>
                <option value="Catering">Catering</option>
                <option value="Photography">Photography</option>
                <option value="Decoration">Decoration</option>
              </select>
            </div>

            {errors.businessService && (
              <p className="mt-1 text-sm text-red-500">
                {errors.businessService.message}
              </p>
            )}
          </div>

          {/* Display Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Display Name
            </label>

            <input
              {...register("displayName", {
                required: "Display name is required",
              })}
              placeholder="Your Business Name"
              className={inputStyle(!!errors.displayName)}
            />

            {errors.displayName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* Hidden Image Field */}
          <input
            type="hidden"
            {...register("displayImage", {
              validate: (value) =>
                value instanceof File || "Shop image is required",
            })}
          />

          {/* Upload Button */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Shop Image
            </label>

            <div className="flex items-center gap-4">
              <label className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 transition">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {preview ? (
                <span className="text-sm text-emerald-600 font-medium">
                  ✓ Image uploaded
                </span>
              ) : (
                <span className="text-sm text-slate-400">
                  No image selected
                </span>
              )}
            </div>

            {errors.displayImage && (
              <p className="mt-2 text-sm text-red-500">
                {errors.displayImage.message as string}
              </p>
            )}
          </div>

          {/* MOBILE PREVIEW */}
          <div className="lg:hidden mt-6">
            <PreviewSection
              preview={preview}
              displayName={displayName}
              businessService={businessService}
              houseNo={houseNo}
              area={area}
              city={city}
            />
          </div>

          {/* Location */}
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Location Details
            </h3>

            <div className="mt-4 space-y-4">
              <input
                {...register("houseNo", {
                  required: "House number is required",
                })}
                placeholder="House No / Floor"
                className={inputStyle(!!errors.houseNo)}
              />
              {errors.houseNo && (
                <p className="text-sm text-red-500">{errors.houseNo.message}</p>
              )}

              <input
                {...register("area", {
                  required: "Area is required",
                })}
                placeholder="Area / Street"
                className={inputStyle(!!errors.area)}
              />
              {errors.area && (
                <p className="text-sm text-red-500">{errors.area.message}</p>
              )}

              <input
                {...register("city", {
                  required: "City is required",
                })}
                placeholder="City"
                className={inputStyle(!!errors.city)}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP PREVIEW */}
      <div className="hidden lg:block w-[340px]">
        <PreviewSection
          preview={preview}
          displayName={displayName}
          businessService={businessService}
          houseNo={houseNo}
          area={area}
          city={city}
        />
      </div>
    </div>
  );
};

export default BusinessDetailsStep;

/* ----------------------------- */
/* Preview Section Wrapper */
/* ----------------------------- */

interface ProfilePreviewProps {
  preview: string | null;
  displayName?: string;
  businessService?: string;
  houseNo?: string;
  area?: string;
  city?: string;
}

const PreviewSection = (props: ProfilePreviewProps) => {
  return (
    <div className="border border-dashed border-slate-300 rounded-xl p-5 bg-slate-50">
      <h3 className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
        Customer View Reference
      </h3>

      <div className="mt-4">
        <ProfilePreview {...props} />
      </div>

      <p className="mt-4 text-xs text-slate-400">
        This is how your business will appear to customers.
      </p>
    </div>
  );
};

/* ----------------------------- */
/* Profile Card */
/* ----------------------------- */

const ProfilePreview = ({
  preview,
  displayName,
  businessService,
  houseNo,
  area,
  city,
}: ProfilePreviewProps) => {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
      <div className="h-44 bg-slate-100 flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="Business"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-slate-400 text-sm">No Image Selected</span>
        )}
      </div>

      <div className="p-4">
        <h4 className="font-semibold text-slate-900">
          {displayName || "Your Business Name"}
        </h4>

        <p className="text-sm text-blue-600 mt-1">
          {businessService || "Service Category"}
        </p>

        <p className="text-xs text-slate-500 mt-2">
          {[houseNo, area, city].filter(Boolean).join(", ") ||
            "Business Location"}
        </p>
      </div>
    </div>
  );
};
