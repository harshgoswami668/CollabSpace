
import mongoose from "mongoose";

const yjsDocumentSchema = new mongoose.Schema(
  {
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
      unique: true,
      index: true,
    },

    state: {
      type: Buffer,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const yjsDocumentModel = mongoose.model(
  "YjsDocument",
  yjsDocumentSchema
);

export default yjsDocumentModel;