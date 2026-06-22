import { Schema, model, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export type UserType = InferSchemaType<typeof userSchema>;

export const User = model("User", userSchema);