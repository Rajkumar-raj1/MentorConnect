
import mongoose, { Schema } from "mongoose";

const mentorProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    bio: {
      type: String,
      trim: true,
      default: "",
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    position: {
      type: String,
      trim: true,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    expertise: [
      {
        type: String,
        trim: true,
      },
    ],

    availableSlots: [
      {
        day: {
          type: String,
        },

        startTime: {
          type: String,
        },

        endTime: {
          type: String,
        },
      },
    ],

    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    portfolio: {
      type: String,
      default: "",
    },

    totalSessions: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const MentorProfile = mongoose.model(
  "MentorProfile",
  mentorProfileSchema
);