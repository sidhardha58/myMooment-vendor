/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { UtensilsCrossed, HandPlatter, Check } from "lucide-react";

type Service = {
  id: number;
  name: string;
  items: number;
  active: boolean;
};

type Props = {
  selectedService: Service;
};

export default function ServiceConfig({ selectedService }: Props) {
  const [isActive, setIsActive] = useState(selectedService.active);
  const [stopValue, setStopValue] = useState(2);
  const [stopUnit, setStopUnit] = useState<"days" | "hours">("hours");

  const [styles, setStyles] = useState<string[]>(["buffet"]);

  const toggleStyle = (type: string) => {
    setStyles((prev) =>
      prev.includes(type) ? prev.filter((s) => s !== type) : [...prev, type],
    );
  };

  const isSitDownActive = styles.includes("sitdown");

  return (
    <div className="space-y-6">
      {/* TIME */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-2">Start Time</p>
          <input
            type="time"
            defaultValue="07:00"
            className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">End Time</p>
          <input
            type="time"
            defaultValue="11:00"
            className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">Must end by 12:00</p>
        </div>
      </div>

      {/* BOOKINGS + STOP */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500 mb-2">Manage Bookings</p>
          <input
            placeholder="Enter booking limit"
            className="w-full border border-gray-200 bg-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">
            Stop Accepting Orders Before
          </p>

          <div className="flex gap-2">
            <input
              type="number"
              value={stopValue}
              onChange={(e) => setStopValue(Number(e.target.value))}
              className="w-1/2 border border-gray-200 bg-white rounded-xl px-4 py-3 focus:outline-none"
            />

            <select
              value={stopUnit}
              onChange={(e) => setStopUnit(e.target.value as "days" | "hours")}
              className="w-1/2 border border-gray-200 bg-white rounded-xl px-4 py-3 focus:outline-none"
            >
              <option value="days">Days</option>
              <option value="hours">Hours</option>
            </select>
          </div>
        </div>
      </div>

      {/* SERVICE STYLE */}
      <div>
        <p className="text-sm text-gray-500 mb-3">Service Style Supported</p>

        <div className="space-y-4">
          {/* BUFFET */}
          <div
            onClick={() => toggleStyle("buffet")}
            className={`flex items-center justify-between rounded-xl p-4 cursor-pointer border transition ${
              styles.includes("buffet")
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <UtensilsCrossed size={20} />
              </div>

              <div>
                <p className="font-semibold text-gray-800">Buffet Service</p>
                <p className="text-sm text-gray-500">Self-service meal style</p>
              </div>
            </div>

            {styles.includes("buffet") && (
              <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                <Check size={14} strokeWidth={3} />
              </div>
            )}
          </div>

          {/* SIT-DOWN */}
          <div
            onClick={() => toggleStyle("sitdown")}
            className={`flex items-center justify-between rounded-xl p-4 cursor-pointer border transition ${
              styles.includes("sitdown")
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 bg-white hover:shadow-sm"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-lg ${
                  styles.includes("sitdown")
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                <HandPlatter size={20} />
              </div>

              <div>
                <p className="font-semibold text-gray-800">Sit-down Service</p>
                <p className="text-sm text-gray-500">
                  Wait-staff table service
                </p>
              </div>
            </div>

            {styles.includes("sitdown") && (
              <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                <Check size={14} strokeWidth={3} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EXTRA COST */}
      <div
        className={`rounded-xl border p-4 ${
          isSitDownActive
            ? "bg-white border-gray-200"
            : "bg-gray-100 border-gray-200 opacity-60 pointer-events-none"
        }`}
      >
        <p className="text-sm font-medium text-gray-600 mb-3">
          Add Extra Cost for Sit-down Service
        </p>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-500">₹</span>

          <input
            placeholder="per person"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 bg-white focus:outline-none"
          />

          <span className="text-sm text-gray-500">per person</span>
        </div>

        <p className="text-xs text-gray-400">
          Enter only the extra amount added to your current menu price.
        </p>
      </div>
    </div>
  );
}
