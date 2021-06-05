import { User, IUser } from "@server/model/user";

export const userIsOnline = async (_id: string, isOnline: boolean) => {
  User.findOneAndUpdate({ _id }, { isOnline, lastSeen: new Date() }, { upsert: true });
};

export const UserResolver: Resolver.Resolvers<IUser> = {
  Query: {
    usersOnline: async (_, __, { authenticate }) => {
      authenticate();
      return User.find({ isOnline: true }).lean();
    },
  },

  Subscription: {},
};

export const UserTypedef = `
    type User {
        _id: String
        isOnline: Boolean
        lastSeen: DateTime
    }

    extend type Query {
        usersOnline: [User]
    }
`;
