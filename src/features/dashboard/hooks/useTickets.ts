import { useEffect, useState } from "react";
import { getTickets, createTicket } from "../api/ticketApi";
import type { VendorTicket } from "../types/ticket.types";

export const useTickets = () => {
  const [tickets, setTickets] = useState<VendorTicket[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await getTickets();
      setTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ CREATE
  const submitTicket = async (formData: FormData) => {
    try {
      await createTicket(formData);

      // 🔥 IMPORTANT → refresh list immediately
      await fetchTickets();

      return true;
    } catch (err) {
      console.error("Failed to create ticket", err);
      return false;
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    tickets,
    loading,
    submitTicket,
    fetchTickets, // optional
  };
};
