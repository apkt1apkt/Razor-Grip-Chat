import { User, IUser } from "@server/model/user";
import { PUBLISH, SUBSCRIBE } from "@server/redis";
import { sessionWrap, tryCatchWrap } from "@server/helpers/error";

export const userIsOnline = async (isOnline: boolean, _id: string) => {
  tryCatchWrap(async () => {
    const user = await User.findOneAndUpdate({ _id }, { isOnline, lastSeen: new Date() }, { upsert: true, new: true });
    PUBLISH("userOnlineStatusChanged", { userOnlineStatusChanged: user });
  });
};

const weConnect = (uid: string, user: IUser) => {
  if (user._id === uid) return true;
  return !(user.blockedByMe?.includes(uid) || user.blockedByOthers?.includes(uid));
};

export const UserResolver: Resolver.Resolvers<IUser> = {
  Query: {
    usersOnline: (_, __, { authenticate, uid }) => {
      authenticate();
      return User.find({
        isOnline: true,
        _id: { $ne: uid },
        blockedByOthers: { $ne: uid },
        blockedByMe: { $ne: uid },
      }).lean();
    },

    myBlacklist: async (_, __, { authenticate, uid }) => {
      authenticate();
      const user = await User.findOne({ _id: uid }, { blockedByMe: 1 }).lean();
      const blacklist = user?.blockedByMe || [];
      if (blacklist.length) return User.find({ _id: { $in: blacklist } }).lean();
    },

    me: (_, __, { authenticate, uid }) => {
      authenticate();
      return User.findOne({ _id: uid }).lean();
    },

    user: async (_, { userId }, { authenticate }) => {
      authenticate();
      return User.findOne({ _id: userId }).lean();
    },
  },

  Mutation: {
    updateMe: async (_, { body }, { authenticate, uid }) => {
      authenticate();
      const user = await User.findOneAndUpdate({ _id: uid }, { ...body }, { upsert: true, new: true });
      return user;
    },

    amOnline: async (_, __, { authenticate, uid }) => {
      authenticate();
      const me = await User.findOne({ _id: uid });
      if (me) {
        if (me.isOnline) return me;
        me.isOnline = true;
        me.lastSeen = new Date();
        await me.save();
        PUBLISH("userOnlineStatusChanged", { userOnlineStatusChanged: me });
        return me;
      }
    },

    blockUser: async (_, { userId }, { authenticate, uid }) => {
      authenticate();

      const result = await sessionWrap(async (session) => {
        const u1 = await User.findOneAndUpdate({ _id: uid }, { $push: { blockedByMe: userId } }, { new: true }).session(
          session
        );
        const u2 = await User.findOneAndUpdate(
          { _id: userId },
          { $push: { blockedByOthers: uid } },
          { new: true }
        ).session(session);
        return [u1, u2];
      }, "Failed to block user");
      PUBLISH("weConnectStatusChanged", { weConnectStatusChanged: result });
      return result;
    },

    unblockUser: async (_, { userId }, { authenticate, uid }) => {
      authenticate();

      const result = await sessionWrap(async (session) => {
        const u1 = await User.findOneAndUpdate({ _id: uid }, { $pull: { blockedByMe: userId } }, { new: true }).session(
          session
        );
        const u2 = await User.findOneAndUpdate(
          { _id: userId },
          { $pull: { blockedByOthers: uid } },
          { new: true }
        ).session(session);
        return [u1, u2];
      }, "Failed to unblock user");
      PUBLISH("weConnectStatusChanged", { weConnectStatusChanged: result });
      return result;
    },
  },

  Subscription: {
    userOnlineStatusChanged: SUBSCRIBE("userOnlineStatusChanged", (_, __, { uid, isAuthenticated }) => {
      if (!isAuthenticated) return false;
      const payload: IUser = _.userOnlineStatusChanged || {};
      return payload._id === uid || weConnect(uid, payload);
    }),

    weConnectStatusChanged: SUBSCRIBE("weConnectStatusChanged", (_, __, { uid, isAuthenticated }) => {
      if (!isAuthenticated) return false;
      const [payload1, payload2]: IUser[] = _.weConnectStatusChanged || [];
      return payload1?._id === uid || payload2?._id === uid;
    }),
  },

  User: {
    weConnect: (user, _, { uid }) => weConnect(uid, user),
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
    weConnect: Boolean
    blockedByMe: [String]
  }

  input UserInput {
    img: String
    name: String
    email: String
  }

  extend type Query {
    usersOnline: [User]
    myBlacklist: [User]
    me: User
    user(userId:String!): User
  }

  extend type Mutation {
    updateMe(body:UserInput!): User
    blockUser(userId:String!): [User]
    unblockUser(userId:String!): [User]
    amOnline: User
  }

  extend type Subscription {
    userOnlineStatusChanged: User  
    weConnectStatusChanged: [User]
  }
`;
