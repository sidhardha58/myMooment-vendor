import { Laptop, Smartphone, Monitor, X } from "lucide-react";
import { useSettings } from "../../../hooks/useSettings";
import { useAuth } from "../../../../../auth/UseAuth";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../lib/axios"; // adjust path if needed
import toast from "react-hot-toast";

type ApiSession = {
  sessionId: string;
  userAgent: string;
  location: {
    city: string;
    region: string;
    country: string;
  };
  createdAt: string;
  lastActiveAt: string;
};

const getIcon = (device: string) => {
  if (device.toLowerCase().includes("iphone")) return <Smartphone size={18} />;
  if (device.toLowerCase().includes("android")) return <Smartphone size={18} />;
  if (device.toLowerCase().includes("mac")) return <Laptop size={18} />;
  return <Monitor size={18} />;
};

/* ================= USER AGENT PARSER ================= */
const parseUserAgent = (ua: string) => {
  const lower = ua.toLowerCase();

  let device = "Unknown Device";
  if (lower.includes("iphone")) device = "iPhone";
  else if (lower.includes("android")) device = "Android Device";
  else if (lower.includes("windows")) device = "Windows PC";
  else if (lower.includes("mac")) device = "Mac";

  let browser = "Unknown";
  if (lower.includes("chrome")) browser = "Chrome";
  else if (lower.includes("safari")) browser = "Safari";
  else if (lower.includes("edge")) browser = "Edge";

  return { device, browser };
};

/* ================= TIME FORMAT ================= */
const getTimeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} mins ago`;

  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hrs ago`;

  return new Date(date).toLocaleDateString();
};

const LoginActivity = () => {
  const { logoutAll, loading } = useSettings();
  const { logout } = useAuth();

  const [sessions, setSessions] = useState<ApiSession[]>([]);
  const [fetching, setFetching] = useState(false);

  /* ================= FETCH SESSIONS ================= */
  const fetchSessions = async () => {
    try {
      setFetching(true);
      const res = await axiosInstance.get("/vendor/login-activity");

      if (res.data.success) {
        setSessions(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load login activity");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  /* ================= LOGOUT ALL ================= */
  const handleLogoutAll = async () => {
    try {
      await logoutAll();
      toast.success("Logged out from all devices");
      logout(); // logout current session
    } catch (err) {
      console.error(err);
      toast.error("Failed to logout from all devices");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Login Activity
          </h3>
          <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">
            Devices that are currently logged into your account. Revoke any
            sessions you don’t recognize.
          </p>
        </div>

        <button
          onClick={handleLogoutAll}
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
        >
          {loading ? "Logging out..." : "Logout all"}
        </button>
      </div>

      {/* Sessions */}
      {fetching ? (
        <p className="text-sm text-gray-500">Loading sessions...</p>
      ) : sessions.length === 0 ? (
        <p className="text-sm text-gray-500">No active sessions found</p>
      ) : (
        <div className="space-y-2">
          {sessions.map((session, index) => {
            const { device, browser } = parseUserAgent(
              session.userAgent || ""
            );

            const isCurrent = index === 0; // latest session

            return (
              <div
                key={session.sessionId}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition group"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-gray-200 transition">
                    {getIcon(device)}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {device} <span className="text-gray-400">•</span>{" "}
                      {browser}
                    </p>

                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      {isCurrent ? (
                        <>
                          <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">
                            Current
                          </span>
                          <span className="text-gray-300">•</span>
                          <span>
                            {session.location?.city || "Unknown"},{" "}
                            {session.location?.country || "Unknown"}
                          </span>
                        </>
                      ) : (
                        <>
                          <span>{getTimeAgo(session.lastActiveAt)}</span>
                          <span className="text-gray-300">•</span>
                          <span>
                            {session.location?.city || "Unknown"},{" "}
                            {session.location?.country || "Unknown"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right */}
                {!isCurrent && (
                  <button className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition">
                    <X size={18} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LoginActivity;