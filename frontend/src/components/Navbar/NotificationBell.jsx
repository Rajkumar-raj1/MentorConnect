import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import useNotification from "../../hooks/useNotification";

const NotificationBell = () => {
  const { unreadCount } = useNotification();

  return (
    <Link to="/notifications" className="relative text-gray-700">
      <FaBell size={20} />

      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </Link>
  );
};

export default NotificationBell;