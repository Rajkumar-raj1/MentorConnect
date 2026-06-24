import { User } from "../models/user.model.js";
import { MentorProfile } from "../models/mentorProfile.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, users, "Users fetched successfully"));
});

// Get pending mentor accounts
const getPendingMentors = asyncHandler(async (req, res) => {
  const mentors = await User.find({
    role: "mentor",
    isApproved: false,
  })
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, mentors, "Pending mentors fetched successfully"));
});

// Approve mentor
const approveMentor = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const mentor = await User.findOneAndUpdate(
    { _id: userId, role: "mentor" },
    { $set: { isApproved: true } },
    { new: true }
  ).select("-password -refreshToken");

  if (!mentor) {
    throw new ApiError(404, "Mentor not found");
  }

  await MentorProfile.findOneAndUpdate(
    { user: userId },
    { $set: { isVerified: true } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, mentor, "Mentor approved successfully"));
});

// Reject mentor
const rejectMentor = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const mentor = await User.findOneAndUpdate(
    { _id: userId, role: "mentor" },
    { $set: { isApproved: false } },
    { new: true }
  ).select("-password -refreshToken");

  if (!mentor) {
    throw new ApiError(404, "Mentor not found");
  }

  await MentorProfile.findOneAndUpdate(
    { user: userId },
    { $set: { isVerified: false } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, mentor, "Mentor rejected successfully"));
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await MentorProfile.findOneAndDelete({ user: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User deleted successfully"));
});

export {
  getAllUsers,
  getPendingMentors,
  approveMentor,
  rejectMentor,
  deleteUser,
};