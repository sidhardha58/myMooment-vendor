import { useState } from "react";
import ServiceTabs from "../components/services/ServiceTabs";
import ServiceList from "../components/services/ServiceList";
import ServiceConfig from "../components/services/ServiceConfig";
import MenuCatalog from "../components/services/MenuCatalog";

const services = [
  { id: 1, name: "Breakfast", items: 3, active: true },
  { id: 2, name: "Snacks", items: 1, active: true },
  { id: 3, name: "Lunch", items: 3, active: true },
  { id: 4, name: "Dinner", items: 1, active: true },
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("management");
  const [availabilityTab, setAvailabilityTab] = useState("hours");
  const [selectedService, setSelectedService] = useState(services[0]);
  const [emergencyStop, setEmergencyStop] = useState(false);

  return (
    <div className="p-8 space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Services</h1>
          <p className="text-gray-500">
            Configure your service offerings and availability
          </p>
        </div>

        <div className="flex gap-10 text-center">
          <div>
            <p className="text-gray-500 text-sm">ACTIVE SERVICES</p>
            <p className="text-xl font-semibold">4</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">MENU ITEMS</p>
            <p className="text-xl font-semibold">8</p>
          </div>
        </div>
      </div>

      {/* MAIN TABS */}
      <div className="flex bg-gray-100 rounded-xl w-fit p-1">
        <ServiceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* ===================== */}
      {/* SERVICE MANAGEMENT */}
      {/* ===================== */}

      {activeTab === "management" && (
        <div className="grid grid-cols-3 gap-6">
          {/* SERVICE LIST */}
          <ServiceList
            services={services}
            selectedService={selectedService}
            setSelectedService={setSelectedService}
          />

          {/* SERVICE CONFIG + MENU */}
          <div className="col-span-2 space-y-6">
            {/* SERVICE CONFIG */}
            <ServiceConfig selectedService={selectedService} />

            {/* MENU CATALOG */}
            <MenuCatalog selectedService={selectedService} />
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* AVAILABILITY SETTINGS */}
      {/* ===================== */}

      {activeTab === "availability" && (
        <div className="space-y-6">
          {/* SUB TABS */}
          <div className="flex bg-gray-100 rounded-xl w-fit p-1">
            <button
              onClick={() => setAvailabilityTab("hours")}
              className={`px-6 py-2 rounded-lg ${
                availabilityTab === "hours"
                  ? "bg-white shadow"
                  : "text-gray-500"
              }`}
            >
              Working Hours
            </button>

            <button
              onClick={() => setAvailabilityTab("leave")}
              className={`px-6 py-2 rounded-lg ${
                availabilityTab === "leave"
                  ? "bg-white shadow"
                  : "text-gray-500"
              }`}
            >
              Leave Management
            </button>
          </div>

          {/* WORKING HOURS */}
          {availabilityTab === "hours" && (
            <>
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Working Schedule</h2>

                <div className="space-y-3">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="flex items-center justify-between border rounded-lg p-4"
                    >
                      <div className="w-24 font-medium">{day}</div>

                      <input type="checkbox" defaultChecked />

                      <input type="time" className="border rounded p-2" />

                      <span>→</span>

                      <input type="time" className="border rounded p-2" />

                      <button className="bg-black text-white px-3 py-1 rounded">
                        Save
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* EMERGENCY STOP */}
              <div className="bg-white rounded-xl shadow p-6 space-y-4">
                <h2 className="text-lg font-semibold">Emergency Stop</h2>

                <div className="flex justify-between items-center border p-4 rounded-lg bg-yellow-50">
                  <div>
                    <p className="font-medium">Shop Closed</p>
                    <p className="text-sm text-gray-500">
                      Not accepting new orders
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={emergencyStop}
                    onChange={() => setEmergencyStop(!emergencyStop)}
                  />
                </div>

                <textarea
                  className="w-full border rounded-lg p-3"
                  placeholder="Closure reason shown to customers"
                />

                <button className="bg-black text-white px-6 py-2 rounded-lg">
                  Save Changes
                </button>
              </div>
            </>
          )}

          {/* LEAVE MANAGEMENT */}
          {availabilityTab === "leave" && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    Leave / Holiday Management
                  </h2>
                  <p className="text-gray-500">
                    Mark dates when you are unavailable
                  </p>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                  + Add Leave
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((leave) => (
                  <div
                    key={leave}
                    className="border rounded-lg p-4 text-center bg-gray-50"
                  >
                    <p className="text-sm text-gray-500">JAN</p>
                    <p className="text-xl font-semibold">15</p>
                    <p className="text-sm text-gray-500">Monday</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
