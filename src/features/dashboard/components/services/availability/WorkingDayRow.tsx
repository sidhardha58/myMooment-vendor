type Props = {
  day: string;
  isClosed?: boolean;
};

export default function WorkingDayRow({ day, isClosed = false }: Props) {
  return (
    <div className="grid grid-cols-[140px_140px_1fr_40px_1fr] items-center py-4">
      {/* DAY */}
      <div className="text-gray-700 font-medium">{day}</div>

      {/* TOGGLE + STATUS */}
      <div className="flex items-center gap-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            defaultChecked={!isClosed}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 transition"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
        </label>

        <span
          className={`text-sm font-medium ${
            isClosed ? "text-gray-400" : "text-green-600"
          }`}
        >
          {isClosed ? "Closed" : "Open"}
        </span>
      </div>

      {/* START TIME */}
      <input
        type="time"
        defaultValue="09:00"
        disabled={isClosed}
        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
      />

      {/* TO TEXT */}
      <div className="text-center text-gray-400 text-sm">to</div>

      {/* END TIME */}
      <input
        type="time"
        defaultValue="21:00"
        disabled={isClosed}
        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:bg-gray-100 disabled:text-gray-400"
      />
    </div>
  );
}
