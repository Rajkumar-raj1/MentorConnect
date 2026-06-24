import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 */}
        <h1 className="text-8xl sm:text-9xl font-extrabold text-blue-600">
          404
        </h1>

        {/* Icon */}
        <div className="flex justify-center mt-6">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-4xl text-red-500" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="mt-8 text-3xl sm:text-4xl font-bold text-gray-900">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 leading-7 max-w-xl mx-auto">
          The page you're looking for doesn't exist, has been removed,
          or the URL may be incorrect.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            <FaHome />
            Go to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>

        {/* Footer Message */}
        <p className="mt-12 text-sm text-gray-400">
          MentorConnect • Empowering Students Through Mentorship
        </p>
      </div>
    </div>
  );
};

export default NotFound;