import { DEFAULT_AVATAR } from "../../utils/constants";
import { timeAgo } from "../../utils/formatDate";

const ConversationList = ({
  conversations,
  selectedConversation,
  currentUser,
  onSelectConversation,
}) => {
  return (
    <div className="h-full bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-4 py-3 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          Conversations
        </h2>
      </div>

      <div className="h-[calc(100%-57px)] overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-sm text-gray-500 text-center">
            No conversations yet
          </div>
        ) : (
          conversations.map((conversation) => {
            const otherUser = conversation.participants?.find(
              (user) => user._id !== currentUser?._id
            );

            const isActive =
              selectedConversation?._id === conversation._id;

            return (
              <button
                key={conversation._id}
                onClick={() => onSelectConversation(conversation)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b transition ${
                  isActive ? "bg-blue-50" : "bg-white hover:bg-gray-50"
                }`}
              >
                <img
                  src={
                    otherUser?.avatar ||
                    `${DEFAULT_AVATAR}&name=${encodeURIComponent(
                      otherUser?.fullName || "User"
                    )}`
                  }
                  alt={otherUser?.fullName || "User"}
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`truncate ${
                        conversation.unreadCount > 0
                          ? "font-bold text-gray-900"
                          : "font-medium text-gray-800"
                      }`}
                    >
                      {otherUser?.fullName || "User"}
                    </h3>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-xs ${
                          conversation.unreadCount > 0
                            ? "text-blue-600 font-semibold"
                            : "text-gray-400"
                        }`}
                      >
                        {timeAgo(conversation?.updatedAt)}
                      </span>

                      {conversation.unreadCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    className={`text-sm truncate mt-1 ${
                      conversation.unreadCount > 0
                        ? "text-gray-900 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {conversation?.lastMessage?.text || "No messages yet"}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;