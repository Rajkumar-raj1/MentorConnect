import { MentorProfile } from "../models/mentorProfile.model.js";
import { User } from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create mentor profile
const createMentorProfile = asyncHandler(async (req, res) => {
  const {
    bio,
    company,
    position,
    experience,
    skills,
    expertise,
    availableSlots,
    linkedin,
    github,
    portfolio,
  } = req.body;

  if (req.user.role !== "mentor") {
    throw new ApiError(403, "Only mentors can create mentor profile");
  }

  const existingProfile = await MentorProfile.findOne({ user: req.user._id });

  if (existingProfile) {
    throw new ApiError(409, "Mentor profile already exists");
  }

  const profile = await MentorProfile.create({
    user: req.user._id,
    bio,
    company,
    position,
    experience,
    skills,
    expertise,
    availableSlots,
    linkedin,
    github,
    portfolio,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, profile, "Mentor profile created successfully"));
});

// Get all mentors
const getAllMentors = asyncHandler(async (req, res) => {
  const mentors = await MentorProfile.find()
    .populate("user", "fullName email avatar college branch role isApproved")
    .sort({ rating: -1, totalSessions: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, mentors, "Mentors fetched successfully"));
});

// Get single mentor
const getMentorById = asyncHandler(async (req, res) => {
  const { mentorId } = req.params;

  const mentor = await MentorProfile.findById(mentorId).populate(
    "user",
    "fullName email avatar college branch role isApproved"
  );

  if (!mentor) {
    throw new ApiError(404, "Mentor profile not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, mentor, "Mentor fetched successfully"));
});

// Get my mentor profile
const getMyMentorProfile = asyncHandler(async (req, res) => {
  const profile = await MentorProfile.findOne({ user: req.user._id }).populate(
    "user",
    "fullName email avatar college branch role isApproved"
  );

  if (!profile) {
    throw new ApiError(404, "Mentor profile not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Mentor profile fetched successfully"));
});

// Update mentor profile
const updateMentorProfile = asyncHandler(async (req, res) => {
  const {
    bio,
    company,
    position,
    experience,
    skills,
    expertise,
    availableSlots,
    linkedin,
    github,
    portfolio,
  } = req.body;

  const profile = await MentorProfile.findOneAndUpdate(
    { user: req.user._id },
    {
      $set: {
        bio,
        company,
        position,
        experience,
        skills,
        expertise,
        availableSlots,
        linkedin,
        github,
        portfolio,
      },
    },
    { new: true }
  ).populate("user", "fullName email avatar college branch role isApproved");

  if (!profile) {
    throw new ApiError(404, "Mentor profile not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Mentor profile updated successfully"));
});

// Search mentors
const searchMentors = asyncHandler(async (req, res) => {
  const { skill, expertise, company, branch } = req.query;

  const mentorQuery = {};

  if (skill) {
    mentorQuery.skills = { $regex: skill, $options: "i" };
  }

  if (expertise) {
    mentorQuery.expertise = { $regex: expertise, $options: "i" };
  }

  if (company) {
    mentorQuery.company = { $regex: company, $options: "i" };
  }

  let mentors = await MentorProfile.find(mentorQuery)
    .populate("user", "fullName email avatar college branch role isApproved")
    .sort({ rating: -1 });

  if (branch) {
    mentors = mentors.filter(
      (mentor) =>
        mentor.user?.branch?.toLowerCase() === branch.toLowerCase()
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, mentors, "Mentors search results fetched"));
});

// Delete mentor profile
const deleteMentorProfile = asyncHandler(async (req, res) => {
  const profile = await MentorProfile.findOneAndDelete({
    user: req.user._id,
  });

  if (!profile) {
    throw new ApiError(404, "Mentor profile not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Mentor profile deleted successfully"));
});

export {
  createMentorProfile,
  getAllMentors,
  getMentorById,
  getMyMentorProfile,
  updateMentorProfile,
  searchMentors,
  deleteMentorProfile,
};