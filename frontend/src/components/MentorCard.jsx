import { FaBriefcase, FaGraduationCap, FaUserTie } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DEFAULT_AVATAR } from "../utils/constants";
import useAuth from "../hooks/useAuth";

const MentorCard = ({ mentor }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Avatar */}
      <div className="flex justify-center mt-6">
        <img
          src={
            mentor?.user?.avatar ||
            `${DEFAULT_AVATAR}&name=${mentor?.user?.fullName || "Mentor"}`
          }
          alt={mentor?.user?.fullName}
          className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
        />
      </div>

      {/* Details */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-center text-gray-800">
          {mentor?.user?.fullName}
        </h2>

        <p className="text-center text-blue-600 font-medium mt-1">
          {mentor?.headline || mentor?.expertise}
        </p>

        <div className="mt-5 space-y-3 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaBriefcase className="text-blue-600" />
            <span>{mentor?.company || "Not specified"}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-blue-600" />
            <span>{mentor?.experience || "0"} Years Experience</span>
          </div>

          <div className="flex items-center gap-2">
            <FaUserTie className="text-blue-600" />
            <span>{mentor?.skills?.join(", ") || "No skills added"}</span>
          </div>
        </div>

        {mentor?.bio && (
          <p className="mt-4 text-sm text-gray-500 line-clamp-3">
            {mentor.bio}
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to={`/mentors/${mentor._id}`}
            className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium"
          >
            View Profile
          </Link>

          {/* Only students can book sessions */}
          {user?.role === "student" && (
            <Link
              to={`/sessions/book/${mentor.user._id}`}
              className="w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-lg transition font-medium"
            >
              Book Session
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;