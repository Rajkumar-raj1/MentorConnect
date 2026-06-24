import NotificationCard from "../components/Notification/NotificationCard";
import Loader from "../components/Loader";
import useNotification from "../hooks/useNotification";

const Notifications = () => {
  const {
    notifications,
    loading,
    unreadCount,
    readNotification,
    readAllNotifications,
    removeNotification,
  } = useNotification();

  if (loading) {
    return <Loader text="Loading notifications..." />;
  }

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 sm:p-10 text-white">
        <h1 className="text-3xl sm:text-4xl font-bold">
          Notifications
        </h1>

        <p className="mt-3 text-blue-100">
          Stay updated with session requests, messages, and platform alerts.
        </p>

        <p className="mt-4 inline-block bg-white/20 px-4 py-2 rounded-full text-sm">
          {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
        </p>
      </section>

      <div className="flex justify-end">
        {unreadCount > 0 && (
          <button
            onClick={readAllNotifications}
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            No notifications
          </h2>

          <p className="mt-2 text-gray-500">
            You are all caught up.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationCard
              key={notification._id}
              notification={notification}
              onRead={readNotification}
              onDelete={removeNotification}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;