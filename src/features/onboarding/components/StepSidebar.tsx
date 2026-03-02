import { CheckIcon } from "@heroicons/react/24/solid";

type Props = {
  steps: string[];
  currentStep: number;
};

const stepDescriptions = [
  "Enter your personal information",
  "Tell us about your business",
  "Verify your business identity",
  "Setup your bank account",
  "Review and agree to terms",
];

const StepSidebar = ({ steps, currentStep }: Props) => {
  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex md:flex-col w-[300px] bg-slate-50 border-r border-slate-200 p-8">
        {/* Logo + Company Name */}
        <div className="flex items-center gap-3 mb-10">
          <img src="/vite.svg" alt="MyMoment Vendor Logo" className="w-8 h-8" />
          <h2 className="text-lg font-semibold text-slate-800">
            MyMoment Vendor
          </h2>
        </div>

        <div className="relative">
          {/* Base Line */}
          <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-slate-200" />

          {/* Progress Line */}
          <div
            className="absolute left-3 top-0 w-[2px] bg-emerald-500 transition-all duration-500"
            style={{
              height: `${(currentStep / (steps.length - 1)) * 100}%`,
            }}
          />

          {steps.map((step, index) => {
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;

            return (
              <div key={index} className="relative flex items-start mb-10">
                <div
                  className={`
                    z-10 flex items-center justify-center
                    w-8 h-8 rounded-full text-sm font-semibold
                    transition-all duration-300
                    ${
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "border-2 border-blue-600 text-blue-600 bg-white"
                          : "border-2 border-slate-300 text-slate-400 bg-white"
                    }
                  `}
                >
                  {isCompleted ? <CheckIcon className="w-4 h-4" /> : index + 1}
                </div>

                <div className="ml-4">
                  <div
                    className={`font-semibold ${
                      isActive || isCompleted
                        ? "text-slate-900"
                        : "text-slate-400"
                    }`}
                  >
                    {step}
                  </div>

                  <div className="text-sm text-slate-400 mt-1">
                    {stepDescriptions[index]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden w-full border-b border-slate-200 bg-white">
        {/* Logo + Name */}
        <div className="flex items-center justify-center gap-3 px-4 py-4">
          <img src="/vite.svg" alt="MyMoment Vendor Logo" className="w-7 h-7" />
          <h2 className="text-base font-semibold text-slate-800">
            MyMoment Vendor
          </h2>
        </div>

        {/* Stepper */}
        <div className="px-4 pb-6">
          <div className="relative flex justify-between items-center">
            {/* Base Line */}
            <div className="absolute top-4 left-0 right-0 h-[2px] bg-slate-200" />

            {/* Progress Line */}
            <div
              className="absolute top-4 left-0 h-[2px] bg-emerald-500 transition-all duration-500"
              style={{
                width: `${(currentStep / (steps.length - 1)) * 100}%`,
              }}
            />

            {steps.map((_, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <div
                  key={index}
                  className="relative flex items-center justify-center"
                >
                  <div
                    className={`
                      z-10 flex items-center justify-center
                      w-8 h-8 rounded-full text-sm font-semibold
                      transition-all duration-300
                      ${
                        isCompleted
                          ? "bg-emerald-500 text-white"
                          : isActive
                            ? "border-2 border-blue-600 text-blue-600 bg-white"
                            : "border-2 border-slate-300 text-slate-400 bg-white"
                      }
                    `}
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

          {/* Step Indicator */}
          <div className="mt-6 text-center">
            <div className="text-sm text-slate-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepSidebar;
