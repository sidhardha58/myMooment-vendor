import { useState } from "react";

export default function EmergencyStop() {
  const [isPaused, setIsPaused] = useState(false);
  const [pauseUntil, setPauseUntil] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div className="max-w-2xl bg-white rounded-xl p-8 space-y-6 text-[#2D3748]">
      {/* HEADER & TOGGLE */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Temporary Pause Bookings</h2>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isPaused}
            onChange={() => setIsPaused(!isPaused)}
          />

          {/* Background */}
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors"></div>

          {/* Circle */}
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
        </label>
      </div>

      {/* CONDITIONAL INPUTS */}
      {isPaused && (
        <div className="space-y-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-4">
            <label className="font-semibold min-w-30">Pause Until</label>

            <input
              type="date"
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              value={pauseUntil}
              onChange={(e) => setPauseUntil(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="font-semibold block">Closure Reason</label>
            <textarea
              className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              placeholder="This message will be shown to customers..."
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
      )}

      {/* FOOTER INFO */}
      <div className="space-y-4">
        <p className="text-[#718096] text-sm">
          Pause bookings temporarily without affecting confirmed orders.
        </p>

        <div className="flex items-center gap-2 text-[#2D3748] font-medium">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            Next confirmed booking:{" "}
            <span className="font-bold">24 Mar 2026</span>
          </span>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <button className="bg-[#1A202C] text-white font-semibold px-8 py-3 rounded-xl hover:bg-black transition-colors">
        Save Changes
      </button>
    </div>
  );
}
