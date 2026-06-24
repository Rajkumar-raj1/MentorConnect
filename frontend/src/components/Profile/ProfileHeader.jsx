import { FaCamera } from "react-icons/fa";
import { DEFAULT_AVATAR } from "../../utils/constants";

const ProfileHeader = ({
  user,
  uploading = false,
  onAvatarChange,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <img
            src={
              user?.avatar ||
              `${DEFAULT_AVATAR}&name=${encodeURIComponent(
                user?.fullName || "User"
              )}`
            }
            alt={user?.fullName}
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
          />

          <label
            htmlFor="avatar"
            className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center cursor-pointer hover:bg-blue-700 transition"
          >
            <FaCamera />
          </label>

          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={onAvatarChange}
            className="hidden"
          />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900">
            {user?.fullName}
          </h1>

          <p className="mt-2 text-gray-600">
            {user?.email}
          </p>

          <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
            <span className="px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium capitalize">
              {user?.role}
            </span>

            {user?.college && (
              <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                {user.college}
              </span>
            )}

            {user?.branch && (
              <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                {user.branch}
              </span>
            )}

            {user?.year && (
              <span className="px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                Year {user.year}
              </span>
            )}
          </div>

          {uploading && (
            <p className="mt-4 text-blue-600 text-sm font-medium">
              Uploading profile picture...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;