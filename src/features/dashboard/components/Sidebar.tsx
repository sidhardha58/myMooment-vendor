import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  BarChart3,
  Settings,
  BadgePercent,
  Star,
  Headphones,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../auth/UseAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const businessItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Bookings", path: "/dashboard/bookings", icon: CalendarCheck },
    { name: "Reports", path: "/dashboard/reports", icon: BarChart3 },
  ];

  const operationsItems = [
    { name: "Service Settings", path: "/dashboard/services", icon: Settings },
    { name: "Ratings", path: "/dashboard/ratings", icon: Star },
    { name: "Coupons", path: "/dashboard/coupons", icon: BadgePercent },
    { name: "Support", path: "/dashboard/support", icon: Headphones },
  ];

  const accountItems = [
    { name: "Profile", path: "/dashboard/profile", icon: User },
    { name: "Settings", path: "/dashboard/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const baseItem =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition";

  return (
    <aside className="fixed top-0 left-0 h-screen w-65 bg-white flex flex-col">
      {" "}
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200">
        <img src="/Logo.png" alt="logo" className="h-9 w-9" />
        <span className="text-lg font-semibold text-gray-900">MyPartner</span>
      </div>
      <div className="flex flex-col justify-between flex-1 px-4 py-6 overflow-y-auto">
        {/* BUSINESS */}
        <div>
          <p className="text-xs font-semibold text-gray-400 mb-3 px-2 tracking-wide">
            BUSINESS
          </p>
          <nav className="space-y-1">
            {businessItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  className={({ isActive }) =>
                    `${baseItem} ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* OPERATIONS */}
        <div className="mt-6">
          <p className="text-xs font-semibold text-gray-400 mb-3 px-2 tracking-wide">
            OPERATIONS
          </p>
          <nav className="space-y-1">
            {operationsItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `${baseItem} ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* ACCOUNT */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-400 mb-3 px-2 tracking-wide">
            ACCOUNT
          </p>

          <nav className="space-y-1">
            {accountItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `${baseItem} ${
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`${baseItem} text-red-500 hover:bg-red-50 w-full mt-4`}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
