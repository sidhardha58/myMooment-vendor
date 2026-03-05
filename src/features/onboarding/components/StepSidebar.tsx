import { CheckIcon } from "@heroicons/react/24/solid";

type Props = {
  steps: string[];
  currentStep: number;
};

const stepDescriptions = [
  "Enter your information",
  "Tell us about your business",
  "Verify your business identity",
  "Setup your bank account",
  "Review and agree to terms",
];

const StepSidebar = ({ steps, currentStep }: Props) => {
  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex md:flex-col fixed left-0 top-0 w-72 h-dvh bg-slate-50 border-r border-slate-200 z-40">
        <div className="flex-1 px-8 pt-8 pb-6 flex flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12">
            <img
              src="/vite.svg"
              alt="MyMoment Vendor Logo"
              className="w-9 h-9"
            />
            <h2 className="text-lg font-semibold text-slate-800 tracking-tight">
              MyMoment Vendor
            </h2>
          </div>

          {/* Steps Container */}
          <nav aria-label="Progress">
            <ol role="list" className="overflow-hidden">
              {steps.map((step, index) => {
                const isActive = currentStep === index;
                const isCompleted = currentStep > index;
                const isLast = index === steps.length - 1;

                return (
                  <li
                    key={index}
                    className={`relative ${!isLast ? "pb-12" : ""}`}
                  >
                    {/* Vertical Line Segment Logic */}
                    {!isLast && (
                      <div
                        className="absolute left-4.5 top-9 -ml-px h-full w-0.5 bg-slate-200"
                        aria-hidden="true"
                      >
                        {/* Animated Fill: Heights transitions from 0% to 100% */}
                        <div
                          className="bg-emerald-500 transition-all duration-500 ease-in-out w-full"
                          style={{
                            height: isCompleted ? "100%" : "0%",
                          }}
                        />
                      </div>
                    )}

                    <div className="group relative flex items-start">
                      {/* Circle Indicator */}
                      <span className="flex h-9 items-center">
                        <span
                          className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
                            ${
                              isCompleted
                                ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                                : isActive
                                  ? "border-2 border-blue-600 text-blue-600 bg-white"
                                  : "border-2 border-slate-300 text-slate-400 bg-white"
                            }`}
                        >
                          {isCompleted ? (
                            <CheckIcon className="w-5 h-5 transition-transform duration-300 scale-110" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </span>
                      </span>

                      {/* Labels */}
                      <span className="ml-4 flex min-w-0 flex-col mt-0.5">
                        <span
                          className={`text-[15px] font-semibold tracking-wide transition-colors duration-300 ${
                            isActive || isCompleted
                              ? "text-slate-900"
                              : "text-slate-400"
                          }`}
                        >
                          {step}
                        </span>
                        <span className="text-sm text-slate-400 leading-snug">
                          {stepDescriptions[index]}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-5 bg-slate-50">
          <p className="text-sm text-slate-500 text-center">
            Already have an account?{" "}
            <span
              onClick={() => (window.location.href = "/login")}
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-700 transition"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden w-full border-b border-slate-200 bg-white">
        <div className="flex items-center justify-center gap-3 px-4 py-4">
          <img src="/vite.svg" alt="MyMoment Vendor Logo" className="w-8 h-8" />
          <h2 className="text-base font-semibold text-slate-800">
            MyMoment Vendor
          </h2>
        </div>

        <div className="px-4 pb-6">
          <div className="relative flex justify-between items-center">
            {/* Background Line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-slate-200" />

            {/* Progress Line Animation (Horizontal for Mobile) */}
            <div
              className="absolute top-4 left-0 h-0.5 bg-emerald-500 transition-all duration-500 ease-in-out"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            />

            {steps.map((_, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <div key={index} className="relative z-10">
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isActive
                            ? "border-2 border-blue-600 text-blue-600 bg-white"
                            : "border-2 border-slate-300 text-slate-400 bg-white"
                      }`}
                  >
                    {isCompleted ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center text-sm text-slate-500 font-medium">
            Step {currentStep + 1} of {steps.length}:{" "}
            <span className="text-slate-900">{steps[currentStep]}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepSidebar;
