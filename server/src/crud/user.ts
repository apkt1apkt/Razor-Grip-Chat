import { User, IUser } from "@server/model/user";
import { PUBLISH, SUBSCRIBE } from "@server/redis";
import { tryCatchWrap } from "@server/helpers/error";

export const userIsOnline = async (isOnline: boolean, _id: string) => {
  const lastSeen = new Date();
  const user = await tryCatchWrap(() =>
    User.findOneAndUpdate({ _id }, { isOnline, lastSeen }, { upsert: true, new: true })
  );
  PUBLISH("userOnlineStatusChanged", { userOnlineStatusChanged: user || { _id, isOnline, lastSeen } });
};

export const UserResolver: Resolver.Resolvers<IUser> = {
  Query: {
    usersOnline: (_, __, { authenticate, uid }) => {
      authenticate();
      return User.find({ isOnline: true, _id: { $ne: uid } }).lean();
    },
  },

  Mutation: {
    updateMe: async (_, { body }, { authenticate, uid }) => {
      authenticate();
      const user = await User.findOneAndUpdate({ _id: uid }, { ...body }, { upsert: true, new: true });
      return user;
    },
  },

  Subscription: {
    userOnlineStatusChanged: SUBSCRIBE("userOnlineStatusChanged", (payload, __, { uid, isAuthenticated }) => {
      if (!isAuthenticated) return false;
      return payload.userOnlineStatusChanged?._id !== uid;
    }),
  },
};

export const UserTypedef = `
  type User {
    _id: String
    isOnline: Boolean
    lastSeen: DateTime
    img: String
    name: String
    email: String
  }

  input UserInput {
    img: String
    name: String
    email: String
  }

  extend type Query {
    usersOnline: [User]
  }

  extend type Mutation {
    updateMe(body:UserInput!): User
  }

  extend type Subscription {
    userOnlineStatusChanged: User  
  }
`;
