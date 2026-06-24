// src/models/session.model.js

import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mentor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    topic: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "accepted",
        "rejected",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    meetingLink: {
      type: String,
      default: "",
    },

    mentorNotes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Session = mongoose.model("Session", sessionSchema);