import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true
    },

    blockId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Block",
      required: true
    },

    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    content: {
      type: String,
      required: true
    },

    isResolved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const commentModel = mongoose.model(
  "Comment",
  commentSchema
);

export default commentModel;


