import { Trash2 } from "lucide-react";

type Props = {
  date: string;
  type: string;
};

export default function LeaveCard({ date, type }: Props) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="group flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 transition-all duration-200 hover:bg-white hover:shadow-md hover:-translate-y-0.5">
      {/* LEFT */}
      <div className="flex flex-col">
        <p className="text-sm font-semibold text-gray-800">{formattedDate}</p>

        <span className="mt-2 inline-flex w-fit items-center rounded-md bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600 transition group-hover:bg-gray-100">
          {type}
        </span>
      </div>

      {/* RIGHT ACTION */}
      <button className="p-2 rounded-md transition hover:bg-red-50">
        <Trash2 className="w-5 h-5 text-red-500 transition-transform duration-200 group-hover:scale-110 group-hover:text-red-600" />
      </button>
    </div>
  );
}
