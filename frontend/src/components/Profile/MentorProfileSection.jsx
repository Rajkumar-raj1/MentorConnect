import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaCode,
  FaStar,
  FaCalendarCheck,
  FaUserCheck,
} from "react-icons/fa";

const MentorProfileSection = ({ mentorProfile }) => {
  if (!mentorProfile) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Mentor Profile
        </h2>

        <p className="mt-3 text-gray-600">
          You have not created your mentor profile yet. Create one to appear in
          mentor search results.
        </p>

        <Link
          to="/mentor-profile"
          className="inline-block mt-5 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Create Mentor Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Mentor Profile
          </h2>

          <p className="mt-1 text-gray-600">
            {mentorProfile?.bio || "No bio added yet"}
          </p>
        </div>

        <Link
          to="/mentor-profile"
          className="w-full sm:w-auto text-center bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-3 bg-blue-50 rounded-xl p-4">
          <FaBriefcase className="text-blue-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Company</p>
            <p className="font-semibold text-gray-800">
              {mentorProfile?.company || "Not added"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-green-50 rounded-xl p-4">
          <FaUserCheck className="text-green-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Position</p>
            <p className="font-semibold text-gray-800">
              {mentorProfile?.position || "Not added"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-yellow-50 rounded-xl p-4">
          <FaStar className="text-yellow-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Rating</p>
            <p className="font-semibold text-gray-800">
              {mentorProfile?.rating || 0} / 5
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-purple-50 rounded-xl p-4">
          <FaCalendarCheck className="text-purple-600 text-xl" />
          <div>
            <p className="text-sm text-gray-500">Sessions</p>
            <p className="font-semibold text-gray-800">
              {mentorProfile?.totalSessions || 0}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <FaCode className="text-blue-600" />
          <h3 className="font-semibold text-gray-800">
            Skills
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {mentorProfile?.skills?.length > 0 ? (
            mentorProfile.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No skills added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorProfileSection;