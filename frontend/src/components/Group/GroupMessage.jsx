import { DEFAULT_AVATAR } from "../../utils/constants";
import { formatTime } from "../../utils/formatDate";

const GroupMessage = ({ message, currentUser }) => {
  const isOwnMessage = message?.sender?._id === currentUser?._id;

  return (
    <div
      className={`flex gap-3 ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isOwnMessage && (
        <img
          src={
            message?.sender?.avatar ||
            `${DEFAULT_AVATAR}&name=${message?.sender?.fullName || "User"}`
          }
          alt={message?.sender?.fullName}
          className="w-8 h-8 rounded-full object-cover shrink-0"
        />
      )}

      <div
        className={`max-w-[78%] sm:max-w-[65%] md:max-w-[55%] px-4 py-2 rounded-2xl text-sm ${
          isOwnMessage
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-white text-gray-800 border rounded-bl-sm"
        }`}
      >
        {!isOwnMessage && (
          <p className="text-xs font-semibold text-blue-600 mb-1">
            {message?.sender?.fullName}
          </p>
        )}

        <p className="break-words leading-relaxed">
          {message?.text}
        </p>

        <p
          className={`mt-1 text-[11px] text-right ${
            isOwnMessage ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {formatTime(message?.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default GroupMessage;