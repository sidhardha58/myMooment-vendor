/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import * as api from "../../api/couponApi";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: any;
  isEdit?: boolean;
};

const CreateCouponModal = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
  isEdit,
}: Props) => {
  const [form, setForm] = useState({
    code: "",
    type: "percentage",
    value: "",
    min_order_amount: "",
    max_discount: "",
    usage_limit: "",
    per_user_limit: "1",
    start_date: "",
    end_date: "",
    isUnlimited: true,
    applicability: "all",
    categories: [] as string[],
  });

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        code: initialData.code || "",
        type: initialData.type || "percentage",
        value: String(initialData.value || ""),
        min_order_amount: String(initialData.min_order_amount || ""),
        max_discount: String(initialData.max_discount || ""),
        usage_limit: String(initialData.usage_limit || ""),
        per_user_limit: String(initialData.per_user_limit || "1"),
        start_date: initialData.start_date?.slice(0, 10) || "",
        end_date: initialData.end_date?.slice(0, 10) || "",
        isUnlimited: !initialData.usage_limit,
        applicability:
          initialData.applicable_categories?.length > 0 ? "specific" : "all",
        categories: initialData.applicable_categories || [],
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (key: any, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateCode = () => {
    const code = "SAVE" + Math.floor(100 + Math.random() * 900);
    handleChange("code", code);
  };

  const categoriesList = ["Breakfast", "Lunch", "Snacks", "Dinner"];

  const formatDate = (date: string) => {
    if (!date) return "Today";
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        code: form.code,
        type: form.type,
        value: Number(form.value),
        min_order_amount: Number(form.min_order_amount),
        max_discount: form.max_discount ? Number(form.max_discount) : undefined,
        usage_limit: form.isUnlimited ? 100 : Number(form.usage_limit),
        per_user_limit: Number(form.per_user_limit),
        start_date: form.start_date,
        end_date: form.end_date,
        applicable_categories:
          form.applicability === "all" ? [] : form.categories,
      };

      if (initialData?._id) {
        await api.updateCoupon(initialData._id, payload);
      } else {
        await api.createCoupon(payload);
      }

      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#f8fafc] w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-xl">
        {/* HEADER */}
        <div className="flex justify-between items-start p-8 border-b">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {isEdit ? "Edit Coupon" : "Create New Coupon"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Set up your promotional offer and visibility rules.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-10 p-8">
          {/* LEFT PANEL */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 space-y-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            {/* Coupon Details */}
            <h3 className="font-semibold text-gray-800 text-lg">
              Coupon Details
            </h3>

            {/* CODE */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">
                COUPON CODE
              </p>

              <div className="flex">
                <input
                  value={form.code}
                  onChange={(e) => handleChange("code", e.target.value)}
                  placeholder="e.g. SAVE500"
                  className="flex-1 bg-gray-50 border border-transparent rounded-l-xl px-4 py-2.5 text-sm
        focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition disabled:bg-gray-100"
                />

                <button
                  onClick={generateCode}
                  className="px-4 rounded-r-xl bg-gray-100 hover:bg-gray-200 text-sm font-medium transition disabled:opacity-50"
                >
                  Generate
                </button>
              </div>
            </div>

            {/* TYPE + VALUE */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  DISCOUNT TYPE
                </p>

                <div className="flex bg-gray-100 p-1 rounded-xl">
                  <button
                    onClick={() => handleChange("type", "percentage")}
                    className={`flex-1 py-2 text-sm rounded-lg transition ${
                      form.type === "percentage"
                        ? "bg-white shadow-sm font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    % Percentage
                  </button>

                  <button
                    onClick={() => handleChange("type", "flat")}
                    className={`flex-1 py-2 text-sm rounded-lg transition ${
                      form.type === "flat"
                        ? "bg-white shadow-sm font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    ₹ Flat Amount
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 mb-2">
                  DISCOUNT VALUE
                </p>

                <input
                  type="number"
                  value={form.value}
                  onChange={(e) => handleChange("value", e.target.value)}
                  placeholder="₹ 0.00"
                  className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-2.5 text-sm
        focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition"
                />
              </div>
            </div>

            {/* CONDITIONS */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                Conditions & Limits
              </h4>

              {/* TOP */}
              <div className="grid grid-cols-2 gap-5">
                {/* MIN ORDER */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    MINIMUM BOOKING AMOUNT
                  </p>

                  <div className="flex items-center bg-gray-50 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-blue-500">
                    <span className="text-gray-400 text-sm mr-2">₹</span>
                    <input
                      value={form.min_order_amount}
                      onChange={(e) =>
                        handleChange("min_order_amount", e.target.value)
                      }
                      className="bg-transparent w-full outline-none text-sm"
                      placeholder="0"
                    />
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Only applies if order exceeds this amount
                  </p>
                </div>

                {/* MAX DISCOUNT */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    MAXIMUM DISCOUNT CAP
                  </p>

                  <div
                    className={`flex items-center rounded-xl px-3 py-2.5 ${
                      form.type === "flat"
                        ? "bg-gray-100"
                        : "bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500"
                    }`}
                  >
                    <span className="text-gray-400 text-sm mr-2">₹</span>
                    <input
                      disabled={form.type === "flat"}
                      value={form.max_discount}
                      onChange={(e) =>
                        handleChange("max_discount", e.target.value)
                      }
                      className="bg-transparent w-full outline-none text-sm disabled:text-gray-400"
                      placeholder={form.type === "flat" ? "No Limit" : "0"}
                    />
                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Maximum value this coupon can deduct
                  </p>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="grid grid-cols-2 gap-5 mt-6">
                {/* TOTAL USES */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    TOTAL USES
                  </p>

                  <input
                    disabled={form.isUnlimited}
                    value={form.usage_limit}
                    onChange={(e) =>
                      handleChange("usage_limit", e.target.value)
                    }
                    placeholder="Unlimited"
                    className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-2.5 text-sm
          focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 outline-none"
                  />

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      checked={form.isUnlimited}
                      onChange={() =>
                        handleChange("isUnlimited", !form.isUnlimited)
                      }
                    />
                    <span className="text-xs text-gray-600">Unlimited</span>
                  </div>
                </div>

                {/* PER USER */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-2">
                    PER USER USAGE LIMIT
                  </p>

                  <input
                    value={form.per_user_limit}
                    onChange={(e) =>
                      handleChange("per_user_limit", e.target.value)
                    }
                    placeholder="1"
                    className="w-full bg-gray-50 border border-transparent rounded-xl px-4 py-2.5 text-sm
          focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* VALIDITY */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Validity</h4>

              <div className="grid grid-cols-2 gap-5">
                <input
                  type="date"
                  value={form.start_date}
                  onChange={(e) => handleChange("start_date", e.target.value)}
                  className="bg-gray-50 border border-transparent rounded-xl px-4 py-2.5 text-sm
        focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <input
                  type="date"
                  value={form.end_date}
                  onChange={(e) => handleChange("end_date", e.target.value)}
                  className="bg-gray-50 border border-transparent rounded-xl px-4 py-2.5 text-sm
        focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* APPLICABILITY (unchanged logic, improved UI) */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">
                Applicability
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => handleChange("applicability", "all")}
                  className={`p-4 rounded-xl cursor-pointer transition ${
                    form.applicability === "all"
                      ? "bg-blue-50 border border-blue-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <p className="font-medium text-sm">All Categories</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Valid across entire menu
                  </p>
                </div>

                <div
                  onClick={() => handleChange("applicability", "specific")}
                  className={`p-4 rounded-xl cursor-pointer transition ${
                    form.applicability === "specific"
                      ? "bg-blue-50 border border-blue-500"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <p className="font-medium text-sm">Specific Categories</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Target specific categories
                  </p>
                </div>
              </div>

              {form.applicability === "specific" && (
                <div className="flex gap-2 flex-wrap mt-4 bg-gray-50 p-4 rounded-xl">
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      onClick={() =>
                        form.categories.includes(cat)
                          ? handleChange(
                              "categories",
                              form.categories.filter((c) => c !== cat),
                            )
                          : handleChange("categories", [
                              ...form.categories,
                              cat,
                            ])
                      }
                      className={`px-4 py-1.5 rounded-full text-sm transition ${
                        form.categories.includes(cat)
                          ? "bg-blue-600 text-white shadow-sm"
                          : "bg-white text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              className={`w-full py-3 rounded-xl font-medium text-white shadow-md hover:shadow-lg transition ${
                initialData
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {initialData ? "Update Coupon" : "Create Coupon"}
            </button>
          </div>

          {/* RIGHT PREVIEW */}
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-3">
              COUPON PREVIEW
            </p>

            <div className="relative bg-linear-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-6 overflow-hidden shadow-lg">
              {/* Ticket cut circles */}
              <div className="absolute -left-3 top-1/2 w-6 h-6 bg-white rounded-full -translate-y-1/2"></div>
              <div className="absolute -right-3 top-1/2 w-6 h-6 bg-white rounded-full -translate-y-1/2"></div>

              {/* Status */}
              <span className="inline-flex items-center gap-2 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Active
              </span>

              {/* Top Section */}
              <div className="flex justify-between items-start mt-4">
                <div className="text-4xl font-bold leading-none">
                  {form.type === "percentage"
                    ? `${form.value || 0}%`
                    : `₹${form.value || 0}`}
                  <span className="text-lg font-medium ml-1 opacity-80">
                    OFF
                  </span>
                </div>

                <div className="text-right">
                  <p className="text-xs opacity-70">CODE:</p>
                  <div className="bg-white/20 px-3 py-1 rounded-lg text-sm font-semibold">
                    {form.code || "AUTUMN25"}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-dashed border-white/30 my-5"></div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-y-5 gap-x-6 text-sm">
                <div>
                  <p className="opacity-70 text-xs">MIN. BOOKING AMOUNT</p>
                  <p className="font-semibold mt-1">
                    ₹ {form.min_order_amount || 0}
                  </p>
                </div>

                <div>
                  <p className="opacity-70 text-xs">MAXIMUM DISCOUNT CAP</p>
                  <p className="font-semibold mt-1">
                    ₹ {form.max_discount || 0}
                  </p>
                </div>

                <div>
                  <p className="opacity-70 text-xs">TOTAL USAGE LIMIT</p>
                  <p className="font-semibold mt-1">
                    {form.isUnlimited ? "Unlimited" : form.usage_limit || 0}
                  </p>
                </div>

                <div>
                  <p className="opacity-70 text-xs">PER USER LIMIT</p>
                  <p className="font-semibold mt-1">{form.per_user_limit}</p>
                </div>

                <div className="col-span-2">
                  <p className="opacity-70 text-xs">VALIDITY PERIOD</p>
                  <p className="font-semibold mt-1">
                    {formatDate(form.start_date) || "Today"} —{" "}
                    {formatDate(form.end_date) || "No Expiry"}
                  </p>
                </div>

                <div className="col-span-2">
                  <p className="opacity-70 text-xs">APPLICABILITY</p>
                  <p className="font-semibold mt-1">
                    {form.applicability === "all"
                      ? "All Categories"
                      : form.categories.join(", ") || "Specific Categories"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponModal;
