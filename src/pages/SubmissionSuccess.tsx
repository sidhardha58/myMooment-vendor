import { CheckCircle } from "lucide-react";
import { useAuth } from "../auth/UseAuth";
import { Link } from "react-router-dom";

const SubmissionSuccess = () => {
  useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 sm:px-5 text-center">
      {/* Success Icon */}
      <CheckCircle size={70} className="text-green-600 mb-4 sm:mb-5" />

      {/* Heading */}
      <h1 className="text-xl sm:text-2xl font-semibold mb-2">
        Application Submitted!
      </h1>

      {/* Subheading with timing */}
      <p className="text-slate-600 text-sm sm:text-base mb-6">
        Our team will review your documents, and your account will be activated
        within 12–48 hours.
      </p>

      {/* Back to Home Link */}
      <Link
        to="/home"
        className="text-blue-600 hover:underline cursor-pointer text-sm sm:text-base"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default SubmissionSuccess;
