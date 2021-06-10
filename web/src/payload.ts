export const chatPayload = "_id message createdAt isMine _isOptimistic";

export type Chat = {
  _id: string;
  message: string;
  createdAt: Date;
  isMine: boolean;
  _isOptimistic: boolean;
};

export const userPayload = "_id name img email isOnline weConnect isTyping lastSeen";

export type User = {
  _id: string;
  name: string;
  img: string;
  isOnline: boolean;
  email: string;
  weConnect: boolean;
  lastSeen: Date;
};
