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
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-1">Your Services</h2>

      <p className="text-sm text-gray-500 mb-4">
        Select a service to configure
      </p>

      <div className="space-y-2">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => setSelectedService(service)}
            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
              selectedService.id === service.id
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "hover:bg-gray-50"
            }`}
          >
            <div>
              <p className="font-medium">{service.name}</p>

              <p className="text-sm text-gray-500">
                {service.items} menu items •{" "}
                {service.active ? "Active" : "Inactive"}
              </p>
            </div>

            <span className="text-gray-400">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}
