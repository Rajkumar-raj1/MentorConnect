import { formatTime } from "../../utils/formatDate";

const ChatMessage = ({ message, isOwnMessage }) => {
  return (
    <div
      className={`flex ${
        isOwnMessage ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[78%] sm:max-w-[65%] md:max-w-[55%]
          px-4 py-2 rounded-2xl text-sm
          ${
            isOwnMessage
              ? "bg-blue-600 text-white rounded-br-sm"
              : "bg-white text-gray-800 border rounded-bl-sm"
          }
        `}
      >
        <p className="break-words leading-relaxed">
          {message?.text}
        </p>

        <div
          className={`mt-1 text-[11px] flex justify-end ${
            isOwnMessage ? "text-blue-100" : "text-gray-400"
          }`}
        >
          {formatTime(message?.createdAt)}

          {isOwnMessage && (
            <span className="ml-2">
              {message?.seen ? "Seen" : "Sent"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;