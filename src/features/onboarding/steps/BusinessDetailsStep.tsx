/* eslint-disable @typescript-eslint/no-unused-vars */
import { useFormContext } from "react-hook-form";
import type { OnboardingFormData } from "../OnboardingPage";
import { useEffect, useState } from "react";
import { CheckCircle2, Image as ImageIcon, MapPin } from "lucide-react";

const BusinessDetailsStep = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<OnboardingFormData>();

  /* ================= WATCH FORM VALUES ================= */

  const businessService = watch("businessService");
  const displayName = watch("displayName");
  const houseNo = watch("houseNo");
  const area = watch("area");
  const city = watch("city");
  const state = watch("state");
  const pincode = watch("pincode");

  const latitude = watch("latitude");
  const longitude = watch("longitude");

  const displayImage = watch("displayImage");

  /* ================= LOCATION TOGGLE ================= */

  const [locationEnabled, setLocationEnabled] = useState(false);

  /* ================= IMAGE PREVIEW ================= */

  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (displayImage instanceof File) {
      const objectUrl = URL.createObjectURL(displayImage);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreview(null);
  }, [displayImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setValue("displayImage", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  /* ================= INPUT STYLE ================= */

  const inputStyle = (error?: boolean) =>
    `w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
      error
        ? "border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/30"
        : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 bg-white"
    }`;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-12 xl:gap-24 w-full">
      {/* ================= LEFT SIDE FORM ================= */}

      <div className="w-full max-w-md shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Business Details
        </h1>

        <p className="mt-2 text-slate-500 text-[15px]">
          Tell us more about your business services and location.
        </p>

        <div className="mt-8 space-y-6">
          {/* ================= Business Service ================= */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Business Service
            </label>

            <div className="relative">
              <select
                {...register("businessService", {
                  required: "Business service is required",
                })}
                className={`appearance-none pr-10 ${inputStyle(
                  !!errors.businessService,
                )}`}
              >
                <option value="">Select service</option>

                {/* Future backend categories */}
                {/* <option value="Catering">Catering</option> */}

                <option value="food">Food</option>
                <option value="photography">Photography</option>
                <option value="makeup">Makeup</option>
                <option value="mehandi">Mehandi</option>
              </select>

              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {errors.businessService && (
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.businessService.message}
              </p>
            )}
          </div>

          {/* ================= Display Name ================= */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
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
              <p className="mt-1 text-xs text-red-500 font-medium">
                {errors.displayName.message}
              </p>
            )}
          </div>

          {/* ================= Shop Image Upload ================= */}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Shop Image
            </label>

            <input
              type="hidden"
              {...register("displayImage", {
                required: "Shop image is required",
                validate: (value) =>
                  value instanceof File || "Please upload a valid image",
              })}
            />

            <div className="flex items-center gap-4">
              <label className="shrink-0 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md cursor-pointer hover:bg-blue-700 transition active:scale-95 shadow-sm">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {displayImage instanceof File ? (
                <div className="flex items-center gap-2 text-emerald-600 min-w-0">
                  <CheckCircle2 size={16} />
                  <span className="text-sm font-medium truncate max-w-37.5">
                    {displayImage.name}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-slate-400">
                  <ImageIcon size={16} />
                  <span className="text-sm font-medium">No image selected</span>
                </div>
              )}
            </div>

            {errors.displayImage && (
              <p className="mt-2 text-xs text-red-500 font-medium italic">
                {errors.displayImage.message as string}
              </p>
            )}
          </div>

          {/* ================= Location Details ================= */}

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
              Location Details
            </h3>

            <div className="space-y-4">
              <input
                {...register("houseNo", { required: "Required" })}
                placeholder="House No / Floor"
                className={inputStyle(!!errors.houseNo)}
              />

              <input
                {...register("area", { required: "Required" })}
                placeholder="Area / Street"
                className={inputStyle(!!errors.area)}
              />

              <input
                {...register("city", { required: "Required" })}
                placeholder="City"
                className={inputStyle(!!errors.city)}
              />

              {/* Backend required fields */}
              <input
                {...register("state", { required: "Required" })}
                placeholder="State"
                className={inputStyle(!!errors.state)}
              />

              <input
                {...register("pincode", { required: "Required" })}
                placeholder="Pincode"
                type="number"
                className={inputStyle(!!errors.pincode)}
              />
            </div>

            {/* ================= Location Coordinates ================= */}

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setLocationEnabled(!locationEnabled)}
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <MapPin size={16} />

                {locationEnabled ? "Remove Coordinates" : "Add Coordinates"}

                {locationEnabled && <CheckCircle2 size={16} />}
              </button>

              {locationEnabled && (
                <div className="space-y-4 mt-4">
                  {/* Future: Replace with Mapbox */}
                  {/* TODO: Integrate Mapbox location picker */}

                  <input
                    {...register("latitude")}
                    placeholder="Latitude"
                    className={inputStyle()}
                  />

                  <input
                    {...register("longitude")}
                    placeholder="Longitude"
                    className={inputStyle()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE PREVIEW ================= */}

      <div className="flex-1 w-full max-w-sm sticky top-10 hidden lg:block lg:mt-12">
        <PreviewSection
          preview={preview}
          displayName={displayName}
          businessService={businessService}
          houseNo={houseNo}
          area={area}
          city={city}
        />
      </div>

      <div className="lg:hidden w-full mt-8">
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

/* ================= PREVIEW COMPONENTS ================= */

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
    <div className="border border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50/50 flex flex-col items-center">
      <h3 className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mb-6 w-full text-center">
        Customer View Reference
      </h3>

      <div className="w-full max-w-70">
        <ProfilePreview {...props} />
      </div>

      <p className="mt-6 text-[11px] text-slate-400 leading-relaxed text-center italic">
        This square profile format is optimized for mobile app discovery.
      </p>
    </div>
  );
};

const ProfilePreview = ({
  preview,
  displayName,
  businessService,
  houseNo,
  area,
  city,
}: ProfilePreviewProps) => {
  return (
    <div className="aspect-square w-full border border-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/60 bg-white flex flex-col transition-all duration-500 hover:scale-[1.02]">
      <div className="flex-1 bg-slate-100 relative overflow-hidden group">
        {preview ? (
          <img
            src={preview}
            alt="Business"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-200" />
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              No Photo
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-center bg-white border-t border-slate-50">
        <h4 className="text-base font-extrabold text-slate-900 truncate leading-tight">
          {displayName || "Business Name"}
        </h4>

        <div className="mt-1">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold uppercase">
            {businessService || "Category"}
          </span>
        </div>

        <p className="text-[10px] text-slate-400 mt-2 truncate font-medium">
          {[houseNo, area, city].filter(Boolean).join(", ") ||
            "Location details..."}
        </p>
      </div>
    </div>
  );
};

export default BusinessDetailsStep;
