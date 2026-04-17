import WorkingDayRow from "./WorkingDayRow";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function WorkingHours() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 max-w-4xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Weekly Schedule</h2>

        <button className="border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
          Apply Mon to All
        </button>
      </div>

      {/* ROWS */}
      <div className="divide-y divide-gray-100">
        {weekDays.map((day) => (
          <WorkingDayRow key={day} day={day} isClosed={day === "Sunday"} />
        ))}
      </div>
    </div>
  );
}
