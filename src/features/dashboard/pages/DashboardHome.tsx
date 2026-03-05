const DashboardHome = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Good Morning 👋
        </h1>

        <p className="text-slate-500 mt-1">
          Here's what’s happening with your business today.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-slate-500">Today's Bookings</p>
          <h2 className="text-2xl font-semibold mt-2">0</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-slate-500">Revenue Today</p>
          <h2 className="text-2xl font-semibold mt-2">₹0</h2>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="text-sm text-slate-500">Pending Tickets</p>
          <h2 className="text-2xl font-semibold mt-2">0</h2>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium text-slate-800">Recent Activity</h3>

        <p className="text-sm text-slate-500 mt-2">No recent activity yet.</p>
      </div>
    </div>
  );
};

export default DashboardHome;
