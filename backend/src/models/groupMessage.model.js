// src/models/groupMessage.model.js

import mongoose, { Schema } from "mongoose";

const groupMessageSchema = new Schema(
  {
    group: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },

    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    seenBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const GroupMessage = mongoose.model(
  "GroupMessage",
  groupMessageSchema
);