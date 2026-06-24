
const onlineUsers = new Map();

const socketHandlers = (io, socket) => {
  console.log("User connected:", socket.id);

  // User joins after login
  socket.on("join", (userId) => {
    if (!userId) return;

    onlineUsers.set(userId, socket.id);
    socket.join(userId);

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));

    console.log("User joined:", userId);
  });

  // One-to-one chat room
  socket.on("joinConversation", (conversationId) => {
    if (!conversationId) return;

    socket.join(conversationId);
    console.log(`Joined conversation: ${conversationId}`);
  });

  socket.on("leaveConversation", (conversationId) => {
    if (!conversationId) return;

    socket.leave(conversationId);
  });

  // Real-time private message
  socket.on("sendMessage", ({ conversationId, message }) => {
    if (!conversationId || !message) return;

    io.to(conversationId).emit("receiveMessage", message);

    // Optional: notify receiver directly
    if (message?.receiver?._id || message?.receiver) {
      const receiverId = message.receiver?._id || message.receiver;

      io.to(receiverId).emit("newNotification", {
        type: "message",
        title: "New Message",
        message: `${message?.sender?.fullName || "Someone"} sent you a message`,
        relatedId: conversationId,
      });
    }
  });

  // Typing indicator
  socket.on("typing", ({ conversationId, userId }) => {
    if (!conversationId || !userId) return;

    socket.to(conversationId).emit("typing", { userId });
  });

  socket.on("stopTyping", ({ conversationId, userId }) => {
    if (!conversationId || !userId) return;

    socket.to(conversationId).emit("stopTyping", { userId });
  });

  // Message seen
  socket.on("messageSeen", ({ conversationId, messageId }) => {
    if (!conversationId || !messageId) return;

    socket.to(conversationId).emit("messageSeen", { messageId });
  });

  // Group chat
  socket.on("joinGroup", (groupId) => {
    if (!groupId) return;

    socket.join(groupId);
    console.log(`Joined group: ${groupId}`);
  });

  socket.on("leaveGroup", (groupId) => {
    if (!groupId) return;

    socket.leave(groupId);
  });

  socket.on("sendGroupMessage", ({ groupId, message }) => {
    if (!groupId || !message) return;

    io.to(groupId).emit("receiveGroupMessage", message);
  });

  // Disconnect
  socket.on("disconnect", () => {
    let disconnectedUserId = null;

    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        disconnectedUserId = userId;
        onlineUsers.delete(userId);
        break;
      }
    }

    io.emit("onlineUsers", Array.from(onlineUsers.keys()));

    console.log("User disconnected:", disconnectedUserId || socket.id);
  });
};

export default socketHandlers;