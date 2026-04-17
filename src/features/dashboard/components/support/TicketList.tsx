import type { VendorTicket } from "../../types/ticket.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TicketList({ tickets, loading }: any) {
  const categoryMap: Record<string, string> = {
    general: "General Issue",
    technical: "Technical Issue",
    billing: "Payment / Payout Issue",
    change_request: "Change Request",
    other: "Other",
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "resolved":
      case "closed":
        return "bg-green-50 text-green-600";
      case "in_progress":
        return "bg-yellow-50 text-yellow-600";
      default:
        return "bg-blue-50 text-blue-600";
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl">
        <p className="text-gray-400">Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm h-fit">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">
          Recent Tickets
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Track your recent support requests
        </p>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-400 text-xs">
            <th className="text-left py-2 font-medium">Ticket ID</th>
            <th className="text-left py-2 font-medium">Category</th>
            <th className="text-left py-2 font-medium">Created</th>
            <th className="text-left py-2 font-medium">Status</th>
          </tr>
        </thead>

        <tbody>
          {!tickets || tickets.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-8 text-center text-gray-400 text-sm"
              >
                No tickets found
              </td>
            </tr>
          ) : (
            tickets.map((t: VendorTicket) => (
              <tr key={t._id} className="hover:bg-gray-50 transition">
                <td className="py-3 font-medium text-gray-800">
                  {t.ticket_number}
                </td>

                <td className="py-3 text-gray-600">
                  {categoryMap[t.category] || t.category}
                </td>

                <td className="py-3 text-gray-500">
                  {formatDate(t.createdAt)}
                </td>

                <td className="py-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusStyle(
                      t.status,
                    )}`}
                  >
                    {t.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
