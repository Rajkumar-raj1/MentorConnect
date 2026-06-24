import { Group } from "../models/group.model.js";
import { GroupMessage } from "../models/groupMessage.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

// Create group
const createGroup = asyncHandler(async (req, res) => {
  const { name, topic, description } = req.body;

  if (!name || !topic) {
    throw new ApiError(400, "Group name and topic are required");
  }

  let groupImageUrl = "";

  if (req.file?.path) {
    const groupImage = await uploadOnCloudinary(req.file.path);
    groupImageUrl = groupImage?.secure_url || "";
  }

  const group = await Group.create({
    name,
    topic,
    description,
    groupImage: groupImageUrl,
    createdBy: req.user._id,
    members: [req.user._id],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, group, "Group created successfully"));
});

// Get all active groups
const getAllGroups = asyncHandler(async (req, res) => {
  const groups = await Group.find({ isActive: true })
    .populate("createdBy", "fullName email avatar role")
    .populate("members", "fullName avatar role")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, groups, "Groups fetched successfully"));
});

// Get single group
const getGroupById = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId)
    .populate("createdBy", "fullName email avatar role")
    .populate("members", "fullName avatar role");

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, group, "Group fetched successfully"));
});

// Join group
const joinGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId);

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  const alreadyJoined = group.members.some(
  (memberId) => memberId.toString() === req.user._id.toString()
);

if (alreadyJoined) {
  throw new ApiError(400, "You are already a member of this group");
}

  group.members.push(req.user._id);
  await group.save();

  return res
    .status(200)
    .json(new ApiResponse(200, group, "Joined group successfully"));
});

// Leave group
const leaveGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const group = await Group.findById(groupId);

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  group.members = group.members.filter(
    (memberId) => memberId.toString() !== req.user._id.toString()
  );

  await group.save();

  return res
    .status(200)
    .json(new ApiResponse(200, group, "Left group successfully"));
});

// Send group message
const sendGroupMessage = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const { text } = req.body;

  if (!text) {
    throw new ApiError(400, "Message text is required");
  }

  const group = await Group.findById(groupId);

  if (!group) {
    throw new ApiError(404, "Group not found");
  }

  const isMember = group.members.some(
    (memberId) => memberId.toString() === req.user._id.toString()
  );

  if (!isMember) {
    throw new ApiError(403, "Join the group before sending messages");
  }

  const message = await GroupMessage.create({
    group: groupId,
    sender: req.user._id,
    text,
    seenBy: [req.user._id],
  });

  const populatedMessage = await GroupMessage.findById(message._id).populate(
    "sender",
    "fullName avatar role"
  );

  return res
    .status(201)
    .json(new ApiResponse(201, populatedMessage, "Message sent successfully"));
});

// Get group messages
const getGroupMessages = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const messages = await GroupMessage.find({ group: groupId })
    .populate("sender", "fullName avatar role")
    .sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, messages, "Group messages fetched successfully"));
});

export {
  createGroup,
  getAllGroups,
  getGroupById,
  joinGroup,
  leaveGroup,
  sendGroupMessage,
  getGroupMessages,
};