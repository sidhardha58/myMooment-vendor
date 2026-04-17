import { useState } from "react";
import type { MenuData } from "../../../../dashboard/types/menu.types";

import Step1MenuInfo from "./steps/Step1MenuInfo";
import Step2Sections from "./steps/Step2Sections";
import Step2Items from "./steps/Step2Items";
import Step3Summary from "./steps/Step3Summary";

export default function AddMenuWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);

  const [menuData, setMenuData] = useState<MenuData>({
    name: "",
    type: "veg",
    price: 0,
    minMembers: 0,
    maxMembers: 0,
    image: null,
    imagePreview:"",
    sections: [],
  });

  const isValid = !(
    !menuData.name ||
    menuData.sections.length === 0 ||
    menuData.sections.some((s) => !s.name || s.items.length === 0)
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* MODAL */}
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] shadow-2xl flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Add New Menu</h2>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        {/* STEPPER */}
        <div className="px-6 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            {["Menu Info", "Sections & Items", "Summary"].map((label, i) => {
              const isActive = step === i + 1;
              const isCompleted = step > i + 1;

              return (
                <div key={i} className="flex items-center gap-2">
                  {/* STEP CIRCLE */}
                  <div
                    className={`w-6 h-6 flex items-center justify-center text-xs rounded-full transition ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {i + 1}
                  </div>

                  {/* LABEL */}
                  <span
                    className={`text-sm ${
                      isActive ? "font-semibold text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>

                  {/* LINE */}
                  {i < 2 && <div className="w-10 h-px bg-gray-200 ml-2" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-6 py-5 overflow-y-auto flex-1 min-h-87.5">
          {step === 1 && (
            <Step1MenuInfo menuData={menuData} setMenuData={setMenuData} />
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Step2Sections menuData={menuData} setMenuData={setMenuData} />
              <Step2Items menuData={menuData} setMenuData={setMenuData} />
            </div>
          )}

          {step === 3 && <Step3Summary menuData={menuData} />}
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100 bg-gray-50">
          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Next
            </button>
          ) : (
            <button
              disabled={!isValid}
              onClick={() => {
                console.log("FINAL MENU DATA:", menuData);
                onClose();
              }}
              className={`px-5 py-2 text-sm rounded-lg transition shadow-sm ${
                isValid
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Save Menu
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
