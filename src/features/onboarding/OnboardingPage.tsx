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

import {
  registerPersonal,
  registerBusiness,
  registerIdentity,
  registerBank,
  registerTerms,
} from "./api/onboardingApi";

const steps = [
  "Owner Details",
  "Business Details",
  "Business Identity",
  "Bank Details",
  "Partnership",
];

export type OnboardingFormData = {
  // ownerName: string;
  // email: string;
  first_name: string;
  last_name: string;
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

  fssaiNumber?: string;
  fssaiExpiry?: Date | null;
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
  // 0: ["ownerName", "email", "password", "confirmPassword"],
  0: ["first_name", "last_name", "password", "confirmPassword"],

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

  /* ================= SAVE DRAFT ================= */

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

    if (currentStep === 2 && businessService === "food") {
      fieldsToValidate = [
        ...fieldsToValidate,
        "fssaiNumber",
        "fssaiExpiry",
        "fssaiDocument",
      ];
    }

    const valid = await methods.trigger(fieldsToValidate);
    if (!valid) return;

    const data = methods.getValues();

    try {
      setIsSubmitting(true);

      /* STEP 1 */

      if (currentStep === 0) {
        await registerPersonal({
          // ownerName: data.ownerName,
          // email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          password: data.password,
        });
      }

      if (currentStep === 1) {
        const formData = new FormData();

        /* OLD STRUCTURE */
        /*
  formData.append("businessService", data.businessService);
  formData.append("displayName", data.displayName);
  formData.append("houseNo", data.houseNo);
  formData.append("area", data.area);
  formData.append("pincode", data.pincode);
  formData.append("city", data.city);
  formData.append("state", data.state);
  */

        /* NEW BACKEND STRUCTURE */

        formData.append("category", data.businessService);
        formData.append("display_name", data.displayName);

        formData.append("hasAddress", "true");

        const address = {
          house_number: data.houseNo,
          full_address: data.area,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
        };

        formData.append("address", JSON.stringify(address));

        formData.append("hasLocation", "true");

        const location = {
          latitude: data.latitude || 0,
          longitude: data.longitude || 0,
        };

        formData.append("location", JSON.stringify(location));

        if (data.displayImage) {
          formData.append("profile", data.displayImage);
        }

        await registerBusiness(formData);
      }

      /* STEP 3 */

      if (currentStep === 2) {
        const formData = new FormData();

        /* OLD STRUCTURE */
        /*
  formData.append("pan", data.pan);
  formData.append("panName", data.panName);

  if (data.panFile) {
    formData.append("panFile", data.panFile);
  }

  formData.append("gstRegistered", data.gstRegistered);

  if (data.gstin) formData.append("gstin", data.gstin);
  if (data.gstFile) formData.append("gstFile", data.gstFile);

  if (businessService === "Food") {
    if (data.fssaiNumber) formData.append("fssaiNumber", data.fssaiNumber);
    if (data.fssaiExpiry) formData.append("fssaiExpiry", data.fssaiExpiry);
    if (data.fssaiDocument) formData.append("fssaiDocument", data.fssaiDocument);
  }
  */

        /* NEW BACKEND STRUCTURE */

        formData.append("pan_number", data.pan);
        formData.append("pan_name", data.panName);

        if (data.panFile) {
          formData.append("pan", data.panFile); // backend expects "pan"
        }

        formData.append(
          "gstin_registered",
          data.gstRegistered === "Yes" ? "true" : "false",
        );

        if (data.gstin) {
          formData.append("gstin", data.gstin);
        }

        if (data.gstFile) {
          formData.append("gst", data.gstFile);
        }

        if (businessService === "food") {
          if (data.fssaiNumber) {
            formData.append("fssai_number", data.fssaiNumber);
          }

          if (data.fssaiExpiry) {
            const d = new Date(data.fssaiExpiry);

            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, "0");
            const day = String(d.getDate()).padStart(2, "0");

            const expiryDate = `${year}-${month}-${day}`;

            formData.append("fssai_expiry", expiryDate);
          }

          if (data.fssaiDocument) {
            formData.append("fssai", data.fssaiDocument);
          }
        }

        await registerIdentity(formData);
      }

      /* STEP 4 */

      if (currentStep === 3) {
        const formData = new FormData();

        /* OLD STRUCTURE */
        /*
  formData.append("accountType", data.accountType);
  formData.append("accountHolderName", data.accountHolderName);
  formData.append("accountNumber", data.accountNumber);
  formData.append("ifscCode", data.ifscCode);

  if (data.bankName) formData.append("bankName", data.bankName);
  if (data.bankBranch) formData.append("bankBranch", data.bankBranch);
  if (data.bankAddress) formData.append("bankAddress", data.bankAddress);
  if (data.bankCity) formData.append("bankCity", data.bankCity);
  if (data.bankState) formData.append("bankState", data.bankState);

  if (data.bankProof) {
    formData.append("bankProof", data.bankProof);
  }
  */

        /* NEW BACKEND STRUCTURE */

        formData.append("bank_name", data.bankName);

        formData.append("account_name", data.accountHolderName);

        formData.append("account_number", data.accountNumber);

        formData.append("account_type", data.accountType.toLowerCase());

        formData.append("ifsc_code", data.ifscCode);

        if (data.bankProof) {
          formData.append("passbook", data.bankProof);
        }

        await registerBank(formData);
      }

      setCurrentStep((prev) => prev + 1);
    } catch (error) {
      toast.error("Failed to save step. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  /* ================= FINAL SUBMIT ================= */

  const onSubmit = async (data: OnboardingFormData) => {
    try {
      setIsSubmitting(true);

      /* OLD STRUCTURE */
      /*
await registerTerms({
  termsAccepted: data.termsAccepted,
});
*/

      /* NEW BACKEND STRUCTURE */

      await registerTerms({
        terms_agreed: data.termsAccepted,
        tds_authorized: data.termsAccepted,
      });

      if (user) {
        const updatedUser = {
          ...user,
          vendor_status: "completed",
          vendor_operational_status: "verification_pending",
        };

        login(localStorage.getItem("vendor_token") || "", updatedUser);
      }

      localStorage.removeItem("onboarding_draft");
      localStorage.removeItem("onboarding_step");

      toast.success("Application submitted successfully 🎉");

      navigate("/submission-success");
    } catch (error) {
      toast.error("Submission failed.");
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
