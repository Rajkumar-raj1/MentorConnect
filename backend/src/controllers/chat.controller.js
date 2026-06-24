import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Notification } from "../models/notification.model.js";
// Create or get existing conversation
const createOrGetConversation = asyncHandler(async (req, res) => {
  const { receiverId } = req.body;

  if (!receiverId) {
    throw new ApiError(400, "Receiver ID is required");
  }

  let conversation = await Conversation.findOne({
    participants: {
      $all: [req.user._id, receiverId],
    },
  }).populate("participants", "fullName email avatar role");

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [req.user._id, receiverId],
    });

    conversation = await Conversation.findById(conversation._id).populate(
      "participants",
      "fullName email avatar role"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, conversation, "Conversation fetched successfully"));
});

// Get logged-in user's conversations
const getMyConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    participants: req.user._id,
  })
    .populate("participants", "fullName email avatar role")
    .populate({
      path: "lastMessage",
      populate: {
        path: "sender receiver",
        select: "fullName avatar role",
      },
    })
    .sort({ updatedAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, conversations, "Conversations fetched successfully"));
});

// Send message
const sendMessage = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;
  const { receiverId, text } = req.body;

  if (!conversationId || !receiverId || !text) {
    throw new ApiError(400, "Conversation ID, receiver ID and text are required");
  }

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  const isParticipant = conversation.participants.some(
    (participantId) => participantId.toString() === req.user._id.toString()
  );

  if (!isParticipant) {
    throw new ApiError(403, "You are not allowed to send message in this conversation");
  }

  const message = await Message.create({
    conversation: conversationId,
    sender: req.user._id,
    receiver: receiverId,
    text,
  });

  conversation.lastMessage = message._id;
  await conversation.save();

  const populatedMessage = await Message.findById(message._id)
    .populate("sender", "fullName avatar role")
    .populate("receiver", "fullName avatar role");

    await Notification.create({
  user: receiverId,
  title: "New Message",
  message: `${req.user.fullName} sent you a message`,
  type: "message",
  relatedId: conversationId,
});
  return res
    .status(201)
    .json(new ApiResponse(201, populatedMessage, "Message sent successfully"));
});

// Get messages of a conversation
const getMessages = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "Conversation not found");
  }

  const isParticipant = conversation.participants.some(
    (participantId) => participantId.toString() === req.user._id.toString()
  );

  if (!isParticipant) {
    throw new ApiError(403, "You are not allowed to view this conversation");
  }

  const messages = await Message.find({ conversation: conversationId })
    .populate("sender", "fullName avatar role")
    .populate("receiver", "fullName avatar role")
    .sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Messages fetched successfully"));
});

// Mark messages as seen
const markMessagesAsSeen = asyncHandler(async (req, res) => {
  const { conversationId } = req.params;

  await Message.updateMany(
    {
      conversation: conversationId,
      receiver: req.user._id,
      seen: false,
    },
    {
      $set: {
        seen: true,
      },
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Messages marked as seen"));
});

export {
  createOrGetConversation,
  getMyConversations,
  sendMessage,
  getMessages,
  markMessagesAsSeen,
};