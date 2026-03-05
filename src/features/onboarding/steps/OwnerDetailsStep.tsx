import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import type { OnboardingFormData } from "../OnboardingPage";

const OwnerDetailsStep = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<OnboardingFormData>();

  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputBaseStyle =
    "w-full rounded-lg border px-4 py-3 text-sm outline-none transition";

  const getInputStyle = (error?: boolean) =>
    `${inputBaseStyle} ${
      error
        ? "border-red-500 focus:ring-2 focus:ring-red-200"
        : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
    }`;

  return (
    <div className="max-w-md">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-slate-900">Owner Details</h1>
      <p className="mt-2 text-slate-500">
        Please provide your personal information to set up your account.
      </p>

      <div className="mt-8 space-y-6">
        {/* Owner Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Owner Name
          </label>

          <input
            {...register("ownerName", {
              required: "Owner name is required",
            })}
            placeholder="Enter your full name"
            className={getInputStyle(!!errors.ownerName)}
          />

          {errors.ownerName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.ownerName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Company Email ID
          </label>

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
            placeholder="test@example.com"
            className={getInputStyle(!!errors.email)}
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              className={`${getInputStyle(!!errors.password)} pr-10`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`${getInputStyle(!!errors.confirmPassword)} pr-10`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDetailsStep;
