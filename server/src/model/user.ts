import { Schema, model } from "mongoose";

const userSchema = new Schema({
  _id: String,
  isOnline: Boolean,
  lastSeen: Date,
});

export const User = model<IUser>("users", userSchema);

export interface IUser {
  _id: string;
  isOnline?: boolean;
  lastSeen?: Date;
}
