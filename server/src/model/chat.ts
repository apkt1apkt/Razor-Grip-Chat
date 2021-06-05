import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    message: String,
    sender: String,
    recipient: String,
    thread: String,
  },
  { timestamps: {} }
);

chatSchema.index({ thread: 1 });

export const Chat = model<IChat>("chats", chatSchema);

export interface IChat {
  _id: string;
  sender: string;
  recipient: string;
  thread: string;
}

export const getThreadId = (id1: string, id2: string) => (id1 > id2 ? `${id1}:${id2}` : `${id2}:${id1}`);
