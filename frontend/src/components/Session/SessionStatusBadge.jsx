const SessionStatusBadge = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";

      case "accepted":
        return "bg-green-100 text-green-700 border border-green-300";

      case "rejected":
        return "bg-red-100 text-red-700 border border-red-300";

      case "completed":
        return "bg-blue-100 text-blue-700 border border-blue-300";

      case "cancelled":
        return "bg-gray-100 text-gray-700 border border-gray-300";

      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "pending":
        return "Pending";

      case "accepted":
        return "Accepted";

      case "rejected":
        return "Rejected";

      case "completed":
        return "Completed";

      case "cancelled":
        return "Cancelled";

      default:
        return "Unknown";
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${getStatusStyle()}`}
    >
      {getStatusText()}
    </span>
  );
};

export default SessionStatusBadge;