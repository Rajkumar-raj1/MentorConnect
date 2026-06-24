import {
  FaBell,
  FaComments,
  FaCalendarCheck,
  FaUsers,
  FaTrash,
} from "react-icons/fa";

import { timeAgo } from "../../utils/formatDate";

const NotificationCard = ({
  notification,
  onRead,
  onDelete,
}) => {
  const getIcon = () => {
    switch (notification?.type) {
      case "chat":
        return <FaComments className="text-blue-600" size={20} />;

      case "booking":
        return (
          <FaCalendarCheck
            className="text-green-600"
            size={20}
          />
        );

      case "group":
        return <FaUsers className="text-purple-600" size={20} />;

      default:
        return <FaBell className="text-yellow-500" size={20} />;
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border p-4 transition hover:shadow-md ${
        !notification?.isRead
          ? "border-blue-500"
          : "border-gray-200"
      }`}
    >
      <div className="flex justify-between gap-4">
        {/* Left */}
        <div className="flex gap-3 flex-1">
          <div className="mt-1">
            {getIcon()}
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-gray-800">
              {notification?.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1">
              {notification?.message}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              {timeAgo(notification?.createdAt)}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-end gap-3">
          {!notification?.isRead && (
            <button
              onClick={() => onRead(notification?._id)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Mark Read
            </button>
          )}

          <button
            onClick={() => onDelete(notification?._id)}
            className="text-red-500 hover:text-red-600"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;