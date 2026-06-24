import { FaCircle } from "react-icons/fa";
import { DEFAULT_AVATAR } from "../../utils/constants";

const ChatHeader = ({ conversation }) => {
  // Get the other participant
  const participant = conversation?.participants?.find(
    (user) => user._id !== conversation?.currentUserId
  );

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b bg-white">
      {/* Left */}
      <div className="flex items-center gap-3">
        <img
          src={
            participant?.avatar ||
            `${DEFAULT_AVATAR}&name=${participant?.fullName || "User"}`
          }
          alt={participant?.fullName}
          className="w-12 h-12 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-800">
            {participant?.fullName}
          </h2>

          <p className="text-sm text-gray-500">
            {participant?.role === "mentor"
              ? "Mentor"
              : participant?.role === "student"
              ? "Student"
              : "Admin"}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="hidden sm:flex items-center gap-2 text-green-600">
        <FaCircle className="text-xs" />
        <span className="text-sm font-medium">
          Online
        </span>
      </div>
    </div>
  );
};

export default ChatHeader;