import { Download } from "lucide-react";

const billingData = [
  {
    date: "15 Jan 2026",
    plan: "6 Months Plan",
    invoice: "INV-102",
    validity: "15 Jan 2026 – 14 Jul 2026",
    payment: "UPI ••••9823",
    amount: "₹2,994",
  },
  {
    date: "15 Jul 2025",
    plan: "6 Months Plan",
    invoice: "INV-091",
    validity: "15 Jul 2025 – 14 Jan 2026",
    payment: "UPI ••••9823",
    amount: "₹2,994",
  },
  {
    date: "15 Jan 2025",
    plan: "6 Months Plan",
    invoice: "INV-084",
    validity: "15 Jan 2025 – 14 Jul 2025",
    payment: "UPI ••••9823",
    amount: "₹2,994",
  },
  {
    date: "15 Jul 2024",
    plan: "6 Months Plan",
    invoice: "INV-077",
    validity: "15 Jul 2024 – 14 Jan 2025",
    payment: "UPI ••••9823",
    amount: "₹2,994",
  },
];

const BillingHistoryTable = () => {
  return (
    <div className="bg-white rounded-2xl mt-6 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5">
        <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-[1fr_1.4fr_2fr_1.3fr_1fr_0.8fr] px-6 py-3 text-xs font-semibold text-gray-400 uppercase bg-gray-50">
        <span>Date</span>
        <span>Plan</span>
        <span>Validity</span>
        <span>Payment Method</span>
        <span>Invoice</span>
        <span className="text-right">Total</span>
      </div>

      {/* Rows */}
      <div>
        {billingData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_1.4fr_2fr_1.3fr_1fr_0.8fr] px-6 py-4 items-center text-sm border-t border-gray-100 hover:bg-gray-50 transition"
          >
            {/* Date */}
            <span className="text-gray-800 font-medium whitespace-nowrap">
              {item.date}
            </span>

            {/* Plan + Invoice */}
            <div className="leading-tight">
              <p className="font-medium text-gray-900 whitespace-nowrap">
                {item.plan}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.invoice}</p>
            </div>

            {/* Validity (NO WRAP) */}
            <span className="text-gray-500 whitespace-nowrap">
              {item.validity}
            </span>

            {/* Payment */}
            <span className="text-gray-500 whitespace-nowrap">
              {item.payment}
            </span>

            {/* Download */}
            <button className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition w-fit">
              <Download size={16} />
              <span className="font-medium">Download</span>
            </button>

            {/* Amount */}
            <span className="text-right font-semibold text-gray-900 whitespace-nowrap">
              {item.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillingHistoryTable;
