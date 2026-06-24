import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

import useNotification from "../../hooks/useNotification";
import { timeAgo } from "../../utils/formatDate";

const NotificationDropdown = () => {
  const {
    notifications,
    unreadCount,
    readNotification,
    readAllNotifications,
  } = useNotification();

  const latestNotifications = notifications.slice(0, 5);

  return (
    <div className="relative group">
      <button className="relative text-gray-700 hover:text-blue-600">
        <FaBell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      <div className="absolute right-0 mt-3 w-80 max-w-[90vw] bg-white rounded-xl shadow-lg border hidden group-hover:block z-50">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-800">
            Notifications
          </h3>

          {unreadCount > 0 && (
            <button
              onClick={readAllNotifications}
              className="text-xs text-blue-600 font-medium"
            >
              Mark all read
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {latestNotifications.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">
              No notifications
            </p>
          ) : (
            latestNotifications.map((notification) => (
              <button
                key={notification._id}
                onClick={() => readNotification(notification._id)}
                className={`w-full text-left px-4 py-3 border-b hover:bg-gray-50 ${
                  !notification.isRead ? "bg-blue-50" : "bg-white"
                }`}
              >
                <h4 className="text-sm font-semibold text-gray-800">
                  {notification.title}
                </h4>

                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {notification.message}
                </p>

                <p className="text-[11px] text-gray-400 mt-1">
                  {timeAgo(notification.createdAt)}
                </p>
              </button>
            ))
          )}
        </div>

        <Link
          to="/notifications"
          className="block text-center text-sm text-blue-600 font-medium py-3 hover:bg-gray-50 rounded-b-xl"
        >
          View all notifications
        </Link>
      </div>
    </div>
  );
};

export default NotificationDropdown;