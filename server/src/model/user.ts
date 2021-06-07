import { Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: String,
  isOnline: Boolean,
  lastSeen: Date,
  img: String,
  name: String,
  email: String,
  blockedByMe: [String],
  blockedByOthers: [String],
});

userSchema.index({ isOnline: 1 });
userSchema.index({ blockedByMe: 1 });
userSchema.index({ blockedByOthers: 1 });

export const User = model<IUser>("users", userSchema);

export interface IUser {
  _id: string;
  isOnline?: boolean;
  lastSeen?: Date;
  img?: string;
  name?: string;
  email?: string;
  blockedByMe?: string[];
  blockedByOthers?: string[];
}
