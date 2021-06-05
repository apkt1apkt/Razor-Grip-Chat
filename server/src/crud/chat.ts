import { IChat, Chat, getThreadId } from "@server/model/chat";
import { PUBLISH, SUBSCRIBE } from "@server/redis";

export const ChatResolver: Resolver.Resolvers<IChat> = {
  Query: {
    messages: (_, { recipient }, { uid, authenticate }) => {
      authenticate();
      return Chat.find({ thread: getThreadId(recipient, uid) });
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
      return chat.recipient === uid && chat.thread === getThreadId(uid, sender);
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
    }

    extend type Query {
        messages(recipient:String!): [Chat]
    }

    extend type Mutation {
        sendMessage(recipient:String! message:String!): Chat
    }

    extend type Subscription {
        incomingMessage(sender:String!): Chat
    }
`;
