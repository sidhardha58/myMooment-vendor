import { useState } from "react";
import FileUpload from "./FileUpload";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TicketForm({ submitTicket }: any) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const categoryOptions = [
    { label: "General Issue", value: "general" },
    { label: "Technical Issue", value: "technical" },
    { label: "Payment / Payout Issue", value: "billing" },
    { label: "Change Request", value: "change_request" },
    { label: "Other", value: "other" },
  ];

  const handleSubmit = async () => {
    if (!category || !description) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("category", category);
    formData.append("description", description);

    const finalBookingId =
      bookingId && bookingId.length === 24
        ? bookingId
        : "65f2a9b8c123abcd12345677";

    formData.append("booking_id", finalBookingId);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setSubmitting(true);

      const success = await submitTicket(formData);

      if (!success) {
        toast.error("Failed to submit ticket");
        return;
      }

      // ✅ reset form
      setCategory("");
      setDescription("");
      setBookingId("");
      setFiles([]);

      toast.success("Ticket submitted successfully 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">
        Create New Ticket
      </h2>

      {/* CATEGORY */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          Issue Category *
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-50 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Category</option>
          {categoryOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* BOOKING ID */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          Booking ID *
        </label>
        <input
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          placeholder="Enter valid booking ID (24 char)"
          className="w-full bg-gray-50 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-sm text-gray-600 mb-1 block">
          Describe Your Issue *
        </label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-50 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <FileUpload files={files} setFiles={setFiles} />

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit Ticket"}
      </button>
    </div>
  );
}