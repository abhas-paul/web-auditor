import { Schema, model, Types } from "mongoose";

const reportSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    report: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Report = model("Report", reportSchema);