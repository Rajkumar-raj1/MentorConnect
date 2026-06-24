import { Session } from "../models/session.model.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Book session by student
const bookSession = asyncHandler(async (req, res) => {
  const { mentorId, topic, description, date, startTime, endTime } = req.body;

  if (req.user.role !== "student") {
    throw new ApiError(403, "Only students can book sessions");
  }

  if (!mentorId || !topic || !date || !startTime || !endTime) {
    throw new ApiError(400, "All required fields must be provided");
  }

  const mentor = await User.findById(mentorId);

  if (!mentor || mentor.role !== "mentor") {
    throw new ApiError(404, "Mentor not found");
  }

  if (mentor._id.toString() === req.user._id.toString()) {
    throw new ApiError(400, "You cannot book a session with yourself");
  }

  const session = await Session.create({
    student: req.user._id,
    mentor: mentorId,
    topic,
    description,
    date,
    startTime,
    endTime,
  });

  await Notification.create({
    user: mentorId,
    title: "New Session Request",
    message: `${req.user.fullName} requested a session on ${topic}`,
    type: "booking",
    relatedId: session._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, session, "Session booked successfully"));
});

// Get my sessions
const getMySessions = asyncHandler(async (req, res) => {
  const sessions = await Session.find({
    $or: [{ student: req.user._id }, { mentor: req.user._id }],
  })
    .populate("student", "fullName email avatar role")
    .populate("mentor", "fullName email avatar role")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, sessions, "Sessions fetched successfully"));
});

// Accept session by mentor
const acceptSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const { meetingLink } = req.body;

  const session = await Session.findById(sessionId);

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  if (session.mentor.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only assigned mentor can accept this session");
  }

  session.status = "accepted";
  session.meetingLink = meetingLink || "";
  await session.save();

  await Notification.create({
    user: session.student,
    title: "Session Accepted",
    message: "Your mentorship session has been accepted",
    type: "booking",
    relatedId: session._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, session, "Session accepted successfully"));
});

// Reject session by mentor
const rejectSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const { mentorNotes } = req.body;

  const session = await Session.findById(sessionId);

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  if (session.mentor.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only assigned mentor can reject this session");
  }

  session.status = "rejected";
  session.mentorNotes = mentorNotes || "";
  await session.save();

  await Notification.create({
    user: session.student,
    title: "Session Rejected",
    message: "Your mentorship session request was rejected",
    type: "booking",
    relatedId: session._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, session, "Session rejected successfully"));
});

// Cancel session by student or mentor
const cancelSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;

  const session = await Session.findById(sessionId);

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  const isParticipant =
    session.student.toString() === req.user._id.toString() ||
    session.mentor.toString() === req.user._id.toString();

  if (!isParticipant) {
    throw new ApiError(403, "You are not allowed to cancel this session");
  }

  session.status = "cancelled";
  await session.save();

  const notifyUser =
    session.student.toString() === req.user._id.toString()
      ? session.mentor
      : session.student;

  await Notification.create({
    user: notifyUser,
    title: "Session Cancelled",
    message: "A mentorship session has been cancelled",
    type: "booking",
    relatedId: session._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, session, "Session cancelled successfully"));
});

// Complete session by mentor
const completeSession = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const { mentorNotes } = req.body;

  const session = await Session.findById(sessionId);

  if (!session) {
    throw new ApiError(404, "Session not found");
  }

  if (session.mentor.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only assigned mentor can complete this session");
  }

  session.status = "completed";
  session.mentorNotes = mentorNotes || session.mentorNotes;
  await session.save();

  await Notification.create({
    user: session.student,
    title: "Session Completed",
    message: "Your mentorship session has been marked as completed",
    type: "booking",
    relatedId: session._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, session, "Session completed successfully"));
});

export {
  bookSession,
  getMySessions,
  acceptSession,
  rejectSession,
  cancelSession,
  completeSession,
};