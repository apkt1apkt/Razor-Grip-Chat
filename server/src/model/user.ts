import { Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: String,
  isOnline: Boolean,
  lastSeen: Date,
  img: String,
  name: String,
  email: String,
});

userSchema.index({ isOnline: 1 });

export const User = model<IUser>("users", userSchema);

export interface IUser {
  _id: string;
  isOnline?: boolean;
  lastSeen?: Date;
  img?: string;
  name?: string;
  email?: string;
}
