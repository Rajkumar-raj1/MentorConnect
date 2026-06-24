import { useEffect, useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

const ChatInput = ({
  onSendMessage,
  onTyping,
  onStopTyping,
}) => {
  const [message, setMessage] = useState("");

  const textareaRef = useRef(null);
  const typingTimeout = useRef(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height =
      textareaRef.current.scrollHeight + "px";
  }, [message]);

  const handleChange = (e) => {
    setMessage(e.target.value);

    onTyping?.();

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      onStopTyping?.();
    }, 1000);
  };

  const send = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    onSendMessage(trimmed);

    setMessage("");

    onStopTyping?.();

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    send();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t bg-white p-3"
    >
      <div className="flex items-end gap-3">
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="
            flex-1
            resize-none
            max-h-36
            overflow-y-auto
            border
            border-gray-300
            rounded-2xl
            px-4
            py-3
            text-sm
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-200
            transition
          "
        />

        <button
          type="submit"
          disabled={!message.trim()}
          className="
            h-12
            w-12
            rounded-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            flex
            items-center
            justify-center
            transition
            disabled:bg-gray-400
            disabled:cursor-not-allowed
            flex-shrink-0
          "
        >
          <FaPaperPlane />
        </button>
      </div>

      <p className="mt-2 text-xs text-gray-400">
        Press <span className="font-semibold">Enter</span> to send •{" "}
        <span className="font-semibold">Shift + Enter</span> for a new line
      </p>
    </form>
  );
};

export default ChatInput;