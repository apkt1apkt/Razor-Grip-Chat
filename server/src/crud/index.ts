import merge from "lodash/merge";

import { UserTypedef, UserResolver } from "./user";

export const typedefs = [UserTypedef];

export const resolvers = merge(UserResolver);
