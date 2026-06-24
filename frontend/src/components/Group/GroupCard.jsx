import { FaUsers, FaTag } from "react-icons/fa";

const GroupCard = ({
  group,
  onViewGroup,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Group Image */}
      <img
        src={
          group.groupImage ||
          "https://via.placeholder.com/600x300?text=MentorConnect+Group"
        }
        alt={group.name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-5">
        {/* Group Name */}
        <h2 className="text-xl font-semibold text-gray-800 truncate">
          {group.name}
        </h2>

        {/* Topic */}
        <div className="flex items-center gap-2 mt-2 text-blue-600">
          <FaTag />

          <span className="text-sm">
            {group.topic}
          </span>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-600 line-clamp-3">
          {group.description || "No description available."}
        </p>

        {/* Members */}
        <div className="flex items-center gap-2 mt-4 text-gray-500">
          <FaUsers />

          <span className="text-sm">
            {group.members?.length || 0} Members
          </span>
        </div>

        {/* Creator */}
        <div className="mt-3 text-sm text-gray-500">
          Created by{" "}
          <span className="font-medium text-gray-700">
            {group.createdBy?.fullName}
          </span>
        </div>

        {/* Button */}
        <button
          onClick={() => onViewGroup(group)}
          className="
            mt-5
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-lg
            transition
            font-medium
          "
        >
          View Group
        </button>
      </div>
    </div>
  );
};

export default GroupCard;