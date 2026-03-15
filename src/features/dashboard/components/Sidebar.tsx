import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck,
  IndianRupee,
  BarChart3,
  Settings,
  FileText,
  Ticket,
  BadgePercent,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../../auth/UseAuth";

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Bookings", path: "/dashboard/bookings", icon: CalendarCheck },
    { name: "Revenue", path: "/dashboard/revenue", icon: IndianRupee },
    {
      name: "Reports & Analytics",
      path: "/dashboard/reports",
      icon: BarChart3,
    },
    { name: "Services Settings", path: "/dashboard/services", icon: Settings },
    { name: "Documents", path: "/dashboard/documents", icon: FileText },
    { name: "Tickets", path: "/dashboard/tickets", icon: Ticket },
    { name: "Coupons", path: "/dashboard/coupons", icon: BadgePercent },
  ];

  const bottomItems = [
    { name: "Profile", path: "/dashboard/profile", icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const baseItemStyle =
    "flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition";

  return (
    <aside className="fixed top-0 left-0 h-screen w-[266px] flex flex-col bg-white border-r border-slate-200 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
        <img src="/vite.svg" alt="logo" className="h-9 w-9" />
        <span className="text-lg font-semibold text-slate-900">myMooment</span>
      </div>

      {/* Menu Section */}
      <div className="flex flex-col justify-between flex-1 px-4 py-6">
        {/* Top Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  `${baseItemStyle} ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom Menu */}
        <nav className="space-y-2 pt-6 border-t border-slate-200">
          {bottomItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `${baseItemStyle} ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-100"
                  }`
                }
              >
                <Icon size={20} />
                {item.name}
              </NavLink>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`${baseItemStyle} text-red-600 hover:bg-red-50 w-full`}
          >
            <LogOut size={20} />
            Logout
          </button>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
