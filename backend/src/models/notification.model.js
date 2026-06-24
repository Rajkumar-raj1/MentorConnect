
import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["message", "booking", "admin"],
      default: "message",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    relatedId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Notification = mongoose.model(
  "Notification",
  notificationSchema
);