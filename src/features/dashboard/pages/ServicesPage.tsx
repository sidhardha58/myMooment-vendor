import { useState } from "react";
import ServiceTabs from "../components/services/ServiceTabs";
import ServiceList from "../components/services/ServiceList";
import ServiceConfig from "../components/services/ServiceConfig";
import MenuCatalog from "../components/services/MenuCatalog";

import WorkingHours from "../components/services/availability/WorkingHours";
import EmergencyStop from "../components/services/availability/EmergencyStop";
import LeaveManagement from "../components/services/availability/LeaveManagement";

const services = [
  { id: 1, name: "Breakfast", items: 3, active: true },
  { id: 2, name: "Snacks", items: 1, active: true },
  { id: 3, name: "Lunch", items: 3, active: true },
  { id: 4, name: "Dinner", items: 1, active: true },
];

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("management");
  const [availabilityTab, setAvailabilityTab] = useState("hours");
  const [selectedService, setSelectedService] = useState(services[0]);

  const toggleActive = () => {
    setSelectedService((prev) => ({
      ...prev,
      active: !prev.active,
    }));
  };

  return (
    <div className="p-6 space-y-5">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Services</h1>
        <p className="text-gray-500">
          Configure your service offerings and availability
        </p>
      </div>

      {/* MAIN TABS */}
      <div className="flex bg-gray-100 rounded-xl w-fit p-1">
        <ServiceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* ===================== */}
      {/* SERVICE MANAGEMENT */}
      {/* ===================== */}

      {activeTab === "management" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT: SERVICE LIST */}
          <div className="lg:col-span-3 lg:sticky lg:top-6 h-fit space-y-2">
            <div className="px-1 mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Services</h2>
            </div>

            <ServiceList
              services={services}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-9 space-y-3">
            {/* TOP HEADER (no bottom border) */}
            <div className="flex justify-between items-center px-1 pb-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {selectedService.name}
              </h2>

              {/* ACTIVE TOGGLE */}
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-medium ${
                    selectedService.active ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {selectedService.active ? "Active" : "Inactive"}
                </span>

                <button
                  onClick={toggleActive}
                  className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
                    selectedService.active ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                      selectedService.active ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* SINGLE COMBINED CARD */}
            <div
              className={`bg-white border border-gray-200 rounded-2xl p-4 shadow-sm ${
                !selectedService.active ? "opacity-60" : ""
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 divide-x divide-gray-200">
                {/* LEFT: SERVICE CONFIG */}
                <div className="pr-4 max-h-[calc(100vh-220px)] overflow-y-auto">
                  <ServiceConfig selectedService={selectedService} />
                </div>

                {/* RIGHT: MENU CATALOG */}
                <div className="pl-4 max-h-[calc(100vh-220px)] overflow-y-auto">
                  <MenuCatalog selectedService={selectedService} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* AVAILABILITY SETTINGS */}
      {/* ===================== */}

      {activeTab === "availability" && (
        <div className="space-y-6">
          {/* SUB TABS */}
          <div className="flex gap-6 border-b border-gray-200">
            <button
              onClick={() => setAvailabilityTab("hours")}
              className={`pb-3 text-base font-medium ${
                availabilityTab === "hours"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Working Hours
            </button>

            <button
              onClick={() => setAvailabilityTab("leave")}
              className={`pb-3 text-base font-medium ${
                availabilityTab === "leave"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              Leave Management
            </button>
          </div>

          {/* CONTENT */}
          {availabilityTab === "hours" && <WorkingHours />}

          {availabilityTab === "leave" && (
            <>
              <EmergencyStop />
              <LeaveManagement />
            </>
          )}
        </div>
      )}
    </div>
  );
}
