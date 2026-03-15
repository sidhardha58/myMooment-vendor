type Service = {
  id: number;
  name: string;
  items: number;
  active: boolean;
};

type Props = {
  selectedService: Service;
};

export default function ServiceConfig({ selectedService }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">{selectedService.name}</h2>

          <p className="text-sm text-gray-500">
            Configure service availability and settings
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">
            Active
          </span>

          <input type="checkbox" defaultChecked />
        </div>
      </div>

      {/* FORM GRID */}

      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        {/* START TIME */}

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Start Time</label>

          <input type="time" className="w-full border rounded-lg p-3" />
        </div>

        {/* END TIME */}

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">End Time</label>

          <input type="time" className="w-full border rounded-lg p-3" />
        </div>

        {/* BOOKING LIMIT */}

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Daily Booking Limit
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            defaultValue={50}
          />
        </div>

        {/* STOP ORDERS */}

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">
            Stop Orders Before (Days)
          </label>

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            defaultValue={1}
          />
        </div>
      </div>

      {/* SAVE BUTTON */}

      <div className="flex justify-end mt-8">
        <button className="bg-gray-300 px-6 py-2 rounded-lg text-white">
          Save Changes
        </button>
      </div>
    </div>
  );
}
