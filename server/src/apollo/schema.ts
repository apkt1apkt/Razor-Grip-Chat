import merge from "lodash/merge";
import { makeExecutableSchema } from "apollo-server-express";

import rootTypedefs from "@server/apollo/root-typedefs";
import rootResolvers from "@server/apollo/root-resolvers";

export default makeExecutableSchema({
  typeDefs: [rootTypedefs],
  resolvers: merge(rootResolvers),
});
