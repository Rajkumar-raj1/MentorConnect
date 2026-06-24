import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const GroupInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage || disabled) return;

    onSendMessage(trimmedMessage);

    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="border-t bg-white p-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={message}
          disabled={disabled}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            disabled ? "Join group to send messages" : "Type a group message..."
          }
          className="
            flex-1 border border-gray-300 rounded-full px-4 py-3 text-sm
            outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            disabled:bg-gray-100 disabled:cursor-not-allowed
          "
        />

        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="
            h-12 w-12 rounded-full bg-blue-600 text-white
            flex items-center justify-center hover:bg-blue-700 transition
            disabled:bg-gray-400 disabled:cursor-not-allowed
          "
        >
          <FaPaperPlane size={16} />
        </button>
      </div>
    </form>
  );
};

export default GroupInput;