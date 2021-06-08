import { IChat, Chat, getThreadId } from "@server/model/chat";
import { User } from "@server/model/user";
import { PUBLISH, SUBSCRIBE } from "@server/redis";

const getFriendFromThread = (uid: string, thread: string) => {
  const [idOne, idTwo] = thread.split(":");
  return uid === idOne ? idTwo : idOne;
};

export const ChatResolver: Resolver.Resolvers<IChat> = {
  Query: {
    chatThread: async (_, { recipient }, { uid, authenticate }) => {
      authenticate();
      return Chat.find({ thread: getThreadId(recipient, uid) })
        .limit(100)
        .lean();
    },

    recentChats: async (_, __, { uid, authenticate }) => {
      authenticate();
      const chatThreads = await Chat.distinct("thread", { $or: [{ recipient: uid }, { sender: uid }] });
      const chatHeads = chatThreads.map((v) => getFriendFromThread(uid, v));
      return User.find({ _id: { $in: chatHeads } })
        .limit(100)
        .lean();
    },
  },

  Mutation: {
    sendMessage: async (_, { message, recipient }, { uid, authenticate }) => {
      authenticate();
      const chat = await Chat.create({ thread: getThreadId(recipient, uid), recipient, sender: uid, message });
      PUBLISH("incomingMessage", { incomingMessage: chat });
      return chat;
    },
  },

  Subscription: {
    incomingMessage: SUBSCRIBE("incomingMessage", (payload, { sender }, { uid, isAuthenticated }) => {
      if (!isAuthenticated) return false;
      const chat: IChat = payload.incomingMessage || {};
      return chat.thread === getThreadId(uid, sender);
    }),
  },

  Chat: {
    isMine: (chat, _, { uid }) => chat.sender === uid,
  },
};

export const ChatTypedef = `   
    type Chat {
        _id: String
        message: String
        sender: String
        recipient: String
        isMine: Boolean
        thread: String
        createdAt: DateTime
        _isOptimistic: Boolean
    }

    extend type Query {
        chatThread(recipient:String!): [Chat]
        recentChats: [User]
    }

    extend type Mutation {
        sendMessage(recipient:String! message:String!): Chat
    }

    extend type Subscription {
        incomingMessage(sender:String!): Chat
    }
`;
