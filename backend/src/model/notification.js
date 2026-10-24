import mongoose from "mongoose";

const notificationSchema =
  new mongoose.Schema(
    {
      employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
        index: true
      },

      actorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        default: null
      },

      type: {
        type: String,
        required: true
      },

      title: {
        type: String,
        required: true
      },

      entityType: {
        type: String,
        default: null
      },

      entityId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
      },

      isRead: {
        type: Boolean,
        default: false
      }
    },
    {
      timestamps: true
    }
  );

const notificationModel =
  mongoose.model(
    "Notification",
    notificationSchema
  );

export default notificationModel;