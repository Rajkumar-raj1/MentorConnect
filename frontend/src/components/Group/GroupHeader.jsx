import { FaUsers } from "react-icons/fa";

const GroupHeader = ({
  group,
  isMember,
  onJoinGroup,
  onLeaveGroup,
}) => {
  if (!group) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white border-b p-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <img
          src={
            group.groupImage ||
            "https://via.placeholder.com/80?text=Group"
          }
          alt={group.name}
          className="w-16 h-16 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {group.name}
          </h2>

          <p className="text-sm text-blue-600 font-medium">
            {group.topic}
          </p>

          <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
            <FaUsers />

            <span>
              {group.members?.length || 0} Members
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full sm:w-auto">
        {isMember ? (
          <button
            onClick={onLeaveGroup}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Leave Group
          </button>
        ) : (
          <button
            onClick={onJoinGroup}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Join Group
          </button>
        )}
      </div>
    </div>
  );
};

export default GroupHeader;