/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import StepSidebar from "./components/StepSidebar";
import OwnerDetailsStep from "./steps/OwnerDetailsStep";
import BusinessDetailsStep from "./steps/BusinessDetailsStep";
import BusinessIdentityStep from "./steps/BusinessIdentityStep";
import BankDetailsStep from "./steps/BankDetailsStep";
import PartnershipStep from "./steps/PartnershipStep";

const steps = [
  "Owner Details",
  "Business Details",
  "Business Identity",
  "Bank Details",
  "Partnership",
];

export type OnboardingFormData = {
  ownerName: string;
  email: string;
  password: string;
  confirmPassword: string;

  businessService: string;
  displayName: string;
  displayImage: File | null;

  latitude?: number;
  longitude?: number;
  houseNo: string;
  area: string;
  pincode: string;
  city: string;
  state: string;

  pan: string;
  panName: string;
  panFile: File | null;

  gstRegistered: string;
  gstin?: string;
  gstFile?: File | null;

  accountType: string;
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  bankProof: File | null;

  termsAccepted: boolean;
};

const stepFields: Record<number, (keyof OnboardingFormData)[]> = {
  0: ["ownerName", "email", "password", "confirmPassword"],
  1: [
    "businessService",
    "displayName",
    "displayImage",
    "houseNo",
    "area",
    "pincode",
    "city",
    "state",
  ],
  2: ["pan", "panName", "panFile", "gstRegistered", "gstin", "gstFile"],
  3: [
    "accountType",
    "accountHolderName",
    "accountNumber",
    "confirmAccountNumber",
    "ifscCode",
    "bankProof",
  ],
  4: ["termsAccepted"],
};

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("onboarding_step", currentStep.toString());
  }, [currentStep]);

  const savedDraft = localStorage.getItem("onboarding_draft");

  const methods = useForm<OnboardingFormData>({
    mode: "onTouched",
    shouldUnregister: false,
    defaultValues: savedDraft ? JSON.parse(savedDraft) : {},
  });

  const { watch, setValue } = methods;

  useEffect(() => {
    const subscription = watch((value) => {
      const { displayImage, panFile, gstFile, bankProof, ...rest } = value;
      localStorage.setItem("onboarding_draft", JSON.stringify(rest));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    setValue("displayImage", null);
    setValue("panFile", null);
    setValue("gstFile", null);
    setValue("bankProof", null);
  }, [setValue]);

  const nextStep = async () => {
    const fieldsToValidate = stepFields[currentStep];
    const valid = await methods.trigger(fieldsToValidate);
    if (!valid) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // ✅ FINAL SUBMIT HANDLER
  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setIsSubmitting(true);

      // 👉 Replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Final Submit Data:", data);

      localStorage.removeItem("onboarding_draft");
      localStorage.removeItem("onboarding_step");

      toast.success("Onboarding completed successfully 🎉");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <OwnerDetailsStep />;
      case 1:
        return <BusinessDetailsStep />;
      case 2:
        return <BusinessIdentityStep />;
      case 3:
        return <BankDetailsStep />;
      case 4:
        return <PartnershipStep submitAttempted={submitAttempted} />;
      default:
        return <div>Step Coming Soon</div>;
    }
  };

  return (
    <FormProvider {...methods}>
      <form className="min-h-screen">
        <div className="flex flex-col md:flex-row min-h-screen">
          <StepSidebar steps={steps} currentStep={currentStep} />

          <div className="flex-1 p-6 md:p-10 bg-white">
            {renderStep()}

            <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-full sm:w-auto px-6 py-2 border border-slate-300 rounded-md"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep === steps.length - 1 ? (
                <button
                  type="button"
                  disabled={!methods.watch("termsAccepted") || isSubmitting}
                  onClick={async () => {
                    setSubmitAttempted(true);
                    const valid = await methods.trigger(["termsAccepted"]);
                    if (!valid) return;
                    methods.handleSubmit(onSubmit)();
                  }}
                  className={`w-full sm:w-auto px-6 py-2 rounded-md text-white transition ${
                    methods.watch("termsAccepted") && !isSubmitting
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default OnboardingPage;
