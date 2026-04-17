import { useState } from "react";
import LeaveCard from "./LeaveCard";
import AddLeaveModal from "./AddLeaveModal";

export default function LeaveManagement() {
  const [showModal, setShowModal] = useState(false);

  const leaves = [
    { id: 1, date: "2026-03-15", type: "Festival Leave" },
    { id: 2, date: "2026-03-22", type: "Personal Leave" },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Leave Management
        </h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          + Add Leave
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {leaves.map((leave) => (
          <LeaveCard key={leave.id} date={leave.date} type={leave.type} />
        ))}
      </div>

      {/* FOOTER NOTE */}
      <p className="text-sm text-gray-500">
        Maximum 7 leaves allowed per month.
      </p>

      {/* MODAL */}
      {showModal && <AddLeaveModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
