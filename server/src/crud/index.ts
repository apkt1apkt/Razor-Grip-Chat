import merge from "lodash/merge";

import { UserTypedef, UserResolver } from "./user";
import { ChatTypedef, ChatResolver } from "./chat";

export const typedefs = [UserTypedef, ChatTypedef];

export const resolvers = merge(UserResolver, ChatResolver);
