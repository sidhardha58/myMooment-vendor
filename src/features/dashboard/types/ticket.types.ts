export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";

export interface VendorTicket {
  _id: string;
  ticket_number: string; // ✅ match API
  category: string;
  description: string;
  booking_id?: string;
  status: TicketStatus;
  createdAt: string;
  files?: string[]; // optional, rename to attachments? if needed
}
