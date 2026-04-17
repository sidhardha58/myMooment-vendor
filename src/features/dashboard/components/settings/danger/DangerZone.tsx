import { AlertTriangle } from "lucide-react";

const DangerZone = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="p-2 bg-red-50 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-500" />
        </div>

        <h2 className="text-lg font-semibold text-gray-900">Danger Zone</h2>
      </div>

      {/* CONTENT */}
      <div className="px-6 pb-6 space-y-4">
        {/* DEACTIVATE */}
        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition">
          <div className="pr-4">
            <p className="font-medium text-gray-800">Deactivate Account</p>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Temporarily hide your business from the platform. You can
              reactivate anytime.
            </p>
          </div>

          <button className="px-4 py-2 text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition">
            Deactivate
          </button>
        </div>

        {/* CLOSE ACCOUNT */}
        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition">
          <div className="pr-4">
            <p className="font-medium text-gray-800">Request Account Closure</p>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Permanently close your partner account. This action cannot be
              undone.
            </p>
          </div>

          <button className="px-4 py-2 text-sm font-medium rounded-lg bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] transition">
            Request Closure
          </button>
        </div>

        {/* NOTE */}
        <div className="bg-yellow-50/80 rounded-xl p-4">
          <p className="text-sm text-yellow-700 leading-relaxed">
            <span className="font-medium">Note:</span> For security reasons,
            direct account deletion is not allowed. Please contact support if
            you need immediate assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
