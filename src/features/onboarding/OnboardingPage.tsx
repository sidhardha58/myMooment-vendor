/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../auth/UseAuth";

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

  // FSSAI (conditional)
  fssaiNumber?: string;
  fssaiExpiry?: string;
  fssaiDocument?: File | null;

  accountType: string;
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  bankBranch?: string;
  bankAddress?: string;
  bankCity?: string;
  bankState?: string;
  bankProof: File | null;

  termsAccepted: boolean;
};

const baseStepFields: Record<number, (keyof OnboardingFormData)[]> = {
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
  const { user, login } = useAuth();

  const savedDraft = localStorage.getItem("onboarding_draft");

  const methods = useForm<OnboardingFormData>({
    mode: "onTouched",
    shouldUnregister: false,
    defaultValues: savedDraft ? JSON.parse(savedDraft) : {},
  });

  const { watch, setValue } = methods;
  const businessService = watch("businessService");

  /* ================= SAVE STEP ================= */
  useEffect(() => {
    localStorage.setItem("onboarding_step", currentStep.toString());
  }, [currentStep]);

  /* ================= SAVE DRAFT (WITHOUT FILES) ================= */
  useEffect(() => {
    const subscription = watch((value) => {
      const {
        displayImage,
        panFile,
        gstFile,
        bankProof,
        fssaiDocument,
        ...rest
      } = value;

      localStorage.setItem("onboarding_draft", JSON.stringify(rest));
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  /* ================= RESET FILE FIELDS ================= */
  useEffect(() => {
    setValue("displayImage", null);
    setValue("panFile", null);
    setValue("gstFile", null);
    setValue("bankProof", null);
    setValue("fssaiDocument", null);
  }, [setValue]);

  /* ================= NEXT STEP ================= */
  const nextStep = async () => {
    let fieldsToValidate = [...baseStepFields[currentStep]];

    if (currentStep === 2 && businessService === "Catering") {
      fieldsToValidate = [
        ...fieldsToValidate,
        "fssaiNumber",
        "fssaiExpiry",
        "fssaiDocument",
      ];
    }

    const valid = await methods.trigger(fieldsToValidate);
    if (!valid) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  /* ================= FINAL SUBMIT ================= */
  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setIsSubmitting(true);

      console.log("Final Onboarding Data:", data);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ Update user status to pending
      if (user) {
        const updatedUser = {
          ...user,
          status: "pending",
        };

        login(localStorage.getItem("vendor_token") || "", updatedUser);
      }

      localStorage.removeItem("onboarding_draft");
      localStorage.removeItem("onboarding_step");

      toast.success("Application submitted successfully 🎉");

      // ✅ Redirect to Submission Success Page
      navigate("/submission-success");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ================= RENDER STEPS ================= */
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
      <form className="min-h-dvh flex flex-col bg-white">
        <StepSidebar steps={steps} currentStep={currentStep} />

        <div className="flex-1 flex flex-col min-h-0 md:ml-72">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 min-h-0 overflow-y-auto p-6 md:p-10 pb-32">
              <div className="w-full">{renderStep()}</div>
            </div>

            <div className="sticky bottom-0 bg-white/80 backdrop-blur-md py-3 px-6 md:px-10 border-t border-slate-100 z-30">
              <div className="max-w-md flex gap-3">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 h-9 rounded-md bg-slate-100 text-slate-600 text-sm font-semibold cursor-pointer hover:bg-slate-200 transition-all active:scale-95"
                  >
                    Back
                  </button>
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
                    className={`flex-1 h-9 rounded-md text-sm font-semibold text-white transition-all active:scale-95 ${
                      methods.watch("termsAccepted") && !isSubmitting
                        ? "bg-blue-600 cursor-pointer hover:bg-blue-700 shadow-sm"
                        : "bg-slate-300 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextStep}
                    className={`${
                      currentStep === 0 ? "w-full" : "flex-1"
                    } h-9 rounded-md bg-blue-600 text-white text-sm font-semibold cursor-pointer hover:bg-blue-700 shadow-sm transition-all active:scale-95`}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default OnboardingPage;
