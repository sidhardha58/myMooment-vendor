type Service = {
  id: number;
  name: string;
  items: number;
  active: boolean;
};

type Props = {
  services: Service[];
  selectedService: Service;
  setSelectedService: (service: Service) => void;
};

export default function ServiceList({
  services,
  selectedService,
  setSelectedService,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-5 w-full max-w-md">
      <div className="mt-4 space-y-2">
        {services.map((service) => {
          const isSelected = selectedService.id === service.id;

          return (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`flex justify-between items-center p-4 rounded-xl cursor-pointer transition ${
                isSelected
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
            >
              {/* LEFT */}
              <div>
                <p className="font-semibold text-gray-800">{service.name}</p>

                <p className="text-sm text-gray-500">{service.items} items</p>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">
                {service.active && (
                  <span className="bg-green-100 text-green-600 text-xs font-medium px-3 py-1 rounded-full">
                    Active
                  </span>
                )}

                <span className="text-gray-400 text-lg">›</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
