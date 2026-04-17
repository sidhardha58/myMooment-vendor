import TicketForm from "../components/support/TicketForm";
import TicketList from "../components/support/TicketList";
import { useTickets } from "../hooks/useTickets";

export default function TicketsPage() {
  const ticketHook = useTickets(); // ✅ SINGLE SOURCE OF TRUTH

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold text-gray-800">
          Support Tickets
        </h1>

        <p className="text-sm text-gray-500">
          Raise a new issue or track your recent support requests.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <TicketForm {...ticketHook} />
        <TicketList {...ticketHook} />
      </div>
    </div>
  );
}
